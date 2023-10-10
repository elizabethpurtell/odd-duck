'use strict';


// ***** GLOBALS ******
let votingRounds = 25;
const productArray = [];
let randomIndexArray = [];


// ***** DOM WINDOWS ****
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three')
let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// **** CONSTRUCTOR FUNCTION ****
function Product(name, imageExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

// **** HELPER FUNCTIONS / UTILITIES ****

function randomIndexGenerator() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImgs() {

  while (randomIndexArray.length < 3) {
    let randomNumber = randomIndexGenerator();
    if (!randomIndexArray.includes(randomNumber)) {
      randomIndexArray.push(randomNumber);
    }
  }

  let imageOneIndex = randomIndexArray.pop();
  let imageTwoIndex = randomIndexArray.pop();
  let imageThreeIndex = randomIndexArray.pop();


  imgOne.src = productArray[imageOneIndex].image;
  imgOne.title = productArray[imageOneIndex].name;

  imgTwo.src = productArray[imageTwoIndex].image;
  imgTwo.title = productArray[imageTwoIndex].name;

  imgThree.src = productArray[imageThreeIndex].image;
  imgThree.title = productArray[imageThreeIndex].name;

  // DONE: Increase the goats views
  productArray[imageOneIndex].views++;
  productArray[imageTwoIndex].views++;
  productArray[imageThreeIndex].views++;
}

// **** EVENT HANDLERS ****
function handleImgClick(event) {

  let imageClicked = event.target.title;

  for (let i = 0; i < productArray.length; i++) {
    if (imageClicked === productArray[i].name) {
      productArray[i].votes++;
      votingRounds--;
      renderImgs();
    }
  }

  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
  }

}

function handleShowResults() {
  if (votingRounds === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let productListItem = document.createElement('li');

      productListItem.textContent = `${productArray[i].name} - Votes: ${productArray[i].votes} & Views: ${productArray[i].views}`;

      resultsList.appendChild(productListItem);
    }
    resultBtn.removeEventListener('click', handleShowResults);
  }
}

// **** EXECUTABLE CODE *****
let bagProd = new Product('bag');
let bananaProd = new Product('banana');
let bathroomProd = new Product('bathroom');
let bootsProd = new Product('boots');
let breakfastProd = new Product('breakfast');
let bubblegumProd = new Product('bubblegum');
let chairProd = new Product('chair');
let cthulhuProd = new Product('cthulhu');
let dogduckProd = new Product('dog-duck');
let dragonProd = new Product('dragon');
let penProd = new Product('pen');
let petsweepProd = new Product('pet-sweep');
let scissorsProd = new Product('scissors');
let sharkProd = new Product('shark');
let sweepProd = new Product('sweep', 'png');
let tauntaunProd = new Product('tauntaun');
let unicornProd = new Product('unicorn');
let watercanProd = new Product('water-can');
let wineglassProd = new Product('wine-glass');


productArray.push(bagProd, bananaProd, bathroomProd, bootsProd, breakfastProd, bubblegumProd, chairProd, cthulhuProd, dogduckProd, dragonProd, penProd, petsweepProd, scissorsProd, sharkProd, sweepProd, tauntaunProd, unicornProd, watercanProd, wineglassProd);

renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);
