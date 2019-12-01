let body = document.body;
let title = document.createElement('div');
let word = document.createElement('div');
let form = document.createElement('form');
let input = document.createElement('input');
let result = document.createElement('div');

body.append(title);

body.append(word);
word.textContent = 'text';
testWord = word.textContent
 
body.append(form);

form.append(input);
input.placeholder = 'input'
input.textContent = 'text'
input.focus();

body.append(result);

title.textContent = "word chain"

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (testWord[testWord.length - 1] === input.value[0]) {
        result.textContent = 'right';
        word.value = input.value;
        input.value = '';
        input.focus();
    } else {
        result.textContent = 'wrong';
        input.value = '';
        input.focus();
    }
});