/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { HttpInterceptorServiceFactoryProvider } from '../http-interceptor.service';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { Spinkit } from '../spinkits';

describe('SpinnerComponent', () => {
    let component: SpinnerComponent;
    let fixture: ComponentFixture<SpinnerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpinnerComponent],
            providers: [HttpInterceptorServiceFactoryProvider],
            imports: [HttpModule]
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
});
