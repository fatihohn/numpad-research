let Test = {};
Test.result = [];
Test.resultHTML = '';
Test.schedule = [];
Test.countInput = document.querySelector('#test-count');
Test.makeSchedule = () => {
  Test.countInput.style.display = 'none';
  Test.count = Test.countInput.value;

  Test.condition = {
    shadow: Math.floor(Test.count/2),
    normal: Math.floor(Test.count/2)
  }
  Test.count = Test.condition.shadow + Test.condition.normal;
  console.log(Test.count);
  let schedule = [];
  let shadow = 'shadow';
  let normal = 'normal';
  let shadowCount = Test.condition.shadow;
  let normalCount = Test.condition.normal;
  while(shadowCount > 0) {
    schedule.push(shadow);
    shadowCount--;
  }
  while(normalCount > 0) {
    schedule.push(normal);
    normalCount--;
  }
  Test.schedule = Test.shuffle(schedule);
}

Test.trial = 0;
Test.status = 'sleep';
Test.log = {};
Test.template = async () => {
  return {
    trial: Test.trial,
    type: Test.schedule[Test.count - 1],
    test_start_timestamp: 0,
    test_number: '',
    test_input: '',
    first_input_timestamp: 0,
    reflection_speed: 0,
    average_input_speed: 0,
    test_speed: 0,
    del_count: 0,
    input_count: 0,
    test_end_timestamp: 0,
    correct: false
  }
};
Test.numpadNumbers = [];
Test.loading = document.querySelector('#loading');
Test.startBtn = document.querySelector('#test-start-btn');
Test.nextBtn = document.querySelector('#test-next-btn');
Test.endBtn = document.querySelector('#test-end-btn');
Test.refreshBtn = document.querySelector('#test-refresh-btn');
Test.testInput = document.querySelector('#test-input');
Test.testBody = document.querySelector('#test-body');
Test.testNumber = document.querySelector('#test-number');
Test.content = document.querySelector('#content');
Test.section = document.querySelector('section');
Test.testResult = document.querySelector('#test-result');

Test.refreshBtn.onclick = () => {
  location.href = window.location;
}

Test.startBtn.style.display = 'initial';
Test.startBtn.onclick = async () => {
  Test.section.style.overflowY = 'hidden';
  if(window.webkitRequestFullscreen) {
    await Test.section.webkitRequestFullscreen();
  }
  if(window.requestFullscreen) {
    await Test.section.requestFullscreen();
  }
  // console.log(window.navigator.standalone);
  if(Test.countInput.value >= 2) {
    Test.makeSchedule();
  } else {
    alert('2보다 큰 짝수를 입력해주세요!');
    return;
  }
  console.log(Test.count);
  // Test.log = await Test.template();
  Test.status = 'testing';
  await Test.initNumPad();
  Test.enumerate();
  Test.emptyTestInput();
  Test.setTestNumbers();
  Test.startBtn.style.display = 'none';
  Test.nextBtn.style.display = 'initial';
}

Test.nextBtn.onclick = async () => {
  console.log(Test.count);
  // console.log(Test.log);
  if(Test.testInput.dataset.value.length === 6) {
    if(Test.count > 0) {
      Test.setResult();
      await Test.initNumPad();
      Test.setTestNumbers();
      Test.enumerate();
      return;
    }
    if(Test.count === 0){
      // console.log(Test.count);
      Test.status = 'complete';
      Test.setResult();
      Test.showResult();
    }
  }
  return;
}
Test.enumerate = () => {
  Test.count -= 1;
  Test.trial += 1;
}
Test.setResult = () => {
  let log = Test.log;
  log.test_end_timestamp = Date.now();
  log.test_input = Test.testInput.dataset.value;
  log.correct = log.test_input === log.test_number;
  log.reflection_speed = log.first_input_timestamp - log.test_start_timestamp;
  log.test_speed = log.test_end_timestamp - log.test_start_timestamp;
  log.average_input_speed = (Math.floor((log.test_speed * 10000)/log.input_count)) / 10000;
  log.trial = Test.trial;
  Test.result.push(log);
  console.log(log);
}

