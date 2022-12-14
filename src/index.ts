import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
const { sequelize } = require("./models");
import Auth from "./routes/auth";
import Address from "./routes/generate_address";
import Webhook from "./routes/webhook";
import Wallet from "./routes/wallet";
import Exchange from "./routes/exchange";
import Payout from "./routes/payout";
import Account from "./routes/account";

const app: Application = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/auth", Auth);
app.use("/address", Address);
app.use("/webhook", Webhook);
app.use("/wallet", Wallet);
app.use("/exchange", Exchange);
app.use("/payout", Payout);
app.use("/account", Account);

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
