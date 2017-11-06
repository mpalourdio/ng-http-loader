/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Spinkit } from '../../spinkits';
import { PendingInterceptorService } from '../../services/pending-interceptor.service';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy, OnInit {
    public isSpinnerVisible: boolean;
    private subscription: Subscription;
    public Spinkit = Spinkit;

    @Input()
    public backgroundColor: string;
    @Input()
    public spinner = Spinkit.skCubeGrid;
    @Input()
    public filteredUrlPatterns: string[] = [];

    constructor(private pendingRequestInterceptorService: PendingInterceptorService) {
        this.subscription = this.pendingRequestInterceptorService
            .pendingRequestsStatus
            .subscribe(hasPendingRequests => {
                this.isSpinnerVisible = hasPendingRequests;
            });
    }

    ngOnInit(): void {
        if (!(this.filteredUrlPatterns instanceof Array)) {
            throw new TypeError('`filteredUrlPatterns` must be an array.');
        }

        if (!!this.filteredUrlPatterns.length) {
            this.filteredUrlPatterns.forEach(e => {
                this.pendingRequestInterceptorService.filteredUrlPatterns.push(new RegExp(e));
            });
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
