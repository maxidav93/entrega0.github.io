const categoryId = localStorage.getItem("catID");

// Verificar si se obtuvo el identificador de la categoría
if (categoryId) {

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

  const btnAscendent = document.getElementById('clearRangeFilter');
  btnAscendent.addEventListener('click', ascendent);

  const btnDescendent = document.getElementById('clearRangeFilterDos');
  btnDescendent.addEventListener('click', descendent);

  const btnRelevance = document.getElementById('sortByCount');
  btnRelevance.addEventListener('click', relevance);
}


