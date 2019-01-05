let shown = false;

const nbspShowBtn = document.getElementById('nbspShowBtn');
const nbspHideBtn = document.getElementById('nbspHideBtn');

nbspShowBtn.addEventListener('click', () => {
  if (shown === false) {
    nbspHideBtn.className = nbspHideBtn.className.replace(' btn-focused', '');
    nbspShowBtn.className += ' btn-focused';

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "show_nbsps" });
    });

    shown = true;
  }
});

nbspHideBtn.addEventListener('click', () => {
  if (shown === true) {
    nbspShowBtn.className = nbspShowBtn.className.replace(' btn-focused', '');
    nbspHideBtn.className += ' btn-focused';

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "hide_nbsps" });
    });
    shown = false;
  }
});