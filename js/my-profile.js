document.addEventListener("DOMContentLoaded", function () {
    // Obtén los elementos de los campos de entrada
    const primerNombreInput = document.getElementById("primerNombre");
    const segundoNombreInput = document.getElementById("segundoNombre");
    const primerApellidoInput = document.getElementById("primerApellido");
    const segundoApellidoInput = document.getElementById("segundoApellido");
    const emailInput = document.getElementById("emailContacto");
    const contactoInput = document.getElementById("contacto");
    const imagenPerfil = document.getElementById("imagen")
    const imagenArea = document.getElementById("imagearea");


    // Recupera el correo electrónico del usuario del Local Storage
    const emailRegistrado = localStorage.getItem("emailRegistrado");

    // Verifica si el correo electrónico existe en el Local Storage y establece el valor en el campo de entrada de email
    if (emailRegistrado) {
        emailInput.value = emailRegistrado;
    }


    const btnPerfil = document.getElementById("btnPerfil");

    btnPerfil.addEventListener("click", () => {
        const primerNombre = primerNombreInput.value.trim();
        const primerApellido = primerApellidoInput.value.trim();
        const segundoNombre = segundoNombreInput.value.trim();
        const segundoApellido = segundoApellidoInput.value.trim();
        const email = emailInput.value.trim();

        const feedbackElements = document.querySelectorAll(".invalid-feedback, .valid-feedback");
        feedbackElements.forEach((element) => element.remove());

        if (primerNombre === "") {
            showError(primerNombreInput, "Este campo es obligatorio.");
        } else {
            showSuccess(primerNombreInput);
        }

        if (primerApellido === "") {
            showError(primerApellidoInput, "Este campo es obligatorio.");
        } else {
            showSuccess(primerApellidoInput);
        }

        if (segundoNombre !== "") {
            showSuccess(segundoNombreInput);
        } else {
            removeSuccess(segundoNombreInput);
        }



        if (segundoApellido !== "") {
            showSuccess(segundoApellidoInput);
        } else {
            removeSuccess(segundoApellidoInput);
        }


        if (email === "") {
            showError(emailInput, "El correo electrónico es obligatorio.");
        } else if (!validateEmail(email)) {
            showError(emailInput, "El correo electrónico no es válido.");
        } else {
            showSuccess(emailInput);
        }

        if (contactoInput.value.trim() !== "") {
            if (isNaN(contactoInput.value)) {
                showError(contactoInput, "Debe ingresar un número válido.");
                removeSuccess(contactoInput); // Remueve el éxito en caso de error
            } else {
                showSuccess(contactoInput);
                removeError(contactoInput); // Remueve el error si es un número válido
            }
        } else {
            removeSuccess(contactoInput); // Remueve el éxito si el campo está vacío
            removeError(contactoInput); // Remueve el error si el campo está vacío
            guardarImagen();
        }


        // Función para validar el correo electrónico
        function validateEmail(email) {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            return emailRegex.test(email);
        }

        // Función para mostrar el error
        function showError(input, message) {
            input.classList.add("is-invalid"); // Agrega clase de Bootstrap para resaltar el campo
            const alertDiv = document.createElement("div");
            alertDiv.className = "invalid-feedback";
            alertDiv.textContent = message;
            input.parentNode.appendChild(alertDiv);
        }

        // Función para mostrar el éxito
        function showSuccess(input) {
            input.classList.remove("is-invalid"); // Elimina la clase de Bootstrap para resaltar el campo
            input.classList.add("is-valid"); // Agrega clase de Bootstrap para indicar éxito
            const successDiv = document.createElement("div");
            successDiv.className = "valid-feedback";
            input.parentNode.appendChild(successDiv);
        }

        // Función para eliminar el éxito
        function removeSuccess(input) {
            input.classList.remove("is-valid"); // Elimina la clase de Bootstrap para indicar éxito
            const successDiv = input.parentNode.querySelector(".valid-feedback");
            if (successDiv) {
                successDiv.remove();
            }
        }
        // Función para eliminar el error
        function removeError(input) {
            input.classList.remove("is-invalid"); // Elimina la clase de Bootstrap para resaltar el campo
            const errorDiv = input.parentNode.querySelector(".invalid-feedback");
            if (errorDiv) {
                errorDiv.remove();
            }
        }
        function guardarImagen() {
           
          
            if (imagenPerfil.files && imagenPerfil.files[0]) {
              const reader = new FileReader();
          
              reader.onload = function (e) {
                // Muestra la imagen en la página (opcional)
                imagenArea.innerHTML = `<img src="${e.target.result}" alt="Imagen de perfil" class="profileImage">`;
          
                // Guarda la imagen en localStorage
                localStorage.setItem('imagenPerfil', e.target.result);
              };
          
              // Lee el contenido de la imagen como una URL de datos
              reader.readAsDataURL(imagenPerfil.files[0]);
            }
          }


        // Guardar los datos en el Local Storage
        localStorage.setItem("primerNombre", primerNombreInput.value);
        localStorage.setItem("segundoNombre", segundoNombreInput.value || "0"); // Si es nulo o vacío, guarda "0"
        localStorage.setItem("primerApellido", primerApellidoInput.value);
        localStorage.setItem("segundoApellido", segundoApellidoInput.value || "0"); // Si es nulo o vacío, guarda "0"
        localStorage.setItem("email", email);
        localStorage.setItem("contacto", contactoInput.value || "0"); // Si es nulo o vacío, guarda "0"
    });



    function mostrarImagen() {
        // Obtener la imagen almacenada en localStorage
        const imagenGuardada = localStorage.getItem('imagenPerfil');
        const miniImagenPerfil = document.getElementById('miniImagenPerfil');
      
        
        // Verificar si hay una imagen almacenada
        if (imagenGuardada) {
            // Utiliza imagenGuardada en lugar de e.target.result
            imagenArea.innerHTML = `<img src="${imagenGuardada}" alt="Imagen de perfil" class="profileImage rounded">`;
            miniImagenPerfil.innerHTML = `<img src="${imagenGuardada}" alt="Miniatura de perfil" class="miniProfileImage">`;
        }
    }

    mostrarImagen();
});





























