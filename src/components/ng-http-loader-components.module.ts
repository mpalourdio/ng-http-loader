import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './spinner/spinner.component';
import { SPINKIT_COMPONENTS } from '../spinkits';

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
