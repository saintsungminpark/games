let 테이블 = document.getElementById('table'); // 화면
let 데이터 = []; // 데이터
let 점수표 = document.getElementById('score');

function 초기화() { // 4 x 4 배열 생성 후 각 데이터에 초기값 0 삽입
    let fragment = document.createDocumentFragment();
    [1, 2, 3, 4].forEach(function () {
        let 열데이터 = [];
        데이터.push(열데이터);
        let tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function () {
            열데이터.push(0);
            let td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    테이블.appendChild(fragment);
}

function 랜덤생성() {
    let 빈칸배열 = [];
    데이터.forEach(function (열데이터, i) {
        열데이터.forEach(function (행데이터, j) {
            if (!행데이터) { // !(행데이터 == 0 => false) => true
                빈칸배열.push([i, j]);
            }
        });
    });
    if (빈칸배열.length === 0) {
        alert('game over: ' + 점수표.textContent);
        테이블.innerHTML = '';
        초기화();
    } else {
        let 랜덤칸 = 빈칸배열[Math.floor(Math.random() * 빈칸배열.length)]; // 빈칸배열[0] ~ 빈칸배열[15] == 16
        데이터[랜덤칸[0]][랜덤칸[1]] = 2;
        그리기(); // 여기서 실제 화면에 그려준다
    }
}

function 그리기() { // 실제 화면
    데이터.forEach(function (열데이터, i) {
        열데이터.forEach(function (행데이터, j) {
            if (행데이터 > 0) {
                테이블.children[i].children[j].textContent = 행데이터;
            } else {
                테이블.children[i].children[j].textContent = '';
            }
        });
    });
}

초기화();
랜덤생성();
그리기();

let 드래그시작 = false;
let 드래그중 = false;
let 시작좌표;
let 끝좌표;
// screenX, Y: 좌표(모니터 기준)
// clientX, Y: 좌표(브라우저 화면 기준)
// offsetX, Y: 좌표(이벤트 타겟 기준)
// pageX, Y: 좌표(페이지 기준(스크롤 포함))
window.addEventListener('mousedown', function (이벤트) { // 마우스 누를 때(클릭)
    드래그시작 = true;
    시작좌표 = [이벤트.clientX, 이벤트.clientY];
});;
window.addEventListener('mousemove', function (이벤트) { // 마우스 움직임
    if (드래그시작) {
        드래그중 = true;
    }
});
window.addEventListener('mouseup', function (이벤트) { // 마우스 뗄 때
    끝좌표 = [이벤트.clientX, 이벤트.clientY];
    if (드래그중) { // 좌표숫자가 x축은 왼쪽에서 오른쪽으로 커지고 y축은 위에서 아래로 커진다
        var 방향;
        let x차이 = 끝좌표[0] - 시작좌표[0];
        let y차이 = 끝좌표[1] - 시작좌표[1];
        if (y차이 < 0 && Math.abs(x차이) / Math.abs(y차이) < 1) {
            방향 = '위쪽';
        } else if (x차이 > 0 && Math.abs(x차이) / Math.abs(y차이) > 1) {
            방향 = '오른쪽';
        } else if (y차이 > 0 && Math.abs(x차이) / Math.abs(y차이) < 1) {
            방향 = '아래쪽';
        } else if (x차이 < 0 && Math.abs(x차이) / Math.abs(y차이) > 1) {
            방향 = '왼쪽';
        }
        console.log(x차이, y차이, 방향);
    }
    드래그시작 = false;
    드래그중 = false;

    switch (방향) {
        case '왼쪽':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ];
            데이터.forEach(function (열데이터, i) { // forEach(function(요소, 인덱스))
                열데이터.forEach(function (행데이터, j) {
                    if (행데이터) { // 행데이터가 0이 아니면 즉, true이면
                        if (새데이터[i][새데이터[i].length - 1] && 새데이터[i][새데이터[i].length - 1] === 행데이터) { // 새데이터가 합쳐져야 되는 경우: 새데이터의 값과 행데이터의 값이 같으면
                            새데이터[i][새데이터[i].length - 1] *= 2; // 2배 해준다
                            let 현점수 = parseInt(점수표.textContent, 10);
                            점수표.textContent = 현점수 + 새데이터[i][새데이터[i].length - 1];
                        } else {
                            새데이터[i].push(행데이터);
                        }
                    }
                });
            });
            console.log(새데이터);
            [1, 2, 3, 4].forEach(function (열데이터, i) {
                [1, 2, 3, 4].forEach(function (행데이터, j) {
                    데이터[i][j] = 새데이터[i][j] || 0; // 데이터[j][i]에 새데이터[i][j]가 0이 아니면 즉, 참이면 대입 그렇지 않으면 0 대입
                });
            });
            break;
        case '오른쪽':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ];
            데이터.forEach(function (열데이터, i) { // forEach(function(요소, 인덱스))
                열데이터.forEach(function (행데이터, j) {
                    if (행데이터) { // 행데이터가 0이 아니면 즉, true이면
                        if (새데이터[i][0] && 새데이터[i][0] === 행데이터) { // 새데이터가 합쳐져야 되는 경우: 새데이터의 값과 행데이터의 값이 같으면
                            새데이터[i][0] *= 2; // 2배 해준다
                            let 현점수 = parseInt(점수표.textContent, 10); // string을 n진법일 때의 값으로 바꾼다
                            점수표.textContent = 현점수 + 새데이터[i][0];
                        } else {
                            새데이터[i].unshift(행데이터);
                        }
                    }
                });
            });
            console.log(새데이터);
            [1, 2, 3, 4].forEach(function (열데이터, i) {
                [1, 2, 3, 4].forEach(function (행데이터, j) {
                    데이터[i][3 - j] = 새데이터[i][j] || 0; // 데이터[j][i]에 새데이터[i][j]가 0이 아니면 즉, 참이면 대입 그렇지 않으면 0 대입
                });
            });
            break;
        case '위쪽':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ];
            데이터.forEach(function (열데이터, i) { // forEach(function(요소, 인덱스))
                열데이터.forEach(function (행데이터, j) {
                    if (행데이터) { // 행데이터가 0이 아니면 즉, true이면
                        if (새데이터[j][새데이터[j].length - 1] && 새데이터[j][새데이터[j].length - 1] === 행데이터) { // 새데이터가 합쳐져야 되는 경우: 새데이터의 값과 행데이터의 값이 같으면
                            새데이터[j][새데이터[j].length - 1] *= 2; // 2배 해준다
                            let 현점수 = parseInt(점수표.textContent, 10); // string을 n진법일 때의 값으로 바꾼다
                            점수표.textContent = 현점수 + 새데이터[j][새데이터[j].length - 1];
                        } else {
                            새데이터[j].push(행데이터);
                        }
                    }

                });
            });
            console.log(새데이터);
            [1, 2, 3, 4].forEach(function (행데이터, i) {
                [1, 2, 3, 4].forEach(function (열데이터, j) {
                    데이터[j][i] = 새데이터[i][j] || 0; // 데이터[j][i]에 새데이터[i][j]가 0이 아니면 즉, 참이면 대입 그렇지 않으면 0 대입
                })
            })
            break;
        case '아래쪽':
            var 새데이터 = [
                [],
                [],
                [],
                []
            ];
            데이터.forEach(function (열데이터, i) { // forEach(function(요소, 인덱스))
                열데이터.forEach(function (행데이터, j) {
                    if (행데이터) { // 행데이터가 0이 아니면 즉, true이면   
                        if (새데이터[j][0] && 새데이터[j][0] === 행데이터) { // 새데이터가 합쳐져야 되는 경우: 새데이터의 값과 행데이터의 값이 같으면
                            새데이터[j][0] *= 2; // 2배 해준다
                            let 현점수 = parseInt(점수표.textContent, 10); // string을 n진법일 때의 값으로 바꾼다
                            점수표.textContent = 현점수 + 새데이터[j][0];
                        } else {
                            새데이터[j].unshift(행데이터);
                        }
                    }
                });
            });
            console.log(새데이터);
            [1, 2, 3, 4].forEach(function (행데이터, i) {
                [1, 2, 3, 4].forEach(function (열데이터, j) {
                    데이터[3 - j][i] = 새데이터[i][j] || 0; // 데이터[j][i]에 새데이터[i][j]가 0이 아니면 즉, 참이면 대입 그렇지 않으면 0 대입
                });
            });
            break;
    }
    그리기();
    랜덤생성();
});