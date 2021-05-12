var query = window.location.search;
query = query.replace("?", "");

const getDataa = async () => {
  const url = `http://localhost:1337/boards/${query}`;
  const data = await fetch(url);
  const res = await data.json();

  if (localStorage.getItem("check")) {
    `http://127.0.0.1:5500/pages/questions-read.html?${query}`;
    localStorage.clear();
  } else {
    window.location.replace(
      `http://127.0.0.1:5500/pages/password.html?${query}`
    );
  }
};

$(document).ready(function () {
  getDataa();
});
