"use strict";

class Task {
    constructor(type, description, answer, variants) {
        this.type = type;
        this.description = description;
        this.answer = answer;
        this.variants = variants;
        this.userAnswer = '';
    }
}

let tasks = [
    new Task('text', 'Назовите фамилию автора произведения "Тихий дон"',
        'шолохов', []),
    new Task('checkbox', 'Выберите из нижеперечисленных авторов поэтов',
        '124', ['Анна Ахматова', 'Владимир Маяковский', 'Александр Солженицын', 'Сергей Есенин']),
    new Task('radio', 'Из нижеперечисленных художественных произведений выберите написанное Михаилом Булгаковым',
        '1', ['Игрок', 'Мцыри', 'Мёртвые Души', 'Архипелаг ГУЛАГ']),
    new Task('selection', 'Выберите стихотворение Александра Блока',
        '3', ['Реквием', 'Отговорила роща золотая', 'Россия', 'Враги сожгли родную хату']),
    new Task('radio', 'Выберите стихотворение Сергея Есенина',
        '2', ['Райские яблоки', 'Письмо матери', 'Облако в штанах', 'Уж сколько их упало в эту бездну...']),
    new Task('text', 'Определите стихотворение: <br>Я достаю  из широких штанин дубликатом бесценного груза.' +
        '<br>Читайте, завидуйте, я — гражданин Советского Союза.',
        'стихи о советском паспорте', []),
    new Task('checkbox', 'Какие из нижеперечисленных стихов принадлежат Сергею Есенину?',
        '12', ['Не жалею, не зову, не плачу', 'Мне осталась одна забава', 'Широка страна моя родная', 'Песня о Буревестнике']),
    new Task('selection', 'Кто являлся автором стихотворения для песен, уже который год звучащих с экранов наших телевизоров по старой традиции',
        '4', ['Сергей Есенин', 'Константин Симонов', 'Михаил Исаковский', 'Борис Пастернак']),
    new Task('radio', 'Выберите произведение, написанное НЕ Ильфом и Петровым',
        '3', ['Двенадцать стульев', 'Светлая личность', 'Князь Серебряный', 'Золотой телёнок']),
    new Task('text', 'Назовите фамилию автора произведения "Мастер и Маргарита"',
        'булгаков', [])
];

let currentTask = 0;
let currentlyDone = 0;
let rightlyDone = 0;

function shuffle() {
    tasks.sort(() => {
        return (Math.floor(Math.random() * 256) - 128);
    });

}

let doneDisplay, totalDisplay, curDisplay, taskDesc,
    wrapper, panels, alertDisplay, alertText,
    checkbox1, checkbox2, checkbox3, checkbox4,
    selection1, selection2, selection3, selection4,
    radio1, radio2, radio3, radio4;

document.addEventListener('DOMContentLoaded', function () {
    doneDisplay = document.getElementsByClassName('done');
    totalDisplay = document.getElementsByClassName('total');
    curDisplay = document.getElementById('cur');
    taskDesc = document.querySelector('div#task');
    wrapper = document.querySelector('div#wrapper');
    checkbox1 = document.querySelector('#checkbox1').parentNode;
    checkbox2 = document.querySelector('#checkbox2').parentNode;
    checkbox3 = document.querySelector('#checkbox3').parentNode;
    checkbox4 = document.querySelector('#checkbox4').parentNode;
    selection1 = document.querySelector('#selection1');
    selection2 = document.querySelector('#selection2');
    selection3 = document.querySelector('#selection3');
    selection4 = document.querySelector('#selection4');
    radio1 = document.querySelector('#radio1').parentNode;
    radio2 = document.querySelector('#radio2').parentNode;
    radio3 = document.querySelector('#radio3').parentNode;
    radio4 = document.querySelector('#radio4').parentNode;
    panels = document.getElementsByClassName('panel');
    alertDisplay = document.getElementById('alert');
    alertText = document.getElementsByClassName('right')[0];
    alertDisplay.style.display = 'none';
    wrapper.style.display = 'none';
    for (let panel of panels) {
        panel.style.display = 'none';
    }
});

function retry() {
    document.getElementById('controlNext').onclick = next;
    document.getElementById('controlReturn').onclick = prev;
    document.getElementById('answerButton').onclick = check;
    alertDisplay.style.display = 'none';
    shuffle();
    currentTask = 0;
    rightlyDone = 0;
    currentlyDone = 0;
    for (let task of tasks) {
        task.userAnswer = '';
    }
    wrapper.style.display = 'flex';
    update();
}

function next() {
    currentTask = (currentTask + 1) % tasks.length;
    update();
}

function prev() {
    currentTask = currentTask === 0 ? tasks.length - 1 : currentTask - 1;
    update();
}

