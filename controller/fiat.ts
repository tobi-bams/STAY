import { getFiatValue } from "../service/getFiatValue";
import { ResponseHandler } from "../util/response";
import { resolveBank } from "../service/resolveBank";
import { Bank } from "../interfaces/user";
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

export const getAccountName = async (bank: any) => {
  if (bank.bank_code && bank.account_number) {
    try {
      const account = await resolveBank(bank);
      if (account.status) {
        return ResponseHandler(200, account.message, account.account);
      } else {
        return ResponseHandler(400, account.message);
      }
    } catch (error) {
      console.log(error);
      return ResponseHandler(500, "Internal Server Error");
    }
  } else {
    return ResponseHandler(400, "Unable to resolve account");
  }
};
