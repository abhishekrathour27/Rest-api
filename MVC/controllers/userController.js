import user from "../models/user.js";

//GET user
export const getuser = async (req, res) => {
  const allDBUser = await user.find({});
  res.json(allDBUser);
};

//POST user
export const postUser = async (req, res) => {
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
  return res.status(201).json({ status: "success" }, result);
};


//DELETE user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await user.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "user with this id is not found please retry" });
    }
    await user.findByIdAndDelete(id);

    res.send({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//PATCH user
export const patchUser = async (req, res) => {
  await user.findByIdAndUpdate(req.params.id, { jobTitle: "fronted engineer" });
  return res.status(200).json({ message: "successfully updated" });
};
