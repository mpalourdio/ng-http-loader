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
var SkWanderingCubesComponent = (function (_super) {
    __extends(SkWanderingCubesComponent, _super);
    function SkWanderingCubesComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkWanderingCubesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sk-wandering-cubes',
                    template: "<div class=\"sk-wandering-cubes\" [class.colored]=\"!backgroundColor\"><div class=\"sk-cube sk-cube1\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-cube sk-cube2\" [style.background-color]=\"backgroundColor\"></div></div>",
                    styles: [".sk-wandering-cubes{top:50%;margin:auto;width:40px;height:40px;position:relative}.sk-wandering-cubes .sk-cube{width:10px;height:10px;position:absolute;top:0;left:0;-webkit-animation:sk-wanderingCube 1.8s ease-in-out -1.8s infinite both;animation:sk-wanderingCube 1.8s ease-in-out -1.8s infinite both}.sk-wandering-cubes .sk-cube2{-webkit-animation-delay:-.9s;animation-delay:-.9s}@-webkit-keyframes sk-wanderingCube{0%{-webkit-transform:rotate(0);transform:rotate(0)}25%{-webkit-transform:translateX(30px) rotate(-90deg) scale(.5);transform:translateX(30px) rotate(-90deg) scale(.5)}50%{-webkit-transform:translateX(30px) translateY(30px) rotate(-179deg);transform:translateX(30px) translateY(30px) rotate(-179deg)}50.1%{-webkit-transform:translateX(30px) translateY(30px) rotate(-180deg);transform:translateX(30px) translateY(30px) rotate(-180deg)}75%{-webkit-transform:translateX(0) translateY(30px) rotate(-270deg) scale(.5);transform:translateX(0) translateY(30px) rotate(-270deg) scale(.5)}100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes sk-wanderingCube{0%{-webkit-transform:rotate(0);transform:rotate(0)}25%{-webkit-transform:translateX(30px) rotate(-90deg) scale(.5);transform:translateX(30px) rotate(-90deg) scale(.5)}50%{-webkit-transform:translateX(30px) translateY(30px) rotate(-179deg);transform:translateX(30px) translateY(30px) rotate(-179deg)}50.1%{-webkit-transform:translateX(30px) translateY(30px) rotate(-180deg);transform:translateX(30px) translateY(30px) rotate(-180deg)}75%{-webkit-transform:translateX(0) translateY(30px) rotate(-270deg) scale(.5);transform:translateX(0) translateY(30px) rotate(-270deg) scale(.5)}100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}"]
                },] },
    ];
    SkWanderingCubesComponent.ctorParameters = function () { return []; };
    return SkWanderingCubesComponent;
}(abstract_loader_component_1.AbstractLoader));
exports.SkWanderingCubesComponent = SkWanderingCubesComponent;
//# sourceMappingURL=sk-wandering-cubes.component.js.map