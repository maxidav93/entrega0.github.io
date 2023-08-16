document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const errorMessage = document.getElementById("error-message");

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    window.location.href = "https://fauslo.github.io/workspace1/";
  });
});
