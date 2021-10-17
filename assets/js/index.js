/* global bootstrap: false */

(function () {
  'use strict'

  // Tooltip and popover demos
  document.querySelectorAll('.tooltip-demo')
    .forEach(function (tooltip) {
      new bootstrap.Tooltip(tooltip, {
        selector: '[data-bs-toggle="tooltip"]'
      })
    })

  document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(function (popover) {
      new bootstrap.Popover(popover)
    })

  document.querySelectorAll('.toast')
    .forEach(function (toastNode) {
      var toast = new bootstrap.Toast(toastNode, {
        autohide: false
      })

      toast.show()
    })

  // Disable empty links and submit buttons
  document.querySelectorAll('[href="#"], [type="submit"]')
    .forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault()
      })
    })

  function setActiveItem() {
    var hash = window.location.hash

    if (hash === '') {
      return
    }

    var link = document.querySelector('.bd-aside a[href="' + hash + '"]')

    if (!link) {
      return
    }

    var active = document.querySelector('.bd-aside .active')
    var parent = link.parentNode.parentNode.previousElementSibling

    link.classList.add('active')

    if (parent.classList.contains('collapsed')) {
      parent.click()
    }

    if (!active) {
      return
    }

    var expanded = active.parentNode.parentNode.previousElementSibling

    active.classList.remove('active')

    if (expanded && parent !== expanded) {
      expanded.click()
    }
  }

  setActiveItem()
  window.addEventListener('hashchange', setActiveItem)
})()

let testInput = document.querySelector('#test-input');
let testNumber = document.querySelector('#test-number');
let content = document.querySelector('#content');
initNumPad();

let showNextBtn = document.querySelector('#show-next-btn');
showNextBtn.onclick = () => {
  initNumPad();
}

function initNumPad() {
  content.innerHTML = '';
  content.innerHTML = showNumPad('shadow');
  testNumber.innerHTML = '';
  testNumber.innerHTML = getTestNumbers();
  testInput.dataset.value = '';
  testInput.innerHTML = '';
  inputNumber();
}

function inputNumber() {
  let numberKey = document.querySelectorAll('.num-btn');
  numberKey.forEach(key => {
    key.onclick = () =>  {
      if(testInput.dataset.value.length < 6) {
        testInput.dataset.value += key.dataset.value;
        testInput.innerHTML += key.dataset.value;
      }
    }
  });
}


function shuffle(array) { 
  return array.sort(() => Math.random() - 0.5); 
}

function getTestNumbers() {
  let result = '';
  let testNumbers = [0,1,2,3,4,5,6,7,8,9];
  testNumbers = shuffle(testNumbers);
  let length = 6;

  while(length > 0) {
    result += testNumbers[length].toString();
    length -= 1;
  }

  return result;
}


/**
 * show number pad
 * @param {String} option : normal || shadow, default = normal
 */
function showNumPad(option = 'normal') {
  let shadowOption = '';
  let numbers = [9,8,7,6,5,4,3,2,1,0];
  let numpadNumbers = [];

  if(option === 'shadow') {
    shadowOption = 'num-btn-shadow';
  }

  for(let i = 0; i < numbers.length; i++) {
    let numberElement = `<div class="col-2 text-center border num-btn ${shadowOption}" data-value="${numbers[i]}">${numbers[i]}</div>`;
    numpadNumbers.push(numberElement);
  }

  numpadNumbers = shuffle(numpadNumbers);

  return `<div id="num-pad-shadow">
            <div class="row w-100">
              <button id="del-btn" class="next-btn col-2 text-center del-btn">Del</button>
            </div>
            <div class="row">
              ${numpadNumbers[0]}
              ${numpadNumbers[1]}
              ${numpadNumbers[2]} 
            </div>
            <div class="row">
              ${numpadNumbers[3]}
              ${numpadNumbers[4]}
              ${numpadNumbers[5]}
            </div>
            <div class="row">
              ${numpadNumbers[6]}
              ${numpadNumbers[7]}
              ${numpadNumbers[8]}
            </div>
            <div class="row">
              ${numpadNumbers[9]}
              
            </div>
          </div> `;
}