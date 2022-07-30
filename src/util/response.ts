import { Response } from "../interfaces/response";
export const ResponseHandler = (
  status: number,
  message: string,
  data?: {}
): Response => {
  return { status, body: { message, data } };
};
