var query = window.location.search;
query = query.replace("?", "");

const getDataa = async () => {
  const url = `http://localhost:1337/boards/${query}`;
  const data = await fetch(url);
  const res = await data.json();

  console.log(res);

  if (res.private) {
    window.location.replace("https://www.google.com");
  }
};

$(document).ready(function () {
  getDataa();
});
