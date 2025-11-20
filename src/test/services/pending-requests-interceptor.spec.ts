/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { forkJoin, Observable } from 'rxjs';
import { pendingRequestsInterceptor$ } from '../../lib/services/pending-requests-interceptor';
import {
    PendingRequestsInterceptorConfigurer
} from '../../lib/services/pending-requests-interceptor-configurer.service';

describe('PendingRequestsInterceptor', () => {
    let http: HttpClient;
    let httpMock: HttpTestingController;
    let pendingRequestsInterceptorConfigurer: PendingRequestsInterceptorConfigurer;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([pendingRequestsInterceptor$])),
                provideHttpClientTesting(),
            ]
        });

        pendingRequestsInterceptorConfigurer = TestBed.inject(PendingRequestsInterceptorConfigurer);
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be aware of the pending HTTP requests', () => {
        const runQuery$ = (url: string): Observable<unknown> => http.get(url);

        forkJoin([runQuery$('/fake'), runQuery$('/fake2')]).subscribe();

        const firstRequest = httpMock.expectOne('/fake');
        const secondRequest = httpMock.expectOne('/fake2');

        expect(pendingRequestsInterceptorConfigurer.pendingRequests).toBe(2);
        firstRequest.flush({});

        expect(pendingRequestsInterceptorConfigurer.pendingRequests).toBe(1);
        secondRequest.flush({});

        expect(pendingRequestsInterceptorConfigurer.pendingRequests).toBe(0);

        httpMock.verify();
    });

    it('should correctly notify the pendingRequestsStatus observable', () => {
        pendingRequestsInterceptorConfigurer
            .pendingRequestsStatus$
            .subscribe({
                next: (next: boolean) => expect(next).toBeTruthy(),
                error: () => expect(1).toBe(2)
            });

        http.get('/fake').subscribe();
        httpMock.expectOne('/fake');
    });

    it('should correctly notify the pendingRequestsStatus observable, even if subscribed after', () => {
        http.get('/fake').subscribe();
        httpMock.expectOne('/fake');

        pendingRequestsInterceptorConfigurer
            .pendingRequestsStatus$
            .subscribe({
                next: (next: boolean) => expect(next).toBeTruthy(),
                error: () => expect(1).toBe(2)
            });
    });

    it('should fail correctly', () => {
        const statusTextNotFound = 'NOT FOUND';
        http.get('/fake').subscribe({
            next: () => expect(true).toBe(false),
            error: (error: unknown) => {
                if (error instanceof HttpErrorResponse) {
                    expect(error.status).toBe(404);
                }
            }
        });

        const testRequest = httpMock.expectOne('/fake');
        testRequest.flush({}, {
            status: 404,
            statusText: statusTextNotFound
        });
        httpMock.verify();
    });
});
