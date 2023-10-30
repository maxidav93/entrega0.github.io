const tipoEnvio = document.getElementById("tipoEnvio");
const elementoCosto = document.getElementById("subtotalCosto")
const carritoContainer = document.getElementById('carritoContainer');
const campoCostoEnvio = document.getElementById("envioCosto");
const campoCostoTotal = document.getElementById("totalCosto");
let carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

//constantes de validacion
const direccion = document.getElementById("inputAddress");
const esquina = document.getElementById("inputAddress2");
const ciudad = document.getElementById("inputCity");
const cp = document.getElementById("inputZip");
const comprar = document.getElementById("finalizarCompra");
const envio = document.getElementById("tipoEnvio");
const formaPago = document.getElementById("irAformadepago");
const avisoCarritoVacio = document.getElementById("aviso")



//constantes de modal 
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeBtn")
const mainModal = document.getElementById("mainModal");
const creditCheckbox = document.getElementById("creditOption");
const transferCheckbox = document.getElementById("transferOption");
const creditInputs = document.querySelector(".creditInputs");
const transferInputs = document.querySelector(".transferInputs");
const inputVencimiento = document.getElementById("vencimiento");
const accNumInput = document.getElementById("accNum");
const pageOverlay = document.querySelector(".page-overlay");
const divModal = document.getElementById("paymentModal");
const cardNum = document.getElementById("cardNum");
const segNum = document.getElementById("segNum");
const formadepago = document.getElementById("formadepago")

document.addEventListener("DOMContentLoaded", () => {
  mostrarInformacionEnHTML();
});

function mostrarInformacionEnHTML() {
  if (!carritoActual || carritoActual.length === 0) {
    carritoContainer.innerHTML = '<p class="alert alert-warning">El carrito está vacío</p>';
    return;
  }

  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table-responsive");

  const tabla = document.createElement('table');
  tabla.classList.add('table', 'w-100', 'table-responsive');
  tabla.innerHTML = `
    <thead class="thead-dark text-center">
      <tr>
        <th>Producto</th>
        <th>Nombre</th>
        <th class="col-1">Cantidad</th>
        <th>Costo</th>
        <th>Moneda</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody class="text-center">
      <!-- Los datos del carrito se agregarán aquí dinámicamente -->
    </tbody>
  `;


  // Obtener el cuerpo de la tabla para agregar filas
  const tbody = tabla.querySelector('tbody');

  carritoActual.forEach(producto => {
    const fila = document.createElement("tr");

    // Celda de la imagen
    const imagenCell = document.createElement("td");
    imagenCell.innerHTML = `<img src="${producto.image}" alt="${producto.name}" style="width: 70px;">`;

    // Celda del nombre
    const nombreCell = document.createElement("td");
    nombreCell.textContent = producto.name;

    // Celda de la cantidad con el botón de eliminación
    const cantidadCell = document.createElement("td");
    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.classList.add("btn", "btn-sm", "cantidad");
    cantidadInput.value = producto.count;
    cantidadInput.min = 1;
    cantidadInput.dataset.productoId = producto.id;
    cantidadCell.appendChild(cantidadInput);

    // Celda del costo
    const costoCell = document.createElement("td");
    costoCell.textContent = producto.unitCost;

    // Celda de la moneda
    const monedaCell = document.createElement("td");
    monedaCell.textContent = producto.currency;

    // Celda del subtotal
    const subtotalCell = document.createElement("td");

    // Botón de eliminación
    const eliminarButton = document.createElement("i");
    eliminarButton.classList.add("btn", "custom-delete-btn", "fas", "fa-trash-alt");
    eliminarButton.dataset.productoId = producto.id;
    eliminarButton.addEventListener("click", () => {

      let productoId = producto.id;
      var confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');
      // Si el usuario hace clic en "Aceptar" en la alerta de confirmación
      if (confirmacion) {
        carritoActual = carritoActual.filter(item => item.id !== productoId);
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
        mostrarInformacionEnHTML();
        mostrarCosto();
      }
    });

    // Celda de la acción con el botón de eliminación
    const accionCell = document.createElement("td");
    accionCell.appendChild(eliminarButton);

    // Función para actualizar el subtotal
    const actualizarSubtotal = () => {
      const cantidad = parseInt(cantidadInput.value);
      let subtotalValue = 0;


      subtotalValue = cantidad * producto.unitCost;
      subtotalCell.textContent = ` ${(subtotalValue).toFixed(2)}`;


      // Actualizar el producto en el carritoActual con la nueva cantidad
      const productoIndex = carritoActual.findIndex(item => item.id === producto.id);
      if (productoIndex !== -1) {
        carritoActual[productoIndex].count = cantidad;
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
      }

      mostrarCosto();
    };

    cantidadInput.addEventListener("change", actualizarSubtotal);
    actualizarSubtotal();

    // Agregar todas las celdas a la fila
    fila.appendChild(imagenCell);
    fila.appendChild(nombreCell);
    fila.appendChild(cantidadCell);
    fila.appendChild(costoCell);
    fila.appendChild(monedaCell);
    fila.appendChild(subtotalCell);
    fila.appendChild(accionCell);

    // Agregar la fila al cuerpo de la tabla
    tbody.appendChild(fila);
  });

  // Agregar la tabla al contenedor
  tableContainer.appendChild(tabla);

  // Limpiar el contenedor y agregar la tabla
  carritoContainer.innerHTML = "";
  carritoContainer.appendChild(tableContainer);
}

