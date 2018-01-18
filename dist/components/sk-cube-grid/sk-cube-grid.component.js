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
var SkCubeGridComponent = (function (_super) {
    __extends(SkCubeGridComponent, _super);
    function SkCubeGridComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkCubeGridComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sk-cube-grid',
                    template: "<div class=\"sk-cube-grid\" [class.colored]=\"!backgroundColor\"><div class=\"sk-cube sk-cube1\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-cube sk-cube2\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-cube sk-cube3\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-cube sk-cube4\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-cube sk-cube5\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-cube sk-cube6\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-cube sk-cube7\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-cube sk-cube8\" [style.background-color]=\"backgroundColor\"></div><div class=\"sk-cube sk-cube9\" [style.background-color]=\"backgroundColor\"></div></div>",
                    styles: [".sk-cube-grid{position:relative;top:50%;width:40px;height:40px;margin:auto}.sk-cube-grid .sk-cube{width:33%;height:33%;float:left;-webkit-animation:sk-cubeGridScaleDelay 1.3s infinite ease-in-out;animation:sk-cubeGridScaleDelay 1.3s infinite ease-in-out}.sk-cube-grid .sk-cube1{-webkit-animation-delay:.2s;animation-delay:.2s}.sk-cube-grid .sk-cube2{-webkit-animation-delay:.3s;animation-delay:.3s}.sk-cube-grid .sk-cube3{-webkit-animation-delay:.4s;animation-delay:.4s}.sk-cube-grid .sk-cube4{-webkit-animation-delay:.1s;animation-delay:.1s}.sk-cube-grid .sk-cube5{-webkit-animation-delay:.2s;animation-delay:.2s}.sk-cube-grid .sk-cube6{-webkit-animation-delay:.3s;animation-delay:.3s}.sk-cube-grid .sk-cube7{-webkit-animation-delay:0s;animation-delay:0s}.sk-cube-grid .sk-cube8{-webkit-animation-delay:.1s;animation-delay:.1s}.sk-cube-grid .sk-cube9{-webkit-animation-delay:.2s;animation-delay:.2s}@-webkit-keyframes sk-cubeGridScaleDelay{0%,100%,70%{-webkit-transform:scale3D(1,1,1);transform:scale3D(1,1,1)}35%{-webkit-transform:scale3D(0,0,1);transform:scale3D(0,0,1)}}@keyframes sk-cubeGridScaleDelay{0%,100%,70%{-webkit-transform:scale3D(1,1,1);transform:scale3D(1,1,1)}35%{-webkit-transform:scale3D(0,0,1);transform:scale3D(0,0,1)}}"]
                },] },
    ];
    SkCubeGridComponent.ctorParameters = function () { return []; };
    return SkCubeGridComponent;
}(abstract_loader_component_1.AbstractLoader));
exports.SkCubeGridComponent = SkCubeGridComponent;
//# sourceMappingURL=sk-cube-grid.component.js.map