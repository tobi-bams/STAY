import { getFiatValue } from "../service/getFiatValue";
import { ResponseHandler } from "../util/response";

export const getCryptoToFiat = async (coin: any) => {
  if (!coin) {
    return ResponseHandler(400, "Please pass Coin value");
  }
  try {
    const response = await getFiatValue(coin);
    return ResponseHandler(200, `${coin} to NGN value`, { value: response });
  } catch (error) {
    console.log(error);
    return ResponseHandler(500, "Internal Server error");
  }
};
