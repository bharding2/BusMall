"use strict";

var allProducts = [];
var totalClicks = 0;
var originalIndex = 0;

function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.numClicks = 0;
  this.numDisplays = 0;
  this.percentClicked = 0;
  this.originalIndex = originalIndex;
  originalIndex += 1;

  allProducts.push(this);
}

var bag = new Product('bag', 'img/bag.jpg');
var banana = new Product('banana', 'img/banana.jpg');
var boots = new Product('boots', 'img/boots.jpg');
var chair = new Product('chair', 'img/chair.jpg');
var cthulhu = new Product('cthulhu', 'img/cthulhu.jpg');
var dragon = new Product('dragon', 'img/dragon.jpg');
var pen = new Product('pen', 'img/pen.jpg');
var scissors = new Product('scissors', 'img/scissors.jpg');
var shark = new Product('shark', 'img/shark.jpg');
var sweep = new Product('sweep', 'img/sweep.jpg');
var unicorn = new Product('unicorn', 'img/unicorn.jpg');
var usb = new Product('usb', 'img/usb.jpg');
var watercan = new Product('watercan', 'img/watercan.jpg');
var wineglass = new Product('wineglass', 'img/wineglass.jpg');

// Is this necessary?

function randomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

// make not global??? at least an array (would help dry out event handling)

var productOneIndex = 0;
var productTwoIndex = 0;
var productThreeIndex = 0;
var imgOne = document.getElementById('imgOne');
var imgTwo = document.getElementById('imgTwo');
var imgThree = document.getElementById('imgThree');

function displayThree() {
  productOneIndex = randomProduct();
  imgOne.setAttribute('src', allProducts[productOneIndex].filePath);

  productTwoIndex = randomProduct();
  while (productTwoIndex === productOneIndex)  {
    productTwoIndex = randomProduct();
  }
  imgTwo.setAttribute('src', allProducts[productTwoIndex].filePath);

  productThreeIndex = randomProduct();
  while (productThreeIndex === productOneIndex || productThreeIndex === productTwoIndex) {
    productThreeIndex = randomProduct();
  }
  imgThree.setAttribute('src', allProducts[productThreeIndex].filePath);

  console.log(productOneIndex);
  console.log(productTwoIndex);
  console.log(productThreeIndex);
}
displayThree();

// Make sure each image is displayed
//
// push choice into an array
// while (choicesShown.length < allProducts.length) {
//  if (image is in choices) {
//  reroll
//  }
// }
//
// or just force the first five passes

var resultButton = document.getElementById('showResults');


// dry these guys out.  array of img with properties of one, two, three?

imgOne.addEventListener('click', handleImgOneClick);

function handleImgOneClick(event) {
  allProducts[productOneIndex].numClicks += 1;
  allProducts[productOneIndex].numDisplays += 1;
  allProducts[productTwoIndex].numDisplays += 1;
  allProducts[productThreeIndex].numDisplays += 1;
  totalClicks += 1;
  if (totalClicks === 15) {
    resultButton.removeAttribute('hidden');
  }

  console.log(allProducts[productOneIndex].productName + ' clicked ' + allProducts[productOneIndex].numClicks + ' times');

  displayThree();
}

imgTwo.addEventListener('click', handleImgTwoClick);

function handleImgTwoClick(event) {
  allProducts[productTwoIndex].numClicks += 1;
  allProducts[productOneIndex].numDisplays += 1;
  allProducts[productTwoIndex].numDisplays += 1;
  allProducts[productThreeIndex].numDisplays += 1;
  totalClicks += 1;
  if (totalClicks === 15) {
    resultButton.removeAttribute('hidden');
  }

  console.log(allProducts[productTwoIndex].productName + ' clicked ' + allProducts[productTwoIndex].numClicks + ' times');

  displayThree();
}

imgThree.addEventListener('click', handleImgThreeClick);

function handleImgThreeClick(event) {
  allProducts[productThreeIndex].numClicks += 1;
  allProducts[productOneIndex].numDisplays += 1;
  allProducts[productTwoIndex].numDisplays += 1;
  allProducts[productThreeIndex].numDisplays += 1;
  totalClicks += 1;
  if (totalClicks === 15) {
    resultButton.removeAttribute('hidden');
  }

  console.log(allProducts[productThreeIndex].productName + ' clicked ' + allProducts[productThreeIndex].numClicks + ' times');

  displayThree();
}

resultButton.addEventListener('click', handleResultButtonClick)
var numResultButtonClicks = 0;

var data = {
  labels: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  datasets: [
    {
      label: 'Clicks per item',
      fillColor: '#2E9329',
      strokeColor: '#31732E',
      highlightFill: '#1F6E6B',
      hightlightStroke: '#225654',
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    }
  ]
};

var resultsCanvas = document.getElementById('resultsCanvas').getContext('2d');
var chartMe = new Chart(resultsCanvas).Bar(data);

function handleResultButtonClick(event) {
  numResultButtonClicks += 1;
  var results = document.getElementById('resultsSection');
  results.removeAttribute('hidden');

  allProducts.sort(function (a, b) {return b.numClicks - a.numClicks;});

  for(var i = 0; i < allProducts.length; i++)
  {
    data.labels[i] = allProducts[i].productName;
    chartMe.datasets[0].bars[i].value = allProducts[i].numClicks;
  }
  chartMe.update();

  allProducts.sort(function (a, b) {return a.originalIndex - b.originalIndex;});
}
