let body = document.body;
let table = document.querySelector('table');
let result = document.querySelector('.result');
let rows = [];
let datas = [];
let marker = 'X';

function 결과체크(rowNum, dataNum) {
    // 세칸 다 채워졌는가
    let 승리여부 = false;
    //가로줄 검사
    if (datas[rowNum][0].textContent === marker &&
        datas[rowNum][1].textContent === marker &&
        datas[rowNum][2].textContent === marker) {
        승리여부 = true;
    }
    //세로줄 검사
    if (datas[0][dataNum].textContent === marker &&
        datas[1][dataNum].textContent === marker &&
        datas[2][dataNum].textContent === marker) {
        승리여부 = true;
    }
    //대각선 검사 - [0][0], [1][1], [2][2]
    if (datas[0][0].textContent === marker &&
        datas[1][1].textContent === marker &&
        datas[2][2].textContent === marker) {
        승리여부 = true;
    }
    //대각선검사 - [0][2], [1][1], [2][0]
    if (datas[0][2].textContent === marker &&
        datas[1][1].textContent === marker &&
        datas[2][0].textContent === marker) {
        승리여부 = true;
    }
    return 승리여부;
}
function 초기화(무승부) { // 초기화
    if (무승부) {
        result.textContent = '무승부';
    } else {
        result.textContent = marker + ' win';
    }

    setTimeout(function () {
        result.textContent = '';
        datas.forEach(function (tr) { // 초기화
            tr.forEach(function (td) {
                td.textContent = '';
            });
        });
    }, 1000);
}

let callBack = function (e) { // 칸을 클릭했을 때
        if (marker === 'O') { // 컴퓨터의 턴일때 내가 클릭하지 못하게 방지
            return
        }
        let rowNum = rows.indexOf(e.target.parentNode);
        let dataNum = datas[rowNum].indexOf(e.target);

        if (datas[rowNum][dataNum].textContent !== '') { //빈 칸인지 검사
        } else { // 빈 칸이면
            datas[rowNum][dataNum].textContent = marker;
            
            let 승리여부 = 결과체크(rowNum, dataNum);
            // 모든 칸이 다 찼는지 검사
            let 후보칸 = [];
            datas.forEach(function (tr) {
                tr.forEach(function (td) {
                    후보칸.push(td);
                });
            });
            후보칸 = 후보칸.filter(function (td) { return !td.textContent }); // return 값이 '거짓'이 되는 값만 걸러낸다 즉, '', 0, NaN, undefined, null 값...
            if (승리여부) { // 승리여부: 위의 결과체크 함수의 return값 false
                초기화(); // ()을 비워두면 false를 의미한다
            } else if (후보칸.length === 0) { // 칸을 더이상 선택할 수 없음
                초기화(true);
            } else { // 전부 채워지지 않았으면
                if (marker === 'X') {
                    marker = 'O';
                } else {
                    marker = 'X';
                }
                // 컴퓨터의 선택
                setTimeout(function () {
                    // 빈 칸 중 하나를 고른다
                    let 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
                    선택칸.textContent = marker;
                    // 컴퓨터가 승리했는지 체크
                    let rowNum = rows.indexOf(선택칸.parentNode);
                    let dataNum = datas[rowNum].indexOf(선택칸);
                    let 승리여부 = 결과체크(rowNum, dataNum);
                    //다 찼으면
                    if (승리여부) {
                        초기화();
                    }
                    // 턴을 나한테 넘긴다
                    marker = 'X';
                }, 1000);
            }
        }
    };

    for (let i = 0; i < 3; i++) {
        let tr = document.createElement('tr');
        table.append(tr);
        rows.push(tr);
        datas.push([]);
        for (let j = 0; j < 3; j++) {
            let td = document.createElement('td');
            tr.append(td);
            datas[i].push(td);
            td.addEventListener('click', callBack);
        }
    }
    body.append(table);
    body.append(result);