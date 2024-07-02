import { MongoClient } from 'mongodb';
import { Joke } from '../interfaces/joke';

export class MongodbService {

    connect(mongoUrl: string) {
        return new MongoClient(mongoUrl)
    }

    async testConnection(mongoUrl: string) {
        try{
            const client = new MongoClient(mongoUrl)
            await client.connect()
        }catch(error: any){
            const errorResponse = {
                message: "Não foi possível se comunicar com o mongodb. Verifique a Url.",
                error: error.message
            };
            throw errorResponse
        }
    }

    async saveJson(joke_description: string) {
        console.log(joke_description)
        const client = new MongoClient(process.env.MONGO_URL!)
        console.log(process.env.MONGO_URL)
        const collection = client.db('chuck_db').collection('chuck_collection')
        const size = await collection.countDocuments();
        console.log(size)
        const joke: Joke = {descricao: joke_description, numero: size}
        const completionResp = await collection.insertOne(joke)
        return completionResp
    }

    async getRandomJoke() {
        const client = new MongoClient(process.env.MONGO_URL!)
        console.log(process.env.MONGO_URL)
        const collection = client.db('chuck_db').collection('chuck_collection')
        const size = await collection.countDocuments();
        console.log(size)
        const joke = await collection.findOne({numero: this.getRandomInt(0, size)})
        console.log(joke)
        return joke
    }

    async getAllJokes() {
        const client = new MongoClient(process.env.MONGO_URL!)
        const collection = client.db('chuck_db').collection('chuck_collection')
        const jokes = await collection.find({}).toArray()
        console.log(jokes)
        return jokes
    }

    getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
      }
}