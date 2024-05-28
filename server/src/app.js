import express from "express";
import mongoose from "mongoose";
import apiRoute, { apiProtected } from "./routes/api.js";
import { DB_CONNECT } from "./utils/constant.js";
import AuthMiddleware from "./middlewares/authMiddleware.js";
import cors from "cors";

const  app = express();
const PORT = 8000;

// Db connection 
mongoose.connect(DB_CONNECT,{useNewUrlParser:true},(e)=>console.log(e));

// Middleware
app.use(cors())
app.use(express.json())





app.use('/api/', apiRoute)
app.use('/api/', AuthMiddleware, apiProtected)

app.listen(PORT , ()=>{
console.log(`Server started on Port ${PORT}`)
})