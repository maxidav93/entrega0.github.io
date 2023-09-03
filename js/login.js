const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");


window.addEventListener("load", () => {
  loginSection.style.display = "block";
  registerSection.style.display = "none";
});


loginBtn.addEventListener("click", () => {
  loginSection.style.display = "block";
  registerSection.style.display = "none";
});

registerBtn.addEventListener("click", () => {
  registerSection.style.display = "block";
  loginSection.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginSubmit"); 

  loginForm.addEventListener("click", async function (event) { 
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (username && password) {
      // Almacenar la sesión como iniciada en localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem("username", username);
      alert("¡Te damos la bienvenida nuevamente " + username + "! :D")
      // Redireccionar a la página de portada.
      window.location.href = 'index.html';
    } else {
      alert('Campos incompletos. Por favor inténtalo de nuevo.');
    }
  });

})

document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerSubmit");

  registerForm.addEventListener("click", async function (event) {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (newUsername && newPassword) {
      localStorage.setItem('newUsername', newUsername);
      localStorage.setItem('newPassword', newPassword);
      
      alert("¡Registro exitoso para " + newUsername + "! :D");
      

      window.location.href = 'index.html';
    } else {
      alert('Campos incompletos. Por favor inténtalo de nuevo.');
    }
  });
});
