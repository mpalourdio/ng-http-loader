/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { NgHttpLoaderModule } from '../lib/ng-http-loader.module';

describe('NgHttpLoaderModule', () => {
    let ngHttpLoaderModule: NgHttpLoaderModule;

    beforeEach(() => {
        ngHttpLoaderModule = new NgHttpLoaderModule();
    });

    it('should create an instance', () => {
        expect(ngHttpLoaderModule).toBeTruthy();
    });
});
