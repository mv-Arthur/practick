import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import handleValidationErrors from "./utils/handleValidationErrors.js";
import { regValidator } from "./validations/auth.js";
import { loginValidator } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { UserController } from "./controllers/UserController.js";
mongoose
  .connect(
    "mongodb+srv://malakhov051:1234@cluster0.yrgly4r.mongodb.net/airport?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connect"))
  .catch((err) => {
    console.log("error" + err.message);
  });
const app = express();

app.use(express.json());
app.use(cors());
app.post(
  "/auth/login",
  loginValidator,
  handleValidationErrors,
  UserController.login
);
app.post("/auth/reg", regValidator, handleValidationErrors, UserController.reg);
app.get("/auth/me", checkAuth, UserController.me);
app.listen(2000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server working");
});
