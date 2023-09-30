document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        localStorage.setItem("catName", "Autos");
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        localStorage.setItem("catName", "Juguetes");
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        localStorage.setItem("catName", "Muebles");
        window.location = "products.html"
    });
});

// Comprobar si el usuario está logeado al cargar la página
const isLoggedIn = localStorage.getItem('isLoggedIn');
if (!isLoggedIn) {
    // Redirigir al inicio de sesión
    alert("Hola! No has iniciado sesión, ingrese sus datos por favor")
    window.location.href = 'login.html';
}

function cambiarClase() {
    var checkbox = document.getElementById("toggle");
    var albumDiv = document.querySelector(".album");

    if (checkbox.checked) {
      albumDiv.classList.remove("bg-light");
      albumDiv.classList.add("bg-dark");
      localStorage.setItem("background", "bg-dark");
    }
    checkbox.checked = false;

  }

  var checkbox = document.getElementById("toggle");
  checkbox.addEventListener("click", cambiarClase);


 function cambiarClase2() {
    var checkbox = document.getElementById("toggle2");
    var albumDiv = document.querySelector(".album");

    if (checkbox.checked) {
      albumDiv.classList.remove("bg-dark");
      albumDiv.classList.add("bg-light");
      localStorage.setItem("background", "bg-light");
    }
    checkbox.checked = false;

  }

  var checkbox = document.getElementById("toggle2");
  checkbox.addEventListener("click", cambiarClase2);

  // Función para restaurar el estado almacenado en el localStorage
function restaurarEstado() {
    var albumDiv = document.querySelector(".album");
    var savedBackground = localStorage.getItem("background");

    if (savedBackground === "bg-dark") {
        albumDiv.classList.remove("bg-light");
        albumDiv.classList.add("bg-dark");
        checkbox.checked = false;
    } else {
        albumDiv.classList.remove("bg-dark");
        albumDiv.classList.add("bg-light");
        checkbox.checked = false;
    }
}

// Llama a la función para restaurar el estado cuando la página se carga
window.addEventListener("load", restaurarEstado);



