import type { PlasmoCSConfig } from 'plasmo';
import { Message, Site, type MessageResponse } from '~types/message';
import colors from '~utils/colors';
import { elementWithIdDidMount, elementWithTagNameDidMount } from '~utils/element-mount';

export const config: PlasmoCSConfig = {
  matches: ['https://www.youtube.com/**'],
  all_frames: true,
};

const DROPDOWN_BREAKPOINT = 955;

// TODO: inject download dropdown item if primary column width is below DROPDOWN_BREAKPOINT

async function injectDownloadBtn() {
  await elementWithTagNameDidMount('ytd-download-button-renderer');

  const downloadBtn = document.getElementsByTagName('ytd-download-button-renderer')[0].querySelector('button');
  downloadBtn.style.background = colors.primary;
  downloadBtn.style.color = colors.black;

  downloadBtn.addEventListener('click', () => {
    window.open(
      window.location.href.replace('youtube', 'youtube5s'),
      '_blank',
    );
  });
}

let primaryColumn: HTMLElement;
let previousPrimaryColumnWidth = DROPDOWN_BREAKPOINT + 1;
(async () => {
  injectDownloadBtn();
  await elementWithIdDidMount('primary');
  primaryColumn = document.getElementById('primary');
  previousPrimaryColumnWidth = primaryColumn.offsetWidth;
})();

let debounceTimeout: ReturnType<typeof setTimeout>;
window.addEventListener('resize', () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    if(previousPrimaryColumnWidth > DROPDOWN_BREAKPOINT) {
      previousPrimaryColumnWidth = primaryColumn.offsetWidth;
      return;
    }
    previousPrimaryColumnWidth = primaryColumn.offsetWidth;
    injectDownloadBtn();
  }, 1000);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse): void => {
  if (message === Message.Scrape) {
    const response: MessageResponse = {
      site: Site.YouTube,
      imgLinks: null,
      pathname: window.location.pathname,
    };
    sendResponse(response);
  }
});