Test.showResult = () => {
  Test.emptyAll();
  Test.section.style.overflowY = 'auto';
  Test.content.style.touchAction = 'initial';
  Test.section.style.touchAction = 'initial';
  Test.testNumber.innerHTML = 'Test End';
  Test.nextBtn.style.display = 'none';
  Test.endBtn.style.display = 'initial';
  // Test.content.innerHTML = `<div id="test-result" style="display: block"></div>`;
  Test.result.forEach(result => {
    Test.resultHTML += `
          <tr class="border-bottom">
              <td class="px-1">회차</td>
              <td class="px-1">${result.trial}</td>
          </tr>
          <tr class="border-bottom">
              <td class="px-1">유형</td>
              <td class="px-1">${result.type}</td>
          </tr>
          <tr class="border-bottom">
              <td class="px-1">과제</td>
              <td class="px-1">${result.test_number}</td>
          </tr>
          <tr class="border-bottom">
              <td class="px-1">수행 결과</td>
              <td class="px-1">${result.test_input}</td>
          </tr>
          <tr class="border-bottom">
              <td class="px-1">반응 속도</td>
              <td class="px-1">${result.reflection_speed}</td>
          </tr>
          <tr class="border-bottom">
              <td class="px-1">수행 속도</td>
              <td class="px-1">${result.test_speed}</td>
          </tr>
          <tr class="border-bottom">
              <td class="px-1">평균 키 입력 속도</td>
              <td class="px-1">${result.average_input_speed}</td>
          </tr>
          <tr class="border-bottom">
              <td class="px-1">삭제 회수</td>
              <td class="px-1">${result.del_count}</td>
          </tr>
          <tr class="border-bottom">
              <td class="px-1">총 입력 회수</td>
              <td class="px-1">${result.input_count}</td>
          </tr>
          <tr class="border-2 border-start-0 border-end-0 border-top-0">
              <td class="px-1">성공 여부</td>
              <td class="px-1">${result.correct}</td>
          </tr>
        `;
  });
  document.querySelector('#test-result').innerHTML = Test.resultHTML;
  Test.content.innerHTML = `<table id="test-result-show" class="fs-6">
    <thead>
    <tr>
        <th>Parameter</th>
        <th>Value</th>
    </tr>
    </thead>
    <tbody>${Test.resultHTML}</tbody>
</table>`;
  // Test.testResult.style.display = 'initial';
}

Test.emptyAll = () => {
  Test.emptyTestInput();
  Test.emptyTestNumber();
  Test.emptyTestContent();
}

Test.emptyTestNumber = () => {
  Test.testNumber.innerHTML = '';
}

Test.emptyTestContent = () => {
  Test.content.innerHTML = '';
}

Test.delTestInput = () => {
  let str = Test.testInput.dataset.value;
  if(str.length > 0) {
    str = str.substring(0, str.length - 1);
    Test.testInput.dataset.value = str;
    Test.testInput.innerHTML = '';
    Test.testInput.innerHTML = str;
    Test.log.input_count++;
    Test.log.del_count++;
  }
}

Test.initNumPad = async () => {
  Test.loading.style.display = 'initial';

  // Test.loading.innerHTML = '준비하세요..!';
  let option = Test.schedule[Test.count - 1];
  console.log(option);
  await Test.sleep(1000);
  Test.loading.style.display = 'none';
  Test.log = await Test.template();
  Test.log.test_start_timestamp = Date.now();

  Test.content.innerHTML = '';
  if(option) {
    Test.testInput.style.display = 'block';
    Test.testBody.style.display = 'block';
    Test.content.innerHTML = Test.showNumPad(option);
    Test.resizeBtns();
    Test.delBtn = document.querySelector('#del-btn');
    Test.delBtn.onclick = () => {
      Test.delTestInput();
    }
    Test.inputNumber();
  } else {
    Test.testInput.style.display = 'none';
    Test.testBody.style.display = 'none';
  }
  Test.testNumber.innerHTML = 'Press Start button';
  Test.emptyTestInput();
}

Test.mmToPx = (mm) => {
  return `${Util.mmToPx(mm)}px`;
}

