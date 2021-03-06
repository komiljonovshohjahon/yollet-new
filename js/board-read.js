const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const title = document.querySelector("#title");
const message = document.querySelector("#message");
const reply = document.querySelector("#reply");
const edit = document.querySelector("#edit");

setTimeout(() => {
  hide.classList.remove("hide-content");
}, 400);

var query = window.location.search;
query = query.replace("?", "");

edit.addEventListener("click", function () {
  window.location.href = `./password.html?edit/${query}`;
});

const getData = async () => {
  const url = api_url + `boards/${query}/counter`;
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
