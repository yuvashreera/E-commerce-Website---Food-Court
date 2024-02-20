// Store the itemList
let itemList = [];

// Store the original state of the buttons
const originalButtonState = new Map();

// Function to add the carts
function addToCart() {
    // Dynamic Code structure for adding shopped cart item to the shop cart container
    let food = this.parentElement;
    let foodImageSource = food.querySelector('.imageContainer__items').src;
    let foodTitle = food.querySelector('.foodName').innerText;
    let foodAmount = food.querySelector('.cost').innerText.split('\n')[1];
    let numericAmount = Number(foodAmount.replace(/[^\d]/g, ''));

    // Logic to Check if the item is already in the cart
    let newProduct = { foodTitle, numericAmount, foodImageSource };
    if (itemList.find((element) => element.foodTitle == newProduct.foodTitle)) {
        alert("Item is already added in the cart!");
        return;
    } else {
        itemList.push(newProduct);
    }

    let cartContent = document.querySelector('.cart__content');
    let createCartProduct = document.createElement('div');
    createCartProduct.innerHTML = `
        <div class="cart__item">
        <img src="${foodImageSource}" class="cart__img">
        <div class="cart__item__details">
            <div class="cart__food-title">${foodTitle}</div>
            <div class="cart__item__price">${numericAmount}</div>
            <input type="number" class="cart__quantity" value="1">
        </div>
        <div class="cart__trash fa fa-trash"></div>
        </div>
    `;
    cartContent.appendChild(createCartProduct);

    // Save the original state of the button if not already saved
    if (!originalButtonState.has(this)) {
        originalButtonState.set(this, {
            backgroundColor: this.style.backgroundColor,
            innerText: this.innerText,
        });
    }

    // Change the innerText of the cart icon button to "In Cart"
    this.innerText = "In Cart";
    this.style.backgroundColor = "navy";
    setupShopCartHandler();
}

// Function to remove each cart item from the cart
function removeItem() {
    if (confirm("Are you Sure to Remove")) {
        let title=this.parentElement.querySelector('.cart__food-title').innerHTML;
        itemList=itemList.filter(element=>element.foodTitle!=title);
        this.parentElement.remove();

        // Get the corresponding "Add to Cart" button based on the title
        let correspondingButton = Array.from(originalButtonState.keys()).find(
            (button) => button.parentElement.querySelector('.foodName').innerText === title
        );

        // If found, restore the original state
        if (correspondingButton) {
            const originalState = originalButtonState.get(correspondingButton);
            correspondingButton.innerText = originalState.innerText;
            correspondingButton.style.backgroundColor = originalState.backgroundColor;
        }
        setupShopCartHandler();
    }
}

// Function to maintain stable quantity value
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    setupShopCartHandler();
}

// Function to update the total and item count
function updateTotal() {
    const cartItems = document.querySelectorAll('.cart__item');
    const cartTotal = document.querySelector('.cart__total__amount');
    let total = 0;
    cartItems.forEach((product)=>{
        let itemPrice = parseFloat(product.querySelector('.cart__item__price').innerText);
        let quantity = product.querySelector('.cart__quantity').value;
        total += (itemPrice * quantity);
    });
    cartTotal.innerText = total;

    //  Adding Shopping Cart Count to the Shopping Cart Icon
    let itemCount = document.querySelector('.header__shop_card-Items');
    let count = itemList.length;
    itemCount.innerText = count;

    if(count==0){
        itemCount.style.display='none';
    }

    else{
        itemCount.style.display='block';
    }
}

// Function to reset the cart
export function resetCart() {
    itemList = []; // Clear the itemList array
    const cartContent = document.querySelector('.cart__content');
    cartContent.innerHTML = ''; // Remove all items from the cart container
    updateTotal(); // Update the total after resetting the cart

    // Reset the appearance of the "Add to Cart" buttons
    originalButtonState.forEach((originalState, btn) => {
        btn.style.backgroundColor = originalState.backgroundColor;
        btn.innerText = originalState.innerText;
    });
}

// Function to setup shopping cart event handlers
export const setupShopCartHandler = () => {
    // Variables for Shopping Cart Handler
    const shoppingCartIcon = document.querySelector('.card');
    const cartContainer = document.querySelector('.cart');
    const closingCartIcon = cartContainer.querySelector('.cart__remove');
    const cartTrash = document.querySelectorAll('.cart__trash');
    const cartQuantity = cartContainer.querySelectorAll('.cart__quantity');
    const addToCartIconButtons = document.querySelectorAll('.add-to-cart-item');

    // Adding Shopping Cart Container to the Shopping Cart Icon
    shoppingCartIcon.addEventListener('click', (event) => {
        event.preventDefault();
        cartContainer.classList.add('cart-active');
    });

    // Adding Shopped Cart Products to the Cart Container
    addToCartIconButtons.forEach((cartIconButton) => {
        cartIconButton.addEventListener('click', addToCart);
    });

    // Verifying Cart Item Quantity Value
    cartQuantity.forEach((quantity) => {
        quantity.addEventListener('change', changeQty);
    });

    // Total And ItemCount Updation
    updateTotal();

    // Removing Items from the Cart Using Trash
    cartTrash.forEach((trash) => {
        trash.addEventListener('click', removeItem);
    });

    // Closing the Shopping Cart Container
    closingCartIcon.addEventListener('click', (event) => {
        event.preventDefault();
        cartContainer.classList.remove('cart-active');
    });
};