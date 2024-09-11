/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgHttpLoaderComponent } from './components/ng-http-loader.component';
import { PendingRequestsInterceptorProvider } from './services/pending-requests-interceptor.service';
import { SPINKIT_COMPONENTS } from './spinkits';

/**
 * @deprecated Will be removed in the next release, standalone component will become the default.
 */
@NgModule({
    imports: [
        CommonModule,
        NgHttpLoaderComponent,
        ...SPINKIT_COMPONENTS,
    ],
    exports: [
        NgHttpLoaderComponent,
        ...SPINKIT_COMPONENTS,
    ]
})
export class NgHttpLoaderModule {
    /**
     * @deprecated Will be removed in the next release, standalone component will become the default.
     */
    static forRoot(): ModuleWithProviders<NgHttpLoaderModule> {
        return {
            ngModule: NgHttpLoaderModule,
            providers: [
                PendingRequestsInterceptorProvider,
            ]
        };
    }
}
