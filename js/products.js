document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#container-content");
  const asc = document.getElementById("ascendente");
  const desc = document.getElementById("descendente");
  const rel = document.getElementById("relevancia");
  const rangoPrecio = document.getElementById("rangoPrecio");
  const limpiarFiltros = document.getElementById("limpiarFiltros");
  const buscarInput = document.getElementById("buscar");

  const id = localStorage.getItem("catID");
  const url = `https://japceibal.github.io/emercado-api/cats_products/${id}.json`;

  async function fetchProducts(url) {
      try {
          const response = await fetch(url);
          const data = await response.json();
          return data.products;
      } catch (error) {
          console.error("Error fetching products:", error);
          return [];
      }
  }

  function showProducts(array) {
      let content = "";

      if (array.length > 0) {
          array.forEach(product => {
              content += `
                  <div class="col-xl-4 col-12 col-md-6 col-lg-3 container-products">
                      <div class="card col-12 div-products">
                          <img class="card-image image-products" src="${product.image}">
                          <h2 class="card-title title-products">${product.name}</h2>
                          <p class="card-description description-products">${product.description}</p>
                          <p class="card-cost cost-products">Precio: ${product.currency} ${product.cost}</p>
                          <p class="card-soldcount soldCount-products">Cantidad vendida: ${product.soldCount}</p>
                      </div>
                  </div>
              `;
          });
          container.innerHTML = content;
      } else {
          container.innerHTML = `<div class="alert-danger bg-danger alert-error-filter">No se encontraron productos</div>`;
      }
  }

  function sortProductsBy(property, order) {
      return function (a, b) {
          return (order === "asc" ? 1 : -1) * (a[property] - b[property]);
      };
  }

  function filterProductsByPriceRange(products, min, max) {
      return products.filter(product => product.cost >= min && product.cost <= max);
  }

  function clearFilters(products) {
      showProducts(products);
  }

  async function init() {
      const products = await fetchProducts(url);
      showProducts(products);

      asc.addEventListener("click", () => showProducts(products.slice().sort(sortProductsBy("cost", "asc"))));
      desc.addEventListener("click", () => showProducts(products.slice().sort(sortProductsBy("cost", "desc"))));
      rel.addEventListener("click", () => showProducts(products.slice().sort(sortProductsBy("soldCount", "desc"))));
      rangoPrecio.addEventListener("click", () => {
          const precioMin = parseFloat(document.getElementById("precioMinimo").value);
          const precioMax = parseFloat(document.getElementById("precioMaximo").value);
          const filteredProducts = filterProductsByPriceRange(products, precioMin, precioMax);
          showProducts(filteredProducts);
      });
      limpiarFiltros.addEventListener("click", () => clearFilters(products));
      buscarInput.addEventListener("input", buscarProductos);
  }

  function buscarProductos() {
      const searchTerm = buscarInput.value.trim().toUpperCase();
      const cards = document.querySelectorAll(".col-xl-4.col-12.col-md-6.col-lg-3.container-products");
      
      cards.forEach(card => {
          const title = card.querySelector(".card-title.title-products").textContent.toUpperCase();
          const description = card.querySelector(".card-description.description-products").textContent.toUpperCase();
          
          if (title.includes(searchTerm) || description.includes(searchTerm)) {
              card.style.display = "block";
          } else {
              card.style.display = "none";
          }
      });
  }

  init();
});

