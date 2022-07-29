import api from "../service/api";
import { ResponseHandler } from "../util/response";
import { JWTUser } from "../interfaces/user";

export const GenerateAddress = async (user: JWTUser) => {
  try {
    const address = await api.post("address", { code: "DOGE" });
    return ResponseHandler(201, address.data.message, {
      address: address.data.address.address,
      reference: address.data.address.reference,
    });
  } catch (error: any) {
    console.log(error);
    return ResponseHandler(500, "Internal Server Error");
  }
};
