const form = document.querySelector('#url-form')
const results = document.querySelector('.results')
const button = document.querySelector('.button')


const shortenUrl = (link) => {
  fetch(`https://rel.ink/api/links/?url=${link}/`, {

    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ url:link })

   })
    .then(response => response.json())
    .then((data) => {
      const result = `
        <div class="result">
          <p>${link}</p>
          <a id="link" href="https://rel.ink/${data.hashid}">https://rel.ink/${data.hashid}</a>
        </div>`;
      results.insertAdjacentHTML("afterbegin", result);
      const copyButton = `<button class="square-btn sign-up" type="button">Copy</button>`
      button.insertAdjacentHTML("beforeend", copyButton);
    });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('#shorten-input');
  shortenUrl(input.value);
});

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const addListener = () => {
  button.addEventListener("click", (event) => {
    const link = document.querySelector('#link').innerText;
    copyToClipboard(link);
    event.currentTarget.innerHTML = `<button class="square-btn purple-btn sign-up" type="button">Copied!</button>`;
  });
};


addListener()

