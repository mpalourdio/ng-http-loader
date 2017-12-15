"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var operators_1 = require("rxjs/operators");
require("rxjs/add/observable/throw");
var PendingInterceptorService = (function () {
    function PendingInterceptorService() {
        this._pendingRequests = 0;
        this._pendingRequestsStatus = new ReplaySubject_1.ReplaySubject(1);
        this._filteredUrlPatterns = [];
    }
    Object.defineProperty(PendingInterceptorService.prototype, "pendingRequestsStatus", {
        get: function () {
            return this._pendingRequestsStatus.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PendingInterceptorService.prototype, "pendingRequests", {
        get: function () {
            return this._pendingRequests;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PendingInterceptorService.prototype, "filteredUrlPatterns", {
        get: function () {
            return this._filteredUrlPatterns;
        },
        enumerable: true,
        configurable: true
    });
    PendingInterceptorService.prototype.shouldBypass = function (url) {
        return this._filteredUrlPatterns.some(function (e) {
            return e.test(url);
        });
    };
    PendingInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        var shouldBypass = this.shouldBypass(req.url);
        if (!shouldBypass) {
            this._pendingRequests++;
            if (1 === this._pendingRequests) {
                this._pendingRequestsStatus.next(true);
            }
        }
        return next.handle(req).pipe(operators_1.map(function (event) {
            return event;
        }), operators_1.catchError(function (error) {
            return Observable_1.Observable.throw(error);
        }), operators_1.finalize(function () {
            if (!shouldBypass) {
                _this._pendingRequests--;
                if (0 === _this._pendingRequests) {
                    _this._pendingRequestsStatus.next(false);
                }
            }
        }));
    };
    PendingInterceptorService.decorators = [
        { type: core_1.Injectable },
    ];
    PendingInterceptorService.ctorParameters = function () { return []; };
    return PendingInterceptorService;
}());
exports.PendingInterceptorService = PendingInterceptorService;
function PendingInterceptorServiceFactory() {
    return new PendingInterceptorService();
}
exports.PendingInterceptorServiceFactory = PendingInterceptorServiceFactory;
exports.PendingInterceptorServiceFactoryProvider = {
    provide: PendingInterceptorService,
    useFactory: PendingInterceptorServiceFactory
};
//# sourceMappingURL=pending-interceptor.service.js.map