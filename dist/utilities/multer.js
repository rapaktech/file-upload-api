"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.uploadFile = void 0;
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var s3_1 = require("./s3");
var uploadFile = (0, multer_1["default"])({
    storage: (0, multer_s3_1["default"])({
        s3: s3_1.s3Instance,
        bucket: s3_1.bucket,
        acl: "public-read",
        contentType: multer_s3_1["default"].AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});
exports.uploadFile = uploadFile;
//# sourceMappingURL=multer.js.map