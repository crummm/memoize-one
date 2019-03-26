"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shallowEqual = function (newValue, oldValue) {
    return newValue === oldValue;
};
var simpleIsEqual = function (newArgs, lastArgs) {
    return newArgs.length === lastArgs.length &&
        newArgs.every(function (newArg, index) {
            return shallowEqual(newArg, lastArgs[index]);
        });
};
// decorator overload without params
function memoizeOne(target, propertyKey, descriptor) {
    console.log('ling');
    // if decorator with parenthesis (e.g. @memoizeOne(), memoizeOne(simpleIsEqual))
    if (propertyKey === undefined && descriptor === undefined) {
        var isEqual_1 = target;
        return function (target2, propertyKey2, descriptor2) {
            // wrap in memoize function
            descriptor2.value = memoizeOneFn(descriptor2.value, isEqual_1);
            return descriptor2;
        };
    }
    // wrap in memoize function
    descriptor.value = memoizeOneFn(descriptor.value);
    // decorator without parenthesis (e.g. @memoizeOne)
    return descriptor;
}
exports.memoizeOne = memoizeOne;
// <ResultFn: (...Array<any>) => mixed>
// The purpose of this typing is to ensure that the returned memoized
// function has the same type as the provided function (`resultFn`).
// ResultFn:        Generic type (which is the same as the resultFn).
// (...Array<any>): Accepts any length of arguments - and they are not checked
// mixed:           The result can be anything but needs to be checked before usage
function memoizeOneFn(resultFn, isEqual) {
    isEqual = isEqual || simpleIsEqual;
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    // breaking cache when context (this) or arguments change
    var result = function () {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        // Throwing during an assignment aborts the assignment: https://codepen.io/alexreardon/pen/RYKoaz
        // Doing the lastResult assignment first so that if it throws
        // nothing will be overwritten
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    };
    return result;
}
exports.memoizeOneFn = memoizeOneFn;
