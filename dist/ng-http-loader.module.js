"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var ng_http_loader_components_module_1 = require("./components/ng-http-loader-components.module");
var ng_http_loader_services_module_1 = require("./services/ng-http-loader-services.module");
var NgHttpLoaderModule = (function () {
    function NgHttpLoaderModule() {
    }
    NgHttpLoaderModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        ng_http_loader_components_module_1.NgHttpLoaderComponentsModule,
                        ng_http_loader_services_module_1.NgHttpLoaderServicesModule,
                    ],
                    exports: [
                        ng_http_loader_components_module_1.NgHttpLoaderComponentsModule,
                        ng_http_loader_services_module_1.NgHttpLoaderServicesModule,
                    ],
                },] },
    ];
    NgHttpLoaderModule.ctorParameters = function () { return []; };
    return NgHttpLoaderModule;
}());
exports.NgHttpLoaderModule = NgHttpLoaderModule;
//# sourceMappingURL=ng-http-loader.module.js.map