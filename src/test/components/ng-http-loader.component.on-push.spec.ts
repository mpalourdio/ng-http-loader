/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgHttpLoaderComponent } from "../../lib/components/ng-http-loader.component";
import { PendingRequestsInterceptorProvider } from "../../lib/services/pending-requests-interceptor.service";

@Component({
    standalone: true,
    imports: [NgHttpLoaderComponent],
    template: '<ng-http-loader></ng-http-loader>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostComponent {
}

describe('NgHttpLoaderComponent OnPush', () => {
    let fixture: ComponentFixture<HostComponent>;
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent],
            providers: [PendingRequestsInterceptorProvider, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });

    it('should work as expected when the host component has ChangeDetectionStrategy.OnPush', fakeAsync(() => {
        http.get('/fake').subscribe();
        tick();
        fixture.detectChanges();
        let spinner = fixture
            .debugElement
            .query(By.css('#spinner'))
            .nativeElement;
        expect(spinner).toBeTruthy();

        httpMock.expectOne('/fake').flush({});
        tick();
        fixture.detectChanges();

        spinner = fixture
            .debugElement
            .query(By.css('#spinner'));
        expect(spinner).toBeNull();
    }));
});
