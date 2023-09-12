// Ascessing the DOM
let backBtn = document.querySelector(".back-btn");
let cartBtn = document.querySelector(".cart");
let infoContainer = document.querySelector(".products-info");

const url = "https://course-api.com/javascript-store-single-product";

const fetchData = async () => {
  infoContainer.innerHTML = '<div class="loading"></div>';
  try {
    // Parameters in url
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    // fetching the url
    let response = await fetch(`${url}?id=${id}`);
    let data = await response.json();

    // Ascessing the product element
    const { name, company, price, colors, description, image } = data.fields;

    const color = colors
      .map((p) => {
        return `  <div class="color" style="background-color:${p};"></div>`;
      })
      .join("");

    const { url: img } = image[0];

    if (!response.ok) {
      throw new Error("Product not found");
    }
    let productDetails = `
     <div class="img">
        <img src="${img}" alt="">
     </div>
     <div class="info">
         <h1>${name}</h1>
         <h3 class="company">${company}</h3>
         <h4>$${price / 100}</h4>
         <div class="colors-option">
            ${color}
         </div>
        <p>
        ${description}
       </p>
         <button class="cart">Add To Cart</button>
      </div>
      `;

    infoContainer.innerHTML = productDetails;
  } catch (error) {
    infoContainer.innerHTML = `<p class="result">${error}</p>`;
  }
};

fetchData();
