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
var SkWaveComponent = (function (_super) {
    __extends(SkWaveComponent, _super);
    function SkWaveComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkWaveComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sk-wave',
                    template: "<div class=\"sk-wave\" [class.colored]=\"!backgroundColor\"><div class=\"sk-rect sk-rect1\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-rect sk-rect2\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-rect sk-rect3\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-rect sk-rect4\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-rect sk-rect5\" [style.background-color]=\"backgroundColor\"></div></div>",
                    styles: [".sk-wave{position:relative;top:50%;margin:auto;width:50px;height:40px;text-align:center;font-size:10px}.sk-wave .sk-rect{height:100%;width:6px;display:inline-block;-webkit-animation:sk-waveStretchDelay 1.2s infinite ease-in-out;animation:sk-waveStretchDelay 1.2s infinite ease-in-out}.sk-wave .sk-rect1{-webkit-animation-delay:-1.2s;animation-delay:-1.2s}.sk-wave .sk-rect2{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-wave .sk-rect3{-webkit-animation-delay:-1s;animation-delay:-1s}.sk-wave .sk-rect5{-webkit-animation-delay:-.8s;animation-delay:-.8s}.sk-wave .sk-rect4{-webkit-animation-delay:-.9s;animation-delay:-.9s}@-webkit-keyframes sk-waveStretchDelay{0%,100%,40%{-webkit-transform:scaleY(.4);transform:scaleY(.4)}20%{-webkit-transform:scaleY(1);transform:scaleY(1)}}@keyframes sk-waveStretchDelay{0%,100%,40%{-webkit-transform:scaleY(.4);transform:scaleY(.4)}20%{-webkit-transform:scaleY(1);transform:scaleY(1)}}"]
                },] },
    ];
    SkWaveComponent.ctorParameters = function () { return []; };
    return SkWaveComponent;
}(abstract_loader_component_1.AbstractLoader));
exports.SkWaveComponent = SkWaveComponent;
//# sourceMappingURL=sk-wave.component.js.map