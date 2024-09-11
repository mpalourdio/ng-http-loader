/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component, Input, OnInit, Type } from '@angular/core';
import { merge, Observable, partition, timer } from 'rxjs';
import { debounce, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { SpinnerVisibilityService } from '../services/spinner-visibility.service';
import { Spinkit, SPINKIT_COMPONENTS } from '../spinkits';
import { AsyncPipe, NgComponentOutlet, NgIf, NgStyle } from "@angular/common";
import { PendingRequestsInterceptorConfigurer } from "../services/pending-requests-interceptor-configurer.service";

@Component({
    selector: 'ng-http-loader',
    standalone: true,
    templateUrl: './ng-http-loader.component.html',
    styleUrls: ['./ng-http-loader.component.scss'],
    imports: [SPINKIT_COMPONENTS, NgStyle, NgComponentOutlet, NgIf, AsyncPipe]
})
export class NgHttpLoaderComponent implements OnInit {

    spinkit = Spinkit;
    isVisible$!: Observable<boolean>;
    visibleUntil = Date.now();

    @Input() backdrop = true;
    @Input() backgroundColor!: string;
    @Input() debounceDelay = 0;
    @Input() entryComponent!: Type<unknown> | null;
    @Input() extraDuration = 0;
    @Input() filteredHeaders: string[] = [];
    @Input() filteredMethods: string[] = [];
    @Input() filteredUrlPatterns: string[] = [];
    @Input() minDuration = 0;
    @Input() opacity = '.7';
    @Input() backdropBackgroundColor = '#f1f1f1';
    @Input() spinner: string | null = Spinkit.skWave;

    constructor(private pendingRequestsInterceptorConfigurer: PendingRequestsInterceptorConfigurer, private spinnerVisibility: SpinnerVisibilityService) {
    }

    ngOnInit(): void {
        this.initIsvisibleObservable();
        this.nullifySpinnerIfEntryComponentIsDefined();
        this.initFilters();
    }

    private initIsvisibleObservable(): void {
        const [showSpinner$, hideSpinner$] = partition(this.pendingRequestsInterceptorConfigurer.pendingRequestsStatus$, h => h);

        this.isVisible$ = merge(
            this.pendingRequestsInterceptorConfigurer.pendingRequestsStatus$
                .pipe(switchMap(() => showSpinner$.pipe(debounce(() => timer(this.debounceDelay))))),
            showSpinner$
                .pipe(switchMap(() => hideSpinner$.pipe(debounce(() => this.getVisibilityTimer$())))),
            this.spinnerVisibility.visibility$
        ).pipe(
            distinctUntilChanged(),
            tap(h => this.updateExpirationDelay(h))
        );
    }

    private nullifySpinnerIfEntryComponentIsDefined(): void {
        if (this.entryComponent) {
            this.spinner = null;
        }
    }

    private initFilters(): void {
        this.initFilteredUrlPatterns();
        this.initFilteredMethods();
        this.initFilteredHeaders();
    }

    private initFilteredUrlPatterns(): void {
        if (!!this.filteredUrlPatterns.length) {
            this.filteredUrlPatterns.forEach(e =>
                this.pendingRequestsInterceptorConfigurer.filteredUrlPatterns.push(new RegExp(e))
            );
        }
    }

    private initFilteredMethods(): void {
        this.pendingRequestsInterceptorConfigurer.filteredMethods = this.filteredMethods;
    }

    private initFilteredHeaders(): void {
        this.pendingRequestsInterceptorConfigurer.filteredHeaders = this.filteredHeaders;
    }

    private updateExpirationDelay(showSpinner: boolean): void {
        if (showSpinner) {
            this.visibleUntil = Date.now() + this.minDuration;
        }
    }

    private getVisibilityTimer$(): Observable<number> {
        return timer(Math.max(this.extraDuration, this.visibleUntil - Date.now()));
    }
}