function mostrarCosto() {
  let subtotal = 0;

  carritoActual.forEach(producto => {
    if (producto.currency === 'UYU') {
      subtotal += producto.count * producto.unitCost / 40;
    } else {
      subtotal += producto.count * producto.unitCost;
    }

  });



  elementoCosto.textContent = `${parseFloat(subtotal).toFixed(2)}`;


  function obtenerTipodeEnvio() {
    let valorSeleccionado = tipoEnvio.value;
    // Define las tarifas de envío para cada tipo
    const tarifasEnvio = {
      premium: 0.15,   // 15%
      express: 0.07,   // 7%
      estandar: 0.05   // 5%
    };
    return tarifasEnvio[valorSeleccionado];
  }


  function calcularCosto() {
    let valorSeleccionado = obtenerTipodeEnvio() ?? 0
    let costoEnvio = subtotal * valorSeleccionado;
    campoCostoEnvio.textContent = `${parseFloat(costoEnvio).toFixed(2)}`;
    calcularTotal();

  }


  function calcularTotal() {
    let total = parseFloat(elementoCosto.textContent) + parseFloat(campoCostoEnvio.textContent);
    campoCostoTotal.textContent = total.toFixed(2);
  }
  calcularTotal();

  campoCostoEnvio.addEventListener("change", calcularCosto());
  tipoEnvio.addEventListener("change", () => calcularCosto());
  tipoEnvio.addEventListener("change", () => campoEnvio());
  formaPago.addEventListener("click", () => finalizarCompra());
  document.getElementById("subtotalCosto").textContent = `${parseFloat(subtotal).toFixed(2)}`;
}


function finalizarCompra() {
  if  (!carritoActual || carritoActual.length === 0) {
  
    avisoCarritoVacio.innerHTML = "Para continuar con su compra agregue al menos un artículo a su carrito"

    setTimeout(() =>{
      avisoCarritoVacio.innerHTML = ""
    }
    , 5000)
}
else if (envio.value == 0 || envio.value == "") {
    errorFaltaEnvio(envio);
  }  
  else {
    exitoEnvio(envio);
    window.location.href = 'detallesEnvio.html';
  };
};


function campoEnvio() {
  if (envio.value == 0 || envio.value == "") {
    errorFaltaEnvio(envio);
  } else {
    exitoEnvio(envio);
  };
};