function check() {
    if (tasks[currentTask].userAnswer === '') {
        switch (tasks[currentTask].type) {
            case 'checkbox': {
                let userAnswer = '';
                if (checkbox1.firstChild.checked === true)
                    userAnswer += '1';
                if (checkbox2.firstChild.checked === true)
                    userAnswer += '2';
                if (checkbox3.firstChild.checked === true)
                    userAnswer += '3';
                if (checkbox4.firstChild.checked === true)
                    userAnswer += '4';
                tasks[currentTask].userAnswer = userAnswer;
                if (userAnswer === '')
                    currentlyDone--;
                break;
            }
            case 'selection': {
                if (document.answerForm.selection.value !== '')
                    tasks[currentTask].userAnswer = document.answerForm.selection.value;
                else
                    currentlyDone--;
                break;
            }
            case 'radio': {
                if (document.answerForm.radio.value !== '')
                    tasks[currentTask].userAnswer = document.answerForm.radio.value;
                else
                    currentlyDone--;
                break;
            }
            case 'text': {
                if (document.answerForm.textField.value.trim() !== '')
                    tasks[currentTask].userAnswer = document.answerForm.textField.value.trim().toLowerCase();
                else
                    currentlyDone--;
                break;
            }
        }
        currentlyDone++;
        if (tasks[currentTask].userAnswer === tasks[currentTask].answer)
            rightlyDone++;
    }
    update();
    if (currentlyDone === tasks.length) {
        alertDisplay.style.display = 'block';
        wrapper.style.display = 'none';
        for (let panel of panels) {
            panel.style.display = 'none';
        }
        alertText.innerHTML = `${rightlyDone}`;
        document.getElementById('controlNext').onclick = function () {
        };
        document.getElementById('controlReturn').onclick = function () {
        };
        document.getElementById('answerButton').onclick = function () {
        };
    }
}

function update() {
    curDisplay.innerHTML = `${currentTask + 1}`;
    for (let doneDisplayElement of doneDisplay) {
        doneDisplayElement.innerHTML = `${currentlyDone}`;
    }
    for (let totalDisplayElement of totalDisplay) {
        totalDisplayElement.innerHTML = `${tasks.length}`;
    }
    clear();
    taskDesc.innerHTML = tasks[currentTask].description;
    switch (tasks[currentTask].type) {
        case 'checkbox': {
            checkbox1.innerHTML =
                '<input id="checkbox1" name="checkbox" type="checkbox">'
                + tasks[currentTask].variants[0];
            checkbox2.innerHTML =
                '<input id="checkbox2" name="checkbox" type="checkbox">'
                + tasks[currentTask].variants[1];
            checkbox3.innerHTML =
                '<input id="checkbox3" name="checkbox" type="checkbox">'
                + tasks[currentTask].variants[2];
            checkbox4.innerHTML =
                '<input id="checkbox4" name="checkbox" type="checkbox">'
                + tasks[currentTask].variants[3];
            panels.checkboxPanel.style.display = 'flex';
            break;
        }
        case 'selection': {
            selection1.innerHTML = tasks[currentTask].variants[0];
            selection2.innerHTML = tasks[currentTask].variants[1];
            selection3.innerHTML = tasks[currentTask].variants[2];
            selection4.innerHTML = tasks[currentTask].variants[3];
            panels.selectionPanel.style.display = 'flex';
            break;
        }
        case 'radio': {
            radio1.innerHTML =
                '<input id="radio1" name="radio" type="radio" value="1">'
                + tasks[currentTask].variants[0];
            radio2.innerHTML =
                '<input id="radio2" name="radio" type="radio" value="2">'
                + tasks[currentTask].variants[1];
            radio3.innerHTML =
                '<input id="radio3" name="radio" type="radio" value="3">'
                + tasks[currentTask].variants[2];
            radio4.innerHTML =
                '<input id="radio4" name="radio" type="radio" value="4">'
                + tasks[currentTask].variants[3];
            panels.radioPanel.style.display = 'flex';
            break;
        }
        case 'text': {
            panels.textFieldPanel.style.display = 'flex';
            break;
        }
    }
    updateColor()
}

function clear() {
    for (let panel of panels) {
        panel.style.display = 'none';
    }
    checkbox1.style.borderColor = 'transparent';
    checkbox1.style.background = 'transparent';
    checkbox2.style.borderColor = 'transparent';
    checkbox2.style.background = 'transparent';
    checkbox3.style.borderColor = 'transparent';
    checkbox3.style.background = 'transparent';
    checkbox4.style.borderColor = 'transparent';
    checkbox4.style.background = 'transparent';
    radio1.style.borderColor = 'transparent';
    radio1.style.background = 'transparent';
    radio2.style.borderColor = 'transparent';
    radio2.style.background = 'transparent';
    radio3.style.borderColor = 'transparent';
    radio3.style.background = 'transparent';
    radio4.style.borderColor = 'transparent';
    radio4.style.background = 'transparent';
}

