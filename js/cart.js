const URL = "https://japceibal.github.io/emercado-api/user_cart/25801.json";


fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    mostrarInformacionEnHTML(data);
  })
  .catch(error => console.error('Error al realizar la solicitud:', error));

  function mostrarInformacionEnHTML(data) {
    const carritoContainer = document.getElementById('carritoContainer');

    // Verificar si hay productos en el carrito
    if (!data.articles || data.articles.length === 0) {
      carritoContainer.innerHTML = '<p class="alert alert-warning">El carrito está vacío</p>';
      return;
    }

    // Crear un contenedor con clase table-responsive
    const tableContainer = document.createElement('div');
    tableContainer.classList.add('table-responsive', 'col-md-8', 'mx-auto');

    // Crear una tabla dinámica con clases de Bootstrap
    const tabla = document.createElement('table');
    tabla.classList.add('table', 'table-striped', 'table-bordered');
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

    // Obtener el cuerpo de la tabla para agregar filas
    const tbody = tabla.querySelector('tbody');


// Iterar sobre los productos en el carrito
data.articles.forEach(producto => {
  // Crear una fila para cada producto
  const fila = document.createElement('tr');
  const subtotalCell = document.createElement('td'); // Agregamos una celda para el subtotal
  fila.innerHTML = `
    <td><img src="${producto.image}" alt="${producto.name}" style="width: 60px;"></td>
    <td>${producto.name}</td>
    <td class="col-1">
      <input type="number" class="btn btn-sm cantidad" value="${producto.count}" min="1" data-producto-id="${producto.id}">
    </td>
    <td>${producto.unitCost}</td>
    <td>${producto.currency}</td>
  `;

  // Agregar la fila al cuerpo de la tabla
  tbody.appendChild(fila);
  fila.appendChild(subtotalCell); // Agregamos la celda del subtotal

  // Función para calcular el subtotal y actualizar la celda
  const actualizarSubtotal = () => {
    const cantidadInput = fila.querySelector('.cantidad');
    const cantidad = parseInt(cantidadInput.value);
    const subtotal = cantidad * producto.unitCost;
    subtotalCell.textContent = subtotal;
  };

  // Escuchar el evento 'change' en el campo de cantidad
  fila.querySelector('.cantidad').addEventListener('change', actualizarSubtotal);

  // Calcular el subtotal inicial
  actualizarSubtotal();
});


    // Agregar la tabla al contenedor
    tableContainer.appendChild(tabla);

    // Limpiar el contenedor y agregar el contenedor con la tabla
    carritoContainer.innerHTML = '';
    carritoContainer.appendChild(tableContainer);
  }
