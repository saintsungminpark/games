let num1 = Math.ceil(Math.random() * 9);
let num2 = Math.ceil(Math.random() * 9);
let num3 = num1 * num2;

let body = document.body;
let title = document.createElement('div');
let test = document.createElement('div');
let form = document.createElement('form');
let input = document.createElement('input');
let result = document.createElement('div');
let rule = true;

body.append(title);
body.append(test);
body.append(form);
form.append(input);
body.append(result);

title.textContent = "multiplication"
test.textContent = num1 + " X " + num2 + " = ?";
input.placeholder = "number";
input.focus();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (Number(input.value) === num3) {
        result.textContent = "right";
        num1 = Math.ceil(Math.random() * 7 + 2);
        num2 = Math.ceil(Math.random() * 8 + 1);
        num3 = num1 * num2;
        test.textContent = num1 + " X " + num2 + " = ?";
        input.value = '';
        input.focus();
    } else {
        result.textContent = "wrong";
        input.value = '';
        input.focus();
    }
});
