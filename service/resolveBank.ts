import api from "./api";

interface Bank {
  bank_code: string;
  account_number: string;
}

export const resolveBank = async (bank: Bank) => {
  try {
    const response = await api.get(
      `payouts/accounts/banks/resolve?bank_code=${bank.bank_code}&account_name=${bank.account_number}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return { status: false, message: "Unable to resolve bank account" };
  }
};
