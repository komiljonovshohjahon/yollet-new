const incorrect = document.querySelector("#incorrect");

var query = window.location.search;
query = query.replace("?", "");

$(() => {
  const $form = $("form");

  $form.on("submit", function (e) {
    e.preventDefault();

    const $form = $(this);
    const data = $form.serializeArray();

    const formData = data.reduce((acc, current) => {
      acc[current.name] = current.value;
      return acc;
    }, {});

    getData(formData.password).then((res) => {
      if (res) {
        window.location.href = `http://127.0.0.1:5500/pages/questions-read.html?${query}`;
        localStorage.setItem("check", true);
      } else {
        incorrect.classList.remove("hidden");
        incorrect.classList.add("flex");
      }
    });
  });
});

const getData = async (password) => {
  const url = `http://localhost:1337/boards/${query}`;
  const data = await fetch(url);
  const res = await data.json();

  if (password === res.password) {
    return true;
  } else {
    return false;
  }
};
