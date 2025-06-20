/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { PendingRequestsInterceptorConfigurer } from "./pending-requests-interceptor-configurer.service";

@Injectable({
    providedIn: 'root'
})
export class SpinnerVisibilityService {

    private _visibility$ = new ReplaySubject<boolean>(1);

    constructor(private pendingRequestsInterceptorConfigurer: PendingRequestsInterceptorConfigurer) {
    }

    get visibility$(): Observable<boolean> {
        return this._visibility$.asObservable();
    }

    show(): void {
        this.pendingRequestsInterceptorConfigurer.forceByPass = true;
        this._visibility$.next(true);
    }

    hide(): void {
        this._visibility$.next(false);
        this.pendingRequestsInterceptorConfigurer.forceByPass = false;
    }
}
