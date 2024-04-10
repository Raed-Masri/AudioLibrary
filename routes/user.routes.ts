import express, { Router, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, IUserLogin } from "../types/user.types";
import User from "../models/User";

const validator = require("validator");
const router: Router = express.Router();

router.post("/sign-up", async (req: { body: IUser }, res: Response) => {
  const { email, password } = req.body;

  try {
    const isExist = await User.findOne({ email: email }); //email in the database equal to the received email
    const isValidEmail = validator.isEmail(email);

    if (isExist) {
      res.status(409).send("User already exists");
    } else if (isValidEmail) {
      if (password.length > 5) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ ...req.body, password: hashedPassword });

        res.status(200).send("Sign up Successfull");
      } else {
        res.status(400).send("password too short");
      }
    } else {
      res.status(400).send("email not valid");
    }
  } catch (error) {
    return error;
  }
});

router.post("/sign-in", async (req: { body: IUserLogin }, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const payload = req.body;
        const secretKey = "Raed@2024";
        const options = { expiresIn: "10m" }; // Token expiry time

        const token = jwt.sign(payload, secretKey, options);
        res.status(200).send({ token });
      } else {
        res.status(401).send("Password Incorrect");
      }
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (error) {
    return error;
  }
});

router.post(
  "/reset-password",
  async (req: { body: IUserLogin }, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.updateOne({ email }, { password: hashedPassword });

        res.status(200).send("password reset successfully");
      } else {
        res.status(404).send("user not found");
      }
    } catch (error) {
      return error;
    }
  }
);

export default router;
