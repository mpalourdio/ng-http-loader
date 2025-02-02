/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NgHttpLoaderComponent } from '../../lib/components/ng-http-loader.component';
import { SkThreeBounceComponent } from '../../lib/components/sk-three-bounce/sk-three-bounce.component';

describe('NgHttpLoaderComponentOutlet', () => {
    let component: NgHttpLoaderComponent;
    let fixture: ComponentFixture<NgHttpLoaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgHttpLoaderComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NgHttpLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be possible to specify an entryComponent', () => {
        component.isVisible$ = of(true);
        component.entryComponent.set(SkThreeBounceComponent);
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-bounce1'))
            .nativeElement;

        expect(element.className).toBe('sk-child sk-bounce1');
    });

    it('should force [spinner] to null if [entryComponent] is defined', () => {
        component.spinner.set('spinner-name');
        component.entryComponent.set(SkThreeBounceComponent);
        component.ngOnInit();

        expect(component.spinner()).toBeNull();
    });

    it('should correctly check [entryComponent] with null', () => {
        const spinnerName = 'spinner-name';
        component.spinner.set(spinnerName);
        component.entryComponent.set(null);
        component.ngOnInit();

        expect(component.spinner()).toBe(spinnerName);
    });
});
