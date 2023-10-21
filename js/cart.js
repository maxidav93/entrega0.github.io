document.addEventListener("DOMContentLoaded", () => {
  mostrarInformacionEnHTML();
});

function mostrarInformacionEnHTML(data) {
  const carritoContainer = document.getElementById('carritoContainer');
  const subtotalTotalValue = document.getElementById('subtotalTotalValue'); // Elemento donde se mostrará el subtotal total

  const carritoActual = JSON.parse(localStorage.getItem("carrito"))

  if (!carritoActual || carritoActual.length === 0) {
    carritoContainer.innerHTML = '<p class="alert alert-warning">El carrito está vacío</p>';
    subtotalTotalValue.textContent = '$0.00'; // Establecer el subtotal total a $0.00 si el carrito está vacío
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

        const accionesCell = document.createElement('td');
        accionesCell.innerHTML = `

           <svg onclick="borrarProducto(${producto.id})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
           <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
         </svg>

        `;
        fila.appendChild(accionesCell);

        //TODO: modificar para que se actualice el localStorage
        const actualizarSubtotal = () => {

          const cantidadInput = fila.querySelector(".cantidad");
          const cantidad = parseInt(cantidadInput.value);

          const subtotal = cantidad * producto.unitCost;
          subtotalCell.innerHTML = `<span>${subtotal.toFixed(2)}</span>`;
        };

        fila.querySelector(".cantidad").addEventListener("change", actualizarSubtotal);
        actualizarSubtotal();
      });

      tableContainer.appendChild(tabla);
      carritoContainer.innerHTML = "";
      carritoContainer.appendChild(tableContainer);
    }
