/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ExistingProvider, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

export type InterceptorFilters = {
    filteredUrlPatterns: RegExp[],
    filteredMethods: string[],
    filteredHeaders: string[]
}

@Injectable({
    providedIn: 'root'
})
export class PendingRequestsInterceptor implements HttpInterceptor {

    private _pendingRequests = 0;
    private _pendingRequestsStatus$ = new ReplaySubject<boolean>(1);
    private _filters$ = new BehaviorSubject<InterceptorFilters>({
        filteredUrlPatterns: [],
        filteredHeaders: [],
        filteredMethods: []
    })
    private _forceByPass = false;

    get pendingRequestsStatus$(): Observable<boolean> {
        return this._pendingRequestsStatus$.asObservable();
    }

    get pendingRequests(): number {
        return this._pendingRequests;
    }

    get filteredUrlPatterns(): RegExp[] {
        return this._filters$.value.filteredUrlPatterns;
    }

    set filteredUrlPatterns(regexes: RegExp[]) {
        this._filters$.next({
            ...this._filters$.value,
            filteredUrlPatterns: regexes
        })
    }

    set filteredMethods(httpMethods: string[]) {
        this._filters$.next({
            ...this._filters$.value,
            filteredMethods: httpMethods
        })
    }

    set filteredHeaders(value: string[]) {
        this._filters$.next({
            ...this._filters$.value,
            filteredHeaders: value
        })
    }

    set forceByPass(value: boolean) {
        this._forceByPass = value;
    }

    private shouldBypassUrl(url: string): boolean {
        return this._filters$.value.filteredUrlPatterns.some(e => {
            return e.test(url);
        });
    }

    private shouldBypassMethod(req: HttpRequest<any>): boolean {
        return this._filters$.value.filteredMethods.some(e => {
            return e.toUpperCase() === req.method.toUpperCase();
        });
    }

    private shouldBypassHeader(req: HttpRequest<any>): boolean {
        return this._filters$.value.filteredHeaders.some(e => {
            return req.headers.has(e);
        });
    }

    private shouldBypass(req: HttpRequest<unknown>): boolean {
        return this._forceByPass
            || this.shouldBypassUrl(req.urlWithParams)
            || this.shouldBypassMethod(req)
            || this.shouldBypassHeader(req);
    }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const shouldBypass = this.shouldBypass(req);

        if (!shouldBypass) {
            this._pendingRequests++;

            if (1 === this._pendingRequests) {
                this._pendingRequestsStatus$.next(true);
            }
        }

        return next.handle(req).pipe(
            finalize(() => {
                if (!shouldBypass) {
                    this._pendingRequests--;

                    if (0 === this._pendingRequests) {
                        this._pendingRequestsStatus$.next(false);
                    }
                }
            })
        );
    }
}

export const PendingRequestsInterceptorProvider: ExistingProvider[] = [{
    provide: HTTP_INTERCEPTORS,
    useExisting: PendingRequestsInterceptor,
    multi: true
}];
