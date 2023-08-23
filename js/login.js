

  document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        if (username && password) {
            // Almacenar la sesión como iniciada en localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem("username", username);
            alert("¡Te damos la bienvenida nuevamente "+ username + "! :D")
            // Redireccionar a la página de portada.
            window.location.href = 'index.html';
          } else {
            alert('Campos incompletos. Por favor inténtalo de nuevo.');
        }
    });

  })


