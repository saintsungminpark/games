//구현하기
//1. 재시작시 arr 초기화 시키기

let body = document.body;
let title = document.createElement('div');
let result = document.createElement('div');
let form = document.createElement('form');
let input = document.createElement('input');
let chanceCnt = document.createElement('div');
let resultWrong = document.createElement('div');
let resultFail = document.createElement('div');
let resultUpdate = document.createElement('div');
let arr;
let num;
let wrongCnt = 0;

body.append(title);
body.append(result);
body.append(form);
form.append(input);
body.append(chanceCnt);
body.append(resultWrong);
body.append(resultFail);
body.append(resultUpdate);

title.textContent = "bulls and cows"
input.focus();
input.maxLength = 4;

function numberFactory() {
    num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    arr = [];

    for (let i = 0; i < 4; i += 1) {
        let pickNum = num.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        arr.push(pickNum);
    }
    console.log(arr);
};

numberFactory();


form.addEventListener('submit', function (e) {
    e.preventDefault();
    let answer = input.value;
    chanceCnt.textContent = "chance count: 9";

    if (answer === arr.join('')) {
        result.textContent = "home run";
        input.value = '';
        input.focus();
        numberFactory();
        wrongCnt = 0;
    } else {
        let answerArr = answer.split('');
        let strike = 0;
        let ball = 0;
        wrongCnt += 1;
        resultWrong.textContent = "wrong count: " + wrongCnt;
        if (wrongCnt > 8) {
            resultFail.textContent = 'you fail';
            resultUpdate.textContent = 'correct is ' + arr.join('');
            input.value = '';
            input.focus();
            numberFactory();
            wrongCnt = 0;

        } else {
            for (let i = 0; i < 4; i += 1)
                if (Number(answerArr[i]) === arr[i]) {
                    strike += 1;
                } else if (arr.indexOf(Number(answerArr[i])) > -1) {
                    ball += 1
                }
            result.textContent = "strike " + strike + ", " + "ball " + ball;
            input.value = '';
            input.focus();
        }
    }
})