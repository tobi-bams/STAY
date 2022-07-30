const models = require("../models");
import { getFiatValue } from "../service/getFiatValue";

interface WebHookResponse {
  data?: any;
  event: string;
}
export const WebhookHandler = async (req: WebHookResponse) => {
  if (req.event === "address.deposit") {
    const rate = await getFiatValue(req.data.coin);
    const totalFiatValue = rate * req.data.human_readable_amount;
    const t = await models.sequelize.transaction();
    try {
      const deposit = await models.deposit.findOne({
        where: { reference: req.data.address_reference },
        include: models.wallet,
      });
      await models.deposit.update(
        { amount: deposit.amount + totalFiatValue, rate, status: "success" },
        { where: { reference: req.data.address_reference } },
        { transaction: t }
      );
      await models.wallet.update(
        { balance: deposit.wallet.balance + totalFiatValue },
        { where: { id: deposit.walletId } },
        { transaction: t }
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
      console.log(error);
    }
  }
};
