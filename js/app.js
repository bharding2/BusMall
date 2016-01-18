"use strict";

var allProducts = [];

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


//Random number 0 - allProducts.length -1
function randomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

var productOneIndex = 0;
var productTwoIndex = 0;
var productThreeIndex = 0;

function displayThree() {
  productOneIndex = randomProduct();
  var imgOne = document.getElementById('imgOne');
  imgOne.setAttribute('src', allProducts[productOneIndex].filePath);

  productTwoIndex = randomProduct();
  while (productTwoIndex === productOneIndex)  {
    productTwoIndex = randomProduct();
  }
  var imgTwo = document.getElementById('imgTwo');
  imgTwo.setAttribute('src', allProducts[productTwoIndex].filePath);

  productThreeIndex = randomProduct();
  while (productThreeIndex === productOneIndex || productThreeIndex === productTwoIndex) {
    productThreeIndex = randomProduct();
  }
  var imgThree = document.getElementById('imgThree');
  imgThree.setAttribute('src', allProducts[productThreeIndex].filePath);

  console.log(productOneIndex);
  console.log(productTwoIndex);
  console.log(productThreeIndex);
}
//display 3 unique random images
//increment times displayed

//event handling for user clicks
//increment vote on the one that was clicked
//after 15 times, give the option to show results
