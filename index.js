let shown = false;

const nbspShowBtn = document.getElementById('nbspShowBtn');
const nbspHideBtn = document.getElementById('nbspHideBtn');

const setBtnStates = () => {
  if (shown === false) {
    nbspShowBtn.className = nbspShowBtn.className.replace(' btn-focused', '');
    nbspHideBtn.className += ' btn-focused';
  } else {
    nbspHideBtn.className = nbspHideBtn.className.replace(' btn-focused', '');
    nbspShowBtn.className += ' btn-focused';
  }
};

nbspShowBtn.addEventListener('click', () => {
  if (shown === false) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "show_nbsps" });
    });

    shown = true;
    setBtnStates();
  }
});

nbspHideBtn.addEventListener('click', () => {
  if (shown === true) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "hide_nbsps" });
    });

    shown = false;
    setBtnStates();
  }
});

const links = document.getElementsByTagName('a');
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', () => {
    chrome.tabs.create({ url: links[i].href });
  });
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: 'get_state' });
});

chrome.runtime.onMessage.addListener((request) => {
  shown = request.shown;
  setBtnStates();
});

