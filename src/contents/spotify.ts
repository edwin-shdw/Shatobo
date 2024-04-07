import type { PlasmoCSConfig } from 'plasmo';
import { Message, type MessageResponse } from '~types/message';

export const config: PlasmoCSConfig = {
  matches: ["https://open.spotify.com/**"],
  all_frames: true
};

async function appendLinkToContextMenu(title: string, href: string) {
  await new Promise(r => setTimeout(r, 100));
  const contexMenu = document.getElementById('context-menu');
  let contexMenuList = contexMenu?.querySelector('ul');

  if(!contexMenu || !contexMenuList) return;

  let item = contexMenuList.querySelector('li').cloneNode();
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank';

  // add spotify's list item styling
  link.classList.add('mWj8N7D_OlsbDgtQx5GW', 'vvMORUKtQKpQcpQ992bR');
  link.innerText = title;
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
        site: 'spotify',
        imgLinks: null,
        pathname: window.location.pathname,
    }
    sendResponse(response);
  }
});
