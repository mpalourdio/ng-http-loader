"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var spinkits_1 = require("../../spinkits");
var pending_interceptor_service_1 = require("../../services/pending-interceptor.service");
var timer_1 = require("rxjs/observable/timer");
var operators_1 = require("rxjs/operators");
var SpinnerComponent = (function () {
    function SpinnerComponent(pendingRequestInterceptorService) {
        var _this = this;
        this.pendingRequestInterceptorService = pendingRequestInterceptorService;
        this.Spinkit = spinkits_1.Spinkit;
        this.spinner = spinkits_1.Spinkit.skCubeGrid;
        this.filteredUrlPatterns = [];
        this.debounceDelay = 0;
        this.subscription = this.pendingRequestInterceptorService
            .pendingRequestsStatus
            .pipe(operators_1.debounce(this.handleDebounce.bind(this)))
            .subscribe(function (hasPendingRequests) {
            _this.isSpinnerVisible = hasPendingRequests;
        });
    }
    SpinnerComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!(this.filteredUrlPatterns instanceof Array)) {
            throw new TypeError('`filteredUrlPatterns` must be an array.');
        }
        if (!!this.filteredUrlPatterns.length) {
            this.filteredUrlPatterns.forEach(function (e) {
                _this.pendingRequestInterceptorService.filteredUrlPatterns.push(new RegExp(e));
            });
        }
    };
    SpinnerComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    SpinnerComponent.prototype.handleDebounce = function (hasPendingRequests) {
        if (hasPendingRequests) {
            return timer_1.timer(this.debounceDelay);
        }
        return timer_1.timer(0);
    };
    SpinnerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'spinner',
                    template: "<div id=\"spinner\" *ngIf=\"isSpinnerVisible\"><sk-cube-grid *ngIf=\"spinner === Spinkit.skCubeGrid\" [backgroundColor]=\"backgroundColor\"></sk-cube-grid><sk-chasing-dots *ngIf=\"spinner === Spinkit.skChasingDots\" [backgroundColor]=\"backgroundColor\"></sk-chasing-dots><sk-double-bounce *ngIf=\"spinner === Spinkit.skDoubleBounce\" [backgroundColor]=\"backgroundColor\"></sk-double-bounce><sk-rotating-plane *ngIf=\"spinner === Spinkit.skRotatingPlane\" [backgroundColor]=\"backgroundColor\"></sk-rotating-plane><sk-spinner-pulse *ngIf=\"spinner === Spinkit.skSpinnerPulse\" [backgroundColor]=\"backgroundColor\"></sk-spinner-pulse><sk-three-bounce *ngIf=\"spinner === Spinkit.skThreeBounce\" [backgroundColor]=\"backgroundColor\"></sk-three-bounce><sk-wandering-cubes *ngIf=\"spinner === Spinkit.skWanderingCubes\" [backgroundColor]=\"backgroundColor\"></sk-wandering-cubes><sk-wave *ngIf=\"spinner === Spinkit.skWave\" [backgroundColor]=\"backgroundColor\"></sk-wave></div>",
                    styles: ["#spinner{top:0;left:0;height:100%;width:100%;position:fixed;z-index:9999;opacity:.7;background-color:#f1f1f1;display:flex;align-items:center;justify-content:center}::ng-deep .colored-parent,::ng-deep .colored>div{background-color:#333}"]
                },] },
    ];
    SpinnerComponent.ctorParameters = function () { return [
        { type: pending_interceptor_service_1.PendingInterceptorService, },
    ]; };
    SpinnerComponent.propDecorators = {
        "backgroundColor": [{ type: core_1.Input },],
        "spinner": [{ type: core_1.Input },],
        "filteredUrlPatterns": [{ type: core_1.Input },],
        "debounceDelay": [{ type: core_1.Input },],
    };
    return SpinnerComponent;
}());
exports.SpinnerComponent = SpinnerComponent;
//# sourceMappingURL=spinner.component.js.map