window.onload = function() {
  mdlTextareaDOM = document.getElementById('mdl-textarea');
  wordCloudDOM = document.getElementById('word-cloud');
  mdlSpinnerDOM = document.getElementById('mdl-spinner');
  sectionChipsDOM = document.getElementById('section-chips');
  numWordsChip = document.getElementById('num-words');
  minFrequencyChip = document.getElementById('min-frequency');
  maxFrequencyChip = document.getElementById('max-frequency');
  minFontSizeSlider = document.getElementById('min-font-size');
  maxFontSizeSlider = document.getElementById('max-font-size');
  colorPicker = document.getElementById('color-picker');
  opacitySwitch = document.getElementById('opacity-switch');
  wordsLoremIpsum = document.getElementById('words-lorem-ipsum');
  textOverlap = document.getElementById('text-overlap');
  ignoreCommonTerms = document.getElementById('ignore-common-terms');
  filterCheckbox = document.getElementById('filter-checkbox');
  frequencyPercentage = document.getElementById('frequency-percentage');

  filterCheckbox.onchange = function() {
    if (frequencyPercentage.value) {
      frequencyPercentageOldValue = frequencyPercentage.value;
    }

    if (this.checked) {
      frequencyPercentage.parentNode.classList.add('is-dirty');
      frequencyPercentage.parentNode.classList.remove('is-focused');
      frequencyPercentage.value = frequencyPercentageOldValue;
      frequencyPercentage.disabled = false;
    } else {
      frequencyPercentage.classList.add('is-focused');
      frequencyPercentage.parentNode.classList.remove('is-dirty');
      frequencyPercentage.value = '';
      frequencyPercentage.disabled = true;
    }
  }

  var labelMaker = function (e) {
    const input = e.target || e;
    const label = input.parentElement.querySelectorAll('.label')[0] || document.createElement('div');
    const labelInner = label.firstChild || document.createElement('div');
    const parentWidth = input.parentElement.offsetWidth;
    const inputWidth = input.offsetWidth ;
    const labelOffset = (parentWidth - inputWidth) / 2;
    var labelPosX;
    if (input.getAttribute('id') == 'min-font-size') {
      labelPosX = inputWidth * (input.value/100) + ((100 - input.value) * 14)/100;
      // console.log('[min] labelPosX = ' + labelPosX);
    } else {
      // labelPosX = (inputWidth * (input.value/100)) - inputWidth;
      labelPosX = (inputWidth * (input.value/100) + ((100 - input.value) * 14)/100) - (inputWidth - labelOffset);
      // console.log('[max] labelPosX = ' + labelPosX);
    }

    label.classList.add('label');
    if (input.value == 0) {
      label.classList.add('zeroed');
    } else {
      label.classList.remove('zeroed');
    }
    labelInner.innerText = input.value;
    label.appendChild(labelInner);
    label.style.left = labelPosX + 'px';
    input.parentElement.appendChild(label);
  }

  minFontSizeSlider.addEventListener('input', labelMaker);
  maxFontSizeSlider.addEventListener('input', labelMaker);

  lipsumObj = new LoremIpsum();
};

var mdlTextareaDOM;
var wordCloudDOM;
var mdlSpinnerDOM;
var sectionChipsDOM;
var numWordsChip;
var minFrequencyChip;
var maxFrequencyChip;
var minFontSizeSlider;
var maxFontSizeSlider;
var colorPicker;
var opacitySwitch;
var wordsLoremIpsum;
var textOverlap;
var ignoreCommonTerms;
var filterCheckbox;
var frequencyPercentage;

var frequencyPercentageOldValue;

var lipsumObj;

function generateWordCloud() {

  mdlSpinnerDOM.classList.add('is-active');
  sectionChipsDOM.style = "display: none;";

  wordCloudDOM.style.color = '#' + colorPicker.value;

  var text = document.getElementById('textarea').value;

  wordCloudDOM.innerHTML = '';
  if (!text) {
    mdlTextareaDOM.classList.add('is-invalid');
    mdlSpinnerDOM.classList.remove('is-active');
    return;
  } else {
    mdlTextareaDOM.classList.remove('is-invalid');
  }

  if (textOverlap.checked) {
    wordCloudDOM.style.overflow = 'visible';
  } else {
    wordCloudDOM.style.overflow = 'hidden';
  }

  if (ignoreCommonTerms.checked) {
    text = text.removeStopWords();
  }

  var wordFrequency = calculateFrequency(text);
  if (filterCheckbox.checked) {
    wordFrequency = filterFrequency(wordFrequency);
  }
  var arrFrenquency = Object.values(wordFrequency);
  var minFrequency = Math.min(...arrFrenquency);
  var maxFrequency = Math.max(...arrFrenquency);
  var size = Object.keys(wordFrequency).length;

  numWordsChip.innerHTML = 'Words: ' + size;
  minFrequencyChip.innerHTML = 'Min frequency: ' + minFrequency;
  maxFrequencyChip.innerHTML = 'Max frequency: ' + maxFrequency;

  var minFontSize = parseInt(minFontSizeSlider.value);
  var maxFontSize = parseInt(maxFontSizeSlider.value);

  var wordCloud = '';
  for (var key in wordFrequency) {
    // console.log(key, wordFrequency[key]);
    var frequency = wordFrequency[key];
    var fontSize = convertRange(frequency, [minFrequency, maxFrequency], [minFontSize, maxFontSize]);
    var opacity = 1;
    if (opacitySwitch.checked) {
      opacity = convertRange(frequency, [minFrequency, maxFrequency], [0.1, 1]);
    }
    wordCloud += '<span id="' + key + '" title="' + key + ' appeared ' + frequency +' times" style="font-size: ' + fontSize + 'px; opacity: ' + opacity + ';" >' + key + '</span> ';
  }

  mdlSpinnerDOM.classList.remove('is-active');
  sectionChipsDOM.style = "display: block;";

  wordCloudDOM.innerHTML = wordCloud;
};

function calculateFrequency(text) {
    var regexWord = /\w+/g;
    var wordArray = text.match(regexWord);

    var wordFrequency = wordArray.reduce(function (stats, word) {
      var wordLowerCase = word.toLowerCase();

        if (stats.hasOwnProperty(wordLowerCase)) {
            stats[wordLowerCase] = stats[wordLowerCase] + 1;
        } else {
            stats[wordLowerCase] = 1;
        }
        return stats;
    }, {} );

    return wordFrequency;
};

function filterFrequency(wordFrequency) {
  var size = Object.keys(wordFrequency).length;

  var frequencyToFilter = 1.0;
  if (/^[0-9]+$/.test(frequencyPercentage.value)) {
    frequencyToFilter = parseInt(frequencyPercentage.value);
  }
  for (var key in wordFrequency) {
    if (wordFrequency[key] <= frequencyToFilter) {
      delete wordFrequency[key];
    }
  }

  return wordFrequency;
}

function convertRange( value, r1, r2 ) {
    return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}

function generateLoremIpsum() {
  document.getElementById('textarea').focus();
  if (/^[0-9]+$/.test(wordsLoremIpsum.value)) {
    document.getElementById('textarea').value = lipsumObj.generate(wordsLoremIpsum.value);
  } else {
    document.getElementById('textarea').value = lipsumObj.generate(500);
  }
}
// generateWordCloud();
