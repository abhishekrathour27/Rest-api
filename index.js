import mongoose from "mongoose";
import express from "express";
import userRoute from "./routes/userRoute.js"; // add .js extension if using ES modules

const app = express();
app.use(express.json());
const PORT = 8000;

//Connecting mongo
mongoose
  .connect("mongodb://127.0.0.1:27017/myDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));

// ✅ Correct: always prefix with "/" 
app.use("/api", userRoute);

app.listen(PORT, () => console.log(`Server started at port no. ${PORT}`));
