const models = require("../models");
import { JWTUser } from "../interfaces/user";
import { ResponseHandler } from "../util/response";

export const savePayout = async (data: JWTUser) => {
  try {
    await models.payout.update({ saved: true }, { where: { userId: data.id } });
    return ResponseHandler(200, "Bank Details saved Successfully");
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "Internal Server Error");
  }
};

export const getPayout = async (data: JWTUser) => {
  try {
    const payout = await models.payout.findOne({ where: { userId: data.id } });
    return ResponseHandler(200, "Bank Details", payout);
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "Internal Server Error");
  }
};
