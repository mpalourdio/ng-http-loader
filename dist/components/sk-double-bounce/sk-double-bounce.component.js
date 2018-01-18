"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var abstract_loader_component_1 = require("../abstract.loader.component");
var SkDoubleBounceComponent = (function (_super) {
    __extends(SkDoubleBounceComponent, _super);
    function SkDoubleBounceComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkDoubleBounceComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sk-double-bounce',
                    template: "<div class=\"sk-double-bounce\" [class.colored]=\"!backgroundColor\"><div class=\"double-bounce1\" [style.background-color]=\"backgroundColor\"></div><div class=\"double-bounce2\" [style.background-color]=\"backgroundColor\"></div></div>",
                    styles: [".sk-double-bounce{top:50%;width:40px;height:40px;position:relative;margin:auto}.double-bounce1,.double-bounce2{width:100%;height:100%;border-radius:50%;opacity:.6;position:absolute;top:0;left:0;-webkit-animation:sk-bounce 2s infinite ease-in-out;animation:sk-bounce 2s infinite ease-in-out}.double-bounce2{-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes sk-bounce{0%,100%{-webkit-transform:scale(0)}50%{-webkit-transform:scale(1)}}@keyframes sk-bounce{0%,100%{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}"]
                },] },
    ];
    SkDoubleBounceComponent.ctorParameters = function () { return []; };
    return SkDoubleBounceComponent;
}(abstract_loader_component_1.AbstractLoader));
exports.SkDoubleBounceComponent = SkDoubleBounceComponent;
//# sourceMappingURL=sk-double-bounce.component.js.map