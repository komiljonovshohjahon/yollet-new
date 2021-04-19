// JQUERY METHOD

$(".form-container").submit(function (event, done) {
  var form = $(this);
  // server side validation
  // every contact form field is required
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "https://yollet-test-2.vercel.app/gmail-api/gmail",
    data: form.serialize(),
  });
  $("#submitted").removeClass("hide").addClass("open");

  // .done(function (data) {
  //   if (data.status == "OK") {
  //     $("#contact-success").modal("show");
  //   } else {
  //     return done("Please fill all of the fields.", false);
  //   }
  // });
});
