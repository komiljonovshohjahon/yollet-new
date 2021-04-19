// JQUERY METHOD

$(".form-container").submit(function (event, done) {
  var form = $(this);
  // server side validation
  // every contact form field is required
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "http://localhost:5000/post",
    data: form.serialize(),
  });
  $("#submitted").removeClass("hidden").addClass("open");

  // .done(function (data) {
  //   if (data.status == "OK") {
  //     $("#contact-success").modal("show");
  //   } else {
  //     return done("Please fill all of the fields.", false);
  //   }
  // });
});
