"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var user_1 = require("./../middleware/user");
var folder_1 = require("./../controllers/folder");
var router = express_1["default"].Router();
exports.router = router;
router.post('/api/v1/folders/create', (0, express_validator_1.body)('name').isAscii(), user_1.checkIfUser, folder_1.createFolder);
//# sourceMappingURL=folder.js.map