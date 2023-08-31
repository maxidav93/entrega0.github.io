
  const url =  ("https://japceibal.github.io/emercado-api/cats_products/"+localStorage.getItem("catID")+".json");

  let cont = document.getElementById("product-list");
  var arr = []

  function interfaz(dataN){
    cont.innerHTML = `<div class="text-center p-4">
      <h2>Productos</h2>
      <p class="lead">Veras aquí todos los productos de la categoría ${dataN}</p>
    </div>`
  }

  function showData(dataN){
    cont.innerHTML = "";
    for(let a of dataN){
      cont.innerHTML += `
      <div class="row">
        <div class="list-group">
          <div class="list-group-item list-group-item-action cursor-active" onclick=productIden(${a.id})>
            <div class="row">
              <div class="col-3">
                <img class="img-thumbnail" src="${a.image}">
              </div>
              <div class="col">
                <div class="d-flex w-100 justify-content-between">
                  <h4 class="mb-1">${a.name} -${a.currency} ${a.cost}</h4>
                  <small class="text-muted">${a.soldCount}</small>
                </div>
                <p class="mb-1">${a.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    }
  }

  async function fetchdata(){
    let response = await fetch(url);
    let data = await response.json();
    interfaz(data.catName);
    showData(data.products);
    arr = data.products;
  }

  fetchdata();

  function ascendent() {
    arr.sort(function(a, b) {
      if ( a.cost < b.cost ){ return -1; }
      if ( a.cost > b.cost ){ return 1; }
      return 0;
    });
    showData(arr);
  }

  function descendent() {
    arr.sort(function(a, b) {
      if ( a.cost > b.cost ){ return -1; }
      if ( a.cost < b.cost ){ return 1; }
      return 0;
    });
    showData(arr);
  }

  function relevance() {
    arr.sort(function(a, b) {
      if ( a.soldCount > b.soldCount ){ return -1; }
      if ( a.soldCount < b.soldCount ){ return 1; }
      return 0;
    });
    showData(arr);
  }

  const btnAscendent = document.getElementById('sortAsc');
  btnAscendent.addEventListener('click', ascendent);

  const btnDescendent = document.getElementById('sortDesc');
  btnDescendent.addEventListener('click', descendent);

  const btnRelevance = document.getElementById('sortByCount');
  btnRelevance.addEventListener('click', relevance);



  document.getElementById("rangeFilterCount").addEventListener("click", function(){
    // Obtengo el mínimo y máximo de los intervalos para filtrar por rango de precio
    const minPrice = document.getElementById("rangeFilterCountMin").value;
    const maxPrice = document.getElementById("rangeFilterCountMax").value;

    // Convertir los valores a números enteros si son válidos
    const parsedMinPrice = (minPrice !== "" && !isNaN(minPrice)) ? parseInt(minPrice) : undefined;
    const parsedMaxPrice = (maxPrice !== "" && !isNaN(maxPrice)) ? parseInt(maxPrice) : undefined;

    // Filtrar productos en base al rango de precio
    const filteredProducts = arr.filter(product => {
        if (parsedMinPrice !== undefined && product.cost < parsedMinPrice) {
            return false;
        }
        if (parsedMaxPrice !== undefined && product.cost > parsedMaxPrice) {
            return false;
        }
        return true;
    });

    showData(filteredProducts);
});

// Función para limpiar el filtro por rango de precio
document.getElementById("clearRangeFilter").addEventListener("click", function() {
  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";
  showData(arr); // Mostrar todos los productos sin filtro
});


const catName = localStorage.getItem(`catName`)

document.getElementById("nombreCat").innerHTML = `Verás aquí todos los productos de la categoría: <strong>${catName}</strong>.`