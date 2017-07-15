/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { HttpInterceptorServiceFactoryProvider } from './http-interceptor.service';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { PendingInterceptorService, PendingInterceptorServiceFactoryProvider } from './pending-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

const PendingInterceptorServiceExistingProvider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: PendingInterceptorService,
    multi: true
};

@NgModule({
    declarations: [
        SpinnerComponent,
    ],
    imports: [
        CommonModule,
        HttpModule,
        HttpClientModule
    ],
    exports: [
        SpinnerComponent,
    ],
    providers: [
        HttpInterceptorServiceFactoryProvider,
        PendingInterceptorServiceExistingProvider,
        PendingInterceptorServiceFactoryProvider
    ]
})
export class NgHttpLoaderModule {
}
