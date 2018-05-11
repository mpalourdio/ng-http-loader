/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable()
export class PendingInterceptorService implements HttpInterceptor {
    private _pendingRequests = 0;
    private _pendingRequestsStatus: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    private _filteredUrlPatterns: RegExp[] = [];

    get pendingRequestsStatus(): Observable<boolean> {
        return this._pendingRequestsStatus.asObservable();
    }

    get pendingRequests(): number {
        return this._pendingRequests;
    }

    get filteredUrlPatterns(): RegExp[] {
        return this._filteredUrlPatterns;
    }

    private shouldBypassUrl(url: string): boolean {
        return this._filteredUrlPatterns.some(e => {
            return e.test(url);
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const shouldBypassUrl = this.shouldBypassUrl(req.urlWithParams);

        if (!shouldBypassUrl) {
            this._pendingRequests++;

            if (1 === this._pendingRequests) {
                this._pendingRequestsStatus.next(true);
            }
        }

        return next.handle(req).pipe(
            map(event => {
                return event;
            }),
            catchError(error => {
                return throwError(error);
            }),
            finalize(() => {
                if (!shouldBypassUrl) {
                    this._pendingRequests--;

                    if (0 === this._pendingRequests) {
                        this._pendingRequestsStatus.next(false);
                    }
                }
            })
        );
    }
}

export function PendingInterceptorServiceFactory(): PendingInterceptorService {
    return new PendingInterceptorService();
}

export let PendingInterceptorServiceFactoryProvider = {
    provide: PendingInterceptorService,
    useFactory: PendingInterceptorServiceFactory
};
