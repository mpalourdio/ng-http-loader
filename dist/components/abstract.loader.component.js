"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AbstractLoader = (function () {
    function AbstractLoader(pendingInterceptorService) {
        this.pendingInterceptorService = pendingInterceptorService;
    }
    Object.defineProperty(AbstractLoader.prototype, "excludeHeaders", {
        set: function (header) {
            this.pendingInterceptorService.filteredHeader = header;
        },
        enumerable: true,
        configurable: true
    });
    AbstractLoader.propDecorators = {
        "backgroundColor": [{ type: core_1.Input },],
        "excludeHeaders": [{ type: core_1.Input },],
    };
    return AbstractLoader;
}());
exports.AbstractLoader = AbstractLoader;
//# sourceMappingURL=abstract.loader.component.js.map