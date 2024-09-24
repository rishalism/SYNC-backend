"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBlocked = exports.accessLevel = void 0;
var accessLevel;
(function (accessLevel) {
    accessLevel[accessLevel["restrict"] = 1] = "restrict";
    accessLevel[accessLevel["allow"] = 2] = "allow";
})(accessLevel || (exports.accessLevel = accessLevel = {}));
var isBlocked;
(function (isBlocked) {
    isBlocked[isBlocked["not_bloked"] = 0] = "not_bloked";
    isBlocked[isBlocked["is_bloked"] = 1] = "is_bloked";
})(isBlocked || (exports.isBlocked = isBlocked = {}));
