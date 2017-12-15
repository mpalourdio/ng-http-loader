"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var spinner_component_1 = require("./spinner/spinner.component");
var spinkits_1 = require("../spinkits");
var NgHttpLoaderComponentsModule = (function () {
    function NgHttpLoaderComponentsModule() {
    }
    NgHttpLoaderComponentsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [
                        spinner_component_1.SpinnerComponent,
                        spinkits_1.SPINKIT_COMPONENTS,
                    ],
                    imports: [
                        common_1.CommonModule,
                        http_1.HttpClientModule,
                    ],
                    exports: [
                        spinner_component_1.SpinnerComponent,
                        spinkits_1.SPINKIT_COMPONENTS,
                    ],
                },] },
    ];
    NgHttpLoaderComponentsModule.ctorParameters = function () { return []; };
    return NgHttpLoaderComponentsModule;
}());
exports.NgHttpLoaderComponentsModule = NgHttpLoaderComponentsModule;
//# sourceMappingURL=ng-http-loader-components.module.js.map