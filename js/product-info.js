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
  