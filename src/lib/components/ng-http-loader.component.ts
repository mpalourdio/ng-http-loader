/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, Subscription, timer } from 'rxjs';
import { debounce, distinctUntilChanged, partition, switchMap } from 'rxjs/operators';
import { PendingInterceptorService } from '../services/pending-interceptor.service';
import { SpinnerVisibilityService } from '../services/spinner-visibility.service';
import { Spinkit } from '../spinkits';

@Component({
    selector: 'ng-http-loader',
    templateUrl: './ng-http-loader.component.html',
    styleUrls: ['./ng-http-loader.component.scss']
})
export class NgHttpLoaderComponent implements OnDestroy, OnInit {
    public isSpinnerVisible: boolean;
    public spinkit = Spinkit;
    private subscriptions: Subscription;
    private visibleUntil: number = Date.now();

    @Input()
    public backgroundColor: string;
    @Input()
    public spinner = Spinkit.skCubeGrid;
    @Input()
    public filteredUrlPatterns: string[] = [];
    @Input()
    public filteredMethods: string[] = [];
    @Input()
    public filteredHeaders: string[] = [];
    @Input()
    public debounceDelay = 0;
    @Input()
    public minDuration = 0;
    @Input()
    public extraDuration = 0;
    @Input()
    public entryComponent: any = null;

    constructor(private pendingInterceptorService: PendingInterceptorService, private spinnerVisibilityService: SpinnerVisibilityService) {
        const [showSpinner, hideSpinner] = partition((h: boolean) => h)(this.pendingInterceptorService.pendingRequestsStatus$);

        this.subscriptions = merge(
            showSpinner.pipe(debounce(() => timer(this.debounceDelay))),
            showSpinner.pipe(
                switchMap(() => hideSpinner.pipe(debounce(() => this.getHiddingTimer())))
            ),
            this.spinnerVisibilityService.visibilityObservable$,
        )
            .pipe(distinctUntilChanged())
            .subscribe(h => this.handleSpinnerVisibility(h));
    }

    ngOnInit(): void {
        this.nullifySpinnerIfEntryComponentIsDefined();
        this.initFilters();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    private nullifySpinnerIfEntryComponentIsDefined(): void {
        if (null != this.entryComponent) {
            this.spinner = null;
        }
    }

    private initFilters(): void {
        this.initFilteredUrlPatterns();
        this.initFilteredMethods();
        this.initFilteredHeaders();
    }

    private initFilteredUrlPatterns(): void {
        if (!(this.filteredUrlPatterns instanceof Array)) {
            throw new TypeError('`filteredUrlPatterns` must be an array.');
        }

        if (!!this.filteredUrlPatterns.length) {
            this.filteredUrlPatterns.forEach(e =>
                this.pendingInterceptorService.filteredUrlPatterns.push(new RegExp(e))
            );
        }
    }

    private initFilteredMethods(): void {
        if (!(this.filteredMethods instanceof Array)) {
            throw new TypeError('`filteredMethods` must be an array.');
        }
        this.pendingInterceptorService.filteredMethods = this.filteredMethods;
    }

    private initFilteredHeaders(): void {
        if (!(this.filteredHeaders instanceof Array)) {
            throw new TypeError('`filteredHeaders` must be an array.');
        }
        this.pendingInterceptorService.filteredHeaders = this.filteredHeaders;
    }

    private handleSpinnerVisibility(showSpinner: boolean): void {
        const now = Date.now();
        if (showSpinner && this.visibleUntil <= now) {
            this.visibleUntil = now + this.minDuration;
        }
        this.isSpinnerVisible = showSpinner;
    }

    private getHiddingTimer(): Observable<number> {
        return timer(Math.max(this.extraDuration, this.visibleUntil - Date.now()));
    }
}
