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

    if (checkbox.checked) {
        albumDiv.classList.remove("bg-light");
        albumDiv.classList.add("bg-dark");
        localStorage.setItem("background", "bg-dark");

        // Cambiar el color de fondo del .jumbotron
        jumbotron.classList.remove("bg-light");
        jumbotron.classList.add("bg-dark");

        // Cambiar la imagen de fondo
        cambiarImagenFondo('img/Frame 2.png', '#212529');
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

        // Cambiamos solo la imagen de fondo en .jumbotron
        cambiarImagenFondo('img/cover_back.png');
    }
    checkbox.checked = false;
}

var checkbox2 = document.getElementById("toggle2");
checkbox2.addEventListener("click", cambiarClase2);



/*

function cambiarImagenFondo(url) {
    var jumbotron = document.querySelector(".jumbotron");
    jumbotron.style.backgroundImage = "url('" + url + "')";
}

function cambiarModo() {
    var checkbox = document.getElementById("toggle");

    if (checkbox.checked) {
        document.body.classList.remove("bg-light");
        document.body.classList.add("bg-dark");
        localStorage.setItem("background", "bg-dark");
        cambiarImagenFondo('../img/Frame 1.png');
    } else {
        document.body.classList.remove("bg-dark");
        document.body.classList.add("bg-light");
        localStorage.setItem("background", "bg-light");
        cambiarImagenFondo('../img/cover_back.png');
    }

    checkbox.checked = false;
}

var checkbox = document.getElementById("toggle");
checkbox.addEventListener("click", cambiarModo);

// Resto del código...
*/