/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { NgHttpLoaderComponent } from '../../lib/components/ng-http-loader.component';
import { pendingRequestsInterceptor$ } from '../../lib/services/pending-requests-interceptor';
import { SpinnerVisibilityService } from '../../lib/services/spinner-visibility.service';
import { Spinkit } from '../../lib/spinkits';

describe('NgHttpLoaderComponent', () => {
    let component: NgHttpLoaderComponent;
    let fixture: ComponentFixture<NgHttpLoaderComponent>;
    let http: HttpClient;
    let httpMock: HttpTestingController;
    let spinner: SpinnerVisibilityService;
    let isVisible: boolean;
    let isVisibleSubscription: Subscription;

    beforeEach(async () => {
        vi.useFakeTimers({ shouldAdvanceTime: true });

        await TestBed.configureTestingModule({
            imports: [NgHttpLoaderComponent],
            providers: [
                provideHttpClient(withInterceptors([pendingRequestsInterceptor$])),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NgHttpLoaderComponent);
        component = fixture.componentInstance;
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
        spinner = TestBed.inject(SpinnerVisibilityService);
        isVisible = false;
        isVisibleSubscription = component.isVisible$.subscribe(v => isVisible = v);
    });

    afterEach(() => {
        vi.clearAllTimers();
        isVisibleSubscription.unsubscribe();
    });

    it('should create the ng-http-loader component', () => {
        expect(component).toBeTruthy();
    });

    it('should create the ng-http-loader component with default values', async () => {
        component.isVisible = signal(true);
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-wave'))
            .nativeElement;

        expect(element.className).toBe('sk-wave colored');
    });

    it('should not set the colored class if background-color is defined', async () => {
        component.isVisible = signal(true);
        fixture.componentRef.setInput('backgroundColor', '#ff0000');
        await fixture.whenStable();

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

    it('should be able to specify another known spinner (skRotatingPlane)', async () => {
        component.isVisible = signal(true);
        component.spinner.set(Spinkit.skRotatingPlane);
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-rotating-plane'))
            .nativeElement;

        expect(element.className).toBe('sk-rotating-plane colored-parent');
    });

    it('should be able to specify another known spinner (skChasingDots)', async () => {
        component.isVisible = signal(true);
        component.spinner.set(Spinkit.skChasingDots);
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-child'))
            .nativeElement;

        expect(element.className).toBe('sk-child sk-dot1');
    });

    it('should be able to specify another known spinner (skCubeGrid)', async () => {
        component.isVisible = signal(true);
        component.spinner.set(Spinkit.skCubeGrid);
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-cube'))
            .nativeElement;

        expect(element.className).toBe('sk-cube sk-cube1');
    });

    it('should be able to specify another known spinner (skDoubleBounce)', async () => {
        component.isVisible = signal(true);
        component.spinner.set(Spinkit.skDoubleBounce);
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-child'))
            .nativeElement;

        expect(element.className).toBe('sk-child sk-double-bounce1');
    });

    it('should be able to specify another known spinner (skSpinnerPulse)', async () => {
        component.isVisible = signal(true);
        component.spinner.set(Spinkit.skSpinnerPulse);
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-spinner'))
            .nativeElement;

        expect(element.className).toBe('sk-spinner sk-spinner-pulse colored-parent');
    });

    it('should be able to specify another known spinner (skThreeBounce)', async () => {
        component.isVisible = signal(true);
        component.spinner.set(Spinkit.skThreeBounce);
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-child'))
            .nativeElement;

        expect(element.className).toBe('sk-child sk-bounce1');
    });

    it('should be able to specify another known spinner (skWanderingCubes)', async () => {
        component.isVisible = signal(true);
        component.spinner.set(Spinkit.skWanderingCubes);
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-cube'))
            .nativeElement;

        expect(element.className).toBe('sk-cube sk-cube1');
    });

    it('should allow us to specify a custom background-color', async () => {
        component.isVisible = signal(true);
        fixture.componentRef.setInput('backgroundColor', '#ff0000');
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-rect.sk-rect1'))
            .nativeElement;

        expect(element.style['background-color']).toBe('rgb(255, 0, 0)');
    });

    it('should show and hide the spinner according to the pending HTTP requests', () => {
        const runQuery$ = (url: string): Observable<unknown> => http.get(url);
        forkJoin([runQuery$('/fake'), runQuery$('/fake2')]).subscribe();
        const firstRequest = httpMock.expectOne('/fake');
        const secondRequest = httpMock.expectOne('/fake2');

        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();
        firstRequest.flush({});

        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();

        secondRequest.flush({});
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
    });

    it('should hide and show the spinner for a single HTTP request', () => {
        http.get('/fake').subscribe();

        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();
        httpMock.expectOne('/fake').flush({});

        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
    });

    it('should not show the spinner if the request is filtered by url', () => {
        component.filteredUrlPatterns().push('fake');
        component.ngOnInit();

        http.get('/fake').subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
        httpMock.expectOne('/fake').flush({});
    });

    it('should not show the spinner if the request is filtered by HTTP method', async () => {
        component.filteredMethods().push('get');
        await fixture.whenStable();

        http.get('/fake').subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
        httpMock.expectOne('/fake').flush({});
    });

    it('should not show the spinner if the request is filtered by HTTP header', async () => {
        component.filteredHeaders().push('header-to-filter');
        await fixture.whenStable();

        http.get('/fake', {
            headers: {
                'header-to-filter': 'value'
            }
        }).subscribe();

        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
        httpMock.expectOne('/fake').flush({});
    });

    it('should take care of query strings in filteredUrlPatterns', () => {
        component.filteredUrlPatterns().push('bar');
        component.ngOnInit();

        http.get(
            '/api/service',
            {
                params: {
                    foo: 'bar'
                }
            }
        ).subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
        httpMock.expectOne('/api/service?foo=bar').flush({});
    });

    it('should correctly filter by URL with several requests and one pattern', () => {
        component.filteredUrlPatterns().push('\\d');
        component.ngOnInit();

        http.get('/12345').subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
        httpMock.expectOne('/12345').flush({});

        http.get('/fake').subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();
        httpMock.expectOne('/fake').flush({});

        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
    });

    it('should correctly filter by HTTP method with several requests', async () => {
        component.filteredMethods().push('pOsT');
        await fixture.whenStable();

        http.post('/12345', null).subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
        httpMock.expectOne('/12345').flush({});

        http.get('/fake').subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();
        httpMock.expectOne('/fake').flush({});

        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
    });

    it('should correctly filter by HTTP header with several requests', async () => {
        component.filteredHeaders().push('My-HeAdER');
        await fixture.whenStable();

        http.get('/12345', {
            headers: {
                'my-header': 'value'
            }
        }).subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
        httpMock.expectOne('/12345').flush({});

        http.get('/fake').subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();
        httpMock.expectOne('/fake').flush({});

        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
    });

    it('should show the spinner even if the component is created after the HTTP request is performed', () => {
        http.get('/fake').subscribe();

        const newFixture = TestBed.createComponent(NgHttpLoaderComponent);
        const newComponent = newFixture.componentInstance;
        newComponent.ngOnInit();

        let isVisibleForNewComponent = false;
        newComponent.isVisible$.subscribe(v => isVisibleForNewComponent = v);

        vi.advanceTimersToNextTimer();
        expect(isVisibleForNewComponent).toBeTruthy();
        httpMock.expectOne('/fake').flush({});

        vi.advanceTimersToNextTimer();
        expect(isVisibleForNewComponent).toBeFalsy();
        httpMock.verify();
    });

    it('should correctly handle the debounce delay for a single HTTP request', () => {
        fixture.componentRef.setInput('debounceDelay', 2000);
        http.get('/fake').subscribe();

        // the HTTP request is pending for 1 second now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();

        // the HTTP request is pending for 1,999 seconds now
        vi.advanceTimersByTime(999);
        expect(isVisible).toBeFalsy();

        // the HTTP request is pending for 2 seconds now - the spinner will be visible
        vi.advanceTimersByTime(1);
        expect(isVisible).toBeTruthy();

        // the HTTP request is pending for 5 seconds now - the spinner is still visible
        vi.advanceTimersByTime(3000);
        expect(isVisible).toBeTruthy();

        // the HTTP request is finally over, the spinner is hidden
        httpMock.expectOne('/fake').flush({});
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
    });

    it('should correctly handle the debounce delay for HTTP request finished before spinner should be shown', () => {
        fixture.componentRef.setInput('debounceDelay', 2000);
        http.get('/fake').subscribe();

        // the HTTP request is pending for 1 second now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();

        // the HTTP request is over, the spinner shouldn't be shown after debounceDelay terminated
        httpMock.expectOne('/fake').flush({});
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();
    });

    it('should correctly handle the debounce delay for HTTP sequential requests finished before spinner should be shown', () => {
        fixture.componentRef.setInput('debounceDelay', 5000);
        http.get('/fake').subscribe();

        // the first HTTP request is pending for 1 second now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();

        // the first HTTP request is over
        httpMock.expectOne('/fake').flush({});
        vi.advanceTimersByTime(1000);

        http.get('/fake2').subscribe();

        // the second HTTP request is pending for 1 second now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();

        // the second HTTP request is over
        httpMock.expectOne('/fake2').flush({});
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();

        // the spinner shouldn't be shown after debounceDelay terminated
        vi.advanceTimersByTime(2000);
        expect(isVisible).toBeFalsy();
    });

    it('should correctly handle the debounce delay for HTTP parallel requests finished before spinner should be shown', () => {
        fixture.componentRef.setInput('debounceDelay', 5000);
        http.get('/fake').subscribe();
        http.get('/fake2').subscribe();

        // both HTTP requests are pending for 1s now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();

        // the first HTTP request is over
        httpMock.expectOne('/fake').flush({});

        // the second HTTP request is pending for 2s now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();

        // the second HTTP request is over
        httpMock.expectOne('/fake2').flush({});
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();

        // the spinner shouldn't be shown after debounceDelay terminated
        vi.advanceTimersByTime(3000);
        expect(isVisible).toBeFalsy();
    });

    it('should correctly handle the debounce delay for multiple HTTP requests', () => {
        fixture.componentRef.setInput('debounceDelay', 2000);
        const runQuery$ = (url: string): Observable<unknown> => http.get(url);
        forkJoin([runQuery$('/fake'), runQuery$('/fake2')]).subscribe();
        const firstRequest = httpMock.expectOne('/fake');
        const secondRequest = httpMock.expectOne('/fake2');

        // the HTTP requests are pending for 1 second now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();

        // the HTTP requests are pending for 1,999 seconds now
        vi.advanceTimersByTime(999);
        expect(isVisible).toBeFalsy();

        // the HTTP requests are pending for 2 seconds now - the spinner will be visible
        vi.advanceTimersByTime(1);
        expect(isVisible).toBeTruthy();

        // the HTTP requests are pending for 5 seconds now - the spinner is still visible
        vi.advanceTimersByTime(3000);
        expect(isVisible).toBeTruthy();

        // the first HTTP request is finally over, the spinner is still visible
        firstRequest.flush({});
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();

        // the second request is pending for 8 seconds now - the spinner is still visible
        vi.advanceTimersByTime(3000);
        expect(isVisible).toBeTruthy();

        // the second HTTP request is finally over, the spinner is hidden
        secondRequest.flush({});
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
    });

    it('should be possible to manually show/hide the spinner', () => {
        spinner.show();
        expect(isVisible).toBeTruthy();

        spinner.hide();
        expect(isVisible).toBeFalsy();
    });

    it('should be possible to manually show/hide the spinner in a Promise context', async () => {
        spinner.show();
        expect(isVisible).toBeTruthy();
        await Promise.resolve('resolved').then(() => {
            spinner.hide();
            expect(isVisible).toBeFalsy();
        }).catch(() => expect(true).toBeFalsy());
    });

    it('should keep the spinner visible even if an HTTP request ends before calling \'hide\'', async () => {
        // we manually show the spinner
        spinner.show();
        expect(isVisible).toBeTruthy();
        // then an HTTP request is performed
        http.get('/fake').subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();

        // the HTTP request ends, but we want the spinner to be still visible
        httpMock.expectOne('/fake').flush({});
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();

        spinner.hide();
        // this time the spinner is not visible anymore
        expect(isVisible).toBeFalsy();
        // _forceByPass should be reset for next HTTP requests
        http.get('/fake2').subscribe();
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();

        httpMock.expectOne('/fake2').flush({});
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
    });

    it('should correctly handle the minimum spinner duration for a single HTTP request', () => {
        fixture.componentRef.setInput('minDuration', 5000);
        http.get('/fake').subscribe();

        // the HTTP request is pending for 1 second now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the HTTP request is pending for 2 seconds now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the HTTP request is finally over, the spinner is still visible
        httpMock.expectOne('/fake').flush({});
        // vi.advanceTimersToNextTimer();
        expect(isVisible).toBeTruthy();

        // the HTTP request is over but the spinner is still visible after 3 seconds
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the spinner is still visible after 4 seconds
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the spinner is still visible after 4,999 seconds
        vi.advanceTimersByTime(999);
        expect(isVisible).toBeTruthy();

        // the spinner is not visible anymore after 5 seconds
        vi.advanceTimersByTime(1);
        expect(isVisible).toBeFalsy();
    });

    it('should correctly handle the extra spinner duration for a single HTTP request', () => {
        fixture.componentRef.setInput('extraDuration', 5000);
        http.get('/fake').subscribe();

        // the HTTP request is pending for 1 second now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the HTTP request is pending for 2 seconds now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the HTTP request is finally over, the spinner is still visible
        httpMock.expectOne('/fake').flush({});
        expect(isVisible).toBeTruthy();

        // 4 seconds after the HTTP request is over, the spinner is still visible
        vi.advanceTimersByTime(4000);
        expect(isVisible).toBeTruthy();

        // the spinner is not visible anymore after 5 seconds
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();
    });

    it('should correctly handle the minimum spinner duration for multiple HTTP requests', () => {
        fixture.componentRef.setInput('minDuration', 5000);
        const runQuery$ = (url: string): Observable<unknown> => http.get(url);
        forkJoin([runQuery$('/fake'), runQuery$('/fake2')]).subscribe();
        const firstRequest = httpMock.expectOne('/fake');
        const secondRequest = httpMock.expectOne('/fake2');

        // the HTTP requests are pending for 1 second now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the HTTP requests are pending for 2 seconds now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the first HTTP request is finally over, the spinner is still visible
        firstRequest.flush({});
        expect(isVisible).toBeTruthy();

        // the second HTTP request is still pending after 3 seconds
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the second HTTP request is still pending after 4 seconds
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the second HTTP request is finally over too, the spinner is still visible
        secondRequest.flush({});
        expect(isVisible).toBeTruthy();

        // After 5 seconds, the spinner is hidden
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();
    });

    it('should correctly handle the extra spinner duration for multiple HTTP requests', () => {
        fixture.componentRef.setInput('extraDuration', 5000);
        const runQuery$ = (url: string): Observable<unknown> => http.get(url);
        forkJoin([runQuery$('/fake'), runQuery$('/fake2')]).subscribe();
        const firstRequest = httpMock.expectOne('/fake');
        const secondRequest = httpMock.expectOne('/fake2');

        // the HTTP requests are pending for 1 second now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the HTTP requests are pending for 2 seconds now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the first HTTP request is finally over, the spinner is still visible
        firstRequest.flush({});
        expect(isVisible).toBeTruthy();

        // the second HTTP request is still pending after 3 seconds
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the second HTTP request is still pending after 4 seconds
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the second HTTP request is finally over too, the spinner is still visible
        secondRequest.flush({});
        expect(isVisible).toBeTruthy();

        // After 4 seconds, the spinner is still visible
        vi.advanceTimersByTime(4000);
        expect(isVisible).toBeTruthy();

        // After 5 seconds, the spinner is hidden
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeFalsy();
    });

    it('should correctly handle the minimum spinner duration for multiple HTTP requests ran one after the others', () => {
        fixture.componentRef.setInput('minDuration', 2000);
        http.get('/fake').subscribe();
        const firstRequest = httpMock.expectOne('/fake');

        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the first HTTP request is finally over, the spinner is still visible for at least 1 second
        firstRequest.flush({});
        expect(isVisible).toBeTruthy();

        // But 200 ms after the first HTTP request has finished, a second HTTP request is launched
        vi.advanceTimersByTime(200);
        //the spinner is still visible because of min duration
        expect(isVisible).toBeTruthy();
        http.get('/fake2').subscribe();
        const secondRequest = httpMock.expectOne('/fake2');
        expect(isVisible).toBeTruthy();

        // After 900 ms, the spinner should
        // still be visible because the second HTTP request is still pending
        vi.advanceTimersByTime(900);
        expect(isVisible).toBeTruthy();

        // 500 ms later, the second http request ends. The spinner should be hidden
        // Total time spent visible (1000+200+1400==2600 > minDuration)
        vi.advanceTimersByTime(500);
        secondRequest.flush({});

        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
    });

    it('should handle the extra spinner duration for multiple HTTP requests ran one after the others', () => {
        fixture.componentRef.setInput('extraDuration', 10);
        const runQuery$ = (url: string): Observable<unknown> => http.get(url);
        runQuery$('/fake').subscribe();
        const firstRequest = httpMock.expectOne('/fake');

        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the first HTTP request is finally over, the spinner is still visible for at least 10ms
        firstRequest.flush({});
        vi.advanceTimersByTime(5);
        expect(isVisible).toBeTruthy();

        // But 5 ms after the first HTTP request has finished, a second HTTP request has been launched
        runQuery$('/fake2').subscribe();
        const secondRequest = httpMock.expectOne('/fake2');

        // After 700ms, the second http request ends. The spinner is still visible
        vi.advanceTimersByTime(700);
        secondRequest.flush({});
        expect(isVisible).toBeTruthy();

        // 10ms later, the spinner should be hidden (extraDuration)
        vi.advanceTimersByTime(10);
        expect(isVisible).toBeFalsy();
    });

    it('should still display the spinner when the minimum duration is inferior to the HTTP request duration', () => {
        fixture.componentRef.setInput('minDuration', 1000);
        http.get('/fake').subscribe();

        // the HTTP request is pending for 1 second now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the HTTP request is pending for 2 seconds now
        vi.advanceTimersByTime(1000);
        expect(isVisible).toBeTruthy();

        // the HTTP request is finally over after 2 seconds, the spinner is hidden
        httpMock.expectOne('/fake').flush({});
        vi.advanceTimersToNextTimer();
        expect(isVisible).toBeFalsy();
    });

    it('should be possible to set the minimum duration without side effect on manual show/hide', () => {
        fixture.componentRef.setInput('minDuration', 10000);
        spinner.show();
        expect(isVisible).toBeTruthy();

        spinner.hide();
        expect(isVisible).toBeFalsy();
    });

    it('should be possible to set the extra duration without side effect on manual show/hide', () => {
        fixture.componentRef.setInput('extraDuration', 10000);
        spinner.show();
        expect(isVisible).toBeTruthy();

        spinner.hide();
        expect(isVisible).toBeFalsy();
    });

    it('should be possible to mix debounce delay and minimum duration', () => {
        // the spinner should not be visible the first second, then visible for 5 seconds
        fixture.componentRef.setInput('minDuration', 5000);
        fixture.componentRef.setInput('debounceDelay', 1000);

        http.get('/fake').subscribe();

        // the HTTP request is pending for 0,5 second now - spinner not visible because debounce
        vi.advanceTimersByTime(500);
        expect(isVisible).toBeFalsy();

        // the HTTP request is pending for 1 second now - spinner visible
        vi.advanceTimersByTime(500);
        expect(isVisible).toBeTruthy();

        // the HTTP request is finally over, the spinner is still visible
        httpMock.expectOne('/fake').flush({});
        expect(isVisible).toBeTruthy();

        // after 3 seconds, the spinner is still visible
        vi.advanceTimersByTime(2000);
        expect(isVisible).toBeTruthy();

        // after 5,999 seconds, the spinner is still visible
        vi.advanceTimersByTime(2999);
        expect(isVisible).toBeTruthy();

        // after 6 seconds (1s for debounce + 5s extra. duration), the spinner is hidden
        vi.advanceTimersByTime(1);
        expect(isVisible).toBeFalsy();
    });

    it('should be possible to mix debounce delay and extra duration', () => {
        // the spinner should not be visible the first second, then visible for 5 seconds
        fixture.componentRef.setInput('extraDuration', 5000);
        fixture.componentRef.setInput('debounceDelay', 1000);

        http.get('/fake').subscribe();

        // the HTTP request is pending for 0,5 second now - spinner not visible because debounce
        vi.advanceTimersByTime(500);
        expect(isVisible).toBeFalsy();

        // the HTTP request is pending for 1 second now - spinner visible
        vi.advanceTimersByTime(500);
        expect(isVisible).toBeTruthy();

        // the HTTP request is finally over, the spinner is still visible
        httpMock.expectOne('/fake').flush({});
        expect(isVisible).toBeTruthy();

        // after 3 seconds, the spinner is still visible
        vi.advanceTimersByTime(2000);
        expect(isVisible).toBeTruthy();

        // after 5,999 seconds, the spinner is still visible
        vi.advanceTimersByTime(2999);
        expect(isVisible).toBeTruthy();

        // after 6 seconds (1s for debounce + 5s min. duration), the spinner is hidden
        vi.advanceTimersByTime(1);
        expect(isVisible).toBeFalsy();
    });

    it('should set the backdrop CSS class by default', async () => {
        component.isVisible = signal(true);
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.backdrop'))
            .nativeElement;

        expect(element).toBeTruthy();
    });

    it('should be possible to remove the backdrop CSS class', () => {
        component.isVisible$ = of(true);
        fixture.componentRef.setInput('backdrop', false);

        const element = fixture
            .debugElement
            .query(By.css('.backdrop'));

        expect(element).toBeNull();
    });

    it('should have a default opacity', () => {
        component.isVisible = signal(true);
        fixture.detectChanges();

        const element: HTMLElement = fixture
            .debugElement
            .query(By.css('#spinner'))
            .nativeElement;

        expect(element.style.opacity).toBe(`0${component.opacity()}`);
    });

    it('should be possible to override opacity', async () => {
        component.isVisible = signal(true);
        fixture.componentRef.setInput('opacity', '.3');
        await fixture.whenStable();

        const element: HTMLElement = fixture
            .debugElement
            .query(By.css('#spinner'))
            .nativeElement;

        expect(element.style.opacity).toBe(`0${component.opacity()}`);
    });

    it('should have a default backdrop background color if backdrop is true', async () => {
        component.isVisible = signal(true);
        await fixture.whenStable();

        const element: HTMLElement = fixture
            .debugElement
            .query(By.css('#spinner'))
            .nativeElement;

        expect(element.style.backgroundColor).toBe('rgb(241, 241, 241)');
    });

    it('should be possible to override backdrop background color when backdrop is true', async () => {
        component.isVisible = signal(true);
        fixture.componentRef.setInput('backdropBackgroundColor', '#777777');
        await fixture.whenStable();

        const element: HTMLElement = fixture
            .debugElement
            .query(By.css('#spinner'))
            .nativeElement;

        expect(element.style.backgroundColor).toBe('rgb(119, 119, 119)');
    });

    it('should not have a transparent backdrop background color if backdrop is false', async () => {
        component.isVisible = signal(true);
        fixture.componentRef.setInput('backdrop', false);
        await fixture.whenStable();

        const element: HTMLElement = fixture
            .debugElement
            .query(By.css('#spinner'))
            .nativeElement;

        expect(element.style.backgroundColor).toBe('transparent');
    });
});
