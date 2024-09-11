/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PendingRequestsInterceptorConfigurer {

    private _pendingRequests = 0;
    private _pendingRequestsStatus$ = new ReplaySubject<boolean>(1);
    private _filteredUrlPatterns: RegExp[] = [];
    private _filteredMethods: string[] = [];
    private _filteredHeaders: string[] = [];
    private _forceByPass = false;

    get pendingRequestsStatus$(): Observable<boolean> {
        return this._pendingRequestsStatus$.asObservable();
    }

    get pendingRequestsStatusSubject$(): ReplaySubject<boolean> {
        return this._pendingRequestsStatus$;
    }

    get pendingRequests(): number {
        return this._pendingRequests;
    }

    set pendingRequests(pendingRequests: number) {
        this._pendingRequests = pendingRequests;
    }

    get filteredUrlPatterns(): RegExp[] {
        return this._filteredUrlPatterns;
    }

    set filteredMethods(httpMethods: string[]) {
        this._filteredMethods = httpMethods;
    }

    set filteredHeaders(value: string[]) {
        this._filteredHeaders = value;
    }

    set forceByPass(value: boolean) {
        this._forceByPass = value;
    }

    shouldBypassUrl(url: string): boolean {
        return this._filteredUrlPatterns.some(e => {
            return e.test(url);
        });
    }

    shouldBypassMethod(req: HttpRequest<unknown>): boolean {
        return this._filteredMethods.some(e => {
            return e.toUpperCase() === req.method.toUpperCase();
        });
    }

    shouldBypassHeader(req: HttpRequest<unknown>): boolean {
        return this._filteredHeaders.some(e => {
            return req.headers.has(e);
        });
    }

    shouldBypass(req: HttpRequest<unknown>): boolean {
        return this._forceByPass
            || this.shouldBypassUrl(req.urlWithParams)
            || this.shouldBypassMethod(req)
            || this.shouldBypassHeader(req);
    }
}
