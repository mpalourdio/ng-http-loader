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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgHttpLoaderModule } from '../../lib/ng-http-loader.module';

@Component({
    template: '<ng-http-loader></ng-http-loader>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HostComponent {
}

describe('NgHttpLoaderComponent OnPush', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HostComponent],
            imports: [HttpClientTestingModule, NgHttpLoaderModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
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
