const newArticleButton = document.getElementById("new");
const searchForm = document.getElementById("search");
const output = document.querySelector(".output");

function fetchResults(searchQuery) {
  const endpoint = `https://ru.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30&srsearch=${searchQuery}`;
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      const results = data.query.search;
      displayData(results);
    })
    .catch(err => {
      throw err;
    });
}

newArticleButton.addEventListener("click", () => {
  fetchResults(searchForm.value);
});

window.addEventListener("keyup", event => {
  if (event.keyCode == 13) {
    fetchResults(searchForm.value);
  }
});

function displayData(results) {
  const link = "http://ru.wikipedia.org/?curid=";
  let info = "";
  if(!results.length) {
    output.innerHTML = `<li><h2>Поиск не дал результатов</h2></li>`
  }else{
    results.map(result => {
    const { title, snippet, pageid } = result;
    info += `<li><a class="hd" href="${link}${pageid}"><h2>${title}</h2>${snippet}...</a></li>`;
  });
  output.innerHTML = info;
}
}
