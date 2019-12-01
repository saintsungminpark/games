let imgPosition = '-20px';
// rpc == rock paper scissors
let rpc = { // 딕셔너리 자료구조
    rock: '-20px',
    paper: '-228px',
    scissors: '-436px',
};

let interval;
function intervalMaker() {
    //가위, 바위, 보 이미지 만들기
    interval = setInterval(function () { // setInterval()을 변수에 대입시 변수로(interval) setInterval 제어 가능
        if (imgPosition === rpc.rock) { // rock: -20, paper: -228, scissor: -436
            imgPosition = rpc.scissors;
        } else if (imgPosition === rpc.scissors) {
            imgPosition = rpc.paper;
        } else {
            imgPosition = rpc.rock;
        }
        document.querySelector('#computerImg').style.background = 'url(./rock-paper-scissors.png)' + imgPosition + ' 0';
    }, 100);
}

intervalMaker();

let scoreTable = { // 조건문 사용시 코드의 길어짐을 방지하고자 리팩토링시 scoreTable 객체를 생성했다
    rock: 0,
    scissors: 1,
    paper: -1,
}

function comChoice(imgPosition) { 
    return Object.entries(rpc).find(function (v) { // Object.entries(rpc) == rpc 객체를 2차원 배열로 만든다
        return v[1] === imgPosition; // find(): rpc 2차원 배열 중(v == 첫번째 배열) [0][1] [1][1] [2][1]을 검사하여 imgPosition과 같은 키값을 리턴 한다([1] == 2차배열의 키값이 있는 위치)
    })[0]; // 찾은 키를 [0](첫번째) 배열에 담아 반환(indexOf()[0]에서와 동일)
}

//가위, 바위, 보 선택
//버튼 클릭시의 0.5초마다 바뀌는 가위 바위 보 이미지 중 하나의 이미지 출력
document.querySelectorAll('.btn').forEach(function (btn) { // .forEach()를 사용하여 각각의 버튼에 접근 
    btn.addEventListener('click', function () {
        clearInterval(interval); // clearInterval == 위의 setInterval 제어(멈추게 한다) 즉, intervalMaker 멈춤
        setTimeout(function () { // 1초 뒤 다시 interMaker 실행
            intervalMaker();
        }, 1000);

        let myChoice = this.textContent;
        let score = scoreTable[myChoice] - scoreTable[comChoice(imgPosition)];
        if (score === 0) {
            console.log('draw');
        } else if ([-1, 2].includes(score)) {
            // 조건문이 너무 길어지면 [ , ].includes 사용으로 축약 가능하다. 다만 [ , ].includes는 "or관계"일떄만 사용 가능하다
            // scoreTable[myChoice] - scoreTable[comChoice(imgPosition)] === -1 || scoreTable[myChoice] - scoreTable[comChoice(imgPosition)] === 2 와 같다
            console.log('you loose');
        } else {
            console.log('you win');
        }
    });
});