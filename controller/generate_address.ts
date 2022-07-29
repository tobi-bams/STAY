import api from "../service/api";
import { ResponseHandler } from "../util/response";
import { JWTUser } from "../interfaces/user";
const models = require("../models");

export const GenerateAddress = async (user: JWTUser) => {
  try {
    const address = await api.post("address", { code: "DOGE" });
    const createDeposit = await models.deposit.create({
      amount: 0,
      walletId: 6,
      address: address.data.address.address,
      reference: address.data.address.reference,
      coin: "DOGE",
    });
    return ResponseHandler(201, address.data.message, {
      address: address.data.address.address,
      reference: address.data.address.reference,
    });
  } catch (error: any) {
    console.log(error);
    return ResponseHandler(500, "Internal Server Error");
  }
};
