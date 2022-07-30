import api from "./api";

interface Bank {
  bank_code: string;
  account_number: string;
}

interface Response {
  status: boolean;
  message: string;
  account?: { name: string };
}

export const resolveBank = async (bank: Bank): Promise<Response> => {
  try {
    const response = await api.get(
      `payouts/accounts/banks/resolve?bank_code=${bank.bank_code}&account_number=${bank.account_number}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response);
    return { status: false, message: "Unable to resolve bank account" };
  }
};
