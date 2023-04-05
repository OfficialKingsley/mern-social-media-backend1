import express, { Application } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { authRoutes, postRoutes, userRoutes } from "./api/v1/routes";
import dotenv from "dotenv";

dotenv.config();

// Environment variables
const PORT = process.env.PORT || 5000;
let MONGO_URI: string;
if (process.env.NODE_ENV === "development") {
  MONGO_URI = process.env.DEV_MONGO_URI!;
} else {
  MONGO_URI = process.env.MONGO_URI!;
}

const app: Application = express();

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello wow</h1>");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Database connected to url ${MONGO_URI}`);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(MONGO_URI, PORT);
    console.log("The error is", err);
  });
