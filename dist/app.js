"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var greeting = 'Hello';
var numbers = [1, 2, 3, 4];
var tempViewCount = 1;
var getAndIncrementViewCount = function (req, res, next) {
    tempViewCount++;
    console.log("Visits = " + tempViewCount + ", " + req.method + " " + req.path);
    next();
};
app.use(getAndIncrementViewCount);
app.get('/', function (req, res, next) {
    res.send(greeting);
});
app.listen(5000, function () { return console.log('server running'); });
