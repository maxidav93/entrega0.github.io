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


document.addEventListener("DOMContentLoaded", function () {

function mostrarImagen() {
    // Obtener la imagen almacenada en localStorage
    const imagenGuardada = localStorage.getItem('imagenPerfil');
    const miniImagenPerfil = document.getElementById('miniImagenPerfil');
  
    
    // Verificar si hay una imagen almacenada
    if (imagenGuardada) {
        // Utiliza imagenGuardada en lugar de e.target.result
        miniImagenPerfil.innerHTML = `<img src="${imagenGuardada}" alt="Miniatura de perfil" class="miniProfileImage">`;
    }
}

mostrarImagen();
});