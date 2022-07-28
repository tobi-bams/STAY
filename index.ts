import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
const { sequelize } = require("./models");

const app: Application = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5005;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server Running at port ${PORT}`);
});
