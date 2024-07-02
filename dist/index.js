"use strict";var v=Object.create;var h=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var J=Object.getOwnPropertyNames;var b=Object.getPrototypeOf,q=Object.prototype.hasOwnProperty;var M=(n,e,o,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of J(e))!q.call(n,t)&&t!==o&&h(n,t,{get:()=>e[t],enumerable:!(s=f(e,t))||s.enumerable});return n};var _=(n,e,o)=>(o=n!=null?v(b(n)):{},M(e||!n||!n.__esModule?h(o,"default",{value:n,enumerable:!0}):o,n));var c=(n,e,o)=>new Promise((s,t)=>{var p=r=>{try{u(o.next(r))}catch(g){t(g)}},k=r=>{try{u(o.throw(r))}catch(g){t(g)}},u=r=>r.done?s(r.value):Promise.resolve(r.value).then(p,k);u((o=o.apply(n,e)).next())});var R=_(require("express")),w=require("http");var l=require("mongodb");var a=class{connect(e){return new l.MongoClient(e)}testConnection(e){return c(this,null,function*(){try{yield new l.MongoClient(e).connect()}catch(o){throw{message:"N\xE3o foi poss\xEDvel se comunicar com o mongodb. Verifique a Url.",error:o.message}}})}saveJson(e){return c(this,null,function*(){console.log(e);let o=new l.MongoClient(process.env.MONGO_URL);console.log(process.env.MONGO_URL);let s=o.db("chuck_db").collection("chuck_collection"),t=yield s.countDocuments();console.log(t);let p={descricao:e,numero:t};return yield s.insertOne(p)})}getRandomJoke(){return c(this,null,function*(){let e=new l.MongoClient(process.env.MONGO_URL);console.log(process.env.MONGO_URL);let o=e.db("chuck_db").collection("chuck_collection"),s=yield o.countDocuments();console.log(s);let t=yield o.findOne({numero:this.getRandomInt(0,s)});return console.log(t),t})}getAllJokes(){return c(this,null,function*(){let s=yield new l.MongoClient(process.env.MONGO_URL).db("chuck_db").collection("chuck_collection").find({}).toArray();return console.log(s),s})}getRandomInt(e,o){let s=Math.ceil(e),t=Math.floor(o);return Math.floor(Math.random()*(t-s)+s)}};var m=class{constructor(){this.mongodbService=new a}saveJoke(e,o){return c(this,null,function*(){yield this.mongodbService.saveJson(e.body.joke_description),o.status(200).send()})}getJoke(e,o){return c(this,null,function*(){let s=yield this.mongodbService.getRandomJoke();o.status(200).send(s)})}getAllJokes(e,o){return c(this,null,function*(){let s=yield this.mongodbService.getAllJokes();o.status(200).send(s)})}};var E=require("dotenv/config"),i=(0,R.default)();i.use(function(n,e,o){e.header("Access-Control-Allow-Origin","*"),e.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),e.header("Access-Control-Allow-Methods","GET, POST, OPTIONS, PUT, DELETE"),o()});var d=new m,y=(0,w.createServer)(i),O=8080;i.use(R.default.json());y.listen(O,()=>{console.log(`Server is running on port ${O}`),console.log(process.env.MONGO_URL)});i.get("/joke",(n,e)=>{d.getJoke(n,e)});i.get("/jokes",(n,e)=>{d.getAllJokes(n,e)});i.post("/joke",(n,e)=>{console.log(process.env.MONGO_URL),d.saveJoke(n,e)});