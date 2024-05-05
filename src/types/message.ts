export enum Message {
  Scrape = 'scrape',
}

export enum Site {
  Instagram = 'instagram',
  Spotify = 'spotify',
  TikTok = 'tiktok',
  YouTube = 'youtube',
}

export interface MessageResponse {
  site: `${Site}`,
  imgLinks: Array<string>;
  pathname: string;
}
