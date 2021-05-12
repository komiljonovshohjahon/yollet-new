const search_button = document.querySelector("#search-button");
const search_container = document.querySelector("#search-container");
const search_input = document.querySelector("#search-input");
const items_number = document.querySelector("#num-of-items");
const search_select = document.querySelector("#search-select");
const page = document.querySelector("#page");
const total_pages = document.querySelector("#total-pages");
const next_button = document.querySelector("#next");
const previous_button = document.querySelector("#previous");
const toggle_search = document.querySelector("#search-toggle");
const search_section = document.querySelector("#search-section");
const write = document.querySelector("#write");

function pageButtonChecker() {
  if (parseInt(page.innerHTML) < 2) {
    previous_button.disabled = true;
    previous_button.style.cursor = "not-allowed";
  } else {
    previous_button.disabled = false;
    previous_button.style.cursor = "pointer";
  }

  if (parseInt(page.innerHTML) > parseInt(total_pages.innerHTML) - 1) {
    next_button.disabled = true;
    next_button.style.cursor = "not-allowed";
  } else {
    next_button.disabled = false;
    next_button.style.cursor = "pointer";
  }
}

var toggle = false;
var search_type = search_select.value;
var number = items_number.value;
var page_num = 10;

items_number.addEventListener("change", function () {
  number = items_number.value;
  getDataSelect(number);
});

search_select.addEventListener("change", function () {
  search_type = search_select.value;
});

search_container.addEventListener("submit", function (e) {
  e.preventDefault();
  var search = search_input.value;
  search === ""
    ? getData(items_number.value)
    : getDataSearch(search, number, search_type);
  // getDataSearch(search, number, search_type);
  // console.log(search);
});

next_button.addEventListener("click", function () {
  page.innerHTML = parseInt(page.innerHTML) + 1;
  page_num = page_num + 10;
  getDataPaging(page_num, parseInt(number));
});

previous_button.addEventListener("click", function () {
  page.innerHTML = parseInt(page.innerHTML) - 1;
  page_num = page_num - 10;
  getDataPaging(page_num, parseInt(number));
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

const getData = async (num) => {
  const url = `http://localhost:1337/boards/?_limit=${num}&&_sort=id:DESC`;
  const data = await fetch(url);
  const res = await data.json();

  console.log(res);

  total_pages.innerHTML = Math.floor(res.length / num) + 1;

  var element = document.getElementById("tbody");

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
    // link.href = `http://localhost:1337/boards/${res[i].id}`;
    link.href = `http://127.0.0.1:5500/pages/questions-read.html?${res[i].id}`;

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

const getDataSelect = async (num) => {
  const url = `http://localhost:1337/boards?_sort=id:DESC`;
  const data = await fetch(url);
  const res = await data.json();

  page.innerHTML = 1;
  console.log(res.length);
  total_pages.innerHTML = Math.floor(res.length / num) + 1;

  page_num = res.length;

  var element = document.getElementById("tbody");

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
    link.href = `http://127.0.0.1:5500/pages/questions-read.html?${res[i].id}`;

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

const getDataSearch = async (search, num, search_type) => {
  const url = `http://localhost:1337/boards/?${search_type}_contains=${search}&_sort=id:DESC`;
  const data = await fetch(url);
  const res = await data.json();
  var element = document.getElementById("tbody");

  console.log(res);
  total_pages.innerHTML = Math.floor(res.length / num) + 1;

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
    link.href = `http://127.0.0.1:5500/pages/questions-read.html?${res[i].id}`;

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

const getDataPaging = async (start, num) => {
  const url = `http://localhost:1337/boards/?_start=${start}&_limit=${num}&_sort=id:DESC`;
  const data = await fetch(url);
  const res = await data.json();

  var element = document.getElementById("tbody");

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
    link.href = `http://127.0.0.1:5500/pages/questions-read.html?${res[i].id}`;

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

getData(number);
