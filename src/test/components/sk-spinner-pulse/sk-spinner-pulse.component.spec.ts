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
import { SkSpinnerPulseComponent } from '../../../lib/components/sk-spinner-pulse/sk-spinner-pulse.component';

describe('SkSpinnerPulseComponent', () => {
    let component: SkSpinnerPulseComponent;
    let fixture: ComponentFixture<SkSpinnerPulseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SkSpinnerPulseComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SkSpinnerPulseComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should be possible to set background-color', () => {
        fixture.componentRef.setInput('backgroundColor', '#ff0000');
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.sk-spinner-pulse'))
            .nativeElement;

        expect(element.style['background-color']).toBe('rgb(255, 0, 0)');
    });
});
