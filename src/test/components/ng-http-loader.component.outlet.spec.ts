/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BehaviorSubject } from 'rxjs';
import { NgHttpLoaderComponent } from '../../lib/components/ng-http-loader.component';
import { SkThreeBounceComponent } from '../../lib/components/sk-three-bounce/sk-three-bounce.component';
import { PendingRequestsInterceptorProvider } from '../../lib/services/pending-requests-interceptor.service';
import { SPINKIT_COMPONENTS } from '../../lib/spinkits';

describe('NgHttpLoaderComponentOutlet', () => {
    let component: NgHttpLoaderComponent;
    let fixture: ComponentFixture<NgHttpLoaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgHttpLoaderComponent, ...SPINKIT_COMPONENTS],
            imports: [HttpClientTestingModule],
            providers: [PendingRequestsInterceptorProvider]
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: { entryComponents: [SkThreeBounceComponent] }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgHttpLoaderComponent);
        component = fixture.componentInstance;
    });

    it('should be possible to specify an entryComponent', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());

        component.entryComponent = SkThreeBounceComponent;
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-bounce1'))
            .nativeElement;

        expect(element.className).toBe('sk-child sk-bounce1');
    });

    it('should force [spinner] to null if [entryComponent] is defined', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());

        component.spinner = 'whatever';
        component.entryComponent = SkThreeBounceComponent;
        fixture.detectChanges();

        expect(component.spinner).toBeNull();
    });

    it('should correctly check [entryComponent] with empty string', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());

        component.spinner = 'whatever';
        component.entryComponent = '';
        fixture.detectChanges();

        expect(component.spinner).toBe('whatever');
    });

    it('should correctly check [entryComponent] with null', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());

        component.spinner = 'whatever';
        component.entryComponent = null;
        fixture.detectChanges();

        expect(component.spinner).toBe('whatever');
    });

    it('should correctly check [entryComponent] with undefined', () => {
        spyOnProperty(component, 'isVisible$')
            .and.returnValue(new BehaviorSubject(true).asObservable());

        component.spinner = 'whatever';
        component.entryComponent = undefined;
        fixture.detectChanges();

        expect(component.spinner).toBe('whatever');
    });
});
