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