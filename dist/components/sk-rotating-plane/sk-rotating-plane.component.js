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
var SkRotatingPlaneComponent = (function (_super) {
    __extends(SkRotatingPlaneComponent, _super);
    function SkRotatingPlaneComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SkRotatingPlaneComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'sk-rotating-plane',
                    template: "<div class=\"sk-rotating-plane colored-parent\" [style.background-color]=\"backgroundColor\"></div>",
                    styles: [".sk-rotating-plane{position:relative;top:50%;width:40px;height:40px;margin:auto;-webkit-animation:sk-rotateplane 1.2s infinite ease-in-out;animation:sk-rotateplane 1.2s infinite ease-in-out}@-webkit-keyframes sk-rotateplane{0%{-webkit-transform:perspective(120px)}50%{-webkit-transform:perspective(120px) rotateY(180deg)}100%{-webkit-transform:perspective(120px) rotateY(180deg) rotateX(180deg)}}@keyframes sk-rotateplane{0%{transform:perspective(120px) rotateX(0) rotateY(0);-webkit-transform:perspective(120px) rotateX(0) rotateY(0)}50%{transform:perspective(120px) rotateX(-180.1deg) rotateY(0);-webkit-transform:perspective(120px) rotateX(-180.1deg) rotateY(0)}100%{transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg);-webkit-transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}"]
                },] },
    ];
    SkRotatingPlaneComponent.ctorParameters = function () { return []; };
    return SkRotatingPlaneComponent;
}(abstract_loader_component_1.AbstractLoader));
exports.SkRotatingPlaneComponent = SkRotatingPlaneComponent;
//# sourceMappingURL=sk-rotating-plane.component.js.map