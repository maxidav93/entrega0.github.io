

  document.addEventListener("DOMContentLoaded", () => {
    mostrarInformacionEnHTML();
  });
  
  function mostrarInformacionEnHTML(data) {
    console.log("Mostrando información del carrito...");
    const carritoContainer = document.getElementById("carritoContainer");
  
    // Obtener productos del LocalStorage
    const carritoActual = JSON.parse(localStorage.getItem("carrito"))
  
  
    // Verificar si hay productos en el carrito
    if (!carritoActual || carritoActual.length === 0) {
      carritoContainer.innerHTML = '<p class="alert alert-warning">El carrito está vacío</p>';
      return;
    }
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-responsive", "col-md-8", "mx-auto");
  
    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-striped", "table-bordered");
    tabla.innerHTML = `
        <thead class="thead-dark">
          <tr>
            <th>Producto</th>
            <th>Nombre</th>
            <th class="col-1">Cantidad</th>
            <th>Costo</th>
            <th>Moneda</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <!-- Los datos del carrito se agregarán aquí dinámicamente -->
        </tbody>
      `;
  
    const tbody = tabla.querySelector("tbody");
  
    // Iterar sobre los productos en el carrito
    carritoActual.forEach(producto => {
      const fila = document.createElement("tr");
      const subtotalCell = document.createElement("td");
      fila.innerHTML = `
        <td><img src="${producto.image}" alt="${producto.name}" style="width: 60px;"></td>
        <td>${producto.name}</td>
        <td class="col-1">
          <input type="number" class="btn btn-sm cantidad" value="${producto.count}" min="1" data-producto-id="${producto.id}">
        </td>
        <td>${producto.unitCost}</td>
        <td>${producto.currency}</td>
      `;
  
      tbody.appendChild(fila);
      fila.appendChild(subtotalCell);
  
      //TODO: modificar para que se actualice el localStorage
      const actualizarSubtotal = () => {

        const cantidadInput = fila.querySelector(".cantidad");
        const cantidad = parseInt(cantidadInput.value);

        const subtotal = cantidad * producto.unitCost;
        subtotalCell.textContent = subtotal;
      };
  
      fila.querySelector(".cantidad").addEventListener("change", actualizarSubtotal);
      actualizarSubtotal();
    });
  
    tableContainer.appendChild(tabla);
    carritoContainer.innerHTML = "";
    carritoContainer.appendChild(tableContainer);
  }
  