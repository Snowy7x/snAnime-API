import express from "express";
import mongoose from "mongoose";
const app = express();
import cors from "cors";
import * as ar from "./routes/ar";
import { getAnime } from "./routes/ar/dbManager";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// app.use("/ar/v1", require("./routes/ar/v1"))
app.use("/v2/ar", ar.router);
app.listen(3030, (): void => {
  console.log("Listening on port: 3030");
});
/* 
const uri =
  "mongodb+srv://snowy:KoHQsXrjrtl2nuji@snanimecluster.fnvdteq.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
  autoIndex: true,
});

mongoose.connection.on("error", (err) => {
  console.log("Database Connection ERROR: " + err.message);
});

mongoose.connection.on("open", () => {
  console.log("Connected to db.");
}); */
