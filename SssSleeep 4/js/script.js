let cur = 0;
let typeQ = 'text';
let temp = '';
let questions = [
    'За сколько часов Земля повернётся вокруг своей оси на 120 градусов?',
    'В каком созвездии расположена Полярная звезда?',
    'Расположение чего показывает звёздная карта?',
    'Какая звезда ближе всего расположена к северному небесному полюсу мира?',
    'Какой предмет используется для ориентирования на местности?',
    'Название каких созвездий существует?',
    'Сколько созвездий существует?',
    'Самое большое созвездие (по площади)',
    'Международная единица измерения звёздных расстояний',
    'Сколько земных лет в световом году?'
];

let rightAnswers = [
    '8',
    'Малая медведица',
    'Звёзд Планет Метеоритов ',
    'Полярная звезда',
    'Компас',
    'Дракон Жертвенник Печь ',
    '88',
    'Гидра',
    'Парсек',
    '0'
];

let userAnswers = [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
];

function start() {
    let question = document.getElementById('ques');
    let startButton = document.getElementById('startTest');

    question.innerHTML = questions[cur];
    startButton.value = 'Закончить тест';
    startButton.setAttribute('onclick', 'checkAnswers()');
    createAnswerBoard();
}

function createAnswerBoard() {
    let answer = document.getElementById('answ');
    answer.style.fontSize = '24px';
    let button = document.getElementById(`button${cur + 1}`);
    button.style.background = 'brown';

    if (cur === 0) {
        typeQ = 'text';
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'text';
        answer.appendChild(input);
        input.value = userAnswers[cur];

    } else if (cur === 1) {
        typeQ = 'radio';
        answer.innerHTML = '<p><input id="input1" type="radio" name="answer" value="Большая медведица" checked>Большая медведица</p>\n' +
            '                <p><input id="input2" type="radio" name="answer" value="Феникс">Феникс</p>\n' +
            '                <p><input id="input3" type="radio" name="answer" value="Малая медведица">Малая медведица</p>\n' +
            '                <p><input id="input4" type="radio" name="answer" value="Единорог">Единорог</p>';
        let input1 = document.getElementById('input1');
        let input2 = document.getElementById('input2');
        let input3 = document.getElementById('input3');
        let input4 = document.getElementById('input4');
        if (userAnswers[cur].includes(input1.value)) {
            input1.checked = true;
        } else if (userAnswers[cur].includes(input2.value)) {
            input2.checked = true;
        } else if (userAnswers[cur].includes(input3.value)) {
            input3.checked = true;
        } else if (userAnswers[cur].includes(input4.value)) {
            input4.checked = true;
        }

    } else if (cur === 2) {
        typeQ = 'checkbox';
        answer.innerHTML = '<p><input id="input1" type="checkbox" value="Звёзд">Звёзд</p>\n' +
            '                <p><input id="input2" type="checkbox" value="Планет">Планет</p>\n' +
            '                <p><input id="input3" type="checkbox" value="Метеоритов">Метеоритов</p>\n' +
            '                <p><input id="input4" type="checkbox" value="Ничего не показывает">Ничего не показывает</p>';
        let input1 = document.getElementById('input1');
        let input2 = document.getElementById('input2');
        let input3 = document.getElementById('input3');
        let input4 = document.getElementById('input4');
        if (userAnswers[cur].includes(input1.value)) {
            input1.checked = true;
        } if (userAnswers[cur].includes(input2.value)) {
            input2.checked = true;
        } if (userAnswers[cur].includes(input3.value)) {
            input3.checked = true;
        } if (userAnswers[cur].includes(input4.value)) {
            input4.checked = true;
        }

    } else if (cur === 3) {
        typeQ = 'select';
        answer.innerHTML = '<p><select id="select">\n' +
            '                        <option id="input1" value="Центавра А">Центавра А</option>\n' +
            '                        <option id="input2" value="Полярная звезда">Полярная звезда</option>\n' +
            '                        <option id="input3" value="Солнце">Солнце</option>\n' +
            '                        <option id="input4" value="Луна">Луна, а что же ещё?</option>\n' +
            '               </select></p>';
        let input1 = document.getElementById('input1');
        let input2 = document.getElementById('input2');
        let input3 = document.getElementById('input3');
        let input4 = document.getElementById('input4');
        if (userAnswers[cur].includes(input1.value)) {
            input1.selected = true;
        } else if (userAnswers[cur].includes(input2.value)) {
            input2.selected = true;
        } else if (userAnswers[cur].includes(input3.value)) {
            input3.selected = true;
        } else if (userAnswers[cur].includes(input4.value)) {
            input4.selected = true;
        }

    } else if (cur === 4) {
        typeQ = 'radio';
        answer.innerHTML = '<p><input id="input1" type="radio" name="answer" value="Клавиатура" checked>Клавиатура</p>\n' +
            '                <p><input id="input2" type="radio" name="answer" value="Лупа">Лупа</p>\n' +
            '                <p><input id="input3" type="radio" name="answer" value="Весы">Весы</p>\n' +
            '                <p><input id="input4" type="radio" name="answer" value="Компас">Компас</p>';
        let input1 = document.getElementById('input1');
        let input2 = document.getElementById('input2');
        let input3 = document.getElementById('input3');
        let input4 = document.getElementById('input4');
        if (userAnswers[cur].includes(input1.value)) {
            input1.checked = true;
        } else if (userAnswers[cur].includes(input2.value)) {
            input2.checked = true;
        } else if (userAnswers[cur].includes(input3.value)) {
            input3.checked = true;
        } else if (userAnswers[cur].includes(input4.value)) {
            input4.checked = true;
        }

    } else if (cur === 5) {
        typeQ = 'checkbox';
        answer.innerHTML = '<p><input id="input1" type="checkbox" value="Дракон">Дракон</p>\n' +
            '                <p><input id="input2" type="checkbox" value="Жертвенник">Жертвенник</p>\n' +
            '                <p><input id="input3" type="checkbox" value="Пятиугольник">Пятиугольник</p>\n' +
            '                <p><input id="input4" type="checkbox" value="Печь">Печь</p>';
        let input1 = document.getElementById('input1');
        let input2 = document.getElementById('input2');
        let input3 = document.getElementById('input3');
        let input4 = document.getElementById('input4');
        if (userAnswers[cur].includes(input1.value)) {
            input1.checked = true;
        } if (userAnswers[cur].includes(input2.value)) {
            input2.checked = true;
        } if (userAnswers[cur].includes(input3.value)) {
            input3.checked = true;
        } if (userAnswers[cur].includes(input4.value)) {
            input4.checked = true;
        }

    } else if (cur === 6) {
        typeQ = 'text';
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'text';
        answer.appendChild(input);
        input.value = userAnswers[cur];

    } else if (cur === 7) {
        typeQ = 'radio';
        answer.innerHTML = '<p><input id="input1" type="radio" name="answer" value="Гидра" checked>Гидра</p>\n' +
            '                <p><input id="input2" type="radio" name="answer" value="Большая медведица">Большая медведица</p>\n' +
            '                <p><input id="input3" type="radio" name="answer" value="Весы">Весы</p>\n' +
            '                <p><input id="input4" type="radio" name="answer" value="Единорог">Единорог</p>';
        let input1 = document.getElementById('input1');
        let input2 = document.getElementById('input2');
        let input3 = document.getElementById('input3');
        let input4 = document.getElementById('input4');
        if (userAnswers[cur].includes(input1.value)) {
            input1.checked = true;
        } else if (userAnswers[cur].includes(input2.value)) {
            input2.checked = true;
        } else if (userAnswers[cur].includes(input3.value)) {
            input3.checked = true;
        } else if (userAnswers[cur].includes(input4.value)) {
            input4.checked = true;
        }

    } else if (cur === 8) {
        typeQ = 'select';
        answer.innerHTML = '<p><select id="select">\n' +
            '                        <option id="input1" value="Километр">Километр</option>\n' +
            '                        <option id="input2" value="Парсек">Парсек</option>\n' +
            '                        <option id="input3" value="Световой год">Световой год</option>\n' +
            '                        <option id="input4" value="Световая Секунда">Световая секунда</option>\n' +
            '               </select></p>';
        let input1 = document.getElementById('input1');
        let input2 = document.getElementById('input2');
        let input3 = document.getElementById('input3');
        let input4 = document.getElementById('input4');
        if (userAnswers[cur].includes(input1.value)) {
            input1.selected = true;
        } else if (userAnswers[cur].includes(input2.value)) {
            input2.selected = true;
        } else if (userAnswers[cur].includes(input3.value)) {
            input3.selected = true;
        } else if (userAnswers[cur].includes(input4.value)) {
            input4.selected = true;
        }

    } else if (cur === 9) {
        typeQ = 'text';
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'text';
        answer.appendChild(input);
        input.value = userAnswers[cur];
    }
}

