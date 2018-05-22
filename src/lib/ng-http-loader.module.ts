/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgHttpLoaderComponentsModule } from './components/ng-http-loader-components.module';
import { NgHttpLoaderServicesModule } from './services/ng-http-loader-services.module';

@NgModule({
    imports: [
        CommonModule,
        NgHttpLoaderComponentsModule,
        NgHttpLoaderServicesModule,
    ],
    exports: [
        NgHttpLoaderComponentsModule,
        NgHttpLoaderServicesModule,
    ],
})
export class NgHttpLoaderModule {
}
