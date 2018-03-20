/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { inject, TestBed } from '@angular/core/testing';
import { SpinnerVisibilityService } from '../../src/services/spinner-visibility.service';

describe('SpinnerVisibilityService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SpinnerVisibilityService]
        });
    });

    it('should be created', inject([SpinnerVisibilityService], (service: SpinnerVisibilityService) => {
        expect(service).toBeTruthy();
    }));

    it('should define a subject', inject([SpinnerVisibilityService], (service: SpinnerVisibilityService) => {
        expect(service.visibilityObservable).toBeTruthy();
    }));

    it('should pipe \'true\' when calling show()', inject([SpinnerVisibilityService], (spinner: SpinnerVisibilityService) => {
        spinner.show();
        spinner.visibilityObservable.subscribe(result => {
                expect(result).toBeTruthy();
            },
            error => {
                expect(true).toBeFalsy();
            });
    }));

    it('should pipe \'false\' when calling hide()', inject([SpinnerVisibilityService], (spinner: SpinnerVisibilityService) => {
        spinner.hide();
        spinner.visibilityObservable.subscribe(result => {
                expect(result).toBeFalsy();
            },
            error => {
                expect(true).toBeFalsy();
            });
    }));
});
