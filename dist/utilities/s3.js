"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.bucket = exports.s3Instance = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var s3Instance = new aws_sdk_1["default"].S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
}), bucket = String(process.env.S3_BUCKET);
exports.s3Instance = s3Instance;
exports.bucket = bucket;
//# sourceMappingURL=s3.js.map