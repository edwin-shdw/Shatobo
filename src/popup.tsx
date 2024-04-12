import '~styles/style.scss';
import Footer from '~components/Footer';
import { useState } from 'react';
import DownloadIcon from '~components/icons/Download';
import { displayName } from '../package.json';
import { Message, type MessageResponse } from '~types/message';

function getTikTokVideoId(pathname: string) {
  const paths = pathname.split('/');
  if(paths[paths.length - 2] !== 'video') return '';
  return paths[paths.length - 1];
}

export default function IndexPopup() {
  const [status, setStatus] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [images, setImages] = useState([]);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, Message.Scrape, (response: MessageResponse) => {
      if(!response) {
        setStatus(`${displayName} currently does not support this site :(`);
        chrome.runtime.lastError.message;
      }
      else if(response.site === 'tiktok') {
        const videoId = getTikTokVideoId(response.pathname);
        if(response.imgLinks.length) {
          setImages(response.imgLinks);
          return;
        }
        if(videoId) {
          setDownloadLink(`https://tikcdn.io/ssstik/${videoId}`);
          return;
        }
        setStatus('Nothing to scrape!');
      }
      else if(response.site === 'instagram') {
        setStatus('Images unblocked. Just right click on them :)');
      }
      else if(response.site === 'spotify') {
        setStatus(`${displayName} extends the contex menu for images!`);
      }
    });
  });

  return (
    <>
      <div className="container mb-3">
        <h2 className="mb-2">{displayName}</h2>
        { downloadLink &&
          <>
            <a className="btn btn--primary mbe-2" href={downloadLink} target="_blank">
              <DownloadIcon className="mie-1" />
              Download
            </a>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${downloadLink}`} style={{ inlineSize: '100%' }} />
            <p className="text-muted">Or download by scanning the QR Code</p>
          </>
        }
        { status &&
          <p>{status}</p>
        }
        { Boolean(images.length) &&
          <>
            <button
              className="btn btn--primary mbe-2"
              onClick={() => images.forEach(image => window.open(image))}
            >
              Open all
            </button>
            <div className="row row-cols-2">
              {images.map((image, index) => (
                <div key={index}>
                  <a href={image} target="_blank">
                    <img src={image} alt={`Image ${index}`} className="img-fluid img-hoverable" />
                  </a>
                </div>
              ))}
            </div>
          </>
        }
      </div>
      <Footer />
    </>
  );
}
