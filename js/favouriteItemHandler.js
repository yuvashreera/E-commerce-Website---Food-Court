// Function to collect the favourite items
export const favouriteItemCollection = () => {
    const favoriteButtons = document.querySelectorAll('.fav-item');
    const favItemList = []; // Store the favitemList
    favoriteButtons.forEach((favButton) => {
        favButton.addEventListener('click', (event) => {
            event.preventDefault();
            favButton.style.color = 'yellow';
            favButton.parentElement.setAttribute('data-color',favButton.style.color);

            // Logic to Check the item is already added to the favourite link.
            const favProducts = {
                id : favButton.getAttribute('data-id')
            };
            if(!favItemList.find((element) => element.id === favProducts.id)){
                favItemList.push(favProducts);
            }
            else{
                alert("Item is already in favorites!");
            }
        });
    });
    favouriteItemStorage();
}

// Function to process the favourite items
const favouriteItemStorage = () => {
    const favStorage = document.querySelector('.fav');
    favStorage.addEventListener('click',()=>{
        const products = document.querySelectorAll('.products');
        products.forEach((product)=>{
            const dataColor = product.getAttribute('data-color')
            if(dataColor === "yellow"){
                product.style.display = "block";
            }
            else{
                product.style.display = "none";
            }
        });
    });
}
