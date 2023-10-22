let carritoContainer = document.getElementById('carritoContainer');
let carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener("DOMContentLoaded", () => {
  mostrarInformacionEnHTML();
});

function mostrarInformacionEnHTML(data) {
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

    // Función para actualizar el subtotal
    const actualizarSubtotal = () => {
      const cantidadInput = fila.querySelector(".cantidad");
      const cantidad = parseInt(cantidadInput.value);

      if (producto.currency === 'UYU') {
        const subtotalValue = cantidad * producto.unitCost * 40;
        subtotalCell.textContent = `UYU ${subtotalValue}`;
      } else {
        const subtotalValue = cantidad * producto.unitCost;
        subtotalCell.textContent = `${producto.currency} ${(subtotalValue).toFixed(2)}`;
      }

      // Actualizar el producto en el carritoActual con la nueva cantidad
      const productoIndex = carritoActual.findIndex(item => item.id === producto.id);
      if (productoIndex !== -1) {
        carritoActual[productoIndex].count = cantidad;
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
      }

      mostrarCosto();
    };

    fila.querySelector(".cantidad").addEventListener("change", actualizarSubtotal);
    actualizarSubtotal();
  });

  tableContainer.appendChild(tabla);
  carritoContainer.innerHTML = "";
  carritoContainer.appendChild(tableContainer);
}

function mostrarCosto() {
  let subtotal = 0;
  carritoActual.forEach(producto => {
    if (producto.currency === 'UYU') {
      subtotal += producto.count * producto.unitCost * 40;
    } else {
      subtotal += producto.count * producto.unitCost;
    }
  });
  document.getElementById("subtotalCosto").textContent = `${parseFloat(subtotal).toFixed(2)}`;
}

function agregarProductoAlCarrito(producto) {
  // Agregar el producto al carritoActual
  carritoActual.push(producto);
  // Actualizar el almacenamiento local
  localStorage.setItem('carrito', JSON.stringify(carritoActual));
  // Actualizar la vista
  mostrarInformacionEnHTML();
}

function eliminarProductoDelLocalStorage(id) {
  // Filtrar los productos para eliminar el que coincide con el ID
  carritoActual = carritoActual.filter(producto => producto.id !== id);
  // Actualizar el almacenamiento local
  localStorage.setItem('carrito', JSON.stringify(carritoActual));
}