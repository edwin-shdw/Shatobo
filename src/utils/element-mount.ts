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
      subtree: true
    });
  });
}
