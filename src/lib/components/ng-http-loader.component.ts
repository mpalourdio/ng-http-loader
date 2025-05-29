/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { NgComponentOutlet, NgIf, NgStyle } from '@angular/common';
import { Component, input, model, OnInit, Signal, Type } from '@angular/core';
import { merge, Observable, partition, timer } from 'rxjs';
import { debounce, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { PendingRequestsInterceptorConfigurer } from '../services/pending-requests-interceptor-configurer.service';
import { SpinnerVisibilityService } from '../services/spinner-visibility.service';
import { Spinkit, SPINKIT_COMPONENTS } from '../spinkits';
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: 'ng-http-loader',
    standalone: true,
    templateUrl: './ng-http-loader.component.html',
    styleUrls: ['./ng-http-loader.component.scss'],
    imports: [SPINKIT_COMPONENTS, NgStyle, NgComponentOutlet, NgIf]
})
export class NgHttpLoaderComponent implements OnInit {

    spinkit = Spinkit;
    isVisible$!: Observable<boolean>;
    isVisible: Signal<boolean | undefined>;
    visibleUntil = Date.now();

    readonly backdrop = input<boolean>(true);
    readonly backgroundColor = input<string>();
    readonly debounceDelay = input<number>(0);
    readonly entryComponent = input<Type<unknown> | null>(null);
    readonly extraDuration = input<number>(0);
    readonly filteredHeaders = input<string[]>([]);
    readonly filteredMethods = input<string[]>([]);
    readonly filteredUrlPatterns = input<string[]>([]);
    readonly minDuration = input<number>(0);
    readonly opacity = input<string>('.7');
    readonly backdropBackgroundColor = input<string>('#f1f1f1');
    readonly spinner = model<string | null>(Spinkit.skWave);

    constructor(private pendingRequestsInterceptorConfigurer: PendingRequestsInterceptorConfigurer, private spinnerVisibility: SpinnerVisibilityService) {
        const [showSpinner$, hideSpinner$] = partition(this.pendingRequestsInterceptorConfigurer.pendingRequestsStatus$, h => h);

        this.isVisible$ = merge(
            this.pendingRequestsInterceptorConfigurer.pendingRequestsStatus$
                .pipe(switchMap(() => showSpinner$.pipe(debounce(() => timer(this.debounceDelay()))))),
            showSpinner$
                .pipe(switchMap(() => hideSpinner$.pipe(debounce(() => this.getVisibilityTimer$())))),
            this.spinnerVisibility.visibility$
        ).pipe(
            distinctUntilChanged(),
            tap(h => this.updateExpirationDelay(h))
        );
        this.isVisible = toSignal(this.isVisible$);
    }

    ngOnInit(): void {
        this.nullifySpinnerIfEntryComponentIsDefined();
        this.initFilters();
    }

    private nullifySpinnerIfEntryComponentIsDefined(): void {
        if (this.entryComponent()) {
            this.spinner.update(() => null);
        }
    }

    private initFilters(): void {
        this.initFilteredUrlPatterns();
        this.initFilteredMethods();
        this.initFilteredHeaders();
    }

    private initFilteredUrlPatterns(): void {
        if (!!this.filteredUrlPatterns().length) {
            this.filteredUrlPatterns().forEach(e =>
                this.pendingRequestsInterceptorConfigurer.filteredUrlPatterns.push(new RegExp(e))
            );
        }
    }

    private initFilteredMethods(): void {
        this.pendingRequestsInterceptorConfigurer.filteredMethods = this.filteredMethods();
    }

    private initFilteredHeaders(): void {
        this.pendingRequestsInterceptorConfigurer.filteredHeaders = this.filteredHeaders();
    }

    private updateExpirationDelay(showSpinner: boolean): void {
        if (showSpinner) {
            this.visibleUntil = Date.now() + this.minDuration();
        }
    }

    private getVisibilityTimer$(): Observable<number> {
        return timer(Math.max(this.extraDuration(), this.visibleUntil - Date.now()));
    }
}
