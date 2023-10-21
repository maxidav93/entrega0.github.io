document.addEventListener("DOMContentLoaded", () => {
  mostrarInformacionEnHTML();
});

let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarInformacionEnHTML(data) {
  const carritoContainer = document.getElementById('carritoContainer');

  if (!carritoActual || carritoActual.length === 0) {
    carritoContainer.innerHTML = '<p class="alert alert-warning">El carrito está vacío</p>';
    return;
  }

  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table-responsive");

  const tabla = document.createElement('table');
  tabla.classList.add('table', 'table-striped', 'table-bordered', 'w-100', 'table-responsive');
  tabla.innerHTML = `
      <thead class="thead-dark text-center">
        <tr>
          <th>Producto</th>
          <th>Nombre</th>
          <th class="col-1">Cantidad</th>
          <th>Costo</th>
          <th>Moneda</th>
          <th>Subtotal</th>
          <th></th>
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
    const subtotalCell = document.createElement("td");
    fila.innerHTML = `
        <td><img src="${producto.image}" alt="${producto.name}" style="width: 70px;"></td>
        <td>${producto.name}</td>
        <td class="col-1">
          <input type="number" class="btn btn-sm cantidad" value="${producto.count}" min="1" data-producto-id="${producto.id}">
        </td>
        <td>${producto.unitCost}</td>
        <td>${producto.currency}</td>
        `;

    tbody.appendChild(fila);
    fila.appendChild(subtotalCell);
      //Boton de borrar

  const accionesCell = document.createElement('td');
  accionesCell.innerHTML = `
    <i  onclick="borrarProducto(${producto.id})" class='btn custom-delete-btn fas fa-trash-alt' id="botonBorrar"></i>
  `;
  fila.appendChild(accionesCell);
  accionesCell.setAttribute("id", "tdboton");

  // Asignar un evento al cambio de cantidad
  fila.querySelector(".cantidad").addEventListener("change", () => {
    actualizarSubtotal(fila, producto, producto.id);
  });
    // Mostrar el subtotal al cargar la página
    actualizarSubtotal(fila, producto, producto.id);
  });






    accionesCell.setAttribute("id" , "tdboton")




// Función para actualizar el subtotal
function actualizarSubtotal(fila, producto, id) {
  const cantidadInput = fila.querySelector(".cantidad");
  const cantidad = parseInt(cantidadInput.value);
  const subtotalCell = fila.querySelector("td:last-child");  // Última celda de la fila para mostrar el subtotal

  if (producto.currency === 'UYU') {
    subtotalCell.textContent = `UYU ${cantidad * producto.unitCost * 40}`;
  } else {
    subtotalCell.textContent = `${producto.currency} ${(cantidad * producto.unitCost).toFixed(2)}`;
  }

  // Actualizar el producto en el Local Storage con la nueva cantidad
  const productoIndex = carritoActual.findIndex(item => item.id === id);
  if (productoIndex !== -1) {
    carritoActual[productoIndex].count = cantidad;
    localStorage.setItem('carrito', JSON.stringify(carritoActual));
  }

  // Actualizar el costo total
  mostrarCosto();
}


  tableContainer.appendChild(tabla);
  carritoContainer.innerHTML = "";
  carritoContainer.appendChild(tableContainer);
}
function eliminarProductoDelLocalStorage(id) {
  // Obten el contenido actual del Local Storage
  var productosEnLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];

  // Filtra los productos para eliminar el que coincide con el ID
  productosEnLocalStorage = productosEnLocalStorage.filter(function(producto) {
      return producto.id !== id;
  });

  // Actualiza el Local Storage con la nueva lista de productos
  localStorage.setItem('carrito', JSON.stringify(productosEnLocalStorage));
};


  function borrarProducto(id) {
        // Muestra una alerta de confirmación
        var confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');

        // Si el usuario hace clic en "Aceptar" en la alerta de confirmación
        if (confirmacion) {

    // Encuentra el elemento SVG haciendo referencia al ícono del bote de basura
    var iElement = document.querySelector('i[onclick="borrarProducto(' + id + ')"]');

    // Encuentra el elemento padre del SVG
    var parentElement = iElement.parentElement;

    // Encuentra el elemento padre de la fila que contiene el ícono del bote de basura
    var rowElement = parentElement.parentElement;

    // Elimina la fila completa
    rowElement.remove();
    // Elimina el producto del Local Storage
    eliminarProductoDelLocalStorage(id);
  }
}
// Agregar un producto al carrito
function agregarProductoAlCarrito(producto) {
  // Agrega el producto al carrito (carritoActual)
  carritoActual.push(producto);

  // Actualiza el Local Storage con los productos
  localStorage.setItem("carrito", JSON.stringify(carritoActual));

  // Llama a mostrarInformacionEnHTML para actualizar la vista
  mostrarInformacionEnHTML();
}

