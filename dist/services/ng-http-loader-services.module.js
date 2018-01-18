"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var pending_interceptor_service_1 = require("./pending-interceptor.service");
var PendingInterceptorServiceExistingProvider = {
    provide: http_1.HTTP_INTERCEPTORS,
    useExisting: pending_interceptor_service_1.PendingInterceptorService,
    multi: true
};
var NgHttpLoaderServicesModule = (function () {
    function NgHttpLoaderServicesModule() {
    }
    NgHttpLoaderServicesModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    providers: [
                        PendingInterceptorServiceExistingProvider,
                        pending_interceptor_service_1.PendingInterceptorServiceFactoryProvider,
                    ],
                },] },
    ];
    NgHttpLoaderServicesModule.ctorParameters = function () { return []; };
    return NgHttpLoaderServicesModule;
}());
exports.NgHttpLoaderServicesModule = NgHttpLoaderServicesModule;
//# sourceMappingURL=ng-http-loader-services.module.js.map