"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var user_1 = require("./routes/user");
var post_1 = require("./routes/post");
var folder_1 = require("./routes/folder");
dotenv_1["default"].config();
var port = process.env.PORT;
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use((0, cors_1["default"])());
app.use((0, helmet_1["default"])());
// listen for live routes
app.get('/', function (req, res) {
    return res.status(200).json({ message: 'Welcome To File Upload API!' });
});
app.use(user_1.router);
app.use(post_1.router);
app.use(folder_1.router);
// handle invalid or dead links
app.use('**', function (req, res) {
    return res.status(404).json({ message: 'Page Not Found!' });
});
// handle terminal errors
app.use(function (error, req, res, next) {
    console.log(error);
    return res.status(500).json({ error: error });
});
app.listen(port, function () {
    console.log("REST API server ready at: http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map