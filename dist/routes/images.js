"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Express to run index and routes
var express_1 = __importDefault(require("express"));
var path = __importStar(require("path"));
var imageTransformer_1 = require("../utilities/imageTransformer");
var fileChecker_1 = require("../utilities/fileChecker");
// Setup the router
var images = express_1.default.Router();
// Get rout for image url
images.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var height, width, filename, fileDirectory, inputFile, outputFile, inputExists, outputExists, transformed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                height = parseInt(req.query.height) || null;
                width = parseInt(req.query.width) || null;
                filename = req.query.filename;
                fileDirectory = path.join(process.cwd(), "/images/");
                inputFile = "".concat(filename, ".jpg");
                outputFile = "".concat(filename, "_").concat(width, "_").concat(height, ".jpg");
                return [4 /*yield*/, (0, fileChecker_1.checkFileExists)(fileDirectory, inputFile)];
            case 1:
                inputExists = _a.sent();
                return [4 /*yield*/, (0, fileChecker_1.checkFileExists)(fileDirectory, outputFile)];
            case 2:
                outputExists = _a.sent();
                if (!inputExists) return [3 /*break*/, 8];
                if (!(width === null || height === null)) return [3 /*break*/, 3];
                res
                    .status(400)
                    .send('400 - Bad Request. Please set query parameters for width and height');
                return [3 /*break*/, 7];
            case 3:
                if (!(width < 0 || height < 0)) return [3 /*break*/, 4];
                res
                    .status(400)
                    .send('400 - Bad Request. Parameters for width and height must be positive');
                return [3 /*break*/, 7];
            case 4:
                if (!outputExists) return [3 /*break*/, 5];
                console.log('served file from cache');
                res
                    .status(200)
                    .set('Cache-Control', 'public, max-age=900000')
                    .cookie('cookie_name', "friends", { maxAge: 900000 })
                    .sendFile(outputFile, { root: fileDirectory }, function (err) {
                    res.status(500);
                    res.end();
                    if (err)
                        throw err;
                });
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, (0, imageTransformer_1.transformeImage)(height, width, fileDirectory, inputFile, outputFile)];
            case 6:
                transformed = _a.sent();
                if (transformed) {
                    console.log('new file created');
                    res
                        .status(200)
                        .set('Cache-Control', 'public, max-age=900000')
                        .cookie('cookie_name', "friends", { maxAge: 900000 })
                        .sendFile(outputFile, { root: fileDirectory }, function (err) {
                        res.status(500);
                        res.end();
                        if (err)
                            throw err;
                    });
                }
                else {
                    res.status(500).send('500 - Internal Server Error');
                }
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                res.status(400).send('400 - Bad Request. File not found, check filename');
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); });
exports.default = images;
