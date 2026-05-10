import express from "express";
import path from 'path';
// import {PORT,mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()
const __dirname=path.resolve()
const PORT=process.env.PORT || 5555
const mongoDBURI = process.env.MONGO_URI;
const app=express();

if(process.env.NODE_ENV !=="production"){
    app.use(
        cors({
        origin:"http://localhost:5173",
        })
)
}

app.use(express.json())
app.use('/books',booksRoute)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../FE/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../FE","dist","index.html"));
    });  
}

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