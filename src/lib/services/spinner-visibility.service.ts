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
import { PendingRequestsInterceptor } from './pending-requests-interceptor.service';

@Injectable({
    providedIn: 'root'
})
export class SpinnerVisibilityService {
    private _visibility$ = new ReplaySubject<boolean>(1);

    constructor(private pendingRequestsInterceptor: PendingRequestsInterceptor) {
    }

    get visibility$(): Observable<boolean> {
        return this._visibility$.asObservable();
    }

    public show(): void {
        this.pendingRequestsInterceptor.forceByPass = true;
        this._visibility$.next(true);
    }

    public hide(): void {
        this._visibility$.next(false);
        this.pendingRequestsInterceptor.forceByPass = false;
    }
}
