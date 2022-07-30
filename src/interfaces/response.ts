interface ResponseBody {
  message: string;
  data?: {};
}
export interface Response {
  status: number;
  body: ResponseBody;
}
