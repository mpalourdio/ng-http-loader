/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { async, inject, TestBed } from '@angular/core/testing';
import { PendingInterceptorService } from './pending-interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

describe('PendingInterceptorService', () => {

    const PendingInterceptorServiceExistingProvider = {
        provide: HTTP_INTERCEPTORS,
        useExisting: PendingInterceptorService,
        multi: true
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PendingInterceptorService, PendingInterceptorServiceExistingProvider]
        });
    });

    it('should be created', inject([PendingInterceptorService], (service: PendingInterceptorService) => {
        expect(service).toBeTruthy();
    }));

    it('should be aware of the pending http requests',
        inject(
            [PendingInterceptorService, HttpClient, HttpTestingController],
            (service: PendingInterceptorService, http: HttpClient, httpMock: HttpTestingController) => {

                function runQuery(url: string): Observable<any> {
                    return http.get(url);
                }

                Observable.forkJoin([runQuery('/fake'), runQuery('/fake2')]).subscribe();

                const firstRequest = httpMock.expectOne('/fake');
                const secondRequest = httpMock.expectOne('/fake2');

                expect(service.pendingRequests).toBe(2);
                firstRequest.flush({});

                expect(service.pendingRequests).toBe(1);
                secondRequest.flush({});

                expect(service.pendingRequests).toBe(0);

                httpMock.verify();
            })
    );

    it('should correctly notify the pendingRequestsStatus observable', async(
        inject(
            [PendingInterceptorService, HttpClient, HttpTestingController],
            (service: PendingInterceptorService, http: HttpClient, httpMock: HttpTestingController) => {
                const pendingRequestsStatus = service.pendingRequestsStatus;

                pendingRequestsStatus
                    .subscribe(
                        (next: boolean) => expect(next).toBeTruthy(),
                        (error: HttpErrorResponse) => expect(1).toBe(2)
                    );

                http.get('/fake').subscribe();
                httpMock.expectOne('/fake');
            })
    ));

    it('should fail correctly',
        inject(
            [PendingInterceptorService, HttpClient, HttpTestingController],
            (service: PendingInterceptorService, http: HttpClient, httpMock: HttpTestingController) => {

                const statusText = 'NOT FOUND';

                http.get('/fake').subscribe(
                    (next: boolean) => expect(true).toBe(false),
                    (error: HttpErrorResponse) => expect(error.statusText).toBe(statusText)
                );

                const testRequest = httpMock.expectOne('/fake');
                testRequest.flush({}, {
                    'headers': {
                        'name': 'useless-header'
                    },
                    'status': 404,
                    'statusText': statusText
                });
                httpMock.verify();
            })
    );
});
