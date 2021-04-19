const name = document.querySelector("#name");
const surname = document.querySelector("#message");
const email = document.querySelector("#email");
const form = document.querySelector(".form-container");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   let formData = {
//     name: name.value,
//     surname: surname.value,
//     email: email.value,
//   };

//   let xhr = new XMLHttpRequest();
//   xhr.open("POST", "http://localhost:5000/post");
//   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//   xhr.onload = function () {
//     console.log(xhr.responseText);
//     if (xhr.responseText == "success") {
//       alert("Email sent");
//       name.value = "";
//       surname.value = "";
//       email.value = "";
//     } else {
//       alert("Error");
//     }
//   };
//   //   xhr.send(formData);
//   xhr.send("ASASAS");
// });

form.addEventListener("submit", function (e) {
  //   e.preventDefault();
  let formData = {
    name: name.value,
    surname: surname.value,
    email: email.value,
  };

  fetch("http://localhost:5000/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: {
      formData,
    },
  }).then((result) => {});
});
