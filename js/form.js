const form = document.querySelector('#url-form')
const results = document.querySelector('.results')
const button = document.querySelector('.button')
const error = document.querySelector('.error')
const input = document.querySelector('#shorten-input')


// Fetch short URL from API

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

// Adds short URL to page or error message

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

// Copies to clipboard

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

button.addEventListener('mouseover', () => {
  const link = document.querySelector('#link').innerText;
  copyToClipboard(link);
  const copyButton = document.querySelectorAll(".square-btn")
  copyButton.forEach((button) => {
    button.addEventListener('click', (event) => {
    event.currentTarget.innerText = `Copied!`;
    event.currentTarget.classList.add("purple-btn")
  });
  })
});


