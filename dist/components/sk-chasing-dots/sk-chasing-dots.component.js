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
var SkChasingDotsComponent = (function (_super) {
    __extends(SkChasingDotsComponent, _super);
    function SkChasingDotsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkChasingDotsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sk-chasing-dots',
                    template: "<div class=\"sk-chasing-dots\" [class.colored]=\"!backgroundColor\"><div class=\"sk-child sk-dot1\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-child sk-dot2\" [style.background-color]=\"backgroundColor\"></div></div>",
                    styles: [".sk-chasing-dots{top:50%;margin:auto;width:40px;height:40px;position:relative;text-align:center;-webkit-animation:sk-chasingDotsRotate 2s infinite linear;animation:sk-chasingDotsRotate 2s infinite linear}.sk-chasing-dots .sk-child{width:60%;height:60%;display:inline-block;position:absolute;top:0;border-radius:100%;-webkit-animation:sk-chasingDotsBounce 2s infinite ease-in-out;animation:sk-chasingDotsBounce 2s infinite ease-in-out}.sk-chasing-dots .sk-dot2{top:auto;bottom:0;-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes sk-chasingDotsRotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes sk-chasingDotsRotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes sk-chasingDotsBounce{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes sk-chasingDotsBounce{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}"]
                },] },
    ];
    SkChasingDotsComponent.ctorParameters = function () { return []; };
    return SkChasingDotsComponent;
}(abstract_loader_component_1.AbstractLoader));
exports.SkChasingDotsComponent = SkChasingDotsComponent;
//# sourceMappingURL=sk-chasing-dots.component.js.map