/* Payment Modal Section */


function disableInputs(section) {
  const inputs = section.querySelectorAll("input");
  for (const input of inputs) {
    input.setAttribute("disabled", "true");
  }

}

function enableInputs(section) {
  const inputs = section.querySelectorAll("input");
  for (const input of inputs) {
    input.removeAttribute("disabled");
  }
}

window.addEventListener("load", () => {
  mainModal.style.display = "none"
});

openModal.addEventListener("click", () => {
  if (mainModal.style.display === "none") {
    mainModal.style.display = "flex";
    pageOverlay.style.display = "block";
  }
});

closeModal.addEventListener("click", function (event) {
  event.preventDefault(); // Evita el envío del formulario por defecto

  // Validar y quitar mensajes de alerta previos
  const feedbackElements = document.querySelectorAll(".invalid-feedback, .valid-feedback");
  feedbackElements.forEach((element) => element.remove());

  let canCloseModal = true; // Variable para verificar si se puede cerrar el modal

  if (!creditCheckbox.checked && !transferCheckbox.checked) {
    // Si ninguna casilla está marcada, se permite cerrar el modal
    canCloseModal = true;
  } else {
    if (!creditCheckbox.checked) {
      showError(openModal, "Debe seleccionar forma de pago");
      canCloseModal = false; // No se permite cerrar el modal
    } else {
      successFormaPago(openModal);
    }
  }

  if (creditCheckbox.checked) { 
    if (cardNum.value.trim() === "" || isNaN(cardNum.value) || cardNum.value.length < 14) {
      showError(cardNum, "Ingrese un número de tarjeta válido (Debe tener al menos 14 dígitos)");
      canCloseModal = false; // No se permite cerrar el modal
    }
    if (segNum.value.trim() === "" || isNaN(segNum.value) || segNum.value.length < 3) {
      showError(segNum, "Ingrese un número de seguridad válido (Debe tener al menos 3 dígitos)");
      canCloseModal = false; // No se permite cerrar el modal
    }
    if (inputVencimiento.value.trim() === "" ) {
      showError(inputVencimiento, "Ingrese una fecha de vencimiento válida (mm/aa)");
      canCloseModal = false; // No se permite cerrar el modal
    }
  }

  if (transferCheckbox.checked) {
    const numCuenta = accNumInput.value.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    if (numCuenta.length < 12) {
      showError(accNumInput, "El número de cuenta debe tener al menos 12 dígitos");
      canCloseModal = false; // No se permite cerrar el modal
    } else {
      canCloseModal = true;
    }
  }

  if (canCloseModal) {
    mainModal.style.display = "none";
    pageOverlay.style.display = "none";
  }
});


// formato de input de vencimiento 
inputVencimiento.addEventListener("input", function () {
  let inputValue = inputVencimiento.value;

  if (/^\d{2}$/.test(inputValue)) {
    inputVencimiento.value = inputValue + "/";
  } else if (/^\d{2}\/\d{2}$/.test(inputValue)) {
    inputVencimiento.value = inputValue.slice(0, 5);
  }
});


// formato de input de numero de cuenta

accNumInput.addEventListener("input", function () {
  const value = accNumInput.value.replace(/[^\d]/g, '');

  if (value.length > 12) {
    accNumInput.value = value.slice(0, 12);
  } else if (value.length > 8) {
    accNumInput.value = value.slice(0, 4) + '-' + value.slice(4, 8) + '-' + value.slice(8);
  } else if (value.length > 4) {
    accNumInput.value = value.slice(0, 4) + '-' + value.slice(4);
  } else {
    accNumInput.value = value;
  }
});

creditCheckbox.addEventListener("change", function () {
  if (creditCheckbox.checked) {
    enableInputs(creditInputs);
    transferCheckbox.checked = false;
    disableInputs(transferInputs);
  } else {
    disableInputs(creditInputs);
  }
});

