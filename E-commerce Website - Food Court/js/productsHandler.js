// Get product container
const productsContainer = document.querySelector(".productsContainer");

// To create and append product elements based on the provided item collection
export const createProductElement =(itemCollection) => {
    // Loop through each product in the item collection
    itemCollection.forEach((product) => {
        // Create a new section element for each product
        const productElement = document.createElement("section");
        // Add the "products" class to the created section element
        productElement.classList.add("products");
        productElement.setAttribute("data-item",`${product.foodType}`);
    
        // Populate the inner HTML of the product element with data from the product object
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
        // Append the created product element to the products container
        productsContainer.appendChild(productElement);
    });
};