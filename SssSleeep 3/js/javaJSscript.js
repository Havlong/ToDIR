function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let wasPressed = false;
let arr = [];

async function start() {

    let notif = document.getElementsByClassName('notification')[0];
    let body = document.getElementsByTagName('body')[0];
    let all = document.getElementsByClassName('all')[0];
    let button = document.getElementsByTagName('button')[0];

    notif.removeChild(document.getElementsByTagName('button')[0]);
    let pNotif = document.createElement('p');
    notif.appendChild(pNotif);

    pNotif.innerText = 'цу';

    await sleep(1000);
    pNotif.innerText = 'цу-е';

    await sleep(1000);
    pNotif.innerText = 'фа!';

    let divBot = document.createElement('div');
    divBot.className = 'bot';
    body.insertBefore(divBot, all);

    let pBot = document.createElement('p');
    divBot.appendChild(pBot);
    pBot.innerText = '';

    let randomInt = getRandomInt(1, 3);
    let botAnswer = '';

    if (randomInt === 1) {
        botAnswer = 'камень';
    } else if (randomInt === 2) {
        botAnswer = 'ножницы';
    } else {
        botAnswer = 'бумага';
    }

    pBot.innerText = 'Бот: *Орёт* Я выбрал ' + botAnswer + '!';

    let rock = function () {
        letsPlay('камень', botAnswer, pBot);
    };
    let scissors = function () {
        letsPlay('ножницы', botAnswer, pBot);
    };
    let paper = function () {
        letsPlay('бумага', botAnswer, pBot);
    };

    let remov = function () {
        remove(notif, pNotif, body, divBot, button)
    };

    document.getElementById('rockroll').addEventListener('click', rock);
    document.getElementById('scissor').addEventListener('click', scissors);
    document.getElementById('paperroll').addEventListener('click', paper);

    await sleep(500);

    document.getElementById('rockroll').removeEventListener('click', rock);
    document.getElementById('scissor').removeEventListener('click', scissors);
    document.getElementById('paperroll').removeEventListener('click', paper);

    if (!wasPressed)
        pBot.innerText = 'Бот: *Насмехается* Ха! Я выбрал ' + botAnswer + ', а ты опоздал, я победил!';

    wasPressed = false;

    // await sleep(3000);

    document.getElementById('note').addEventListener('click', remov);

}

function letsPlay(playerAnswer, botAnswer, pBot) {

    wasPressed = true;

    if (playerAnswer === botAnswer) {
        pBot.innerText = 'Бот: *Говорит* Я выбрал ' + botAnswer + ', и ты ' + playerAnswer + '. Ничья!';
    } else if (
        (playerAnswer === 'камень' && botAnswer === 'бумага') ||
        (playerAnswer === 'ножницы' && botAnswer === 'камень') ||
        (playerAnswer === 'бумага' && botAnswer === 'ножницы')
    ) {
        pBot.innerText = 'Бот: *Вопит* Я победил!';
    } else
        pBot.innerText = 'Бот: *Молчит*...';

}

function remove(notif, pNotif, body, divBot, button) {
    notif.removeChild(pNotif);
    body.removeChild(divBot);
    notif.appendChild(button);
}