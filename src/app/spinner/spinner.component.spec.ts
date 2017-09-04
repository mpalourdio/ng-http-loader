/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { By } from '@angular/platform-browser';
import { Spinkit, SPINKIT_COMPONENTS } from '../spinkits';
import { Observable } from 'rxjs/Observable';
import { PendingInterceptorService } from '../pending-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import 'rxjs/add/observable/forkJoin';

describe('SpinnerComponent', () => {
    let component: SpinnerComponent;
    let fixture: ComponentFixture<SpinnerComponent>;

    const PendingInterceptorServiceExistingProvider = {
        provide: HTTP_INTERCEPTORS,
        useExisting: PendingInterceptorService,
        multi: true
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpinnerComponent, SPINKIT_COMPONENTS],
            providers: [
                PendingInterceptorService,
                PendingInterceptorServiceExistingProvider,
            ],
            imports: [HttpClientTestingModule]
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

    it('should show and hide the spinner according to the pending http requests',
        inject(
            [PendingInterceptorService, HttpClient, HttpTestingController],
            (service: PendingInterceptorService, http: HttpClient, httpMock: HttpTestingController) => {

                function runQuery(url: string): Observable<any> {
                    return http.get(url);
                }

                Observable.forkJoin([runQuery('/fake'), runQuery('/fake2')]).subscribe();

                const firstRequest = httpMock.expectOne('/fake');
                const secondRequest = httpMock.expectOne('/fake2');

                expect(component.isSpinnerVisible).toBeTruthy();

                firstRequest.flush({});
                expect(component.isSpinnerVisible).toBeTruthy();

                secondRequest.flush({});
                expect(component.isSpinnerVisible).toBeFalsy();
            })
    );

    it('should hide and show a the spinner for a single http request',
        inject(
            [PendingInterceptorService, HttpClient, HttpTestingController],
            (service: PendingInterceptorService, http: HttpClient, httpMock: HttpTestingController) => {
                http.get('/fake').subscribe();
                expect(component.isSpinnerVisible).toBeTruthy();
                httpMock.expectOne('/fake').flush({});
                expect(component.isSpinnerVisible).toBeFalsy();
            })
    );

    it('should not show the spinner if the request is filtered',
        inject(
            [PendingInterceptorService, HttpClient, HttpTestingController],
            (service: PendingInterceptorService, http: HttpClient, httpMock: HttpTestingController) => {
                component.filteredUrlPatterns.push('fake');
                fixture.detectChanges();

                http.get('/fake').subscribe();
                expect(component.isSpinnerVisible).toBeFalsy();
                httpMock.expectOne('/fake').flush({});
            })
    );

    it('should correctly filter with several requests and one pattern',
        inject(
            [PendingInterceptorService, HttpClient, HttpTestingController],
            (service: PendingInterceptorService, http: HttpClient, httpMock: HttpTestingController) => {
                component.filteredUrlPatterns.push('\\d');
                fixture.detectChanges();

                http.get('/12345').subscribe();
                expect(component.isSpinnerVisible).toBeFalsy();
                httpMock.expectOne('/12345').flush({});

                http.get('/fake').subscribe();
                expect(component.isSpinnerVisible).toBeTruthy();
                httpMock.expectOne('/fake').flush({});
                expect(component.isSpinnerVisible).toBeFalsy();
            })
    );

    it('should throw an error if filteredUrlPatterns is not an array', () => {
        component.filteredUrlPatterns = null;
        expect(() => fixture.detectChanges())
            .toThrow(new Error('`filteredUrlPatterns` must be an array.'));
    });
});
