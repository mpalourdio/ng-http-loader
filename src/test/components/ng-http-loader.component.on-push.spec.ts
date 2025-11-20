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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgHttpLoaderComponent } from '../../lib/components/ng-http-loader.component';
import { pendingRequestsInterceptor$ } from '../../lib/services/pending-requests-interceptor';

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
        vi.useFakeTimers({ shouldAdvanceTime: true });

        await TestBed.configureTestingModule({
            imports: [HostComponent],
            providers: [
                provideHttpClient(withInterceptors([pendingRequestsInterceptor$])),
                provideHttpClientTesting(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        vi.clearAllTimers();
    });

    it('should work as expected when the host component has ChangeDetectionStrategy.OnPush', async () => {
        http.get('/fake').subscribe();
        await fixture.whenStable();

        let spinner = fixture
            .debugElement
            .query(By.css('#spinner'))
            .nativeElement;
        expect(spinner).toBeTruthy();

        httpMock.expectOne('/fake').flush({});

        vi.advanceTimersToNextTimer();
        await fixture.whenStable();

        spinner = fixture
            .debugElement
            .query(By.css('#spinner'));
        expect(spinner).toBeNull();
    });
});
