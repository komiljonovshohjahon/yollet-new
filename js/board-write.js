const checkbox = document.querySelector(".checkbox-out");
const success = document.querySelector(".success");
const form = document.querySelector(".form-container");
success.classList.add("hidden");

var query = window.location.search;
query = query.replace("?", "");

const getData = async () => {
  const url = `http://localhost:1337/boards/${query}`;
  const data = await fetch(url);
  const res = await data.json();

  return res;
};

if (!query) {
  let on = false;
  checkbox.addEventListener("click", function () {
    on = !on;
    on
      ? checkbox.classList.add("pressed")
      : checkbox.classList.remove("pressed");
  });

  console.log(query);

  $(() => {
    const $form = $("form");

    $form.on("submit", function (e) {
      e.preventDefault();

      const $form = $(this);
      const data = $form.serializeArray();

      const formData = data.reduce((acc, current) => {
        acc[current.name] = current.value;
        acc["private"] = on;
        return acc;
      }, {});

      $.ajax({
        type: "POST",
        url: "http://localhost:1337/boards",
        data: formData,
      })
        .done(function () {
          success.classList.remove("hidden");
          $(".form-container").get(0).reset();
          console.log("succes");
        })
        .fail(function () {
          console.log("error");
        });
    });
  });
} else {
  getData().then((res) => {
    if (localStorage.getItem("check")) {
      localStorage.clear();
      form.name.value = res.name;
      form.password.value = res.password;
      form.email.value = res.email;
      form.number.value = res.number;
      form.title.value = res.title;
      form.message.value = res.message;

      let on = res.private;

      on
        ? checkbox.classList.add("pressed")
        : checkbox.classList.remove("pressed");

      checkbox.addEventListener("click", function () {
        on = !on;
        on
          ? checkbox.classList.add("pressed")
          : checkbox.classList.remove("pressed");
      });

      $(() => {
        const $form = $("form");

        $form.on("submit", function (e) {
          e.preventDefault();

          const $form = $(this);
          const data = $form.serializeArray();

          const formData = data.reduce((acc, current) => {
            acc[current.name] = current.value;
            acc["private"] = on;
            return acc;
          }, {});

          $.ajax({
            type: "PUT",
            url: `http://localhost:1337/boards/${query}`,
            data: formData,
          })
            .done(function () {
              success.classList.remove("hidden");
              $(".form-container").get(0).reset();
              checkbox.classList.remove("pressed");
            })
            .fail(function () {
              console.log("error");
            });
        });
      });
    }
  });
}
