/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NgHttpLoaderComponent } from '../../lib/components/ng-http-loader.component';
import { SkThreeBounceComponent } from '../../lib/components/sk-three-bounce/sk-three-bounce.component';
import { SPINKIT_COMPONENTS } from '../../lib/spinkits';

describe('NgHttpLoaderComponentOutlet', () => {
    let component: NgHttpLoaderComponent;
    let fixture: ComponentFixture<NgHttpLoaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgHttpLoaderComponent, ...SPINKIT_COMPONENTS],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgHttpLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be possible to specify an entryComponent', () => {
        component.isVisible$ = of(true);
        component.entryComponent = SkThreeBounceComponent;
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-bounce1'))
            .nativeElement;

        expect(element.className).toBe('sk-child sk-bounce1');
    });

    it('should force [spinner] to null if [entryComponent] is defined', () => {
        component.spinner = 'spinner-name';
        component.entryComponent = SkThreeBounceComponent;
        component.ngOnInit();

        expect(component.spinner).toBeNull();
    });

    it('should correctly check [entryComponent] with empty string', () => {
        const spinnerName = 'spinner-name';
        component.spinner = spinnerName;
        component.entryComponent = '';
        component.ngOnInit();

        expect(component.spinner).toBe(spinnerName);
    });

    it('should correctly check [entryComponent] with null', () => {
        const spinnerName = 'spinner-name';
        component.spinner = spinnerName;
        component.entryComponent = null;
        component.ngOnInit();

        expect(component.spinner).toBe(spinnerName);
    });

    it('should correctly check [entryComponent] with undefined', () => {
        const spinnerName = 'spinner-name';
        component.spinner = spinnerName;
        component.entryComponent = undefined;
        component.ngOnInit();

        expect(component.spinner).toBe(spinnerName);
    });
});
