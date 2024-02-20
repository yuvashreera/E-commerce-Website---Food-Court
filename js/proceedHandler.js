import { resetCart } from './shoppingCartHandler.js';

export function initializeProceedHandler() {
    const proceed = document.querySelector('.cart__proceed-products');
    let isRemoving = false;

    proceed.addEventListener('click', (event) => {
        event.preventDefault();

        const cartContent = document.querySelector('.cart__content');

        if (cartContent.children.length === 0) {
            alert('Please add items to the cart before proceeding.');
        } else {
            if (!isRemoving) {
                initiateRemoval();
            } else {
                displaySuccessMessage();
                goBackToPreviousState();
                resetCart();
            }
        }
    });

    function initiateRemoval() {
        isRemoving = true;
        proceed.innerHTML = '';

        proceed.style.width = '100%';
        proceed.style.height = '100%';

        const loaderElement = document.createElement('div');
        loaderElement.classList.add('loader');
        proceed.appendChild(loaderElement);

        const messageElement = document.createElement('div');
        messageElement.innerText = 'Please wait...';
        messageElement.style.paddingTop = "15%"
        messageElement.style.textAlign = "center";
        proceed.appendChild(messageElement);

        setTimeout(() => {
            loaderElement.remove();
            messageElement.remove();
            isRemoving = false;
            displaySuccessMessage();
            goBackToPreviousState();
            resetCart();
        }, 4000);
    }

    function displaySuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.innerText = 'Products added successfully. Deliver soon.';
        proceed.appendChild(successMessage);
    }

    function goBackToPreviousState() {
        setTimeout(() => {
            proceed.innerHTML = 'Proceed';
            proceed.style.width = '';
            proceed.style.height = '';
        }, 2000);
    }
}
