import mongoose from "mongoose";
import express from "express";

const app = express();
app.use(express.json());
const PORT = 8000;

//Connecting mongo
mongoose
  .connect("mongodb://127.0.0.1:27017/myDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const user = mongoose.model("user", userSchema);

const getUser = async (req, res) => {
  const getAllUser = await user.find({});

  const html = `<ul>
    ${getAllUser.map((data) => `<li>${data.firstName} ,${data.email} </li>`).join('')}
  </ul>`;
  res.send(html)
};

app.get("/users", getUser);

//POST User
const postUser = async (req, res) => {
  const { firstName, lastname, email, jobTitle, gender } = req.body;

  if (!firstName || !lastname || !email || !jobTitle || !gender) {
    return res.status(400).json({ msg: "All feild are required" });
  }

  const result = await user.create({
    firstName: firstName,
    lastname: lastname,
    email: email,
    jobTitle: jobTitle,
    gender: gender,
  });
  //   result.save();
  console.log(result);
  return res.status(201).json({ status: "success" }, result);
};

app.post("/api/users", postUser);

app.listen(PORT, () => console.log(`Server started at port no. ${PORT}`));
