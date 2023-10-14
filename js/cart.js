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
    tableContainer.classList.add( 'mx-auto', 'table-responsive');

    // Crear una tabla dinámica con clases de Bootstrap
    const tabla = document.createElement('table');
    tabla.classList.add('table', 'table-striped','table-bordered', 'w-100', 'table-responsive');
    tabla.innerHTML = `
      <thead class="thead-dark">
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
    <td><img src="${producto.image}" alt="${producto.name}" style="width: 70px;"></td>
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

    // Añadir celda para el icono de borrar
    const accionesCell = document.createElement('td');
    accionesCell.innerHTML = `
      
       <svg onclick="borrarProducto(${producto.id})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
       <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
     </svg>
    
    `;
    fila.appendChild(accionesCell);
    
    
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