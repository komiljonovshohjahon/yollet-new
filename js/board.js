const search_button = document.querySelector("#search-button");
const search_container = document.querySelector("#search-container");
const search_input = document.querySelector("#search-input");
const items_number = document.querySelector("#num-of-items");
const search_select = document.querySelector("#search-select");
const page = document.querySelector("#page");
const total_pages = document.querySelector("#total-pages");

var search_type = search_select.value;
var number = items_number.value;

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

const getData = async (num) => {
  const url = "http://localhost:1337/boards";
  const data = await fetch(url);
  const res = await data.json();

  current_page = res.length / num;
  page.innerHTML = parseInt(current_page);

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
  const url = `http://localhost:1337/boards?_limit=${num}`;
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

const getDataSearch = async (search, num, search_type) => {
  const url = `http://localhost:1337/boards/?${search_type}_in=${search}`;
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
