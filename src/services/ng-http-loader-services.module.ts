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
