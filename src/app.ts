import { count } from 'console';
import express, { Application, Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const app: express.Application = express();
const greeting: string = 'Hello';
const numbers: number[] = [1, 2, 3, 4];
let tempViewCount: number = 1;

const getAndIncrementTempViewCount = (req: Request, res: Response, next: NextFunction) => {
    tempViewCount++
    console.log(`Visits ${tempViewCount} ${req.method} ${req.path}`);
    next();
}
//app.use(getAndIncrementTempViewCount);

const getAndIncrementViewCount = (req: Request, res: Response, next: NextFunction) => {
    /*console.log(`path = ${req.path}, baseUrl = ${req.baseUrl}, originalUrl = ${req.originalUrl}`)*/

    if (req.path == '/') {
        console.log('/ hit.')

        // Read the counter JSON file
        let counterJSON = JSON.parse(fs.readFileSync('./counter.json', 'utf-8'));
        console.log('counterJSON = ', counterJSON)

        // Set an oldVisits var
        let oldVisits: number = counterJSON.visits;

        // Increment visits number by one, and set to the originally read JSON file contents
        const newVisits: number = oldVisits + 1;
        counterJSON.visits = newVisits;

        // Write the newly updated contents to JSON file
        fs.writeFileSync('./counter.json', JSON.stringify(counterJSON));
        console.log('New visit count written. It should be :', newVisits)
    }

    next();
}
app.use(getAndIncrementViewCount);
app.use(express.static('build'))

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send(greeting);
});

app.listen(5000, () => console.log('server running'));