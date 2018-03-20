/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpinnerVisibilityService {
    private _visibilitySubject: Subject<boolean> = new Subject<boolean>();

    get visibilitySubject(): Subject<boolean> {
        return this._visibilitySubject;
    }
}

export function SpinnerVisibilityServiceFactory(): SpinnerVisibilityService {
    return new SpinnerVisibilityService();
}

export let SpinnerVisibilityServiceFactoryProvider = {
    provide: SpinnerVisibilityService,
    useFactory: SpinnerVisibilityServiceFactory
};
