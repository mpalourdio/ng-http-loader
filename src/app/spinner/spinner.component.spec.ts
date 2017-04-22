/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { HttpInterceptorServiceFactoryProvider } from '../http-interceptor.service';
import { HttpModule } from '@angular/http';

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
        fixture.detectChanges();
    });

    it('should create the spinner component', () => {
        expect(component).toBeTruthy();
    });
});
