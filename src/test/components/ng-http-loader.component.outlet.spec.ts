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
import { NgHttpLoaderComponent } from '../../lib/components/ng-http-loader.component';
import { SkThreeBounceComponent } from '../../lib/components/sk-three-bounce/sk-three-bounce.component';
import { provideZonelessChangeDetection, signal } from "@angular/core";

describe('NgHttpLoaderComponentOutlet', () => {
    let component: NgHttpLoaderComponent;
    let fixture: ComponentFixture<NgHttpLoaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgHttpLoaderComponent],
            providers: [
                provideZonelessChangeDetection(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(NgHttpLoaderComponent);
        component = fixture.componentInstance;
    });

    it('should be possible to specify an entryComponent', async () => {
        component.isVisible = signal(true);
        fixture.componentRef.setInput('entryComponent', SkThreeBounceComponent);
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-bounce1'))
            .nativeElement;

        expect(element.className).toBe('sk-child sk-bounce1');
    });

    it('should force [spinner] to null if [entryComponent] is defined', () => {
        component.spinner.set('spinner-name');
        fixture.componentRef.setInput('entryComponent', SkThreeBounceComponent);
        component.ngOnInit();

        expect(component.spinner()).toBeNull();
    });

    it('should correctly check [entryComponent] with null', () => {
        const spinnerName = 'spinner-name';
        component.spinner.set(spinnerName);
        fixture.componentRef.setInput('entryComponent', null);
        component.ngOnInit();

        expect(component.spinner()).toBe(spinnerName);
    });
});
