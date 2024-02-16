// Function to handle search bar functionality
export const searchBarHandler = () => {
    // Get the search bar input element
    const searchBarInput = document.querySelector('.searchBar__input');

    // Add an event listener for keyup events on the search bar input
    searchBarInput.addEventListener('keyup', (event) => {
        event.preventDefault();

        // Get the lowercase and trimmed search text
        const searchText = event.target.value.toLowerCase().trim();

        // Get all product sections
        const products = document.querySelectorAll('.products');

        // Loop through each product section
        products.forEach((product) => {
            // Get the data-filter attribute of the product and convert to lowercase and trim
            const productFilter = product.getAttribute('data-filter').toLowerCase().trim();

            // Check if the product filter includes the search text
            if (productFilter.includes(searchText)) {
                // Display the product
                product.style.display = "block";
            } else {
                // Hide the product if it doesn't match the search text
                product.style.display = "none";
            }
        });
    });
};
