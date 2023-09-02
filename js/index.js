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



