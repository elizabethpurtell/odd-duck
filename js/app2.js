'use strict';

// Constructor function for Product
function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.timesShown = 0;
}

// Create an array of Product objects
const products = [
  new Product('Product 1', 'images/product1.jpg'),
  new Product('Product 2', 'images/product2.jpg'),
  new Product('Product 3', 'images/product3.jpg'),
  // Add more products as needed
];

// Function to randomly select three unique products
function getRandomProducts() {
  const randomProducts = [];
  while (randomProducts.length < 3) {
    const randomIndex = Math.floor(Math.random() * products.length);
    const product = products[randomIndex];
    if (!randomProducts.includes(product)) {
      randomProducts.push(product);
    }
  }
  return randomProducts;
}

// Function to display the products
function displayProducts() {
  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = ''; // Clear existing products
// don't use innerHTML, you can put just .text
  const randomProducts = getRandomProducts();

  for (const product of randomProducts) {
    const productImage = document.createElement('img');
    productImage.src = product.imagePath;
    productImage.alt = product.name;
    productImage.addEventListener('click', () => {
      product.timesShown++;
      displayProducts(); // Generate three new products after a click
    });
    productContainer.appendChild(productImage);
  }
}

// Initial display of products
displayProducts();

```

// In this code:

// 1. We define a constructor function `Product` to create product objects with name, image path, and times shown properties.

// 2. We create an array of product objects called`products`.

// 3. The `getRandomProducts` function selects three random unique products from the `products` array.

// 4. The `displayProducts` function displays the three randomly selected products in the HTML container with the id`product-container`.It also attaches a click event listener to each product image to increment the `timesShown` property and then calls `displayProducts` again to generate new products.

// 5. Finally, we initially call `displayProducts` to display the first set of products on the web page.