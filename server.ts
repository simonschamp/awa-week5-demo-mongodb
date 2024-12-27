import express, { Express } from "express";
import path from "path";

import router from "./src/routes/index";
import morgan from "morgan"; // that helps us get logs and see how our app is working
import mongoose, { Connection } from "mongoose";

const app: Express = express();
const port = 8000;

//Initial the database
const mongoDB: string = "mongodb://127.0.0.1:27017/poemdb";

// Connect the mongoose
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
//connect mongoose to database object
const db: Connection = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
