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
var element_sm = document.getElementById("tbody-sm");

var dataArray = [];

var toggle = false;
var search_type = search_select.value;
var number = parseInt(items_number.value);
var page_num = 0;
var word;
var page = parseInt(page_number.innerHTML);

search_input.addEventListener("change", function () {
  word = search_input.value;
});

items_number.addEventListener("change", function () {
  number = items_number.value;
  page = 1;
  page_number.innerHTML = page;
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

  total_pages.innerHTML;

  while (element.lastElementChild) {
    element.removeChild(element.lastElementChild);
  }
  while (element_sm.lastElementChild) {
    element_sm.removeChild(element_sm.lastElementChild);
  }

  tableCreator(limit);
}

function tableCreator(limit) {
  for (let i = 0; i < limit; i++) {
    var datee_sm = new Date(dataArray[i].created_at).toLocaleDateString();
    var div = document.createElement("div");
    var title_sm = document.createElement("h1");
    var link_sm = document.createElement("a");
    title_sm.appendChild(link_sm);

    if (dataArray[i].private) {
      link_sm.href = `http://localhost:5500/pages/password.html?${dataArray[i].id}`;
    } else {
      link_sm.href = `http://localhost:5500/pages/questions-read.html?${dataArray[i].id}`;
    }

    var name_sm = document.createElement("label");
    name_sm.classList.add("name_sm");

    var date_sm = document.createElement("label");
    date_sm.classList.add("date_sm");

    var views_sm = document.createElement("label");
    views_sm.classList.add("views_sm");

    var titleNode_sm = document.createTextNode(dataArray[i].title);
    var nameNode_sm = document.createTextNode(dataArray[i].name);
    var dateNode_sm = document.createTextNode(datee_sm);
    var viewsNode_sm = document.createTextNode(dataArray[i].views);

    title_sm.appendChild(titleNode_sm);
    name_sm.appendChild(nameNode_sm);
    date_sm.appendChild(dateNode_sm);
    views_sm.appendChild(viewsNode_sm);

    div.appendChild(title_sm);
    div.appendChild(name_sm);
    div.appendChild(date_sm);
    div.appendChild(views_sm);

    element_sm.appendChild(div);
  }

  for (let i = 0; i < limit; i++) {
    var datee = new Date(dataArray[i].created_at).toLocaleDateString();

    // Mobile view table

    var tr = document.createElement("tr");

    var id = document.createElement("td");

    var title = document.createElement("td");

    var link = document.createElement("a");
    title.appendChild(link);

    if (dataArray[i].private) {
      link.href = `http://localhost:5500/pages/password.html?${dataArray[i].id}`;
    } else {
      link.href = `http://localhost:5500/pages/questions-read.html?${dataArray[i].id}`;
    }

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

// window.onload = getDataCount().then(
//   (res) => (total_pages.innerHTML = Math.round(res / 10))
// );
getData(number, false, false, page_num);

async function getDataCount(search_type, word, start) {
  const url = `http://localhost:1337/boards/?${
    word ? "&&" + search_type + "_contains=" + word : ""
  }&&_start=${start}&&_sort=id:DESC`;
  const data = await fetch(url);
  const res = await data.json();
  return res;
}

const passCheck = async (id) => {
  const url = `http://localhost:1337/boards/${id}`;
  const data = await fetch(url);
  const res = await data.json();

  return res;
};
