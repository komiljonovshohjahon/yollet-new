var query = window.location.search;
query = query.replace("?", "");
const hide = document.querySelector("#board");

const getDataa = async () => {
  const url = api_url + `boards/${query}`;
  const data = await fetch(url);
  const res = await data.json();

  if (res.private) {
    if (localStorage.getItem("check")) {
      `./questions-read.html?${query}`;
      await fetch(api_url + `boards/${query}/counter`);
      localStorage.clear();
    } else {
      window.location.replace(`./password.html?${query}`);
    }
  }
};

$(document).ready(function () {
  getDataa();
});
