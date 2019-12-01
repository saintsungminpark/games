let 가로 = 4;
let 세로 = 3;
let 색깔들 = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink']
// .slice() == 위 색깔들을 대입할때 복사 + 붙여넣기가 아닌 참조관계로써 이루어지는데 .slice()시 참조관계가 끊긴다
// 깊은 복사는 아니다 깊은 복사를 사용하려면 JSON.parse(JSON.stringify(색깔들)) 사용
// .slice(): 1차원 배열, 객체 일떄 사용
// JSON.parse(JSON.stringify()): 1차원 이상 배열, 객체일떄 사용 but 해당 함수 사용시 성능이 안좋다
 let 색깔후보 = 색깔들.slice();

let 색깔 = [];
let 클릭플래그 = true;
let 클릭카드 = [];
let 완성카드 = [];
let 시작시간;
function 셔플() {
    for (let i = 0; 색깔후보.length > 0; i++) {
        색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1));
    }
}

function 카드세팅(가로, 세로) {
    클릭플래그 = false;
    for (let i = 0; i < 가로 * 세로; i++) {
        let card = document.createElement('div');
        card.className = 'card';
        let cardInner = document.createElement('div');
        cardInner.className = 'card-inner';
        let cardFront = document.createElement('div');
        cardFront.className = 'card-front'
        let cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = 색깔[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function (c) {
            card.addEventListener('click', function () {
                if (클릭플래그 && !완성카드.includes(c)) { // !완성카드 == 완성카드가 아닐때
                    c.classList.toggle('flipped'); // .toggle == class='flipped' 있으면 태그에서 뺴고 있으면 넣고를 토글해준다(반복)
                    클릭카드.push(c);
                    if (클릭카드.length === 2) {
                        if (클릭카드[0].querySelector('.card-back').style.backgroundColor ===
                            클릭카드[1].querySelector('.card-back').style.backgroundColor) {
                            완성카드.push(클릭카드[0]);
                            완성카드.push(클릭카드[1]);
                            클릭카드 = [];
                            if (완성카드.length === 가로 * 세로) {
                                let 끝시간 = new Date();
                                alert('성공' + (끝시간 - 시작시간) / 1000 + '초 걸렸습니다');
                                document.querySelector('#wrapper').innerHTML = ''; // 초기화
                                색깔후보 = JSON.parse(JSON.stringify(색깔들)); // line 4 에서 사용했던 .slice() 방법 말고 다른 방법 : 참조관계가 아닌 깊은 복사
                                색깔 = [];
                                완성카드 = [];
                                시작시간 = null;
                                셔플()
                                카드세팅(가로, 세로);
                            }
                        } else { // 두 카드의 색깔이 다르면
                            클릭플래그 = false;
                            setTimeout(function () {
                                클릭카드[0].classList.remove('flipped');
                                클릭카드[1].classList.remove('flipped');
                                클릭플래그 = true;
                                클릭카드 = [];
                            }, 1000);
                        }
                    }
                }
            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
    }
    document.querySelectorAll('.card').forEach(function (card, index) {
        setTimeout(function () {
            card.classList.add('flipped');
        }, 1000 + 100 * index); // 2200 == 2.2초
    });

    setTimeout(function () {
        document.querySelectorAll('.card').forEach(function (card) {
            card.classList.remove('flipped');
        });
        클릭플래그 = true;
        시작시간 = new Date();
    }, 5000);
}
셔플()
카드세팅(가로, 세로);