/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { async, ComponentFixture, discardPeriodicTasks, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { SpinnerComponent } from '../../../src/components/spinner/spinner.component';
import { By } from '@angular/platform-browser';
import { Spinkit, SPINKIT_COMPONENTS } from '../../../src/spinkits';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgHttpLoaderServicesModule } from '../../../src/services/ng-http-loader-services.module';
import { SpinnerVisibilityService } from '../../../src/services/spinner-visibility.service';

describe('SpinnerComponent', () => {
    let component: SpinnerComponent;
    let fixture: ComponentFixture<SpinnerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpinnerComponent, SPINKIT_COMPONENTS],
            imports: [NgHttpLoaderServicesModule, HttpClientTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpinnerComponent);
        component = fixture.componentInstance;
    });

    it('should create the spinner component', () => {
        expect(component).toBeTruthy();
    });

    it('should create the spinner component with default values', () => {
        component.isSpinnerVisible = true;
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-cube-grid'))
            .nativeElement;

        expect(element.className).toBe('sk-cube-grid colored');
    });

    it('should not set the colored class if background-color is defined', () => {
        component.isSpinnerVisible = true;
        component.backgroundColor = '#ff0000';
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-cube-grid'))
            .nativeElement;

        expect(element.className).toBe('sk-cube-grid');
    });

    it('should not display anything by default', () => {
        const element = fixture
            .debugElement
            .query(By.css('#http-loader'));

        expect(element).toBeNull();
    });

    it('should be able to specify another known spinner', () => {
        component.isSpinnerVisible = true;
        component.spinner = Spinkit.skRotatingPlane;
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-rotating-plane'))
            .nativeElement;

        expect(element.className).toBe('sk-rotating-plane colored-parent');
    });

    it('should allow us to specify a custom background-color', () => {
        component.isSpinnerVisible = true;
        component.backgroundColor = '#ff0000';
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-cube.sk-cube1'))
            .nativeElement;

        expect(element.style['background-color']).toBe('rgb(255, 0, 0)');
    });

    it('should show and hide the spinner according to the pending http requests', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {

            function runQuery(url: string): Observable<any> {
                return http.get(url);
            }

            forkJoin([runQuery('/fake'), runQuery('/fake2')]).subscribe();

            const firstRequest = httpMock.expectOne('/fake');
            const secondRequest = httpMock.expectOne('/fake2');

            tick();
            expect(component.isSpinnerVisible).toBeTruthy();
            firstRequest.flush({});

            tick();
            expect(component.isSpinnerVisible).toBeTruthy();
            secondRequest.flush({});

            tick();
            expect(component.isSpinnerVisible).toBeFalsy();
        }
    )));

    it('should hide and show a the spinner for a single http request', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            http.get('/fake').subscribe();

            tick();
            expect(component.isSpinnerVisible).toBeTruthy();
            httpMock.expectOne('/fake').flush({});

            tick();
            expect(component.isSpinnerVisible).toBeFalsy();
        }
    )));

    it('should not show the spinner if the request is filtered', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.filteredUrlPatterns.push('fake');
            fixture.detectChanges();

            http.get('/fake').subscribe();
            tick();
            expect(component.isSpinnerVisible).toBeFalsy();
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
            expect(component.isSpinnerVisible).toBeFalsy();
            httpMock.expectOne('/api/service?foo=bar').flush({});
        }
    )));

    it('should correctly filter with several requests and one pattern', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.filteredUrlPatterns.push('\\d');
            fixture.detectChanges();

            http.get('/12345').subscribe();
            tick();
            expect(component.isSpinnerVisible).toBeFalsy();
            httpMock.expectOne('/12345').flush({});

            http.get('/fake').subscribe();
            tick();
            expect(component.isSpinnerVisible).toBeTruthy();
            httpMock.expectOne('/fake').flush({});

            tick();
            expect(component.isSpinnerVisible).toBeFalsy();
        }
    )));

    it('should throw an error if filteredUrlPatterns is not an array', () => {
        component.filteredUrlPatterns = null;
        expect(() => fixture.detectChanges()).toThrow(new Error('`filteredUrlPatterns` must be an array.'));
    });

    it('should show the spinner even if the component is created after the http request is performed', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            http.get('/fake').subscribe();

            const newFixture = TestBed.createComponent(SpinnerComponent);
            const newComponent = newFixture.componentInstance;

            tick();
            expect(newComponent.isSpinnerVisible).toBeTruthy();
            httpMock.expectOne('/fake').flush({});

            tick();
            expect(newComponent.isSpinnerVisible).toBeFalsy();
            httpMock.verify();
        }
    )));

    it('should correctly handle the debounce delay for a single http request', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.debounceDelay = 2000;
            http.get('/fake').subscribe();

            // the http request is pending for 1 second now
            tick(1000);
            expect(component.isSpinnerVisible).toBeFalsy();

            // the http request is pending for 1,999 seconds now
            tick(999);
            expect(component.isSpinnerVisible).toBeFalsy();

            // the http request is pending for 2 seconds now - the spinner will be displayed
            tick(1);
            expect(component.isSpinnerVisible).toBeTruthy();

            // the http request is pending for 5 seconds now - the spinner is still displayed
            tick(3000);
            expect(component.isSpinnerVisible).toBeTruthy();

            // the http request is finally over, the spinner is hidden
            httpMock.expectOne('/fake').flush({});
            tick();
            expect(component.isSpinnerVisible).toBeFalsy();

            // https://github.com/angular/angular/issues/10127
            discardPeriodicTasks();
        }
    )));

    it('should correctly handle the debounce delay for multiple http requests', fakeAsync(inject(
        [HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            component.debounceDelay = 2000;

            function runQuery(url: string): Observable<any> {
                return http.get(url);
            }

            forkJoin([runQuery('/fake'), runQuery('/fake2')]).subscribe();

            const firstRequest = httpMock.expectOne('/fake');
            const secondRequest = httpMock.expectOne('/fake2');

            // the http requests are pending for 1 second now
            tick(1000);
            expect(component.isSpinnerVisible).toBeFalsy();

            // the http requests are pending for 1,999 seconds now
            tick(999);
            expect(component.isSpinnerVisible).toBeFalsy();

            // the http requests are pending for 2 seconds now - the spinner will be displayed
            tick(1);
            expect(component.isSpinnerVisible).toBeTruthy();

            // the http requests are pending for 5 seconds now - the spinner is still displayed
            tick(3000);
            expect(component.isSpinnerVisible).toBeTruthy();

            // the first http request is finally over, the spinner is still displayed
            firstRequest.flush({});
            tick();
            expect(component.isSpinnerVisible).toBeTruthy();

            // the second request is pending for 8 seconds now - the spinner is still displayed
            tick(3000);
            expect(component.isSpinnerVisible).toBeTruthy();

            // the second http request is finally over, the spinner is hidden
            secondRequest.flush({});
            tick();
            expect(component.isSpinnerVisible).toBeFalsy();

            // https://github.com/angular/angular/issues/10127
            discardPeriodicTasks();
        }
    )));

    it('should be possible to manually show/hide the spinner', inject(
        [SpinnerVisibilityService], (spinner: SpinnerVisibilityService) => {
            spinner.show();
            expect(component.isSpinnerVisible).toBeTruthy();

            spinner.hide();
            expect(component.isSpinnerVisible).toBeFalsy();
        }
    ));
});
