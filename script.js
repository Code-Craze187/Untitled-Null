function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
}

function launchCustom() {
  const url = document.getElementById('url').value.trim();
  if (url) {
    localStorage.setItem('lastCustomURL', url);
    updateLastLinkBtn();
    launch(url);
  }
}

function launchLast() {
  const lastURL = localStorage.getItem('lastCustomURL');
  if (lastURL) launch(lastURL);
}

function launch(url) {
  const sameTab = document.getElementById('sameTab').checked;
  localStorage.setItem('sameTabPref', sameTab);
  const win = sameTab ? window : window.open('about:blank', '_blank');
  const doc = win.document;
  doc.write(`
    <!DOCTYPE html>
    <html>
    <head><title>Untitled</title></head>
    <body style="margin:0;overflow:hidden;">
      <iframe src="${url}" style="border:none;width:100vw;height:100vh;"></iframe>
    </body>
    </html>
  `);
  doc.close();
}

function updateLastLinkBtn() {
  const lastURL = localStorage.getItem('lastCustomURL');
  document.getElementById('lastLinkBtn').style.display =
    (lastURL && lastURL !== 'https://') ? 'inline-block' : 'none';
}

(function init() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
  document.getElementById('sameTab').checked =
    localStorage.getItem('sameTabPref') === 'true';
  updateLastLinkBtn();
  const lastURL = localStorage.getItem('lastCustomURL');
  if (lastURL) document.getElementById('url').value = lastURL;

  const presets = document.getElementById('presetLinks');
  const dropdownPref = localStorage.getItem('presetOpen');
  if (dropdownPref === null || dropdownPref === 'true') {
    presets.setAttribute('open', 'true');
  }
  presets.addEventListener('toggle', () => {
    localStorage.setItem('presetOpen', presets.open);
  });
})();

document.getElementById('url').addEventListener('keypress', e => {
  if (e.key === 'Enter') launchCustom();
});
