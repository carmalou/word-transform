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

function makeXMLReq(endpoint, tmpWord) {
  var tmpEndpoint = tmpWord ? endpoint + tmpWord : endpoint;
  var request = new XMLHttpRequest();
  request.open('GET', tmpEndpoint, true);

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        progressIndicator('Stop');
        word_result.innerHTML = this.responseText;
      } else {
        progressIndicator('Stop');
        word_result.innerHTML = 'Error! ' + this.statusText;
      }
    }
  };

  request.send();
  request = null;
}

function getWord() {
  progressIndicator('Start', 'Please wait for word.');
  makeXMLReq(getWordURL)
}

function transformWord() {
  var tmpWord = word_result.innerHTML;
  progressIndicator('Start', 'Please wait for transformation.');
  makeXMLReq(transformWordURL, tmpWord)
}

generateBtn.addEventListener('click', getWord);
transformBtn.addEventListener('click', transformWord);
