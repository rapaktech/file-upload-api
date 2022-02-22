"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var user_1 = require("./../middleware/user");
var post_1 = require("./../controllers/post");
var router = express_1["default"].Router();
exports.router = router;
router.post('/api/v1/posts/upload', post_1.upload, (0, express_validator_1.body)('title').isAscii(), user_1.checkIfUser, post_1.createPost);
router.post('/api/v1/posts/download', (0, express_validator_1.body)('fileId').isAscii(), user_1.checkIfUser, post_1.getPost);
//# sourceMappingURL=post.js.map