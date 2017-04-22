/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component, OnDestroy } from '@angular/core';
import { HttpInterceptorService } from '../http-interceptor.service';
import { Subscription } from 'rxjs/Rx';

@Component({
    selector: 'spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnDestroy {
    public isSpinnerVisible: boolean;
    private subscription: Subscription;

    constructor(private http: HttpInterceptorService) {
        this.subscription = this.http
            .getPendingRequestStatusSubject()
            .subscribe((isSpinnerVisible) => {
                this.isSpinnerVisible = isSpinnerVisible;
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
