export function elementWithIdDidMount(id: string) {
  return new Promise(resolve => {
    if(document.getElementById(id)) {
      return resolve(document.getElementById(id));
    }

    const observer = new MutationObserver(() => {
      if(document.getElementById(id)) {
        observer.disconnect();
        resolve(document.getElementById(id));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export function elementWithSelectorDidMount(selector: string) {
  return new Promise(resolve => {
    if(document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if(document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

export function elementWithTagNameDidMount(tagname: string) {
  return new Promise(resolve => {
    if(document.getElementsByTagName(tagname)[0]) {
      return resolve(document.getElementsByTagName(tagname)[0]);
    }

    const observer = new MutationObserver(() => {
      if(document.getElementsByTagName(tagname)[0]) {
        observer.disconnect();
        resolve(document.getElementsByTagName(tagname)[0]);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
