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
var SkThreeBounceComponent = (function (_super) {
    __extends(SkThreeBounceComponent, _super);
    function SkThreeBounceComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkThreeBounceComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sk-three-bounce',
                    template: "<div class=\"sk-three-bounce\" [class.colored]=\"!backgroundColor\"><div class=\"sk-child sk-bounce1\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-child sk-bounce2\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-child sk-bounce3\" [style.background-color]=\"backgroundColor\"></div></div>",
                    styles: [".sk-three-bounce{top:50%;position:relative;margin:auto;width:80px;text-align:center}.sk-three-bounce .sk-child{width:20px;height:20px;border-radius:100%;display:inline-block;-webkit-animation:sk-three-bounce 1.4s ease-in-out 0s infinite both;animation:sk-three-bounce 1.4s ease-in-out 0s infinite both}.sk-three-bounce .sk-bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s}.sk-three-bounce .sk-bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes sk-three-bounce{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes sk-three-bounce{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}"]
                },] },
    ];
    SkThreeBounceComponent.ctorParameters = function () { return []; };
    return SkThreeBounceComponent;
}(abstract_loader_component_1.AbstractLoader));
exports.SkThreeBounceComponent = SkThreeBounceComponent;
//# sourceMappingURL=sk-three-bounce.component.js.map