const form = document.querySelector('#url-form')
const results = document.querySelector('.results')

const shortenUrl = (link) => {
  fetch(`https://rel.ink/api/links/?url=${link}/`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ url:link })
   })
    .then(response => response.json())
    .then((data) => {
    // console.log(data);
      const result = `
      <div class="result">
        <p>${link}</p>
        <a href="https://rel.ink/${data.hashid}">https://rel.ink/${data.hashid}</a>
        <button class="square-btn sign-up" type="button">Copy</button>
      </div>`;
        results.insertAdjacentHTML("beforeend", result);
    });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('#shorten-input');
  shortenUrl(input.value);
});




