document.addEventListener("DOMContentLoaded", () => {
    const cont = document.getElementById("contenedor");

    const id = localStorage.getItem("id");
    const url = `https://japceibal.github.io/emercado-api/products/${id}.json`;

    async function fetchProducts(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("Datos de la API:", data);
            return data;

            // La API devuelve un objeto que contiene los datos que necesitas
        } catch (error) {
            console.error("Error fetching products:", error);
            return {};
        }
    }

    async function displayProductDetails() {
        const productData = await fetchProducts(url);

        if (Object.keys(productData).length === 0) {
            // Manejar el caso en el que no se pudo obtener la información
            cont.innerHTML = "No se pudo cargar la información del producto.";
            return;
        }

        // Aquí puedes acceder a los datos del producto
        const { name, cost, description, category, soldCount, images } = productData;

        // Luego, puedes mostrar los datos en el HTML
        cont.innerHTML = `
        <h1>${name}</h1>
        <p>Precio: ${cost}</p>
        <p>Descripción: ${description}</p>
        <p>Categoría: ${category}</p>
        <p>Cantidad de vendidos: ${soldCount}</p>
      `;

        // para mostrar las imagenes:
        images.forEach((imagenUrl) => {
            const img = document.createElement("img");
            img.src = imagenUrl;
            cont.appendChild(img);
        });
    }

    // Llamar a la función para mostrar los detalles del producto
    displayProductDetails();
});

//Finaliza seccion de los autos

// Seccion para los comentarios

document.addEventListener("DOMContentLoaded", () => {
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
        const commentsData = await fetchComments(apiUrl);

        if (commentsData.length === 0) {
          // Manejar el caso en el que no se pudieron obtener comentarios.
          commentsContainer.innerHTML = "No se pudieron cargar los comentarios.";
          return;
        }

        // Crear un div individual para cada comentario
        commentsData.forEach(comment => {
          const commentDiv = document.createElement("div");
          commentDiv.classList.add("comment");

          // Crear un elemento <span> para las estrellas
          const starRating = document.createElement("span");
          starRating.classList.add("star-rating");
          starRating.innerHTML = generateStarRating(comment.score); // Genera las estrellas basadas en la puntuación
          commentDiv.appendChild(starRating);

          commentDiv.innerHTML += `
              <p>Producto: ${comment.product}</p>
              <p>${comment.description}</p>
              <p>-${comment.user}</p>
              <p>${comment.dateTime}</p>
          `;

          commentsContainer.appendChild(commentDiv);
        });
      }


    function generateStarRating(score) {
      const maxScore = 5; // Máxima puntuación posible
      const filledStars = '<i class="fa fa-star"></i>'.repeat(score);
      const emptyStars = '<i class="fa fa-star-o"></i>'.repeat(maxScore - score);
      return filledStars + emptyStars;
    }

    displayComments();
  });

