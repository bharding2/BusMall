"use strict";

var allProducts = [];
var totalClicks = 0;

function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.numClicks = 0;
  this.numDisplays = 0;
  this.percentClicked = 0;

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

function randomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

var productOneIndex = 0;
var productTwoIndex = 0;
var productThreeIndex = 0;
var imgOne = document.getElementById('imgOne');
var imgTwo = document.getElementById('imgTwo');
var imgThree = document.getElementById('imgThree');

function displayThree() {
  productOneIndex = randomProduct();
  imgOne.setAttribute('src', allProducts[productOneIndex].filePath);
  allProducts[productOneIndex].numDisplays += 1;

  productTwoIndex = randomProduct();
  while (productTwoIndex === productOneIndex)  {
    productTwoIndex = randomProduct();
  }
  imgTwo.setAttribute('src', allProducts[productTwoIndex].filePath);
  allProducts[productTwoIndex].numDisplays += 1;

  productThreeIndex = randomProduct();
  while (productThreeIndex === productOneIndex || productThreeIndex === productTwoIndex) {
    productThreeIndex = randomProduct();
  }
  imgThree.setAttribute('src', allProducts[productThreeIndex].filePath);
  allProducts[productThreeIndex].numDisplays += 1;

  console.log(productOneIndex);
  console.log(productTwoIndex);
  console.log(productThreeIndex);
}
displayThree();

var resultButton = document.getElementById('showResults');

imgOne.addEventListener('click', handleImgOneClick);

function handleImgOneClick(event) {
  allProducts[productOneIndex].numClicks += 1;
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
  totalClicks += 1;
  if (totalClicks === 15) {
    resultButton.removeAttribute('hidden');
  }

  console.log(allProducts[productThreeIndex].productName + ' clicked ' + allProducts[productThreeIndex].numClicks + ' times');

  displayThree();
}

resultButton.addEventListener('click', handleResultButtonClick)

function handleResultButtonClick(event) {
  var results = document.getElementById('results');
  allProducts.sort(function (a, b) {return b.numClicks - a.numClicks;});
  for(var i = 0; i < allProducts.length; i++){
    var pEl = document.createElement('p');
    allProducts[i].percentClicked = allProducts[i].numClicks / allProducts[i].numDisplays * 100;
    pEl.textContent = allProducts[i].productName + ' was clicked ' + allProducts[i].numClicks + ' times.  It was clicked ' + allProducts[i].percentClicked.toFixed(2) + '% of the times it was shown.';
    results.appendChild(pEl);
  }
}
