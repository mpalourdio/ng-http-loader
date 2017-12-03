/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SkDoubleBounceComponent } from '../../../src/components/sk-double-bounce/sk-double-bounce.component';
import { By } from '@angular/platform-browser';


describe('SkDoubleBounceComponent', () => {
    let component: SkDoubleBounceComponent;
    let fixture: ComponentFixture<SkDoubleBounceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SkDoubleBounceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SkDoubleBounceComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should be possible to set background-color', () => {
        component.backgroundColor = '#ff0000';
        fixture.detectChanges();

        const element = fixture
            .debugElement
            .query(By.css('.double-bounce1'))
            .nativeElement;

        expect(element.style['background-color']).toBe('rgb(255, 0, 0)');
    });
});
