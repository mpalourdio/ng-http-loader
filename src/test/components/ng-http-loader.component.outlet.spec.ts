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
import { NgHttpLoaderComponent } from '../../lib/components/ng-http-loader.component';
import { SkThreeBounceComponent } from '../../lib/components/sk-three-bounce/sk-three-bounce.component';
import { PendingInterceptorServiceInterceptor } from '../../lib/services/pending-interceptor.service';
import { SPINKIT_COMPONENTS } from '../../lib/spinkits';

describe('NgHttpLoaderComponentOutlet', () => {
    let component: NgHttpLoaderComponent;
    let fixture: ComponentFixture<NgHttpLoaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgHttpLoaderComponent, ...SPINKIT_COMPONENTS],
            imports: [HttpClientTestingModule],
            providers: [PendingInterceptorServiceInterceptor]
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
        component.isSpinnerVisible = true;
        component.entryComponent = SkThreeBounceComponent;
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-bounce1'))
            .nativeElement;

        expect(element.className).toBe('sk-child sk-bounce1');
    });

    it('should force [spinner] to null if [entryComponent] is defined', () => {
        component.isSpinnerVisible = true;
        component.spinner = 'whatever';
        component.entryComponent = SkThreeBounceComponent;
        fixture.detectChanges();

        expect(component.spinner).toBeNull();
    });
});
