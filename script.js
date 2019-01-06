let shown = false;

const nbspReplacer = '<span style="color: white; background: #3ea093; padding: 4px 6px; border-radius: 4px;">&amp;nbsp;</span>';

const showNBSPs = () => {
  const elements = document.body.getElementsByTagName('*');
  for (let i = 0; i < elements.length; i++) {
    const newHTML = elements[i].innerHTML.split('&nbsp;').join(nbspReplacer);
    if (elements[i].innerHTML !== newHTML) elements[i].innerHTML = newHTML;
  }
  shown = true;
};

const hideNBSPs = () => {
  const elements = document.body.getElementsByTagName('*');
  for (let i = 0; i < elements.length; i++) {
    const newHTML = elements[i].innerHTML.split(nbspReplacer).join('&nbsp;');
    if (elements[i].innerHTML !== newHTML) elements[i].innerHTML = newHTML;
  }
  shown = false;
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.action == 'show_nbsps') showNBSPs();
  else if (request.action == 'hide_nbsps') hideNBSPs();

  if (request.action == 'get_state') {
    chrome.runtime.sendMessage({ shown });
  }
});