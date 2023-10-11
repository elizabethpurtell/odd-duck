'use strict';


// ***** GLOBALS ******
let votingRounds = 25;
let productArray = [];
let randomIndexArray = [];
let randomNumber = [];
let previousRandomIndexArray = [];

// ***** DOM WINDOWS ****
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three')
let resultBtn = document.getElementById('show-results-btn');


// **** CONSTRUCTOR FUNCTION ****
function Product(name, imageExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

// **** CANVAS ELEMENT ****

let ctx = document.getElementById('resultsChart').getContext('2d');

// **** HELPER FUNCTIONS / UTILITIES ****

function getRandomUniqueIndices() {
  let uniqueIndices = [];

  while (uniqueIndices.length < 3) {
    let randomNumber = Math.floor(Math.random() * productArray.length);

    // Check if the random number is not in the previous set
    if (!uniqueIndices.includes(randomNumber) && !previousRandomIndexArray.includes(randomNumber)) {
      uniqueIndices.push(randomNumber);
    }
  }

  // Update the previous set of random indices
  previousRandomIndexArray = uniqueIndices.slice();

  return uniqueIndices;
}

function renderImgs() {
  const randomIndexArray = getRandomUniqueIndices();

  let imageOneIndex = randomIndexArray[0];
  let imageTwoIndex = randomIndexArray[1];
  let imageThreeIndex = randomIndexArray[2];

  imgOne.src = productArray[imageOneIndex].image;
  imgOne.title = productArray[imageOneIndex].name;

  imgTwo.src = productArray[imageTwoIndex].image;
  imgTwo.title = productArray[imageTwoIndex].name;

  imgThree.src = productArray[imageThreeIndex].image;
  imgThree.title = productArray[imageThreeIndex].name;

  // DONE: Increase the product views
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

    //  local storage start here ***
    // step 1- convert our data to a string/json to store in local storage
    let stringifyProduct = JSON.stringify(productArray);
    console.log('stringify Product >>>', stringifyProduct);
    // step 2 - store string data to local storage
    localStorage.setItem('myProducts', stringifyProduct);
    // step 3 getting the code out -- go to executable code
  }

}

function handleShowResults() {
  if (votingRounds === 0) {
    for (let i = 0; i < productArray.length; i++) {
      renderChart();
    }
    resultBtn.removeEventListener('click', handleShowResults);
  }
}

//  *** added chart ***

function renderChart() {
  let productNames = [];
  let productViews = [];
  let productVotes = [];

  for (let i = 0; i < productArray.length; i++) {
    productNames.push(productArray[i].name);
    productViews.push(productArray[i].views);
    productVotes.push(productArray[i].votes);
  }

  let chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        borderWidth: 4,
        borderColor: 'purple',
        backgroundColor: 'purple',
        hoverBackgroundColor: 'red',
      },
      {
        label: '# of Votes',
        data: productVotes,
        borderWidth: 4,
        borderColor: 'green',
        backgroundColor: 'green',
        hoverBackgroundColor: 'blue',
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
  new Chart(ctx, chartObject)
}


// **** EXECUTABLE CODE *****

// *** LOCAL STORAGE CONTINUES HERE ***
// step 3 - get from local storage
let retrievedProduct = localStorage.getItem('myProducts');
console.log('products from local storage >>>', retrievedProduct);
// step 4 - convert to usable code
let parsedProduct = JSON.parse(retrievedProduct);
console.log('my parsed products >>>', parsedProduct);


//  *** happy path out of the woods ***

if (retrievedProduct) {
  productArray = parsedProduct;
} else {
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
}

renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);
