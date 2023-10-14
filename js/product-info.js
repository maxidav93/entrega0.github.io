document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("contenedor");
  const imageThumbnailsContainer = document.getElementById("image-thumbnails");
  const imagenAmpliada = document.getElementById("imagen-ampliada");
  const id = localStorage.getItem("id");
  const apiUrl = `https://japceibal.github.io/emercado-api/products/${id}.json`;
  const savedRandomNumbers = JSON.parse(localStorage.getItem('randomNumber'));
  const nextButton = document.getElementById("btn-right");
  const prevButton = document.getElementById("btn-left");
  const control = document.getElementsByClassName("imagen-ampliada")

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.images || !Array.isArray(data.images)) {
        throw new Error("No se encontraron imágenes en la respuesta de la API.");
      }

      // Muestra los detalles del producto utilizando los datos ya obtenidos
      const { name, cost, description, category, soldCount, currency } = data;
      cont.innerHTML = `
        <h1>${name}</h1>
        <div class="price-txt"><p class="precio">${currency} ${cost}<p class="descuento">${savedRandomNumbers}%OFF</p></p></div>
        <p class="descripcion"> ${description}</p>
        <p class="">Categoría: ${category}</p>
        <p>(${soldCount})</p>
        <button id="cartBtn" onclick="agregarAlCarrito()">Agregar a carrito</button>
      `;

      data.images.forEach((imageUrl, index) => {
        const imgThumbnail = document.createElement("img");
        imgThumbnail.src = imageUrl;
        imgThumbnail.alt = `Imagen ${index + 1}`;

        imgThumbnail.addEventListener("mouseover", () => {
          imagenAmpliada.setAttribute("src", imageUrl);
        });
        imageThumbnailsContainer.appendChild(imgThumbnail);

        if (index === 0) {
          imagenAmpliada.setAttribute("src", imageUrl);
        }
      });
      // Variables para el carrusel
      let currentImageIndex = 0;
      const images = data.images;

      // Función para mostrar la imagen actual en el carrusel
      function showCurrentImage() {
        const currentImage = images[currentImageIndex];
        imagenAmpliada.setAttribute("src", currentImage);
      }

      // Agrega botones de navegación al carrusel

      prevButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        showCurrentImage();
      });

      nextButton.addEventListener("click", () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        showCurrentImage();
      });

      // Agrega los botones al DOM
      

      control.appendChild(prevButton);
      control.appendChild(nextButton);
      cont.appendChild(imagenAmpliada);

      // Mostrar la primera imagen del carrusel al cargar la página
      showCurrentImage();

    })
    .catch((error) => {
      console.error("Error al obtener imágenes de la API:", error);
    });
});

// Seccion para los comentarios


let commentsArray = [];

const commentsContainer = document.getElementById("comments-container");
const id = localStorage.getItem("id");
const apiUrl = `https://japceibal.github.io/emercado-api/products_comments/${id}.json`;

async function fetchComments(apiUrl) {
  try {
    const res = await fetch(apiUrl);
    const comments = await res.json();
    console.log("Datos de la API de comentarios:", comments);
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

async function displayComments() {
  // Mostrar comentarios almacenados localmente
  commentsArray.forEach((comment) => {
    displayComment(comment);
  });

  // Obtener comentarios de la API
  const apiComments = await fetchComments(apiUrl);

  if (apiComments.length === 0 && commentsArray.length === 0) {
    // Manejar el caso en el que no hay comentarios.
    commentsContainer.innerHTML = "Todavía no hay comentarios.";
  } else {
    // Mostrar comentarios de la API
    apiComments.forEach((comment) => {
      displayComment(comment);
    });
  }
}

function displayComment(comment) {
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");

  // Crea un elemento <span> para las estrellas
  const starRating = document.createElement("span");
  starRating.classList.add("star-rating");
  starRating.innerHTML = generateStarRating(comment.score);
  commentDiv.appendChild(starRating);

  commentDiv.innerHTML += `
      <p>Producto: ${comment.product}</p>
      <p>${comment.description}</p>
      <p>-${comment.user}</p>
      <p>${comment.dateTime}</p>
  `;

  commentsContainer.appendChild(commentDiv);
}

function generateStarRating(score) {
  const maxScore = 5;
  const filledStars = '<i class="fa fa-star"></i>'.repeat(score);
  const emptyStars = '<i class="fa fa-star-o"></i>'.repeat(maxScore - score);
  return filledStars + emptyStars;
}

displayComments();

// Agrega un evento de escucha para el formulario de comentarios
const commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const score = document.getElementById("score").value;
  const commentText = document.getElementById("comment").value;

  const usernameLocal = localStorage.getItem("username");

  // Crea un nuevo comentario y agrega al arreglo temporal
  const newComment = {
    product: "Producto Actual", // Puedes ajustar esto según tu necesidad
    description: commentText,
    user: usernameLocal, // Puedes ajustar esto según tu necesidad
    score: parseInt(score),
    dateTime: new Date().toLocaleString(),
  };

  commentsArray.push(newComment);

  // Vacía el campo de texto
  document.getElementById("comment").value = ""; // Vaciar el campo de texto


  // Muestra los comentarios actualizados en la página
  displayComment(newComment);



});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#related-products");

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

  async function fetchProductById(id) {
    const productUrl = `https://japceibal.github.io/emercado-api/products/${id}.json`;

    try {
      const response = await fetch(productUrl);
      const product = await response.json();
      return product;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  }


  function showProducts(array) {
    let content = "";

    if (array.length > 0) {
      array.forEach((product, index) => {
        content += `
        <div id="product-cards-container">
        <div onclick="setProductID('${product.id}')" class="container-products">
          <div>
            <img class="card-image image-products" id="card-img" src="${product.image}">
            <div id="card-text-content">
              <h6 class="card-title title-products">${product.name}</h6>
            </div>
          </div>
        </div>
      </div>
      
      
        `;
      });
      container.innerHTML = content;
    } else {
      container.innerHTML = `<div class="">No se encontraron productos relacionados</div>`;
    }
  }

  async function fetchAndShowProducts(url) {
    try {
      const allProducts = await fetchProducts(url);
      const currentProduct = await fetchProductById(localStorage.getItem("id"));

      // Filtrar el producto actual de la lista de productos relacionados
      const productsToShow = allProducts.filter(product => product.id !== currentProduct.id);

      showProducts(productsToShow);
    } catch (error) {
      console.error("Error fetching and showing products:", error);
    }
  }

  fetchAndShowProducts(url);
});

function setProductID(id) {
  localStorage.setItem("id", id);
  window.location = "product-info.html";
}


function agregarAlCarrito() {
  let idProdCarrito = localStorage.getItem("id");
  
  const carritoActual = JSON.parse(localStorage.getItem("carrito")) || { productos: [] };

  const productoEnCarrito = carritoActual.productos.find(producto => producto.id === idProdCarrito);

  if (productoEnCarrito) {
    
    productoEnCarrito.cantidad += 1;
  } else {
    carritoActual.productos.push({ id: idProdCarrito, cantidad: 1 });
  }

 
  localStorage.setItem("carrito", JSON.stringify(carritoActual));

  
  console.log("Producto agregado al carrito:", carritoActual);

  // Opcional: Redirigir al usuario a la página del carrito
 // window.location = "cart.html";
}
