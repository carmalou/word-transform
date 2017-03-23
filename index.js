var generateBtn = document.getElementById('generateBtn');
var transformBtn = document.getElementById('transformBtn');
var word_result = document.getElementById('word_result');
var getWordURL = 'https://company.oseberg.io/interview/word_generator.php';
var transformWordURL = 'https://company.oseberg.io/interview/shifter.php?word=';
var myInterval;

function progressIndicator(startStop, progressText) {
  if(startStop == 'Start') {
    word_result.innerHTML = progressText;
    myInterval = setInterval(appendToProgress, 1000);
  } else {
    clearInterval(myInterval);
    word_result.innerHTML = '';
  }
}

function appendToProgress() {
  word_result.innerHTML = word_result.innerHTML + '.';
}

function fetchData(endpoint, tmpWord) {
  var tmpEndpoint = tmpWord ? endpoint + tmpWord : endpoint;
  window.fetch(tmpEndpoint)
    .then(function(response) {
      return response.text();
    })
    .then(function(response) {
      progressIndicator('Stop');
      word_result.innerHTML = response;
    })
    .catch(function(err) {
      progressIndicator('Stop');
      word_result.innerHTML = 'Error! ' + err;
    })
}

function getWord() {
  progressIndicator('Start', 'Please wait for word.');
  fetchData(getWordURL)
}

function transformWord() {
  var tmpWord = word_result.innerHTML;
  progressIndicator('Start', 'Please wait for transformation.');
  fetchData(transformWordURL, tmpWord)
}

generateBtn.addEventListener('click', getWord);
transformBtn.addEventListener('click', transformWord);
