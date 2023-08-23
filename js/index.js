document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
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
      


const logout = document.getElementById("logout")

logout.addEventListener("click", ()=> {

var confirmacion = confirm("¿Estás seguro de que deseas cerrar sesión?");
if (confirmacion) {
    localStorage.removeItem("isLoggedIn")
    window.location.href = 'login.html'
}

})

const nombreNav = document.getElementById("nombreNav");
const usernameLocal = localStorage.getItem("username");
nombreNav.textContent = usernameLocal;
