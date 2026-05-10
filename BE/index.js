import express from "express";
// import {PORT,mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()
const PORT=process.env.PORT || 5555
const mongoDBURI = process.env.MONGO_URI;
const app=express();

app.use(express.json())
app.use(cors(
    // {origin: 'http://localhost:3000',
    // methods: ['GET','POST','PUT','DELETE'],
    // allowedHeaders: ['Content-Type']}
))

app.get('/',(req,res)=>{
    console.log(req);
    return res.status(234).send("Welcome to MERN Stack");
})
app.use('/books',booksRoute)

mongoose
.connect(mongoDBURI)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
       console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log("Error connecting to MongoDB:",error);
})