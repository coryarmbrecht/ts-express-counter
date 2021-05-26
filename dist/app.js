"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var app = express_1.default();
var greeting = 'Hello';
var numbers = [1, 2, 3, 4];
var tempViewCount = 1;
var getAndIncrementTempViewCount = function (req, res, next) {
    tempViewCount++;
    console.log("Visits " + tempViewCount + " " + req.method + " " + req.path);
    next();
};
//app.use(getAndIncrementTempViewCount);
var getAndIncrementViewCount = function (req, res, next) {
    var visitsCount = 1;
    //let counterJSON: any = fs.readFileSync('../counter.json').toJSON()
    //console.log(counterJSON);
    //visitsCount = counterJSON.visits;
    //console.log(`path = ${req.path}, baseUrl = ${req.baseUrl}, originalUrl = ${req.originalUrl}`)
    if (req.path == '/') {
        console.log('/ hit.');
        // Read the counter JSON file
        var counterJSON = JSON.parse(fs_1.default.readFileSync('./counter.json', 'utf-8'));
        console.log('counterJSON = ', counterJSON);
        // Set an oldVisits var
        var oldVisits = counterJSON.visits;
        // Increment visits number by one, and set to the originally read JSON file contents
        var newVisits = oldVisits + 1;
        counterJSON.visits = newVisits;
        // Write the newly updated contents to JSON file
        fs_1.default.writeFileSync('./counter.json', JSON.stringify(counterJSON));
        console.log('New visit count written. It should be :', newVisits);
    }
    next();
};
app.use(getAndIncrementViewCount);
app.use(express_1.default.static('build'));
app.get('/', function (req, res, next) {
    res.send(greeting);
});
app.listen(5000, function () { return console.log('server running'); });
