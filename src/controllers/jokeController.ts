import { Joke } from '../interfaces/joke';
import { MongodbService } from '../services/mongodbService';
import { Request, Response } from 'express';
export class JokeController {
    
    mongodbService = new MongodbService();
    
    async saveJoke(req: Request, res: Response){
       await this.mongodbService.saveJson(req.body.joke_description)
        res.status(200).send()
    }

    async getJoke(req: Request, res: Response){
        const joke = await this.mongodbService.getRandomJoke()
        res.status(200).send(joke)
    }

    async getAllJokes(req: Request, res: Response){
        const jokes = await this.mongodbService.getAllJokes()
        res.status(200).send(jokes)
    }
}