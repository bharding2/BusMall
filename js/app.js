'use strict';

var originalIndex = 0;

function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.numClicks = 0;
  this.numDisplays = 0;
  this.originalIndex = originalIndex++;
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
var choicesShown = [];
var img0 = document.getElementById('0');
var img1 = document.getElementById('1');
var img2 = document.getElementById('2');

function createRandom() {
  var index = Math.floor(Math.random() * allProducts.length);
  if (choicesShown.indexOf(index) > 0) {
    index = Math.floor(Math.random() * allProducts.length);
  } else {
    choicesShown.push(index);
  }
  return index;
}

function displayThree() {
  imageIndex[0] = createRandom();
  img0.setAttribute('src', allProducts[imageIndex[0]].filePath);

  imageIndex[1] = createRandom();
  while (imageIndex[1] === imageIndex[0])  {
    imageIndex[1] = createRandom();
  }
  img1.setAttribute('src', allProducts[imageIndex[1]].filePath);

  imageIndex[2] = createRandom();
  while (imageIndex[2] === imageIndex[0] || imageIndex[2] === imageIndex[1]) {
    imageIndex[2] = createRandom();
  }
  img2.setAttribute('src', allProducts[imageIndex[2]].filePath);

  console.log(imageIndex[0]);
  console.log(imageIndex[1]);
  console.log(imageIndex[2]);
}
displayThree();

img0.addEventListener('click', handleImgClick);
img1.addEventListener('click', handleImgClick);
img2.addEventListener('click', handleImgClick);
var totalClicks = 0;

function handleImgClick(event) {
  allProducts[imageIndex[+event.target.id]].numClicks += 1;
  allProducts[imageIndex[0]].numDisplays += 1;
  allProducts[imageIndex[1]].numDisplays += 1;
  allProducts[imageIndex[2]].numDisplays += 1;
  totalClicks += 1;
  if (totalClicks === 15) {
    resultButton.removeAttribute('hidden');
  }
  displayThree();
}
//chart data
var data = {
  labels: [],
  datasets: [
    {
      label: 'Times clicked per item',
      fillColor: '#2E9329',
      strokeColor: '#31732E',
      highlightFill:'#72C56E',
      hightlightStroke: '#31732E',
      data: []
    },
    {
      label: 'Times Displayed per item',
      fillColor: '#EDF3F2',
      strokeColor: '#B3CFCE',
      highlightFill: '#F5FAF4',
      hightlightStroke: '#B3CFCE',
      data: []
    }
  ]
};

function resetChartData() {
  for (var j = 0; j < allProducts.length; j++) {
    data.labels.push('0');
    data.datasets[0].data.push('0');
    data.datasets[1].data.push('0');
  }
}
resetChartData();

var resultsCanvas = document.getElementById('resultsCanvas').getContext('2d');
var chartMe = new Chart(resultsCanvas).Bar(data);

var resultButton = document.getElementById('showResults');
var numResultButtonClicks = 0;
resultButton.addEventListener('click', handleResultButtonClick);

function handleResultButtonClick(event) {
  numResultButtonClicks += 1;
  var results = document.getElementById('resultsSection');
  results.removeAttribute('hidden');

  allProducts.sort(function (a, b) {return b.numClicks - a.numClicks;});
  for(var i = 0; i < allProducts.length; i++)
  {
    data.labels[i] = allProducts[i].productName;
    chartMe.datasets[0].bars[i].label = 'Clicked ' + parseInt(allProducts[i].numClicks/allProducts[i].numDisplays*100) + '%';
    chartMe.datasets[0].bars[i].value = allProducts[i].numClicks;
    chartMe.datasets[1].bars[i].value = allProducts[i].numDisplays;
  }
  chartMe.update();
  allProducts.sort(function (a, b) {return a.originalIndex - b.originalIndex;});
}
