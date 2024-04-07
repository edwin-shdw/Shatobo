export enum Message {
  Scrape = 'scrape',
}

export interface MessageResponse {
  site: string,
  imgLinks: Array<string>;
  pathname: string;
}
