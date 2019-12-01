let 상대 = { // 딕셔너리로 변환
    영웅: document.getElementById('rival-hero'),
    덱: document.getElementById('rival-deck'),
    필드: document.getElementById('rival-cards'),
    코스트: document.getElementById('rival-cost'),
    덱data: [],
    영웅data: [],
    필드data: [],
    선택카드: null,
    선택카드data: null,
}
let 나 = { // 딕셔너리로 변환
    영웅: document.getElementById('my-hero'),
    덱: document.getElementById('my-deck'),
    필드: document.getElementById('my-cards'),
    코스트: document.getElementById('my-cost'),
    덱data: [],
    영웅data: [],
    필드data: [],
    선택카드: null,
    선택카드data: null,
}
let 턴버튼 = document.getElementById('turn-btn');
let 턴 = true; // true == 내 턴, false == 상대방 턴

function 덱에서필드로(데이터, 내턴) {
    let 객체 = 내턴 ? 나 : 상대; // 삼항연산자 == 조건 ? 참 : 거짓
    let 현재코스트 = Number(객체.코스트.textContent);
    if (현재코스트 < 데이터.cost) {
        return true; // 조건이 맞으면 덱에서필드로() 종료하며 리턴으로 true를 호출한곳으로 내보낸다(line61, line68)
    }
    let idx = 객체.덱data.indexOf(데이터);
    객체.덱data.splice(idx, 1);
    객체.필드data.push(데이터);
    필드다시그리기(객체);
    덱다시그리기(객체);
    데이터.field = true;
    객체.코스트.textContent = 현재코스트 - 데이터.cost;
} // 함수에 return이 없을때 return은 undefind된다(undefind == false)
function 필드다시그리기(객체) {
    객체.필드.innerHTML = '';
    객체.필드data.forEach(function (data) {
        카드돔연결(data, 객체.필드);
    });
}
function 덱다시그리기(객체) {
    객체.덱.innerHTML = '';
    객체.덱data.forEach(function (data) {
        카드돔연결(data, 객체.덱);
    });
}
function 영웅다시그리기 (객체) {
    객체.영웅.innerHTML = '';
    카드돔연결(객체.영웅data, 객체.영웅, true);
}
function 화면다시그리기(내화면) {
    let 객체 = 내화면 ? 나 : 상대; // 조건 ? 참 : 거짓
    필드다시그리기(객체);
    덱다시그리기(객체);
    영웅다시그리기(객체);
}
function 턴액션수행(카드, 데이터, 내턴) {
    let 아군 = 내턴 ? 나 : 상대;
    let 적군 = 내턴 ? 상대 : 나;
    if (카드.classList.contains('card-turnover')) {
        return;
    }
    let 적군카드 = 내턴 ? !데이터.mine : 데이터.mine;
    if (적군카드 && 아군.선택카드) { // 적군 카드면서 내 카드가 선택 되어있으면 공격
        데이터.hp = 데이터.hp - 아군.선택카드data.att;
        if (데이터.hp <= 0) { // 카드가 죽었을떄
            let 인덱스 = 적군.필드data.indexOf(데이터);
            if (인덱스 > -1) { // 쫄병이 죽었을때
                적군.필드data.splice(인덱스, 1);
            } else { // 영웅이 죽었을때
                alert('you win');
                초기세팅();
            }
        }
        화면다시그리기(!내턴); // 이 조건문이 적군를 뜻하기 때문에 false를 인자로 삽입
        아군.선택카드.classList.remove('card-slected');
        아군.선택카드.classList.add('card-turnover');
        아군.선택카드 = null;
        아군.선택카드data = null;
        return;
    } else if (적군카드) { // 내 턴인데 상대 카드 // 아래 Card()에서 기본(나) 데이터.mine 값을 true로 설정했다
        return; // 함수종료
    }
    if (데이터.field) { // 카드가 필드에 있으면
        카드.parentNode.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('card-selected'); // 선택한 카드만 선택되어진 화면(빨간보더) 보여지게 하기위해 만든 card-selected 클래스 일단 전부 삭제(컴퓨터상으로는 비효율적일 수 있으나 사람입장에서 괜찮게 보이면 사람입장으로 코드 작성하는것이 좋다)
        });
        카드.classList.add('card-selected');
        아군.선택카드 = 카드;
        아군.선택카드data = 데이터;
    } else { // 카드가 덱에 있으면
        if (!덱에서필드로(데이터, 내턴)) { // 덱에서필드로()가 true가 아닐때 내덱생성(): line28로 리턴(계속 클릭되는것 방지를 위해)
            // 위 덱에서 카드 1장 뽑은 후 덱에 카드 1장 다시 추가
            내턴 ? 내덱생성(1) : 상대덱생성(1); 
        }
    }
}
function 카드돔연결(데이터, 돔, 영웅) {
    let 카드 = document.querySelector('.card-hidden .card').cloneNode(true); // cloneNode() == 기존태그 그대로 복사 인자에 true 삽입시 내부까지 복사 즉, document.createElement() 와 appendChile() 함수를 사용 안해도 된다
    카드.querySelector('.card-cost').textContent = 데이터.cost;
    카드.querySelector('.card-att').textContent = 데이터.att;
    카드.querySelector('.card-hp').textContent = 데이터.hp;
    if (영웅) {
        카드.querySelector('.card-cost').style.display = 'none'; // 영웅은 cost가 없으니 숨긴다
        let 이름 = document.createElement('div');
        이름.textContent = '영웅';
        카드.appendChild(이름);
    }
    카드.addEventListener('click', function () {
        턴액션수행(카드 ,데이터, 턴);
    });
    돔.appendChild(카드); // 태그에 추가
}
function 상대덱생성(갯수) {
    for (let i = 0; i < 갯수; i++) {
        상대.덱data.push(카드공장()); // 카드공장 (false, false)
    }
    덱다시그리기(상대);
}
function 내덱생성(갯수) {
    for (let i = 0; i < 갯수; i++) {
        나.덱data.push(카드공장(false, true));
    }
    덱다시그리기(나);
}
function 내영웅생성() {
    나.영웅data = 카드공장(true, true); // 카드공장() == 비워두면 false
    카드돔연결(나.영웅data, 나.영웅, true);
}
function 상대영웅생성() {
    상대.영웅data = 카드공장(true);
    카드돔연결(상대.영웅data, 상대.영웅, true);
}
function Card(영웅, 내카드) {
    if (영웅) {
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (내카드) {
        this.mine = true;
    }
}
function 카드공장(영웅, 내카드) {
    return new Card(영웅, 내카드);
}
턴버튼.addEventListener('click', function () {
    let 객체 = 턴 ? 나 : 상대; // 조건 ? 참 : 거짓
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    필드다시그리기(객체);
    영웅다시그리기(객체);
    턴 = !턴; // true면 false, false면 true로 대입
    if (턴) {
        나.코스트.textContent = 10;
    } else {
        상대.코스트.textContent = 10;
    };
})
function 초기세팅() {
    상대덱생성(5);
    내덱생성(5);
    내영웅생성();
    상대영웅생성();
    화면다시그리기(true); // 상대 화면
    화면다시그리기(false); // 내 화면
}
초기세팅(); // 진입점