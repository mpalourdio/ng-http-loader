/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { NgHttpLoaderComponent } from '../../lib/components/ng-http-loader.component';
import { PendingRequestsInterceptorProvider } from '../../lib/services/pending-requests-interceptor.service';
import { SpinnerVisibilityService } from '../../lib/services/spinner-visibility.service';
import { Spinkit, SPINKIT_COMPONENTS } from '../../lib/spinkits';

@Component({
    template: '<ng-http-loader id="ng-http-loader"></ng-http-loader>'
})
export class HostComponent {
}

describe('NgHttpLoaderComponent', () => {
    let component: NgHttpLoaderComponent;
    let fixture: ComponentFixture<NgHttpLoaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgHttpLoaderComponent, HostComponent, ...SPINKIT_COMPONENTS],
            imports: [HttpClientTestingModule],
            providers: [PendingRequestsInterceptorProvider]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgHttpLoaderComponent);
        component = fixture.componentInstance;
    });

    it('should create the ng-http-loader component', () => {
        expect(component).toBeTruthy();
    });

    it('should create the ng-http-loader component with default values', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-wave'))
            .nativeElement;

        expect(element.className).toBe('sk-wave colored');
    });

    it('should destroy ng-http-loader as a view dependency without error', () => {
        const hostFixture = TestBed.createComponent(HostComponent);
        const hostComponentInstance = hostFixture.componentInstance;
        expect(hostComponentInstance).toBeTruthy();

        const element = hostFixture
            .debugElement
            .query(By.css('#ng-http-loader'));

        expect(element).toBeTruthy();
        // There shouldn't be any errors in the console when the testbed cleans up the component.
    });

    it('should not set the colored class if background-color is defined', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());
        component.backgroundColor = '#ff0000';
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-wave'))
            .nativeElement;

        expect(element.className).toBe('sk-wave');
    });

    it('should not display anything by default', () => {
        const element = fixture
            .debugElement
            .query(By.css('#http-loader'));

        expect(element).toBeNull();
    });

    it('should be able to specify another known spinner', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());
        component.spinner = Spinkit.skRotatingPlane;
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-rotating-plane'))
            .nativeElement;

        expect(element.className).toBe('sk-rotating-plane colored-parent');
    });

    it('should allow us to specify a custom background-color', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());
        component.backgroundColor = '#ff0000';
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-rect.sk-rect1'))
            .nativeElement;

        expect(element.style['background-color']).toBe('rgb(255, 0, 0)');
    });

    it('should show and hide the spinner according to the pending HTTP requests', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {

            function runQuery$(url: string): Observable<any> {
                return http.get(url);
            }

            forkJoin([runQuery$('/fake'), runQuery$('/fake2')]).subscribe();

            const firstRequest = httpMock.expectOne('/fake');
            const secondRequest = httpMock.expectOne('/fake2');

            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();
            firstRequest.flush({});

            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();
            secondRequest.flush({});

            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should hide and show the spinner for a single HTTP request', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            http.get('/fake').subscribe();

            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();
            httpMock.expectOne('/fake').flush({});

            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should not show the spinner if the request is filtered by url', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.filteredUrlPatterns.push('fake');
            fixture.detectChanges();

            http.get('/fake').subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
            httpMock.expectOne('/fake').flush({});
        }
    )));

    it('should not show the spinner if the request is filtered by HTTP method', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.filteredMethods.push('get');
            fixture.detectChanges();

            http.get('/fake').subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
            httpMock.expectOne('/fake').flush({});
        }
    )));

    it('should not show the spinner if the request is filtered by HTTP header', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.filteredHeaders.push('header-to-filter');
            fixture.detectChanges();

            http.get('/fake', {
                headers: {
                    'header-to-filter': 'value'
                }
            }).subscribe();

            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
            httpMock.expectOne('/fake').flush({});
        }
    )));

    it('should take care of query strings in filteredUrlPatterns', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.filteredUrlPatterns.push('bar');
            fixture.detectChanges();

            http.get(
                '/api/service',
                {
                    'params': {
                        'foo': 'bar'
                    }
                }
            ).subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
            httpMock.expectOne('/api/service?foo=bar').flush({});
        }
    )));

    it('should correctly filter by URL with several requests and one pattern', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.filteredUrlPatterns.push('\\d');
            fixture.detectChanges();

            http.get('/12345').subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
            httpMock.expectOne('/12345').flush({});

            http.get('/fake').subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();
            httpMock.expectOne('/fake').flush({});

            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly filter by HTTP method with several requests', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.filteredMethods.push('pOsT');
            fixture.detectChanges();

            http.post('/12345', null).subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
            httpMock.expectOne('/12345').flush({});

            http.get('/fake').subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();
            httpMock.expectOne('/fake').flush({});

            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly filter by HTTP header with several requests', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.filteredHeaders.push('My-HeAdER');
            fixture.detectChanges();

            http.get('/12345', {
                headers: {
                    'my-header': 'value'
                }
            }).subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
            httpMock.expectOne('/12345').flush({});

            http.get('/fake').subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();
            httpMock.expectOne('/fake').flush({});

            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should throw an error if filteredUrlPatterns is not an array', () => {
        component.filteredUrlPatterns = null;
        expect(() => fixture.detectChanges()).toThrow(new Error('`filteredUrlPatterns` must be an array.'));
    });

    it('should throw an error if filteredMethods is not an array', () => {
        component.filteredMethods = null;
        expect(() => fixture.detectChanges()).toThrow(new Error('`filteredMethods` must be an array.'));
    });

    it('should throw an error if filteredHeaders is not an array', () => {
        component.filteredHeaders = null;
        expect(() => fixture.detectChanges()).toThrow(new Error('`filteredHeaders` must be an array.'));
    });

    it('should show the spinner even if the component is created after the HTTP request is performed', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            http.get('/fake').subscribe();

            const newFixture = TestBed.createComponent(NgHttpLoaderComponent);
            const newComponent = newFixture.componentInstance;

            tick();
            newComponent.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();
            httpMock.expectOne('/fake').flush({});

            tick();
            newComponent.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
            httpMock.verify();
        }
    )));

    it('should correctly handle the debounce delay for a single HTTP request', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.debounceDelay = 2000;
            http.get('/fake').subscribe();

            // the HTTP request is pending for 1 second now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the HTTP request is pending for 1,999 seconds now
            tick(999);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the HTTP request is pending for 2 seconds now - the spinner will be visible
            tick(1);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is pending for 5 seconds now - the spinner is still visible
            tick(3000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is finally over, the spinner is hidden
            httpMock.expectOne('/fake').flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly handle the debounce delay for HTTP request finished before spinner should be shown', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.debounceDelay = 2000;
            http.get('/fake').subscribe();

            // the HTTP request is pending for 1 second now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the HTTP request is over, the spinner shouldn't be shown after debounceDelay terminated
            httpMock.expectOne('/fake').flush({});
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly handle the debounce delay for HTTP sequential requests finished before spinner should be shown', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.debounceDelay = 5000;
            http.get('/fake').subscribe();

            // the first HTTP request is pending for 1 second now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the first HTTP request is over
            httpMock.expectOne('/fake').flush({});
            tick(1000);

            http.get('/fake2').subscribe();

            // the second HTTP request is pending for 1 second now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the second HTTP request is over
            httpMock.expectOne('/fake2').flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the spinner shouldn't be shown after debounceDelay terminated
            tick(2000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly handle the debounce delay for HTTP parallel requests finished before spinner should be shown', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.debounceDelay = 5000;
            http.get('/fake').subscribe();
            http.get('/fake2').subscribe();

            // both HTTP requests are pending for 1s now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the first HTTP request is over
            httpMock.expectOne('/fake').flush({});

            // the second HTTP request is pending for 2s now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the second HTTP request is over
            httpMock.expectOne('/fake2').flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the spinner shouldn't be shown after debounceDelay terminated
            tick(3000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly handle the debounce delay for multiple HTTP requests', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.debounceDelay = 2000;

            function runQuery$(url: string): Observable<any> {
                return http.get(url);
            }

            forkJoin([runQuery$('/fake'), runQuery$('/fake2')]).subscribe();

            const firstRequest = httpMock.expectOne('/fake');
            const secondRequest = httpMock.expectOne('/fake2');

            // the HTTP requests are pending for 1 second now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the HTTP requests are pending for 1,999 seconds now
            tick(999);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the HTTP requests are pending for 2 seconds now - the spinner will be visible
            tick(1);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP requests are pending for 5 seconds now - the spinner is still visible
            tick(3000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the first HTTP request is finally over, the spinner is still visible
            firstRequest.flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the second request is pending for 8 seconds now - the spinner is still visible
            tick(3000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the second HTTP request is finally over, the spinner is hidden
            secondRequest.flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should be possible to manually show/hide the spinner', inject(
        [SpinnerVisibilityService], (spinner: SpinnerVisibilityService) => {
            spinner.show();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            spinner.hide();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    ));

    it('should be possible to manually show/hide the spinner in a Promise context', inject(
        [SpinnerVisibilityService], (spinner: SpinnerVisibilityService) => {
            spinner.show();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();
            Promise.resolve('resolved').then(() => {
                spinner.hide();
                component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
            }).catch(() => expect(true).toBeFalsy());
        }
    ));

    it('should keep the spinner visible even if an HTTP request ends before calling \'hide\'', fakeAsync(inject(
        [SpinnerVisibilityService, HttpClient, HttpTestingController],
        (spinner: SpinnerVisibilityService, http: HttpClient, httpMock: HttpTestingController) => {
            // we manually show the spinner
            spinner.show();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();
            // then an HTTP request is performed
            http.get('/fake').subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request ends, but we want the spinner to be still visible
            httpMock.expectOne('/fake').flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            spinner.hide();
            // this time the spinner is not visible anymore
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // _forceByPass should be reset for next HTTP requests
            http.get('/fake2').subscribe();
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();
            httpMock.expectOne('/fake2').flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly handle the minimum spinner duration for a single HTTP request', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.minDuration = 5000;
            http.get('/fake').subscribe();

            // the HTTP request is pending for 1 second now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is pending for 2 seconds now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is finally over, the spinner is still visible
            httpMock.expectOne('/fake').flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is over but the spinner is still visible after 3 seconds
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the spinner is still visible after 4 seconds
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the spinner is still visible after 4,999 seconds
            tick(999);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the spinner is not visible anymore after 5 seconds
            tick(1);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly handle the extra spinner duration for a single HTTP request', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.extraDuration = 5000;
            http.get('/fake').subscribe();

            // the HTTP request is pending for 1 second now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is pending for 2 seconds now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is finally over, the spinner is still visible
            httpMock.expectOne('/fake').flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // 4 seconds after the HTTP request is over, the spinner is still visible
            tick(4000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the spinner is not visible anymore after 5 seconds
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly handle the minimum spinner duration for multiple HTTP requests', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.minDuration = 5000;

            function runQuery$(url: string): Observable<any> {
                return http.get(url);
            }

            forkJoin([runQuery$('/fake'), runQuery$('/fake2')]).subscribe();

            const firstRequest = httpMock.expectOne('/fake');
            const secondRequest = httpMock.expectOne('/fake2');

            // the HTTP requests are pending for 1 second now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP requests are pending for 2 seconds now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the first HTTP request is finally over, the spinner is still visible
            firstRequest.flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the second HTTP request is still pending after 3 seconds
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the second HTTP request is still pending after 4 seconds
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the second HTTP request is finally over too, the spinner is still visible
            secondRequest.flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // After 5 seconds, the spinner is hidden
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly handle the extra spinner duration for multiple HTTP requests', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.extraDuration = 5000;

            function runQuery$(url: string): Observable<any> {
                return http.get(url);
            }

            forkJoin([runQuery$('/fake'), runQuery$('/fake2')]).subscribe();

            const firstRequest = httpMock.expectOne('/fake');
            const secondRequest = httpMock.expectOne('/fake2');

            // the HTTP requests are pending for 1 second now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP requests are pending for 2 seconds now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the first HTTP request is finally over, the spinner is still visible
            firstRequest.flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the second HTTP request is still pending after 3 seconds
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the second HTTP request is still pending after 4 seconds
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the second HTTP request is finally over too, the spinner is still visible
            secondRequest.flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // After 4 seconds, the spinner is still visible
            tick(4000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // After 5 seconds, the spinner is hidden
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should correctly handle the minimum spinner duration for multiple HTTP requests ran one after the others', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.minDuration = 2000;

            http.get('/fake').subscribe();
            const firstRequest = httpMock.expectOne('/fake');

            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the first HTTP request is finally over, the spinner is still visible for at least 1 second
            firstRequest.flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // But 200 ms after the first HTTP request has finished, a second HTTP request is launched
            tick(200);
            http.get('/fake2').subscribe();
            const secondRequest = httpMock.expectOne('/fake2');
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // After 900ms, the spinner should
            // still be visible because the second HTTP request is still pending
            tick(900);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // 500 ms later, the second http request ends. The spinner should be hidden
            // Total time spent visible (1000+200+1400==2600 > minDuration)
            tick(500);
            secondRequest.flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should handle the extra spinner duration for multiple HTTP requests ran one after the others', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.extraDuration = 10;

            function runQuery$(url: string): Observable<any> {
                return http.get(url);
            }

            runQuery$('/fake').subscribe();
            const firstRequest = httpMock.expectOne('/fake');

            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the first HTTP request is finally over, the spinner is still visible for at least 10ms
            firstRequest.flush({});
            tick(5);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // But 5 ms after the first HTTP request has finished, a second HTTP request has been launched
            runQuery$('/fake2').subscribe();
            const secondRequest = httpMock.expectOne('/fake2');

            // After 700ms, the second http request ends. The spinner is still visible
            tick(700);
            secondRequest.flush({});
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // 10ms later, the spinner should be  hidden (extraDuration)
            tick(10);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should still display the spinner when the minimum duration is inferior to the HTTP request duration', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.minDuration = 1000;
            http.get('/fake').subscribe();

            // the HTTP request is pending for 1 second now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is pending for 2 seconds now
            tick(1000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is finally over after 2 seconds, the spinner is hidden
            httpMock.expectOne('/fake').flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should be possible to set the minimum duration without side effect on manual show/hide', inject(
        [SpinnerVisibilityService], (spinner: SpinnerVisibilityService) => {
            component.minDuration = 10000;
            spinner.show();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            spinner.hide();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    ));

    it('should be possible to set the extra duration without side effect on manual show/hide', inject(
        [SpinnerVisibilityService], (spinner: SpinnerVisibilityService) => {
            component.extraDuration = 10000;
            spinner.show();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            spinner.hide();
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    ));

    it('should be possible to mix debounce delay and minimum duration', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            // the spinner should not be visible the first second, then visible for 5 seconds
            component.minDuration = 5000;
            component.debounceDelay = 1000;

            http.get('/fake').subscribe();

            // the HTTP request is pending for 0,5 second now - spinner not visible because debounce
            tick(500);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the HTTP request is pending for 1 second now - spinner visible
            tick(500);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is finally over, the spinner is still visible
            httpMock.expectOne('/fake').flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // after 3 seconds, the spinner is still visible
            tick(2000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // after 5,999 seconds, the spinner is still visible
            tick(2999);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // after 6 seconds (1s for debounce + 5s extra. duration), the spinner is hidden
            tick(1);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should be possible to mix debounce delay and extra duration', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            // the spinner should not be visible the first second, then visible for 5 seconds
            component.extraDuration = 5000;
            component.debounceDelay = 1000;

            http.get('/fake').subscribe();

            // the HTTP request is pending for 0,5 second now - spinner not visible because debounce
            tick(500);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();

            // the HTTP request is pending for 1 second now - spinner visible
            tick(500);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // the HTTP request is finally over, the spinner is still visible
            httpMock.expectOne('/fake').flush({});
            tick();
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // after 3 seconds, the spinner is still visible
            tick(2000);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // after 5,999 seconds, the spinner is still visible
            tick(2999);
            component.isVisible$.subscribe(v => expect(v).toBeTruthy()).unsubscribe();

            // after 6 seconds (1s for debounce + 5s min. duration), the spinner is hidden
            tick(1);
            component.isVisible$.subscribe(v => expect(v).toBeFalsy()).unsubscribe();
        }
    )));

    it('should set the backdrop CSS class by default', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.backdrop'))
            .nativeElement;

        expect(element).toBeTruthy();
    });

    it('should be possible to remove the backdrop CSS class', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());
        component.backdrop = false;
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.backdrop'));

        expect(element).toBeNull();
    });

    it('should have a default opacity', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());
        fixture.detectChanges();

        const element: HTMLElement = fixture
            .debugElement
            .query(By.css('#spinner'))
            .nativeElement;

        expect(element.style.opacity).toBe('0.7');
    });

    it('should be possible to override opacity', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());
        component.opacity = '.3';
        fixture.detectChanges();

        const element: HTMLElement = fixture
            .debugElement
            .query(By.css('#spinner'))
            .nativeElement;

        expect(element.style.opacity).toBe(`0${component.opacity}`);
    });
});
