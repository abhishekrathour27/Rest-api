import express from "express";
import {
  deleteUser,
  getuser,
  patchUser,
  postUser,
} from "../controllers/userController.js"; // add .js if ESM

const router = express.Router();

router.get("/users", getuser);
router.post("/users", postUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", patchUser);

export default router;
