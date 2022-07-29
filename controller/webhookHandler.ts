const models = require("../models");
import { getFiatValue } from "../service/getFiatValue";

interface WebHookResponse {
  data?: any;
  event: string;
}
export const WebhookHandler = async (req: WebHookResponse) => {
  if (req.event === "address.deposit") {
    const rate = await getFiatValue(req.data.coin);
    const totalValue = rate * req.data.human_readable_amount;
    console.log(req.data.address_reference);
  }
};
