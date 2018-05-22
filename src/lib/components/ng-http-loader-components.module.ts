/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SPINKIT_COMPONENTS } from '../spinkits';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [
        SpinnerComponent,
        SPINKIT_COMPONENTS,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    exports: [
        SpinnerComponent,
        SPINKIT_COMPONENTS,
    ],
})
export class NgHttpLoaderComponentsModule {
}
