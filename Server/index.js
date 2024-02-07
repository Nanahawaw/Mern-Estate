import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3001, () => {
  console.log("server running on port 3001");
});

app.use("/Server/user", userRouter);

export default app;
