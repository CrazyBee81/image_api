"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Express to run index and routes
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
// Start up an instance of app
var app = (0, express_1.default)();
// Setup a port for the server
var port = 3000;
app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
});
// GET route
app.use('/api', index_1.default);
exports.default = app;
