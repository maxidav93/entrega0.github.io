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

function cambiarImagenFondo(url) {
    var jumbotron = document.querySelector(".jumbotron");
    jumbotron.style.background = "url('" + url + "') center / cover no-repeat";


}

function cambiarClase() {
    var checkbox = document.getElementById("toggle");
    var albumDiv = document.querySelector(".album");
    var jumbotron = document.querySelector(".jumbotron");
    var btn = document.querySelector(".btn.btn-light.btn-lg.btn-block");


    if (checkbox.checked) {
        albumDiv.classList.remove("bg-light");
        albumDiv.classList.add("bg-dark");
        localStorage.setItem("background", "bg-dark");

        // Cambiar el color de fondo del .jumbotron
        jumbotron.classList.remove("bg-light");
        jumbotron.classList.add("bg-dark");

        // Cambiar la imagen de fondo
        cambiarImagenFondo('img/imagenIndexSinFondo2.png', '#212529');
         // Cambiar la clase del botón
         btn.classList.remove("btn-light");
         btn.classList.add("btn-dark");
    }
    setTimeout(function() {
        checkbox.checked = false;
    }, 100);
}

var checkbox = document.getElementById("toggle");
checkbox.addEventListener("click", cambiarClase);

function cambiarClase2() {
    var checkbox = document.getElementById("toggle2");
    var albumDiv = document.querySelector(".album");
    var btn = document.querySelector(".btn.btn-dark.btn-lg.btn-block");

    if (checkbox.checked) {
        albumDiv.classList.remove("bg-dark");
        albumDiv.classList.add("bg-light");
        localStorage.setItem("background", "bg-light");

        // Cambiamos solo la imagen de fondo en .jumbotron
        cambiarImagenFondo('img/cover_back.png');
        // Cambiar la clase del botón
        btn.classList.remove("btn-dark");
        btn.classList.add("btn-light");
    }
    setTimeout(function() {
        checkbox.checked = false;
    }, 100); // Después de 1000ms (1 segundo), desmarcar el checkbox
}

var checkbox2 = document.getElementById("toggle2");
checkbox2.addEventListener("click", cambiarClase2);

// Función para restaurar el estado del modo oscuro almacenado en localStorage
function restaurarEstadoModoOscuro() {
    var albumDiv = document.querySelector(".album");
    var jumbotron = document.querySelector(".jumbotron");
    var btn = document.querySelector(".btn.btn-light.btn-lg.btn-block");
    var checkbox = document.getElementById("toggle");

    // Verificar si el modo oscuro está habilitado en localStorage
    var modoOscuroActivado = localStorage.getItem("background") === "bg-dark";

    // Establecer el estado del checkbox según el modo oscuro
    checkbox.checked = modoOscuroActivado;

    if (modoOscuroActivado) {
        // Si el modo oscuro está habilitado, aplicar los estilos oscuros
        albumDiv.classList.remove("bg-light");
        albumDiv.classList.add("bg-dark");
        // Cambiar el color de fondo del .jumbotron
        jumbotron.classList.remove("bg-light");
        jumbotron.classList.add("bg-dark");
        // Cambiar la clase del botón
        btn.classList.remove("btn-light");
        btn.classList.add("btn-dark");
        // Llamar a la función para cambiar la imagen de fondo
        cambiarImagenFondo('img/imagenIndexSinFondo2.png', '#212529');
    } else {
        // Si el modo oscuro no está habilitado, aplicar los estilos de luz
        albumDiv.classList.remove("bg-dark");
        albumDiv.classList.add("bg-light");
        // Cambiar el color de fondo del .jumbotron
        jumbotron.classList.remove("bg-dark");
        jumbotron.classList.add("bg-light");
        // Cambiar la clase del botón
        btn.classList.remove("btn-dark");
        btn.classList.add("btn-light");
        // Llamar a la función para cambiar la imagen de fondo
        cambiarImagenFondo('img/cover_back.png');
    }

    // Desactivar el checkbox después de 1 segundo
    setTimeout(function () {
        checkbox.checked = false;
    }, 100);
}

// Llama a la función para restaurar el estado del modo oscuro cuando la página se carga
window.addEventListener("load", restaurarEstadoModoOscuro);






