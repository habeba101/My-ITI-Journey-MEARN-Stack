$(".aboutBtn").click(function () {
  cleanForm();
  $(".complainData").hide();
  $(".aboutContainer").show();
  $(".serviceContainer").hide();
  $(".complainContainer").hide();
  $(".GalllaryContainer").hide();
});

$(".GallaryBtn").click(function () {
  cleanForm();
  $(".complainData").hide();

  let index = 0;
  $(".aboutContainer").hide();
  $(".serviceContainer").hide();
  $(".complainContainer").hide();
  $(".GalllaryContainer").show();

  $(".left").click(function () {
    if (index - 1 >= 1) $(".image").attr("src", `Images/${--index}.jpg`);
  });

  $(".right").click(function () {
    if (index + 1 <= 8) $(".image").attr("src", `Images/${++index}.jpg`);
  });
});

$(".ServicesBtn").click(function () {
  cleanForm();
  $(".complainData").hide();

  $(".GalllaryContainer").hide();
  $(".aboutContainer").hide();
  $(".complainContainer").hide();
  $(".serviceContainer").slideToggle();
});

$(".ComplainBtn").click(function () {
  $(".GalllaryContainer").hide();
  $(".aboutContainer").hide();
  $(".serviceContainer").hide();
  $(".complainContainer").show();
  $(".submitComplain").click(function () {
    $(".complainContainer").hide();
    $(".complainData").html(`<p>Name</p>
      <span>${$(".name").val()}</span>
      <br />
      <p>Email</p>
      <span>${$(".email").val()}</span>
      <br />
      <p>Phone</p>
      <span>${$(".phone").val()}</span>
      <br />
      <p>Complain</p>
      <span>${$(".complain").val()}</span>
      <br />
      <button class="edit">back to edit</button>`);
    $(".complainData").show();

    $(".edit").click(function () {
      $(".complainData").hide();
      $(".complainContainer").show();
    });
  });
});
function cleanForm() {
  $(".name").val("");
  $(".email").val("");
  $(".phone").val("");
  $(".complain").val("");
}
