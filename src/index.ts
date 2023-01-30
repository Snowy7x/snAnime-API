import express from "express";
const app = express();
import cors from "cors";
import * as ar from "./routes/ar"

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// app.use("/ar/v1", require("./routes/ar/v1"))
app.use("/v2/ar", ar.router);

app.listen(3069, () : void =>  {
  console.log("Listening on port: 3069");
});
