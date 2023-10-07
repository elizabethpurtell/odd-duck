'use strict';


// ***** GLOBALS ******
let votingRounds = 25;
const productArray = [];

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
  // DONE: get 3 random images on the page
  let imageOneIndex = randomIndexGenerator();
  let imageTwoIndex = randomIndexGenerator();
  let imageThreeIndex = randomIndexGenerator();

  // DONE: make sure they are unique
  while (imageOneIndex === imageTwoIndex === imageThreeIndex); {
    imageTwoIndex = randomIndexGenerator();
    imageOneIndex = randomIndexGenerator();
    imageThreeIndex = randomIndexGenerator();
  }

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
  // console.dir(event.target);
  // console.log(imageClicked);

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
let chairProd = new Product('chair', 'jpg');
let cthulhuProd = new Product('cthulu', 'jpg');
let dogduckProd = new Product('dog-duck', 'jpg');
let dragonProd = new Product('dragon', 'jpg');
let penProd = new Product('pen', 'jpg');
let petsweepProd = new Product('pet-sweep', 'jpg');
let scissorsProd = new Product('scissors', 'jpg');
let sharkProd = new Product('shark', 'jpg');
let sweepProd = new Product('sweep', 'png');
let tauntaunProd = new Product('tauntaun', 'jpg');
let unicornProd = new Product('unicorn', 'jpg');
let watercanProd = new Product('water-can', 'jpg');
let wineglassProd = new Product('wine-glass', 'jpg');


productArray.push(chairProd, cthulhuProd, dogduckProd, dragonProd, penProd, petsweepProd, scissorsProd, sharkProd, sweepProd, tauntaunProd, unicornProd, watercanProd, wineglassProd);


renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);
