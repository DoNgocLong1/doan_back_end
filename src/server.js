import express from "express";
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRouters from "./route/web"
import connectDB from "./config/connectDB";
import cors from 'cors'
import product from '../src/helper/product'
require('dotenv').config()
const app = express()
app.use(cors({ origin:true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))
viewEngine(app)
initWebRouters(app)
connectDB()
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
/* product.seeds(15) */