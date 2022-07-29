interface WebHookResponse {
  data?: any;
  event: string;
}
export const WebhookHandler = (req: WebHookResponse) => {
  if (req.event === "address.deposit") {
    console.log(req.data.address_reference);
  }
};