Test.resizeBtns = () => {
  let btnStyle = {
    fontSize: Test.mmToPx(7),
    width: Test.mmToPx(17.5),
    minWidth: Test.mmToPx(17.5),
    maxWidth: Test.mmToPx(17.5),
    height: Test.mmToPx(17.5),
    minHeight: Test.mmToPx(17.5),
    maxHeight: Test.mmToPx(17.5),
    lineHeight: Test.mmToPx(17.5),
    margin: Test.mmToPx(1.5)
  }
  document.querySelector('.numpad-wrap').style.width = Test.mmToPx(120);
  document.querySelector('.numpad-wrap').style.maxWidth = Test.mmToPx(120);
  document.querySelector('.numpad-wrap').style.minWidth = Test.mmToPx(120);
  document.querySelectorAll('.num-btn').forEach(btn => {
    btn.style.fontSize = btnStyle.fontSize;
    btn.style.width = btnStyle.width;
    btn.style.minWidth = btnStyle.minWidth;
    btn.style.maxWidth = btnStyle.maxWidth;
    btn.style.height = btnStyle.height;
    btn.style.minHeight = btnStyle.minHeight;
    btn.style.maxHeight = btnStyle.maxHeight;
    btn.style.lineHeight = btnStyle.lineHeight;
    btn.style.margin = btnStyle.margin;
  });
  document.querySelectorAll('.del-btn').forEach(btn => {
    btn.style.fontSize = btnStyle.fontSize;
    btn.style.width = btnStyle.width;
    btn.style.minWidth = btnStyle.minWidth;
    btn.style.maxWidth = btnStyle.maxWidth;
    btn.style.height = btnStyle.height;
    btn.style.minHeight = btnStyle.minHeight;
    btn.style.maxHeight = btnStyle.maxHeight;
    btn.style.lineHeight = btnStyle.lineHeight;
    btn.style.margin = btnStyle.margin;
  });
}

Test.emptyTestInput = () => {
  Test.testInput.dataset.value = '';
  Test.testInput.innerHTML = '';
}

Test.setTestNumbers = () => {
  Test.testNumber.innerHTML = '';
  Test.testNumber.innerHTML = Test.getTestNumbers();
}

Test.inputNumber = () => {
  Test.numberKey = document.querySelectorAll('.num-btn');
  Test.numberKey.forEach(key => {
    key.onclick = () =>  {
      if(Test.status === 'testing' && Test.testInput.dataset.value.length < 6) {
        Test.testInput.dataset.value += key.dataset.value;
        Test.testInput.innerHTML += key.dataset.value;
        if(Test.log.input_count === 0) {
          Test.log.first_input_timestamp = Date.now();
        }
        Test.log.input_count++;
      }
    }
  });
}

Test.shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

Test.getTestNumbers = () => {
  let result = '';
  let testNumbers = [0,1,2,3,4,5,6,7,8,9];
  testNumbers = Test.shuffle(testNumbers);
  let length = 6;

  while(length > 0) {
    result += testNumbers[length].toString();
    length -= 1;
  }
  Test.log.test_number = result;
  return result;
}


/**
 * show number pad
 * @param {string} option : normal || shadow, default = normal
 */
Test.showNumPad = (option = 'normal') => {
  let shadowOption = '';
  let numbers = [9,8,7,6,5,4,3,2,1,0];
  Test.numpadNumbers = [];

  if(option === 'shadow') {
    shadowOption = 'num-btn-shadow';
  }

  for(let i = 0; i < numbers.length; i++) {
    let numberElement = `<div class="col-2 text-center border num-btn ${shadowOption}" data-value="${numbers[i]}">${numbers[i]}</div>`;
    Test.numpadNumbers.push(numberElement);
  }

  Test.numpadNumbers = Test.shuffle(Test.numpadNumbers);

            // <div class="row" style="
            //     display: -webkit-flex;
            //     --webkit-align-items: center;
            //     --webkit-justify-content: right;
            //     display: flex;
            //     align-items: center;
            //     justify-content: right;
            //   ">
            //     <div class="col-2 text-center border del-btn ${shadowOption}" style="visibility: hidden"></div>
            //     <div class="col-2 text-center border del-btn ${shadowOption}" style="visibility: hidden"></div>
            // </div>
  return `<div id="num-pad-shadow">
            <div class="row">
              ${Test.numpadNumbers[0]}
              ${Test.numpadNumbers[1]}
              ${Test.numpadNumbers[2]} 
            </div>
            <div class="row">
              ${Test.numpadNumbers[3]}
              ${Test.numpadNumbers[4]}
              ${Test.numpadNumbers[5]}
            </div>
            <div class="row">
              ${Test.numpadNumbers[6]}
              ${Test.numpadNumbers[7]}
              ${Test.numpadNumbers[8]}
            </div>
            <div class="row">
                <div class="col-2 text-center border del-btn ${shadowOption}" style="visibility: hidden"></div>
              ${Test.numpadNumbers[9]}              
                <div id="del-btn" class="col-2 text-center border del-btn ${shadowOption}" data-value="del">Del</div>
            </div>
          </div> `;
}

Test.sleep = m => new Promise(r => setTimeout(r, m));

// Test.makeSchedule();
Test.initNumPad();

document.addEventListener("DOMContentLoaded", function(){
  document.querySelector("#test-end-btn").onclick = function(){
    exportExcel();
    Test.endBtn.style.display = 'none';
    Test.refreshBtn.style.display = 'initial';
  };
});
