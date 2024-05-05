import type { PlasmoCSConfig } from 'plasmo';
import { Message, Site, type MessageResponse } from '~types/message';

export const config: PlasmoCSConfig = {
  matches: ['https://www.tiktok.com/**'],
  all_frames: true,
};

function scrapeTikTokImages(): string[] {
  const sliders: NodeListOf<HTMLElement> = document.querySelectorAll(
    '.swiper-slide:not(.swiper-slide-duplicate)'
  );
  const imgLinks: string[] = [];
  sliders.forEach((slider): void => {
    const imgNode = slider.firstChild as HTMLImageElement;
    const imgLink: string = imgNode.src;
    imgLinks.push(imgLink);
  });

  return imgLinks;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse): void => {
  if(message === Message.Scrape) {
    const response: MessageResponse = {
      site: Site.TikTok,
      imgLinks: scrapeTikTokImages(),
      pathname: window.location.pathname,
    };
    sendResponse(response);
  }
});
