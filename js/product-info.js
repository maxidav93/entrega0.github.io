document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("contenedor");
  const imageThumbnailsContainer = document.getElementById("image-thumbnails");
  const imagenAmpliada = document.getElementById("imagen-ampliada");
  const id = localStorage.getItem("id");
  const apiUrl = `https://japceibal.github.io/emercado-api/products/${id}.json`;
  const savedRandomNumbers = JSON.parse(localStorage.getItem('randomNumber'));


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
        <button id="cartBtn">Agregar a carrito</button>
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
    })
    .catch((error) => {
      console.error("Error al obtener imágenes de la API:", error);
    });
});


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
        commentsContainer.innerHTML = "Todavía no hay comentarios.";
        return;
      }

      commentsData.forEach(comment => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

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
      });
    }


  function generateStarRating(score) {
    const maxScore = 5; 
    const filledStars = '<i class="fa fa-star"></i>'.repeat(score);
    const emptyStars = '<i class="fa fa-star-o"></i>'.repeat(maxScore - score);
    return filledStars + emptyStars;
  }

  displayComments();

  document.addEventListener("DOMContentLoaded", () => {

    // Agrega un evento de escucha para el formulario de comentarios
    const commentForm = document.getElementById("comment-form");
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita la recarga de la página por defecto

        const score = document.getElementById("score").value;
        const commentText = document.getElementById("comment").value;

        // Crea un nuevo comentario
        const newComment = {
            product: "Producto Actual", // Puedes ajustar esto según tu necesidad
            description: commentText,
            user: "Usuario Actual", // Puedes ajustar esto según tu necesidad
            score: parseInt(score),
            dateTime: new Date().toLocaleString(), // Fecha y hora actual
        };

        // Envía el nuevo comentario a la API (puedes ajustar la URL según tu necesidad)
        const apiUrlForNewComment = "URL_DE_TU_API_PARA_GUARDAR_COMENTARIOS";
        fetch(apiUrlForNewComment, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newComment),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Nuevo comentario agregado:", data);
            // Recarga la lista de comentarios después de agregar uno nuevo
            displayComments();
        })
        .catch((error) => {
            console.error("Error al agregar comentario:", error);
        });

        // Limpia el formulario después de enviar el comentario
        commentForm.reset();
    });

    // ...
});

});