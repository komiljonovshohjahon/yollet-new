const search_button = document.querySelector("#search-button");
const search_container = document.querySelector("#search-container");
const search_input = document.querySelector("#search-input");
const items_number = document.querySelector("#num-of-items");
const search_select = document.querySelector("#search-select");
const page_number = document.querySelector("#page");
const total_pages = document.querySelector("#total-pages");
const next_button = document.querySelector("#next");
const previous_button = document.querySelector("#previous");
const toggle_search = document.querySelector("#search-toggle");
const search_section = document.querySelector("#search-section");
const write = document.querySelector("#write");
var element = document.getElementById("tbody");

var dataArray = [];

var toggle = false;
var search_type = search_select.value;
var number = parseInt(items_number.value);
var page_num = 0;
var word;
var page = parseInt(page_number.innerHTML);
var total_page = getDataCount().then(
  (res) => (total_pages.innerHTML = Math.round(res / 10))
);

search_input.addEventListener("change", function () {
  word = search_input.value;
  console.log(word);
});

items_number.addEventListener("change", function () {
  number = items_number.value;
  page = 1;
  page_number.innerHTML = page;
  total_pages.innerHTML = getDataCount().then(
    (res) => (total_pages.innerHTML = Math.round(res / number))
  );
  getData(number, search_type, word, 0);
});

next_button.addEventListener("click", function () {
  page += 1;
  page_number.innerHTML = page;
  page_num += parseInt(number);
  getData(number, search_type, word, page_num);

  pageButtonChecker();
});

previous_button.addEventListener("click", function () {
  page -= 1;
  page_number.innerHTML = page;
  page_num -= parseInt(number);
  getData(number, search_type, word, page_num);

  pageButtonChecker();
});

search_select.addEventListener("change", function () {
  search_type = search_select.value;
});

search_container.addEventListener("submit", function (e) {
  e.preventDefault();
  getData(number, search_type, word, page_num);
});

toggle_search.addEventListener("click", function () {
  toggle = !toggle;
  if (toggle) {
    search_section.classList.remove("hidden");
    search_section.classList.add("flex");
    write.classList.remove("hidden");
    write.classList.add("flex");
  } else {
    search_section.classList.remove("flex");
    search_section.classList.add("hidden");
    write.classList.remove("flex");
    write.classList.add("hidden");
  }
});

const getDataSearch = async (search, num, search_type) => {
  const url = `http://localhost:1337/boards/?${search_type}_contains=${search}&_sort=id:DESC`;
  const data = await fetch(url);
  const res = await data.json();
  var element = document.getElementById("tbody");

  total_pages.innerHTML = Math.round(res.length / num) + 1;

  while (element.lastElementChild) {
    element.removeChild(element.lastElementChild);
  }

  for (let i = 0; i < num; i++) {
    var datee = new Date(res[i].created_at).toLocaleDateString();
    var tr = document.createElement("tr");
    var id = document.createElement("td");

    var title = document.createElement("td");
    var link = document.createElement("a");
    title.appendChild(link);
    link.href = `./questions-read.html?${res[i].id}`;

    var name = document.createElement("td");
    var date = document.createElement("td");
    var views = document.createElement("td");

    var idNode = document.createTextNode(res[i].id);
    var titleNode = document.createTextNode(res[i].title);
    var nameNode = document.createTextNode(res[i].name);
    var dateNode = document.createTextNode(datee);
    var viewsNode = document.createTextNode(res[i].views);

    id.appendChild(idNode);
    link.appendChild(titleNode);
    name.appendChild(nameNode);
    date.appendChild(dateNode);
    views.appendChild(viewsNode);

    tr.appendChild(id);
    tr.appendChild(title);
    tr.appendChild(name);
    tr.appendChild(date);
    tr.appendChild(views);

    element.appendChild(tr);

    pageButtonChecker();
  }
};

async function getData(limit, search_type, word, start) {
  var limit = parseInt(limit);
  var start = parseInt(start);
  var search_type = search_type;
  var word = word;

  const url = `http://localhost:1337/boards/?_limit=${limit}${
    word ? "&&" + search_type + "_contains=" + word : ""
  }&&_start=${start}&&_sort=id:DESC`;
  const data = await fetch(url);
  const res = await data.json();
  dataArray = res;

  total_page = dataArray.length;

  while (element.lastElementChild) {
    element.removeChild(element.lastElementChild);
  }

  tableCreator(limit);
}

function tableCreator(limit) {
  for (let i = 0; i < limit; i++) {
    var datee = new Date(dataArray[i].created_at).toLocaleDateString();

    var tr = document.createElement("tr");

    var id = document.createElement("td");

    var title = document.createElement("td");
    var link = document.createElement("a");
    title.appendChild(link);
    // link.href = `http://localhost:1337/boards/${res[i].id}`;
    link.href = `./questions-read.html?${dataArray[i].id}`;

    var name = document.createElement("td");
    var date = document.createElement("td");
    var views = document.createElement("td");

    var idNode = document.createTextNode(dataArray[i].id);
    var titleNode = document.createTextNode(dataArray[i].title);
    var nameNode = document.createTextNode(dataArray[i].name);
    var dateNode = document.createTextNode(datee);
    var viewsNode = document.createTextNode(dataArray[i].views);

    id.appendChild(idNode);
    link.appendChild(titleNode);
    name.appendChild(nameNode);
    date.appendChild(dateNode);
    views.appendChild(viewsNode);

    tr.appendChild(id);
    tr.appendChild(title);
    tr.appendChild(name);
    tr.appendChild(date);
    tr.appendChild(views);

    element.appendChild(tr);
  }
}

function pageButtonChecker() {
  if (page < 2) {
    previous_button.disabled = true;
    previous_button.style.cursor = "not-allowed";
  } else {
    previous_button.disabled = false;
    previous_button.style.cursor = "pointer";
  }

  if (page > total_pages - 1) {
    next_button.disabled = true;
    next_button.style.cursor = "not-allowed";
  } else {
    next_button.disabled = false;
    next_button.style.cursor = "pointer";
  }
}

getData(number, false, false, page_num);

window.onload = getDataCount().then(
  (res) => (total_pages.innerHTML = Math.round(res / 10))
);

async function getDataCount(limit, search_type, word, start) {
  const url = `http://localhost:1337/boards/count`;
  const data = await fetch(url);
  const res = await data.json();
  return res;
}
