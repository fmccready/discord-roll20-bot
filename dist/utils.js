"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// async/await error catcher
exports.catchAsyncErrors = function (fn) { return (function (req, res, next) {
    var routePromise = fn(req, res, next);
    if (routePromise.catch) {
        routePromise.catch(function (err) { return next(err); });
    }
}); };
//# sourceMappingURL=utils.js.map