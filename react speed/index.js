let 스크린 = document.querySelector('#screen');
let 시작시간;
let 끝시간;
let 기록 = [];
let 타임아웃;

스크린.addEventListener('click', function () {
    if (스크린.classList.contains('waiting')) { // 현재클래스 파악 가능
        스크린.classList.remove('waiting');
        스크린.classList.add('ready');
        스크린.textContent = '초록색이 되면 클릭하세요';
        타임아웃 = setTimeout(function () {
            시작시간 = new Date(); // 현재시간을(Data()) 변수 시작시간에 저장 // 또는 console.time('시간')
            스크린.click();
        }, Math.floor(Math.random() * 1000) + 2000); // 2000 ~ 3000 사이 수
    } else if (스크린.classList.contains('ready')) { // 준비 상태
        if (!시작시간) { // 부정클릭 // !시작시간: 시작시간이 없으면 부정클릭
            clearTimeout(타임아웃) // 위의 setTimeout()을 변수에 담을 시 제어가능(멈출수 있음)
            스크린.classList.remove('ready');
            스크린.classList.add('waiting');
            스크린.textContent = '너무 빨리 클릭했습니다';
        } else {
            스크린.classList.remove('ready');
            스크린.classList.add('now');
            스크린.textContent = '클릭하세요';
        }
    } else if (스크린.classList.contains('now')) { // 시작 상태
        끝시간 = new Date(); // console.timeEnd('시간'), 보통 테스트(디버깅)시 확인 용도로 사용
        console.log('반응속도', 끝시간 - 시작시간, 'ms');
        기록.push(끝시간 - 시작시간);
        시작시간 = null; // 시작시간 초기화
        끝시간 = null; // 끝시간 초기화
        스크린.classList.remove('now');
        스크린.classList.add('waiting');
        스크린.textContent = '클릭해서 시작하세요';
    }
});