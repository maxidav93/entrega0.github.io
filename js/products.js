const productListElement = document.getElementById("product-list");
const apiUrl = "https://japceibal.github.io/emercado-api/cats_products/101.json";

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();

   products.products.forEach(product => {
    
      const productElement = document.createElement("div");
      productElement.className = "row justify-content-center";
      productElement.innerHTML = `
  
     
   <div class="list-group">
      <div class="list-group-item list-group-item-action cursor-active">
          <div class="row">
            <div class="col-3">
                <img src="${product.image}" alt="${product.name}" class="img-thumbnail">
            </div>
            <div class="col">
              <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">${product.name}</h4>
                  <small class="text-muted">Cantidad Vendidos: ${product.soldCount}</small>
              </div>
              <p class="mb-1">Precio: ${product.cost} ${product.currency}</p>
              <p class="mb-1">Descripción: ${product.description}</p>
           </div>
         </div>
       </div>
    </div>
  </div>
      `;
      productListElement.appendChild(productElement);
    });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
  }
}

fetchProducts();



