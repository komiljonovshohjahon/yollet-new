const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const title = document.querySelector("#title");
const message = document.querySelector("#message");
const reply = document.querySelector("#reply");

console.log("AFTER PAGE LOAD");

var query = window.location.search;
query = query.replace("?", "");

const getData = async () => {
  const url = `http://localhost:1337/boards/${query}`;
  const data = await fetch(url);
  const res = await data.json();

  name.innerHTML = res.name;
  email.innerHTML = res.email;
  phone.innerHTML = res.number;
  title.innerHTML = res.title;
  message.innerHTML = res.message;

  if (res.reply === undefined || res.reply === null) {
    reply.innerHTML = "No reply yet";
  } else {
    reply.innerHTML = res.reply;
  }
};

getData();
