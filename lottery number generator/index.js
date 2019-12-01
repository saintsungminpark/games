let body = document.body;
let form = document.querySelector('form');
let input = document.querySelector('input');

let numbers = Array(45).fill().map(function(item, index){
    return index + 1;
});
console.log(numbers);
let shuffle = [];
while (numbers.length > 0) { // splice(members 배열의 index 0 ~ 44중 랜덤한 index, 1개 추출) ==> [0]의 의미는 splice()로 추출한 랜덤한 숫자를 0번째(첫번째) 삽입 후 배열로 반환)]
    let spliceNum = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0];
    shuffle.push(spliceNum);
}
console.log(shuffle);
let bonusNum = shuffle[shuffle.length -1];
let lotteryNum = shuffle.slice(0, 6).sort(function(p, c) {
    return p - c;
});
console.log('당첨 숫자들:', lotteryNum, '보너스 숫자:', bonusNum);

let resultNum = document.querySelector('#resultNum');

function ballPaint(num, resultNum) {
    let ball = document.createElement('div');
    ball.textContent = num;
    ball.style.display = 'inline-block';
    ball.style.borderRadius = '50%';
    ball.style.width = '50px';
    ball.style.height = '50px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '15px';

    let backgroundColor;
    if (num < 11) {
        backgroundColor = 'red';
    } else if (num < 21) {
        backgroundColor = 'orange';
    } else if (num < 31) {
        backgroundColor = 'yellow';
    } else if (num < 41) {
        backgroundColor = 'blue';
    } else {
        backgroundColor = 'green';
    }
    ball.style.background = backgroundColor;
    resultNum.append(ball);
}

let result = document.querySelector('.result');
input.focus();

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let answer = input.value;
    inputNum = document.querySelector('.inputNum');
    inputNum.textContent = answer;
    input.value = '';
    input.focus();
    
    let numberTitle = document.querySelector('.numberTitle');
    numberTitle.textContent = 'winning number'

    let bonusTitle = document.querySelector('.bonusTitle');
    bonusTitle.textContent = 'bonus number'

    for (let i = 0; i < lotteryNum.length; i++) { // closure 문제로 해당 코드 변경
        function closure(j) {
            setTimeout(function() {
                ballPaint(lotteryNum[j], resultNum);
            }, (j + 1) * 1000);
        }
        closure(i);
    }

    setTimeout(function() {
        let bonus = document.querySelector('.resultBonus');
        ballPaint(bonusNum, bonus)
    }, 7000);

    if (answer === lotteryNum.join('')) {
        setTimeout(function() {result.textContent = 'congratulations';}, 8000);
        input.value = '';
        input.focus();
    } else {
        setTimeout(function() {result.textContent = 'unlucky';}, 8000);
        input.value = '';
        input.focus();
    }
});
