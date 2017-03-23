var generateBtn = document.getElementById('generateBtn');
var transformBtn = document.getElementById('transformBtn');
var word_result = document.getElementById('word_result');
var getWordURL = 'https://company.oseberg.io/interview/word_generator.php';
var transformWordURL = 'https://company.oseberg.io/interview/shifter.php?word=';
var myInterval;

function progressIndicator(startStop) {
  if(startStop == 'Start') {
    word_result.innerHTML = 'Please wait for word.'
    myInterval = setInterval(appendToProgress, 1000);
  } else {
    clearInterval(myInterval);
    word_result.innerHTML = '';
  }
}

function appendToProgress() {
  word_result.innerHTML = word_result.innerHTML + '.';
}

function getWord() {
  progressIndicator('Start');
  var request = new XMLHttpRequest();
  request.open('GET', getWordURL, true);

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        var resp = this.responseText;
        console.log(resp);
      } else {
        // Error :(
      }
    }
  };

  request.send();
  request = null;
  // window.fetch(getWordURL, {method: 'GET', mode:'cors'})
  //   .then(function(response) {
  //     console.log('response ', response);
  //     console.log('data?? ', response.data);
  //     progressIndicator('Stop');
  //   })
  //   .catch(function(err) {
  //     console.log('err ', err);
  //     progressIndicator('Stop');
  //   });
}

function transformWord() {
  var tmpWord = word_result.innerHTML;
  window.fetch(transformWordURL + tmpWord)
    .then(function(response) {
      console.log('response ', response);
    })
    .catch(function(err) {
      console.log('err ', err);
    });
}

generateBtn.addEventListener('click', getWord);
transformBtn.addEventListener('click', transformWord);
