"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._ = exports.when = exports.match = void 0;
/**
 * A constant that serves as the value for wildcard matching. This constant is
 * not exported, it serves as the only source of the wildcard value. Other
 * constants point to its value are exported. @see _
 */
var WILDCARD_VALUE = '__primitive__match__wildcard__value__';
/**
 * `match` is a higher order function that takes any number of values of any type
 * and returns a function that accepts any number of functions that have a
 * return type of {@link MatchResult}
 */
var match = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return function () {
        var _a;
        var whens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            whens[_i] = arguments[_i];
        }
        return (_a = whens
            .map(function (when) { return when(values); })
            .find(function (_a) {
            var matches = _a.matches, result = _a.result;
            return matches && result;
        })) === null || _a === void 0 ? void 0 : _a.result;
    };
};
exports.match = match;
/**
 * `when` is a higher order function that receives an array of the same length as
 * the values provided to the parent {@link match} function, and a result which
 * will be returned as the `result` in {@link PositiveMatch} in case of a
 * positive match.
 *
 * `when` performs the pattern matching using reference type and value equality. It
 * returns a negative match if the number of values given to its parent
 * {@link match} function is not the same as the number of patterns it is given,
 * or if any of the values do not match their corresponding pattern value.
 */
var when = function (pattern, result) { return function (values) {
    if (pattern.length != values.length)
        return { matches: false };
    for (var i = 0; i < pattern.length; ++i) {
        if (pattern[i] === WILDCARD_VALUE)
            continue;
        if (pattern[i] !== values[i])
            return { matches: false };
    }
    return { matches: true, result: result };
}; };
exports.when = when;
/**
 * The exported alias to {@link WILDCARD_VALUE}. It serves as the wild card
 * matching operator.
 */
var _ = WILDCARD_VALUE;
exports._ = _;
