import type { PlasmoCSConfig } from 'plasmo';
import { Message, Site, type MessageResponse } from '~types/message';
import { elementWithIdDidMount, elementWithSelectorDidMount } from '~utils/element-mount';
import colors from '~utils/colors';

export const config: PlasmoCSConfig = {
  matches: ['https://open.spotify.com/**'],
  all_frames: true,
};

(async () => {
  await elementWithSelectorDidMount('.EaTxqhHk6J4ecKHwpY5m');
  document.querySelectorAll<HTMLParagraphElement>('.xt5C47eHPYNiriMJxGnC').forEach(node => {
    node.style.userSelect = 'auto';

    const cssTemplateString = `.xt5C47eHPYNiriMJxGnC::selection {background: ${colors.primary}; color: #000}`;
    const styleTag = document.createElement('style');
    styleTag.innerHTML = cssTemplateString;
    document.head.insertAdjacentElement('beforeend', styleTag);
  });
})();

async function appendLinkToContextMenu(title: string, href: string) {
  await elementWithIdDidMount('context-menu');
  const contexMenu = document.getElementById('context-menu');
  const contexMenuList = contexMenu?.querySelector('ul');

  if(!contexMenu || !contexMenuList) return;

  const item = contexMenuList.querySelector('li').cloneNode();
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank';

  // add spotify's list item styling
  link.classList.add('mWj8N7D_OlsbDgtQx5GW', 'vvMORUKtQKpQcpQ992bR');
  link.innerText = title;
  link.style.color = colors.primary;
  item.appendChild(link);
  contexMenuList.appendChild(item);
}

window.addEventListener('mousedown', (event) => {
  if(event.button !== 2) return;

  const node = event.target as HTMLImageElement;
  if(node.tagName !== 'IMG') return;

  appendLinkToContextMenu('Open image', node.src);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse): void => {
  if(message === Message.Scrape) {
    const response: MessageResponse = {
      site: Site.Spotify,
      imgLinks: null,
      pathname: window.location.pathname,
    };
    sendResponse(response);
  }
});
