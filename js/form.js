const form = document.querySelector('#url-form')
const results = document.querySelector('.results')
const error = document.querySelector('.error')
const input = document.querySelector('#shorten-input')

let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))


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
          <button class="square-btn sign-up" type="button">Copy</button>
        </div>`;
      results.insertAdjacentHTML("afterbegin", result);
    });
};

// Adds short URL to page or error message

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('#shorten-input');
  if (input.value) {
    shortenUrl(input.value);
    input.classList.remove("red-border");
    error.innerText = '';
    itemsArray.push(input.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
  }
  else {
    error.innerText = '';
    error.innerText = 'Please add a link';
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

results.addEventListener('mouseover', () => {
  const copyButton = document.querySelectorAll(".square-btn")
  copyButton.forEach((button) => {
    button.addEventListener('click', (event) => {
    const link = document.querySelector('#link').innerText;
    copyToClipboard(link);
    event.currentTarget.innerText = `Copied!`;
    event.currentTarget.classList.add("purple-btn")
  });
  })
});


// Persists in LocalStorage

data.forEach(item => {
  shortenUrl(item)
})

