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
      const result = `<a href="https://rel.ink/${data.hashid}">https://rel.ink/${data.hashid}</a>`;
        results.insertAdjacentHTML("beforeend", result);
    });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector('#shorten-input');
  results.innerHTML = '';
  shortenUrl(input.value);
});




