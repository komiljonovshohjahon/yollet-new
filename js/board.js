// const views = document.querySelector(".views");
// const title = document.querySelector(".title");
// const date = document.querySelector(".date");
const getData = async () => {
  const url = "http://localhost:1337/boards";
  const data = await fetch(url);
  const res = await data.json();

  for (let i = 0; i < 10; i++) {
    var datee = new Date(res[i].created_at).toLocaleDateString();

    console.log(datee);

    var tr = document.createElement("tr");

    var id = document.createElement("td");

    var title = document.createElement("td");
    var link = document.createElement("a");
    title.appendChild(link);

    var name = document.createElement("td");
    var date = document.createElement("td");
    var views = document.createElement("td");

    var idNode = document.createTextNode(res[i].id);
    var titleNode = document.createTextNode(res[i].title);
    var nameNode = document.createTextNode(res[i].name);
    var dateNode = document.createTextNode(datee);
    var viewsNode = document.createTextNode(res[i].views);

    id.appendChild(idNode);
    title.appendChild(titleNode);
    name.appendChild(nameNode);
    date.appendChild(dateNode);
    views.appendChild(viewsNode);

    tr.appendChild(id);
    tr.appendChild(title);
    tr.appendChild(name);
    tr.appendChild(date);
    tr.appendChild(views);

    var element = document.getElementById("tbody");

    element.appendChild(tr);

    // views.innerHTML = item.views;
    // title.innerHTML = item.title;
    // name.innerHTML = item.name;
    // date.innerHTML = item.published_at;
  }
};
getData();
