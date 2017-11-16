/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PendingInterceptorService, PendingInterceptorServiceFactoryProvider } from './pending-interceptor.service';

const PendingInterceptorServiceExistingProvider = {
    provide: HTTP_INTERCEPTORS,
    useExisting: PendingInterceptorService,
    multi: true
};

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        PendingInterceptorServiceExistingProvider,
        PendingInterceptorServiceFactoryProvider,
    ],
})
export class NgHttpLoaderServicesModule {
}
