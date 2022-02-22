"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.decodeToken = exports.signToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtSecretKey = String(process.env.JWT_SECRET_KEY);
var signToken = function (payload) {
    try {
        var token = jsonwebtoken_1["default"].sign(payload, jwtSecretKey);
        return token;
    }
    catch (error) {
        return false;
    }
};
exports.signToken = signToken;
var decodeToken = function (token) {
    try {
        var decodedToken = jsonwebtoken_1["default"].verify(token, jwtSecretKey);
        return decodedToken;
    }
    catch (error) {
        return false;
    }
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.js.map