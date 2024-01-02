import mongoose from "mongoose";
import express from "express";
import {} from "dotenv/config.js";
import bodyParser from "body-parser";
import cors from "cors";

import postRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening to port ${process.env.PORT}`);
        })
    })
    .catch(e => console.log(e));