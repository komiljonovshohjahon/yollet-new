const incorrect = document.querySelector("#incorrect");

var query = window.location.search;
query = query.replace("?", "");
sliced_query = query.slice(5);

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

    if (!sliced_query) {
      getData(formData.password).then((res) => {
        if (res) {
          window.location.href = `http://127.0.0.1:5500/pages/questions-read.html?${
            sliced_query ? sliced_query : query
          }`;
          localStorage.setItem("check", true);
        } else {
          incorrect.classList.remove("hidden");
          incorrect.classList.add("flex");
        }
      });
    } else {
      getData(formData.password).then((res) => {
        if (res) {
          window.location.href = `http://127.0.0.1:5500/pages/questions-write.html?${sliced_query}`;
          localStorage.setItem("check", true);
        } else {
          incorrect.classList.remove("hidden");
          incorrect.classList.add("flex");
        }
      });
    }
  });
});

const getData = async (password) => {
  const url = `http://localhost:1337/boards/${
    sliced_query ? sliced_query : query
  }`;
  const data = await fetch(url);
  const res = await data.json();

  if (password === res.password) {
    console.log(password);
    return true;
  } else {
    return false;
  }
};