function updateColor() {
    switch (tasks[currentTask].type) {
        case 'checkbox': {
            if (tasks[currentTask].userAnswer !== '') {
                let user = tasks[currentTask].userAnswer;
                let answer = tasks[currentTask].answer;
                if (user.includes('1') && answer.includes('1')) {
                    checkbox1.style.borderColor = 'green';
                    checkbox1.style.background = '#8fe18e';
                } else if (user.includes('1') && !answer.includes('1')) {
                    checkbox1.style.borderColor = 'red';
                    checkbox1.style.background = '#ff7550';
                } else if (!user.includes('1') && answer.includes('1')) {
                    checkbox1.style.borderColor = 'green';
                }
                if (user.includes('2') && answer.includes('2')) {
                    checkbox2.style.borderColor = 'green';
                    checkbox2.style.background = '#8fe18e';
                } else if (user.includes('2') && !answer.includes('2')) {
                    checkbox2.style.borderColor = 'red';
                    checkbox2.style.background = '#ff7550';
                } else if (!user.includes('2') && answer.includes('2')) {
                    checkbox2.style.borderColor = 'green';
                }
                if (user.includes('3') && answer.includes('3')) {
                    checkbox3.style.borderColor = 'green';
                    checkbox3.style.background = '#8fe18e';
                } else if (user.includes('3') && !answer.includes('3')) {
                    checkbox3.style.borderColor = 'red';
                    checkbox3.style.background = '#ff7550';
                } else if (!user.includes('3') && answer.includes('3')) {
                    checkbox3.style.borderColor = 'green';
                }
                if (user.includes('4') && answer.includes('4')) {
                    checkbox4.style.borderColor = 'green';
                    checkbox4.style.background = '#8fe18e';
                } else if (user.includes('4') && !answer.includes('4')) {
                    checkbox4.style.borderColor = 'red';
                    checkbox4.style.background = '#ff7550';
                } else if (!user.includes('4') && answer.includes('4')) {
                    checkbox4.style.borderColor = 'green';
                }
            }
            break;
        }
        case 'selection': {
            if (tasks[currentTask].userAnswer === '')
                document.answerForm.selection.style.color = '#000000';
            else if (tasks[currentTask].userAnswer === tasks[currentTask].answer)
                document.answerForm.selection.style.color = '#16a72f';
            else
                document.answerForm.selection.style.color = '#f60011';
            break;
        }
        case 'radio': {
            if (tasks[currentTask].userAnswer !== '') {
                let user = tasks[currentTask].userAnswer;
                let answer = tasks[currentTask].answer;
                if (user.includes('1') && answer.includes('1')) {
                    radio1.style.borderColor = 'green';
                    radio1.style.background = '#8fe18e';
                } else if (user.includes('1') && !answer.includes('1')) {
                    radio1.style.borderColor = 'red';
                    radio1.style.background = '#ff7550';
                } else if (!user.includes('1') && answer.includes('1')) {
                    radio1.style.borderColor = 'green';
                }
                if (user.includes('2') && answer.includes('2')) {
                    radio2.style.borderColor = 'green';
                    radio2.style.background = '#8fe18e';
                } else if (user.includes('2') && !answer.includes('2')) {
                    radio2.style.borderColor = 'red';
                    radio2.style.background = '#ff7550';
                } else if (!user.includes('2') && answer.includes('2')) {
                    radio2.style.borderColor = 'green';
                }
                if (user.includes('3') && answer.includes('3')) {
                    radio3.style.borderColor = 'green';
                    radio3.style.background = '#8fe18e';
                } else if (user.includes('3') && !answer.includes('3')) {
                    radio3.style.borderColor = 'red';
                    radio3.style.background = '#ff7550';
                } else if (!user.includes('3') && answer.includes('3')) {
                    radio3.style.borderColor = 'green';
                }
                if (user.includes('4') && answer.includes('4')) {
                    radio4.style.borderColor = 'green';
                    radio4.style.background = '#8fe18e';
                } else if (user.includes('4') && !answer.includes('4')) {
                    radio4.style.borderColor = 'red';
                    radio4.style.background = '#ff7550';
                } else if (!user.includes('4') && answer.includes('4')) {
                    radio4.style.borderColor = 'green';
                }
            }
            break;
        }
        case 'text': {
            if (tasks[currentTask].userAnswer === '')
                document.answerForm.textField.style.color = '#000000';
            else {
                if (tasks[currentTask].userAnswer === tasks[currentTask].answer)
                    document.answerForm.textField.style.color = '#16a72f';
                else
                    document.answerForm.textField.style.color = '#f60011';
                document.answerForm.textField.value = tasks[currentTask].userAnswer;
            }
            break;
        }
    }
}
