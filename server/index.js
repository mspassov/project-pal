import express from "express";
import dotenv from "dotenv";
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from "ruru/server";
import connectDB from "./config/db.js";
import schema from './schema/schema.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use('/graphql', createHandler(
    {   
        schema: schema
    }));

if(process.env.NODE_ENV == "development"){
    app.get('/', (_req, res) => {
      res.type('html');
      res.end(ruruHTML({ endpoint: '/graphql' }));
    });
}

app.listen(port);

console.log(`Server running on PORT: ${port}`);