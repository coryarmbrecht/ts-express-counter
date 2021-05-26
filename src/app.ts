import express, { Application, Request, Response, NextFunction } from 'express';

const app: express.Application = express();
const greeting: string = 'Hello';
const numbers: number[] = [1, 2, 3, 4];

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send(greeting);
});

app.listen(5000, () => console.log('server running'));