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
import { SkThreeBounceComponent } from '../../../lib/components/sk-three-bounce/sk-three-bounce.component';
import { provideZonelessChangeDetection } from "@angular/core";

describe('SkThreeBounceComponent', () => {
    let component: SkThreeBounceComponent;
    let fixture: ComponentFixture<SkThreeBounceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SkThreeBounceComponent],
            providers: [
                provideZonelessChangeDetection(),
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(SkThreeBounceComponent);
        component = fixture.componentInstance;
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should be possible to set background-color', async () => {
        fixture.componentRef.setInput('backgroundColor', '#ff0000');
        await fixture.whenStable();

        const element = fixture
            .debugElement
            .query(By.css('.sk-child'))
            .nativeElement;

        expect(element.style['background-color']).toBe('rgb(255, 0, 0)');
    });
});
