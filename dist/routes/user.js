"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var user_1 = require("./../controllers/user");
var router = express_1["default"].Router();
exports.router = router;
router.post('/api/v1/users/create', (0, express_validator_1.body)('fullName').isLength({ min: 5 }), (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isStrongPassword(), user_1.createUser);
router.post('/api/v1/users/login', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isStrongPassword(), user_1.loginUser);
//# sourceMappingURL=user.js.map