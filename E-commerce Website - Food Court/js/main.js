import { productsData } from './products.js';
document.addEventListener("readystatechange",(event)=>{
    if(event.target.readyState === "complete"){
        console.log("Data are loaded successfully.");
        initApp();
    }
});

const initApp = ()=>{
    // Variables
    const productsContainer = document.querySelector(".productsContainer");
    function createProductElement(product) {
        const productElement = document.createElement("section");
        productElement.classList.add("products");
      
        productElement.innerHTML = `
          <figure class="imageContainer">
            <img src="${product.imageSrc}" alt="${product.foodName}" class="imageContainer__items">
          </figure>
          <h3 class="foodName">${product.foodName}</h3>
          <h4 class="companyName">${product.companyName}</h4>
          <h5 class="cost"><span>${product.foodType}</span> ${product.cost}</h5>
          <button class="add-to-cart-item" data-id="${product.id}">
            <i class="fa fa-shopping-cart"></i>
            Add To Cart
          </button>
          <button class="fav-item" data-id="${product.id}">
            <i class="fa fa-heart"></i>
          </button>
        `;
      
        return productElement;
      }
      
      // Loop through the productsData array and append each product to the container
      productsData.forEach((product) => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
      });
};