transferCheckbox.addEventListener("change", function () {
  if (transferCheckbox.checked) {
    enableInputs(transferInputs);
    creditCheckbox.checked = false;
    disableInputs(creditInputs);
  } else {
    disableInputs(transferInputs);
  }
});





//Seccion para validaciones

function errorFaltaEnvio(input) {
  input.classList.add("is-invalid"); // Agrega clase de Bootstrap para resaltar el campo
};

function exitoEnvio(input) {
  input.classList.remove("is-invalid"); // Elimina la clase de Bootstrap para resaltar el campo
  input.classList.add("is-valid"); // Agrega clase de Bootstrap para indicar éxito
};


function mostrarError(element, message) {
  element.classList.add("error"); // Agrega clase de Bootstrap para resaltar el campo
  const alertDiv = document.createElement("div");
  alertDiv.className = "invalid-feedback";
  alertDiv.textContent = message;
  element.parentNode.appendChild(alertDiv);

}
function mostrarExito(element) {
  element.classList.remove("error"); // Elimina la clase de Bootstrap para resaltar el campo


  const successDiv = document.createElement("div");
  successDiv.className = "valid-feedback";

  element.parentNode.appendChild(successDiv);
};

function errorFaltaEnvio(input) {
  input.classList.add("is-invalid"); // Agrega clase de Bootstrap para resaltar el campo

};

function successFormaPago(input, message) {
  input.classList.remove("is-invalid"); // Elimina la clase de Bootstrap para resaltar el campo
  input.classList.add("is-valid");
  const alertDiv = document.createElement("div");
  alertDiv.className = "valid-feedback";
  alertDiv.textContent = message;
  input.parentNode.appendChild(alertDiv);
};

function showError(input, message) {
  input.classList.add("is-invalid"); // Agrega clase de Bootstrap para resaltar el campo
  const alertDiv = document.createElement("div");
  alertDiv.className = "invalid-feedback";
  alertDiv.textContent = message;
  input.parentNode.appendChild(alertDiv);
};

function showSuccess(input) {
  input.classList.remove("is-invalid"); // Elimina la clase de Bootstrap para resaltar el campo
  input.classList.add("is-valid"); // Agrega clase de Bootstrap para indicar éxito

  const successDiv = document.createElement("div");
  successDiv.className = "valid-feedback";

  input.parentNode.appendChild(successDiv);
};


comprar.addEventListener("click", function (event) {
  event.preventDefault(); // Evita el envío del formulario por defecto

  // Validar y quitar mensajes de alerta previos
  const feedbackElements = document.querySelectorAll(".invalid-feedback, .valid-feedback");
  feedbackElements.forEach((element) => element.remove());

  if (!creditCheckbox.checked && !transferCheckbox.checked) {
    showError(openModal, "Debe seleccionar forma de pago");
  }

  if (direccion.value.trim() === "") {
    showError(direccion, "Debe ingresar una dirección");
  }else{
    showSuccess(direccion)
  }

  if (esquina.value.trim() === "") {
    showError(esquina, "Debe completar el campo 'Esquina'");
  }else{
    showSuccess(esquina)
  }

  if (ciudad.value.trim() === "") {
    showError(ciudad, "Debe ingresar una ciudad");
  }else{
    showSuccess(ciudad)
  }

  if (cp.value.trim() === "") {
    showError(cp, "Debe ingresar un código postal");
  } else if (isNaN(cp.value)) {
    showError(cp, "Solo se permiten números en el código postal");
  } else{
    showSuccess(cp)
  }

  // Validar el carrito actual
  if (!carritoActual || carritoActual.length === 0) {
    showError(comprar, "El carrito de compra está vacío");
  }

  // Si no hay elementos con la clase "is-invalid," puedes enviar el formulario
  if (document.querySelectorAll(".is-invalid").length === 0) {
    appendAlert('Se ha realizado su compra!', 'success');
  }
});

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('');

  alertPlaceholder.append(wrapper);
};




