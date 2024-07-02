import express, { Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import { JokeController } from './controllers/jokeController';
import 'dotenv/config'


const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

const jokeController = new JokeController()

const server = createServer(app);
const port = 8080;

app.use(express.json())

server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
    console.log(process.env.MONGO_URL)
});

app.get("/joke", (req: Request, res: Response) => {
    jokeController.getJoke(req, res);
});

app.get("/jokes", (req: Request, res: Response) => {
    jokeController.getAllJokes(req, res);
});

app.post("/joke", (req: Request, res: Response) => {
    console.log(process.env.MONGO_URL);
    jokeController.saveJoke(req, res);
});