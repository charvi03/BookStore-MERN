import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// // Middleware for parsing request body
app.use(express.json());
// //middleware for handling CORS POLICY
// // Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
//Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome");
});

app.use("/books", booksRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app database connected");
    app.listen(PORT, () => {
      console.log(`App is listening port : ${PORT} `);
    });
  })
  .catch((error) => {
    console.log(error);
  });
