const form = document.querySelector('#url-form')
const results = document.querySelector('.results')
const button = document.querySelector('.button')
const error = document.querySelector('.error')
const input = document.querySelector('#shorten-input')


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
  if (input.value) {
    shortenUrl(input.value);
  }
  else {
    error.innerText = '';
    error.innerText = 'Please add a link';
    console.log(input)
    input.classList.add("red-border");
  }
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
    const copyButton = document.querySelector(".square-btn")
    copyButton.innerText = `Copied!`;
    copyButton.classList.add("purple-btn")
  });
};


addListener()

