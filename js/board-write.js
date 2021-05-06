const checkbox = document.querySelector(".checkbox-out");
const success = document.querySelector(".success");
success.classList.add("hidden");

let on = false;
checkbox.addEventListener("click", function () {
  on = !on;
  on ? checkbox.classList.add("pressed") : checkbox.classList.remove("pressed");
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
