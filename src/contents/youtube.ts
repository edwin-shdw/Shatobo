import type { PlasmoCSConfig } from 'plasmo';
import { Message, type MessageResponse } from '~types/message';
import colors from '~utils/colors';
import { elementWithTagNameDidMount } from '~utils/element-mount';

export const config: PlasmoCSConfig = {
  matches: ['https://www.youtube.com/**'],
  all_frames: true,
};

(async () => {
  await elementWithTagNameDidMount('ytd-download-button-renderer');

  const downloadBtn = document.getElementsByTagName('ytd-download-button-renderer')[0].querySelector('button');
  downloadBtn.style.background = colors.primary;
  downloadBtn.style.color = colors.black;

  console.log('hello');

  downloadBtn.addEventListener('click', () => {
    window.open(
      window.location.href.replace('youtube', 'youtube5s'),
      '_blank',
    );
  });
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse): void => {
  if (message === Message.Scrape) {
    const response: MessageResponse = {
      site: 'youtube',
      imgLinks: null,
      pathname: window.location.pathname,
    };
    sendResponse(response);
  }
});
