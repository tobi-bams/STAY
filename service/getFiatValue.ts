import api from "./api";

export const getFiatValue = async (coin: string) => {
  try {
    const response = await api.get(`rates?from=${coin}&to=NGN`);
    return response.data.rates[0].sale_rate;
  } catch (error) {
    console.log(error);
  }
};
