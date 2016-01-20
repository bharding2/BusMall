'use strict';
function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.numClicks = 0;
  this.numDisplays = 0;
}
var allProducts = [
  new Product('bag', 'img/bag.jpg'),
  new Product('banana', 'img/banana.jpg'),
  new Product('boots', 'img/boots.jpg'),
  new Product('chair', 'img/chair.jpg'),
  new Product('cthulhu', 'img/cthulhu.jpg'),
  new Product('dragon', 'img/dragon.jpg'),
  new Product('pen', 'img/pen.jpg'),
  new Product('scissors', 'img/scissors.jpg'),
  new Product('shark', 'img/shark.jpg'),
  new Product('sweep', 'img/sweep.jpg'),
  new Product('unicorn', 'img/unicorn.jpg'),
  new Product('usb', 'img/usb.jpg'),
  new Product('watercan', 'img/watercan.jpg'),
  new Product('wineglass', 'img/wineglass.jpg')
];
var imageIndex = [];
function displayThree() {
  imageIndex[0] = Math.floor(Math.random() * allProducts.length);
  document.getElementById('0').setAttribute('src', allProducts[imageIndex[0]].filePath);
  imageIndex[1] = Math.floor(Math.random() * allProducts.length);
  while (imageIndex[1] === imageIndex[0])  {
    imageIndex[1] = Math.floor(Math.random() * allProducts.length);
  }
  document.getElementById('1').setAttribute('src', allProducts[imageIndex[1]].filePath);
  imageIndex[2] = Math.floor(Math.random() * allProducts.length);
  while (imageIndex[2] === imageIndex[0] || imageIndex[2] === imageIndex[1]) {
    imageIndex[2] = Math.floor(Math.random() * allProducts.length);
  }
  document.getElementById('2').setAttribute('src', allProducts[imageIndex[2]].filePath);
}
displayThree();
document.getElementById('0').addEventListener('click', handleImgClick);
document.getElementById('1').addEventListener('click', handleImgClick);
document.getElementById('2').addEventListener('click', handleImgClick);
var totalClicks = 0;
function handleImgClick(event) {
  allProducts[imageIndex[+event.path[0].id]].numClicks += 1;
  allProducts[imageIndex[0]].numDisplays += 1;
  allProducts[imageIndex[1]].numDisplays += 1;
  allProducts[imageIndex[2]].numDisplays += 1;
  totalClicks += 1;
  if (totalClicks === 15) {
    resultButton.removeAttribute('hidden');
  }
  displayThree();
}
var data = {
  labels: [],
  datasets: [{
    label: 'Times clicked per item',
    fillColor: '#2E9329',
    strokeColor: '#31732E',
    highlightFill:'#72C56E',
    hightlightStroke: '#31732E',
    data: []
  },]};
function resetChartData() {
  for (var j = 0; j < allProducts.length; j++) {
    data.labels.push('0');
    data.datasets[0].data.push('0');
  }
}
resetChartData();
var chartMe = new Chart(document.getElementById('resultsCanvas').getContext('2d')).Bar(data);
var resultButton = document.getElementById('showResults');
resultButton.addEventListener('click', handleResultButtonClick);
function handleResultButtonClick(event) {
  var results = document.getElementById('resultsSection');
  results.removeAttribute('hidden');
  for(var i = 0; i < allProducts.length; i++)
  {
    data.labels[i] = allProducts[i].productName;
    chartMe.datasets[0].bars[i].value = allProducts[i].numClicks;
  }
  chartMe.update();
}
