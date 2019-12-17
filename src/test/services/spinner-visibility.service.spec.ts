/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { TestBed } from '@angular/core/testing';
import { SpinnerVisibilityService } from '../../lib/services/spinner-visibility.service';

describe('SpinnerVisibilityService', () => {
    let spinnerVisibilityService: SpinnerVisibilityService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        spinnerVisibilityService = TestBed.inject(SpinnerVisibilityService);
    });

    it('should be created', () => {
        expect(spinnerVisibilityService).toBeTruthy();
    });

    it('should define a subject', () => {
        expect(spinnerVisibilityService.visibility$).toBeTruthy();
    });

    it('should pipe \'true\' when calling show()', () => {
        spinnerVisibilityService.show();
        spinnerVisibilityService.visibility$
            .subscribe(
                result => expect(result).toBeTruthy(),
                () => expect(true).toBeFalsy()
            );
    });

    it('should pipe \'false\' when calling hide()', () => {
        spinnerVisibilityService.hide();
        spinnerVisibilityService.visibility$
            .subscribe(
                result => expect(result).toBeFalsy(),
                () => expect(true).toBeFalsy()
            );
    });
});
