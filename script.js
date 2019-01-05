const nbspReplacer = '<span style="color: white; background: #3ea093; padding: 4px 6px; border-radius: 4px;">&amp;nbsp;</span>';

const showNBSPs = () => {
  const html = document.getElementsByTagName('html')[0];
  html.innerHTML = html.innerHTML.split('&nbsp;').join(nbspReplacer);
};

const hideNBSPs = () => {
  const html = document.getElementsByTagName('html')[0];
  html.innerHTML = html.innerHTML.split(nbspReplacer).join('&nbsp;');
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.action == 'show_nbsps') showNBSPs();
  else if (request.action == 'hide_nbsps') hideNBSPs();
});