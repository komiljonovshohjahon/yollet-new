const search_button = document.querySelector("#search-button");
const search_container = document.querySelector("#search-container");
const search_input = document.querySelector("#search-input");
const items_number = document.querySelector("#num-of-items");
const search_select = document.querySelector("#search-select");
const page = document.querySelector("#page");
const total_pages = document.querySelector("#total-pages");
const next_button = document.querySelector("#next");
const previous_button = document.querySelector("#previous");

var search_type = search_select.value;
var number = items_number.value;
var page_num = parseInt(number);

items_number.addEventListener("change", function () {
  number = items_number.value;
  getDataSelect(number);
});

search_select.addEventListener("change", function () {
  search_type = search_select.value;
});

search_button.addEventListener("click", function () {
  search_container.addEventListener("submit", function (e) {
    e.preventDefault();
    var search = search_input.value;
    search === ""
      ? getData(items_number.value)
      : getDataSearch(search, number, search_type);
    // getDataSearch(search, number, search_type);
    // console.log(search);
  });
});

next_button.addEventListener("click", function () {
  getDataPaging(page_num, parseInt(number));
  page_num = page_num + 10;
});

previous_button.addEventListener("click", function () {
  page_num = page_num - 10;
  getDataPaging(page_num, parseInt(number));
});

const getData = async (num) => {
  const url = "http://localhost:1337/boards/?_sort=id:DESC";
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
    link.href = `http://localhost:1337/boards/${res[i].id}`;

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
  }
};

const getDataSelect = async (num) => {
  const url = `http://localhost:1337/boards?_limit=${num}&_sort=id:DESC`;
  const data = await fetch(url);
  const res = await data.json();

  console.log(res.length);
  page_num = res.length;

  if (res.length < num) {
    next_button.disabled = true;
    previous_button.disabled = true;
    next_button.style.cursor = "not-allowed";
    previous_button.style.cursor = "not-allowed";
  } else {
    next_button.disabled = false;
    previous_button.disabled = false;
    next_button.style.cursor = "pointer";
    previous_button.style.cursor = "pointer";
  }

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
    link.href = `http://localhost:1337/boards/${res[i].id}`;

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
  }
};

const getDataSearch = async (search, num, search_type) => {
  const url = `http://localhost:1337/boards/?${search_type}_contains=${search}&_sort=id:DESC`;
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
    link.href = `http://localhost:1337/boards/${res[i].id}`;

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
    link.href = `http://localhost:1337/boards/${res[i].id}`;

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
  }
};

getData(number);
