/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component, Input, OnDestroy } from '@angular/core';
import { HttpInterceptorService } from '../http-interceptor.service';
import { Subscription } from 'rxjs/Rx';
import { Spinkit } from '../spinkits';
import { PendingInterceptorService } from '../pending-interceptor.service';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: [
        './spinner.component.css',
        './spinkit-css/sk-double-bounce.css',
        './spinkit-css/sk-chasing-dots.css',
        './spinkit-css/sk-cube-grid.css',
        './spinkit-css/sk-rotating-plane.css',
        './spinkit-css/sk-spinner-pulse.css',
        './spinkit-css/sk-three-bounce.css',
        './spinkit-css/sk-wandering-cubes.css',
        './spinkit-css/sk-wave.css',
    ]
})
export class SpinnerComponent implements OnDestroy {
    public isSpinnerVisible: boolean;
    private oldSubscription: Subscription;
    private subscription: Subscription;
    public Spinkit = Spinkit;
    @Input()
    public backgroundColor: string;
    @Input()
    public spinner = Spinkit.skCubeGrid;

    constructor(private http: HttpInterceptorService, private pendingRequestInterceptorService: PendingInterceptorService) {
        this.oldSubscription = this.http
            .pendingRequestsStatus
            .subscribe(hasPendingRequests => {
                if (hasPendingRequests) {
                    console.log(
                        'HttpInterceptorService is deprecated and will soon be removed ' +
                        'in favor of HttpClientModule. Please upgrade !'
                    );
                }
                this.isSpinnerVisible = hasPendingRequests;
            });

        this.subscription = this.pendingRequestInterceptorService
            .pendingRequestsStatus
            .subscribe(hasPendingRequests => {
                this.isSpinnerVisible = hasPendingRequests;
            });
    }

    ngOnDestroy(): void {
        this.oldSubscription.unsubscribe();
        this.subscription.unsubscribe();
    }
}
