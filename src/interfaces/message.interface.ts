export interface IMessage {
  method: string;
  url: string;
  params: { [key: string]: string };
  body: string;
  statusCode: number;
}
