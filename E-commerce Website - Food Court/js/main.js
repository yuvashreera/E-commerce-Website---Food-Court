import { itemCollection } from './productsData.js';
import { createProductElement } from './productsHandler.js';
import { setupMenuHandler } from './menuHandler.js';
import { searchBarHandler } from './searchHandler.js';

document.addEventListener("readystatechange",(event)=>{
    if(event.target.readyState === "complete"){
        console.log("Data are loaded successfully.");
        initApp();
    }
});

const initApp = ()=>{
  createProductElement(itemCollection);
  setupMenuHandler();
  searchBarHandler();
};
