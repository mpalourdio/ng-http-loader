/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

@Injectable()
export class PendingInterceptorService implements HttpInterceptor {
    private _pendingRequests = 0;
    private _pendingRequestsStatus: Subject<boolean> = new Subject<boolean>();
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

    private shouldBypass(url: string): boolean {
        return this._filteredUrlPatterns.some(e => {
            return e.test(url);
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const shouldBypass = this.shouldBypass(req.url);

        if (!shouldBypass) {
            this._pendingRequests++;

            if (1 === this._pendingRequests) {
                this._pendingRequestsStatus.next(true);
            }
        }

        return next.handle(req).map(event => {
            return event;
        })
            .catch(error => {
                return Observable.throw(error);
            })
            .finally(() => {
                if (!shouldBypass) {
                    this._pendingRequests--;

                    if (0 === this._pendingRequests) {
                        this._pendingRequestsStatus.next(false);
                    }
                }
            });
    }
}

export function PendingInterceptorServiceFactory() {
    return new PendingInterceptorService();
}

export let PendingInterceptorServiceFactoryProvider = {
    provide: PendingInterceptorService,
    useFactory: PendingInterceptorServiceFactory
};
