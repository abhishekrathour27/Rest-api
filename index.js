import express from "express";
import { readFileSync } from "fs";

const app = express();
const PORT = 8000;

// JSON file ko read karo
const data = JSON.parse(readFileSync("./MOCK_DATA.json", "utf-8"));

const htmlUsers = (req, res) => {
  const html = `
    <ul>
      ${data.map((item) => `<li>${item.first_name}. </li>`).join("")}
    </ul>
    `;
  res.send(html);
};

app.get("/users", htmlUsers);

app.get("/api/users", (req, res) => {
  res.json(data);
});

// get user basis on id

const dynamicUser = (req, res) => {
  const userId = Number(req.params.id);
  const matchUser = data.find((item) => item.id === userId);
  return res.json(matchUser);
};

const editUser = (req, res) => {
  return res.json({ status: "pending" });
};

const deleteUser = (req, res) => {

  return res.json({ status: "Pending" });
};
// app.route("/api/users/:id").get(dynamicUser).patch(editUser).delete(deleteUser);

const postUser = (req, res) => {
  return res.json({ status: "pending" });
};

app.post("/api/users", postUser);

app.listen(PORT, () => console.log(`Server started at port no. ${PORT}`));
