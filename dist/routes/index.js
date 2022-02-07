"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Express to run index and routes
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("./images"));
// Setup the router
var routes = express_1.default.Router();
// Get main route
routes.get('/', function (req, res) {
    res.send('main route');
});
routes.use('/images', images_1.default);
exports.default = routes;
