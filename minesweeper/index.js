let tbody = document.querySelector('#table tbody');
let dataset = [];
let stopFlag = false; // flag변수 == 코드의 흐름을 제어시 사용
let openData = 0; //열린 칸
let codeChart = { // 딕셔너리로 만들어준다
    연칸: -1,
    물음표: -2,
    깃발: -3,
    깃발지뢰: -4,
    물음표지뢰: -5,
    지뢰: 1,
    보통칸: 0
}
// 실행: 유저에게 칸수, 지뢰갯수 입력 '받기'
document.querySelector('#exec').addEventListener('click', function () {
    tbody.innerHTML = ''; // 초기화(내부 태그들 공백으로 만듦)
    document.querySelector('#result').textContent = '';
    dataset = []; // 초기화
    openData = 0; // 위 dataset 초기화 시 열린칸도 초기화 
    stopFlag = false;
    let hor = parseInt(document.querySelector('#hor').value);
    let ver = parseInt(document.querySelector('#ver').value);
    let mine = parseInt(document.querySelector('#mine').value);

    // (랜덤한 좌표로) 지뢰 생성하기 위해 hor * ver 배열 생성 후 각 아이템의 값으로 인덱스 부여하기
    let numbers = Array(hor * ver).fill().map(function (item, index) {
        return index;
    });

    let shuffle = []; // shuffle == (카드를) 섞다
    while (numbers.length > hor * ver - mine) { // splice(members 배열의 index hor * ver중 랜덤한 index, 1개 추출) ==> [0]의 의미는 splice()로 추출한 랜덤한 숫자를 splice()[0]번째(첫번째) 삽입 후 그 값을 반환)]
        let spliceNum = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]; // Fisher-Yates shuffle
        shuffle.push(spliceNum);
    }

    // 사용자가 원하는 갯수의 hor * ver 지뢰찾기 칸 & 지뢰 갯수 '만들기'
    for (let i = 0; i < ver; i++) { // 가로줄 갯수 == 1차원 배열 생성
        let arr = [];
        let tr = document.createElement('tr'); // 화면의 tr태그 만들기
        dataset.push(arr); // 배열 만들기
        for (let j = 0; j < hor; j++) { // 세로줄 갯수 == 2차원 배열 생성
            arr.push(codeChart.보통칸); // 배열 만들기
            let td = document.createElement('td'); // 화면의 td태그 만들기
            td.addEventListener('contextmenu', function (e) {
                e.preventDefault(); // target == td
                if (stopFlag) {
                    return;
                }
                let parentTr = e.currentTarget.parentNode;
                let parentTbody = e.currentTarget.parentNode.parentNode;        // 아래 두 내용은 배열에만 사용가능한 함수인 indexOf()를 사용하지 못하는 대상 즉, 배열이 아닌 대상에 indexOf()와 같은 작용이 가능하게 만들어주는 함수
                let data = Array.prototype.indexOf.call(parentTr.children, e.currentTarget); // e.currentTarget(td)의 인덱스를 parentTr.children에 속해있는 인덱스중 같은 인덱스를 찾아 해당 인덱스를(의 위치를) 반환 // 클로저 문제로 td 대신 e.currentTarget룰 사용해야 한다)
                let row = Array.prototype.indexOf.call(parentTbody.children, parentTr); // tr의 위치를 tr의 부모 노드인 parentTbody.children에서 찾아 해당 위치 반환('contextmenu'(마우스 우클릭)시 타겟(td)를 기준으로 삼기에 그냥 tr로 접근하는것이 아니라 parentTbody.children로 접근하여야 한다)

                if (['', '*'].includes(e.currentTarget.textContent)) {
                    e.currentTarget.textContent = '!'; // 화면의 태그 값 바꾸기
                    e.currentTarget.classList.add('flag');
                    if (dataset[row][data] === codeChart.지뢰) {
                        dataset[row][data] = codeChart.깃발지뢰;
                    } else {
                        dataset[row][data] = codeChart.깃발;
                    }
                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if (dataset[row][data] === codeChart.깃발지뢰) {
                        dataset[row][data] = codeChart.물음표지뢰;
                    } else {
                        dataset[row][data] = codeChart.물음표;
                    }
                } else if (e.currentTarget.textContent === '?') {
                    e.currentTarget.classList.remove('question');
                    if (dataset[row][data] === codeChart.물음표지뢰) {
                        e.currentTarget.textContent = '*';
                        dataset[row][data] = codeChart.지뢰;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[row][data] = codeChart.보통칸;
                    }
                }
            })
            td.addEventListener('click', function (e) {
                if (stopFlag) { // 만약 stopFlag(중단플래그) 가 true 이면 return(게임 중단, return으로 함수의 실행을 중간에 끊을 수 있다), line100
                    return;
                }
                // 클릭시 주변 지뢰 갯수
                let parentTr = e.currentTarget.parentNode;
                let parentTbody = e.currentTarget.parentNode.parentNode;        // 아래 두 내용은 배열에만 사용가능한 함수인 indexOf()를 사용하지 못하는 대상 즉, 배열이 아닌 대상에 indexOf()와 같은 작용이 가능하게 만들어주는 함수
                let data = Array.prototype.indexOf.call(parentTr.children, e.currentTarget); // e.currentTarget(td)의 인덱스를 parentTr.children에 속해있는 인덱스중 같은 인덱스를 찾아 해당 인덱스를(의 위치를) 반환 // 클로저 문제로 td 대신 e.currentTarget룰 사용해야 한다)
                let row = Array.prototype.indexOf.call(parentTbody.children, parentTr); // tr의 위치를 tr의 부모 노드인 parentTbody.children에서 찾아 해당 위치 반환('contextmenu'(마우스 우클릭)시 타겟(td)를 기준으로 삼기에 그냥 tr로 접근하는것이 아니라 parentTbody.children로 접근하여야 한다)
                if ([codeChart.연칸, codeChart.깃발, codeChart.깃발지뢰, codeChart.물음표지뢰, codeChart.물음표].includes(dataset[row][data])) {
                    return;
                }
                //클릭 시 
                e.currentTarget.classList.add('opened');
                openData += 1;
                if (dataset[row][data] === codeChart.지뢰) { // 지뢰 클릭
                    e.currentTarget.textContent = 'b'; // 'b' == 'boom'
                    document.querySelector('#result').textContent = 'you fail';
                    stopFlag = true;
                } else { // 지뢰가 아닌경우 주변 지뢰갯수 세기
                    dataset[row][data] = 1; // 클릭시 해당 칸(data) 기존 0에서 1로 바꾸기
                    let around = [
                        dataset[row][data - 1], dataset[row][data + 1],
                    ]; // if dataset[row - 1] == true이면 즉 row - 1이 있으면 -> 맨 상단 줄 떄문
                    if (dataset[row - 1]) { // concatenate == 사슬같이 잇다 // concat(dataset) == around 배열에 dataset 배열 합치기
                        around = around.concat([dataset[row - 1][data - 1], dataset[row - 1][data], dataset[row - 1][data + 1]])
                    } // if dataset[row + 1] == true이면 즉 row + 1이 있으면 맨 하단 줄 때문
                    if (dataset[row + 1]) {
                        around = around.concat([dataset[row + 1][data - 1], dataset[row + 1][data], dataset[row + 1][data + 1]])
                    }
                    console.log(around);
                    let aroundNum = around.filter(function (v) {
                        return [codeChart.지뢰, codeChart.깃발지뢰, codeChart.물음표지뢰].includes(v);
                    }).length;
                    e.currentTarget.textContent = aroundNum || ''; //aroundNum가 거짓인 값이면 뒤의 ''을 사용한다 라는 의미: 거짓인 값 == 0, '', NaN, null, undefined, false 
                    dataset[row][data] = codeChart.연칸;
                    if (aroundNum === 0) {  // 주변 8칸 동시 오픈(재귀 함수)
                        let aroundData = [];

                        aroundData = aroundData.concat([
                            tbody.children[row].children[data - 1],
                            tbody.children[row].children[data + 1],
                        ]);

                        if (tbody.children[row - 1]) {
                            aroundData = aroundData.concat([
                                tbody.children[row - 1].children[data - 1],
                                tbody.children[row - 1].children[data],
                                tbody.children[row - 1].children[data + 1],
                            ]);
                        }

                        if (tbody.children[row + 1]) {
                            aroundData = aroundData.concat([
                                tbody.children[row + 1].children[data - 1],
                                tbody.children[row + 1].children[data],
                                tbody.children[row + 1].children[data + 1],
                            ]);
                        }
                        aroundData.filter(function (v) { return !!v; }).forEach(function (nextData) { // !!v == 0, null, undefined등 빈 문자열 제거
                            let parentTr = e.currentTarget.parentNode;
                            let parentTbody = e.currentTarget.parentNode.parentNode;
                            let nextDataData = Array.prototype.indexOf.call(parentTr.children, nextData);
                            let nextDataRow = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                            if (dataset[nextDataRow][nextDataData] !== codeChart.연칸) {
                                nextData.click(); // 재귀
                            }
                        });
                    }
                }
                if (openData === hor * ver - mine) {
                    stopFlag = true;
                    document.querySelector('#result').textContent = 'you win';
                }
            });
            tr.append(td);
        }
        tbody.append(tr);
    }
    //지뢰 심기
    for (let k = 0; k < shuffle.length; k++) { // 만약 shuffle내 지뢰의 좌표가 59이면
        let row = Math.floor(shuffle[k] / ver); // 5
        let data = shuffle[k] % ver; // 9

        tbody.children[row].children[data].textContent = '*'; // 태그(실제 브라우저 화면)에 삽입
        dataset[row][data] = codeChart.지뢰; // 2차원 배열에 삽입
    }
});

