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
var SkSpinnerPulseComponent = (function (_super) {
    __extends(SkSpinnerPulseComponent, _super);
    function SkSpinnerPulseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkSpinnerPulseComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sk-spinner-pulse',
                    template: "<div class=\"sk-spinner sk-spinner-pulse colored-parent\" [style.background-color]=\"backgroundColor\"></div>",
                    styles: [".sk-spinner-pulse{position:relative;top:50%;width:40px;height:40px;margin:auto;border-radius:100%;-webkit-animation:sk-pulseScaleOut 1s infinite ease-in-out;animation:sk-pulseScaleOut 1s infinite ease-in-out}@-webkit-keyframes sk-pulseScaleOut{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}@keyframes sk-pulseScaleOut{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}"]
                },] },
    ];
    SkSpinnerPulseComponent.ctorParameters = function () { return []; };
    return SkSpinnerPulseComponent;
}(abstract_loader_component_1.AbstractLoader));
exports.SkSpinnerPulseComponent = SkSpinnerPulseComponent;
//# sourceMappingURL=sk-spinner-pulse.component.js.map