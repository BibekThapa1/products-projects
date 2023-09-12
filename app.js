let url = "https://course-api.com/javascript-store-products";

// Ascessing the DOM
let productsContainer = document.querySelector(".products");

const fetchStore = async () => {
  productsContainer.innerHTML = "<div class='loading'></div>";
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return data;
  } catch (error) {
    productsContainer.innerHTML = `<p class='error'>${error}</p>`;
  }
};

const showProducts = (data) => {
    console.log(data)
  const products = data.map(function (p) {
    const {id} = p;
    const {name,price} = p.fields;
    const {url} = p.fields.image[0];
    return `
    <a href="product.html?id=${id}&name=${name}" class="product">
    <img src="${url}" alt="" />
    <div class="info">
      <h3>${name}</h3>
      <h4>$${price/100}</h4>
    </div>
    </a> 
    `;
  }).join(" ");
  productsContainer.innerHTML = products;
};


// Starting the work
(async function start() {
  let data = await fetchStore();
  showProducts(data);
})();




