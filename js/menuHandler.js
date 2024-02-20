// Get menu container
const menuItems = document.querySelector(".menuItem");

// Get all menu items using the menu container
const menus = menuItems.querySelectorAll(".menu");

// Get product category
const productCategory = document.querySelector('.productsCategory');

// Get product name using product category
const productName = productCategory.querySelector('h3');

// Array to store favorite items
let favoriteItems = [];

export const setupMenuHandler = () => {
    // Event listener for clicking on menu items
    menus.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            // Get the data-title and data-id attributes of the clicked menu item
            const productType = item.getAttribute('data-title');
            const productID = item.getAttribute('data-id');

            // Update the content of the h3 element with the selected product type
            productName.innerText = `${productType}`;

            // Get all product sections
            const products = document.querySelectorAll('.products');

            // Loop through each product section
            products.forEach((product) => {
                // Get the data-item attribute of the product
                const dataItem = product.getAttribute('data-item');
                // Check if the data-item attribute matches the clicked menu item's data-id
                if (productID === "All") {
                    product.style.display = "block";
                } else {
                    if (productID === dataItem) {
                        product.style.display = "block";
                    }
                    else {
                        product.style.display = "none";
                    }
                }
            });
        });
    });
};
