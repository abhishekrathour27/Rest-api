import mongoose from "mongoose";
import express from "express";
import urlRouter from "./routes/url.js";

const app = express();
app.use(express.json());
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));

app.use("/url", urlRouter);

app.listen(PORT, () => console.log(`Server started at PORT : ${PORT}`));