function changeQuestion(x) {
    writeAnswer();

    let button = document.getElementById(`button${cur + 1}`);
    button.style.background = 'blanchedalmond';
    cur = x;
    let question = document.getElementById('ques');
    question.innerHTML = questions[cur];
    let div = document.getElementById('board');
    let td = document.getElementById('answ');
    div.removeChild(td);
    let newTd = document.createElement('td');
    newTd.id = 'answ';
    div.appendChild(newTd);
    createAnswerBoard();
}

function writeAnswer() {
    if (typeQ === 'text') {
        let input = document.getElementById('text');
        userAnswers[cur] = input.value;
        temp = input.value;

    } else if (typeQ === 'radio') {
        let input1 = document.getElementById('input1');
        let input2 = document.getElementById('input2');
        let input3 = document.getElementById('input3');
        let input4 = document.getElementById('input4');
        if (input1.checked) {
            userAnswers[cur] = input1.value;
            temp = 1;
        } else if (input2.checked) {
            userAnswers[cur] = input2.value;
            temp = 2;
        } else if (input3.checked) {
            userAnswers[cur] = input3.value;
            temp = 3;
        } else if (input4.checked) {
            userAnswers[cur] = input4.value;
            temp = 4;
        }

    } else if (typeQ === 'checkbox') {
        let input1 = document.getElementById('input1');
        let input2 = document.getElementById('input2');
        let input3 = document.getElementById('input3');
        let input4 = document.getElementById('input4');
        let finalAnsw = '';
        if (input1.checked)
            finalAnsw += input1.value + ' ';
        if (input2.checked)
            finalAnsw += input2.value + ' ';
        if (input3.checked)
            finalAnsw += input3.value + ' ';
        if (input4.checked)
            finalAnsw += input4.value + ' ';
        userAnswers[cur] = finalAnsw;

    } else if (typeQ === 'select') {
        let select = document.getElementById('select');
        userAnswers[cur] = select.value;
    }
}

function checkAnswers() {
    writeAnswer();

    let tagPlayerAnswers = document.getElementsByClassName('rPlayerAnswer');
    let tagRightAnswers = document.getElementsByClassName('rRightAnswer');

    for (let i = 0; i < 10; i++) {
        if (userAnswers[i] === ''){
            tagPlayerAnswers[i].style.color = 'coral';

        } else if (userAnswers[i] !== rightAnswers[i]) {
            tagPlayerAnswers[i].style.color = 'red';

        } else {
            tagPlayerAnswers[i].style.color = 'green';
        }

    }

    let tagResults = document.getElementById('results');
    tagResults.style.display = 'block';

    for (let i = 0; i < 10; i++) {
        if (userAnswers[i] !== '')
            tagPlayerAnswers[i].innerText = userAnswers[i];
        else
            tagPlayerAnswers[i].innerText = '';
        tagRightAnswers[i].innerText = rightAnswers[i];
    }

    document.getElementsByClassName('all')[0].style.display = 'none';
    document.getElementsByClassName('buttons')[0].style.display = 'none';
}