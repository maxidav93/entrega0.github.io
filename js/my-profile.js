

function showError(input, message) {
    input.classList.add("is-invalid"); // Agrega clase de Bootstrap para resaltar el campo
    const alertDiv = document.createElement("div");
    alertDiv.className = "invalid-feedback";
    alertDiv.textContent = message;
    input.parentNode.appendChild(alertDiv);
}

function showSuccess(input) {
    input.classList.remove("is-invalid"); // Elimina la clase de Bootstrap para resaltar el campo
    input.classList.add("is-valid"); // Agrega clase de Bootstrap para indicar éxito
    const successDiv = document.createElement("div");
    successDiv.className = "valid-feedback";
    input.parentNode.appendChild(successDiv);
}



document.addEventListener("DOMContentLoaded", () => {
    const primerNombreInput = document.getElementById("primerNombre");
    const primerApellidoInput = document.getElementById("primerApellido");
    const btnPerfil = document.getElementById("btnPerfil");
    const feedbackElements = document.querySelectorAll(".invalid-feedback, .valid-feedback");
    feedbackElements.forEach((element) => element.remove());
    btnPerfil.addEventListener("click", () => {
        // Obtenemos los valores de los campos
        const primerNombre = primerNombreInput.value.trim();
        const primerApellido = primerApellidoInput.value.trim();

        // Validamos que los campos no estén vacíos
        if (primerNombre === "") {
            showError(primerNombreInput, "Este campo es obligatorio.");
            return; // Detenemos el proceso si hay un error
        } else {
            showSuccess(primerNombreInput);
        }

        if (primerApellido === "") {
            showError(primerApellidoInput, "Este campo es obligatorio.");
            return; // Detenemos el proceso si hay un error
        } else {
            showSuccess(primerApellidoInput);
        }

        // Si ambos campos son válidos, puedes continuar con el proceso de guardar los cambios o enviar los datos al servidor.
        // Agrega aquí el código para guardar los cambios o enviar los datos al servidor.
    });
});

































