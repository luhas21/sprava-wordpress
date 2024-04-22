// Funkce pro získání nejnovější verze WordPressu
function getLatestWordPressVersion() {
    const apiURL = 'https://api.wordpress.org/core/version-check/1.7/';
  
    return fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        if (data && data.offers && data.offers.length > 0) {
          const latestVersion = data.offers[0].current;
          return latestVersion;
        } else {
          throw new Error('Nepodařilo se získat informace o nejnovější verzi WordPressu.');
        }
      });
  }
  
  // Funkce pro získání verze WordPressu z daného webu
  function getWordPressVersion() {
    const urlInput = document.getElementById('url').value;
    const currentVersionContainer = document.getElementById('current-wp-version');
    const resultContainer = document.getElementById('result');
  
    if (!urlInput) {
      resultContainer.innerHTML = 'Zadejte platnou URL.';
      return;
    }
  
    // Použití URL proxy serveru
    const proxyUrl = 'https://corsproxy.io/?';
    const targetUrl = urlInput;
  
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const htmlContent = xhr.responseText;
        const regex = /<meta name="generator" content="WordPress (\d+\.\d+\.\d+)/i;
        const match = htmlContent.match(regex);
  
        if (match && match[1]) {
          const wpVersion = match[1];
          resultContainer.innerHTML = `Verze WordPress na webu ${urlInput} je: ${wpVersion}`;
  
        // Porovnání verzí
        getLatestWordPressVersion().then(latestVersion => {
            currentVersionContainer.innerHTML = "Aktuální verze WordPress je " + latestVersion;
            if (wpVersion === latestVersion) {
              // Verze je aktuální
              resultContainer.innerHTML += '<br>Váš WordPress je aktualizován na nejnovější verzi.';
            } else if (wpVersion < latestVersion) {
              // Verze je zastaralá
              resultContainer.innerHTML += '<br>Váš WordPress není aktuální. Vaše stránky jsou ohroženy!';
            }
          });
        } else {
          resultContainer.innerHTML = 'Verze WordPress nebyla nalezena.';
        }
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        console.log(targetUrl);
        resultContainer.innerHTML = 'Chyba při načítání stránky.';
      }
    };
  
    // Použití URL proxy serveru pro požadavek
    xhr.open('GET', proxyUrl + encodeURIComponent(targetUrl));
    xhr.send();
  }