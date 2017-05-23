/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { async, inject, TestBed } from '@angular/core/testing';
import { HttpInterceptorService } from './http-interceptor.service';
import { HttpModule, RequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

describe('HttpInterceptorService', () => {

    function HttpInterceptorMockBackendServiceFactory(backend: MockBackend, defaultOptions: RequestOptions) {
        return new HttpInterceptorService(backend, defaultOptions);
    }

    const HttpInterceptorServiceFactoryProvider = {
        provide: HttpInterceptorService,
        useFactory: HttpInterceptorMockBackendServiceFactory,
        deps: [MockBackend, RequestOptions]
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [MockBackend, HttpInterceptorService, HttpInterceptorServiceFactoryProvider]
        });
    });

    it('should create the HttpInterceptorService',
        inject([HttpInterceptorService], (service: HttpInterceptorService) => {
            expect(service).toBeTruthy();
        })
    );

    it('should be aware of the pending http requests',
        inject([HttpInterceptorService, MockBackend], (service: HttpInterceptorService, backend: MockBackend) => {

            const connections: MockConnection[] = [],
                responseMock = {key: 'value'},
                mockResponse: Response = new Response(new ResponseOptions({body: responseMock, status: 200}));

            function runQuery(url: string): Observable<Response> {
                return service.get(url);
            }

            backend.connections.subscribe((c: MockConnection) => connections.push(c));
            Observable.forkJoin([runQuery('http://www.fake.url'), runQuery('http://www2.fake.url')]).subscribe();

            expect(service.pendingRequests).toBe(2);

            connections[0].mockRespond(mockResponse);
            expect(service.pendingRequests).toBe(1);

            connections[1].mockRespond(mockResponse);
            expect(service.pendingRequests).toBe(0);
        })
    );

    it('should correctly notify the pendingRequestsStatus observable', async(
        inject([HttpInterceptorService], (service: HttpInterceptorService) => {
            const pendingRequestsStatus = service.pendingRequestsStatus;

            pendingRequestsStatus
                .subscribe(
                    next => expect(next).toBeTruthy(),
                    error => expect(1).toBe(2)
                );

            service.get('http://www.fake.url');
        })
    ));

    it('should fail correctly',
        inject([HttpInterceptorService, MockBackend], (service: HttpInterceptorService, backend: MockBackend) => {

            const statusText = 'NOT FOUND';
            backend.connections.subscribe((connection: MockConnection) => {
                connection.mockError(new Response(new ResponseOptions({status: 404, statusText: statusText})) as any);
            });

            service.get('http://www.fake.url').subscribe(
                next => expect(1).toBe(2),
                (error: Response) => expect(error.statusText).toBe(statusText)
            );
        })
    );
});
