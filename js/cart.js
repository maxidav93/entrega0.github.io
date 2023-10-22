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
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody class="text-center">
            <!-- Los datos del carrito se agregarán aquí dinámicamente -->
        </tbody>
    `;

    const tbody = tabla.querySelector('tbody');

    carritoActual.forEach(producto => {
        const fila = crearFilaProducto(producto);
        tbody.appendChild(fila);
    });

    tableContainer.appendChild(tabla);
    carritoContainer.innerHTML = "";
    carritoContainer.appendChild(tableContainer);
}

function crearFilaProducto(producto) {
    const fila = document.createElement("tr");

    const imagenCell = document.createElement("td");
    imagenCell.innerHTML = `<img src="${producto.image}" alt="${producto.name}" style="width: 70px;">`;

    const nombreCell = document.createElement("td");
    nombreCell.textContent = producto.name;

    const cantidadCell = document.createElement("td");
    cantidadCell.innerHTML = `
        <input type="number" class="btn btn-sm cantidad" value="${producto.count}" min="1" data-producto-id="${producto.id}">
    `;

    const costoCell = document.createElement("td");
    costoCell.textContent = producto.unitCost;

    const monedaCell = document.createElement("td");
    monedaCell.textContent = producto.currency;

    const subtotalCell = document.createElement("td");

    const eliminarCell = document.createElement("td");
    eliminarCell.innerHTML = `
        <button class="btn btn-danger" data-producto-id="${producto.id}">Eliminar</button>
    `;

    fila.appendChild(imagenCell);
    fila.appendChild(nombreCell);
    fila.appendChild(cantidadCell);
    fila.appendChild(costoCell);
    fila.appendChild(monedaCell);
    fila.appendChild(subtotalCell);
    fila.appendChild(eliminarCell);

    cantidadCell.querySelector(".cantidad").addEventListener("change", () => {
        actualizarSubtotal(fila, producto);
    });

    eliminarCell.querySelector("button").addEventListener("click", () => {
        eliminarProducto(producto.id);
    });

    actualizarSubtotal(fila, producto);

    return fila;
}

function actualizarSubtotal(fila, producto) {
    const cantidadInput = fila.querySelector(".cantidad");
    const cantidad = parseInt(cantidadInput.value);
    const subtotal = fila.querySelector("td:last-child");
    if (producto.currency === 'UYU') {
        const subtotalValue = cantidad * producto.unitCost * 40;
        subtotal.textContent = `UYU ${subtotalValue}`;
    } else {
        const subtotalValue = cantidad * producto.unitCost;
        subtotal.textContent = `${producto.currency} ${(subtotalValue).toFixed(2)}`;
    }
    displayCosts();
}

function eliminarProducto(id) {
    carritoActual = carritoActual.filter(producto => producto.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    mostrarInformacionEnHTML();
}

function displayCosts() {
    let subtotal = 0;
    carritoActual.forEach(producto => {
        if (producto.currency === 'UYU') {
            subtotal += producto.count * producto.unitCost * 40;
        } else {
            subtotal += producto.count * producto.unitCost;
        }
    }
    );
    document.getElementById("subtotalCosto").textContent = `${parseFloat(subtotal).toFixed(2)}`;
}
