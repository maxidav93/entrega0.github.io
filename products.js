const productListElement = document.getElementById("product-list");


const apiUrl = "https://japceibal.github.io/emercado-api/cats_products/101.json";


fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const products = data.products;


    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.className = "product";

      productElement.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Precio: ${product.cost} ${product.currency}</p>
        <p>Descripción: ${product.description}</p>
        <p>Cantidad Vendidos: ${product.soldCount}</p>
      `;

      productListElement.appendChild(productElement);
    });
  })
  .catch(error => {
    console.error("Error al cargar los productos:", error);
  });