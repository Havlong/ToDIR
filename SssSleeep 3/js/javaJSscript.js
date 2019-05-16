function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let count = 0;

async function start() {
    let lastPlayersAns = '';
    let lastBotAns = '';
    let wasPressed = false;

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

    let img = document.createElement('img');
    img.id = 'standard_img';

    let player_res = document.getElementById('player_res');
    let rock = function () {
        wasPressed = true;
        img.src = 'pictures/stone.png';
        img.alt = 'stone.png';
        lastPlayersAns = 'камень';
        player_res.appendChild(img);
    };
    let scissors = function () {
        wasPressed = true;
        img.src = 'pictures/scissors.png';
        img.alt = 'scissors.png';
        lastPlayersAns = 'ножницы';
        player_res.appendChild(img);
    };
    let paper = function () {
        wasPressed = true;
        img.src = 'pictures/paper.png';
        img.alt = 'paper.png';
        lastPlayersAns = 'бумага';
        player_res.appendChild(img);
    };

    document.getElementById('rockroll').addEventListener('click', lastPlayersAns = rock);
    document.getElementById('scissor').addEventListener('click', lastPlayersAns = scissors);
    document.getElementById('paperroll').addEventListener('click', lastPlayersAns = paper);
    let divBot = document.createElement('div');

    divBot.className = 'bot';
    body.insertBefore(divBot, all);
    let pBot = document.createElement('p');
    divBot.appendChild(pBot);

    pBot.innerText = 'Бот: *Думает...*';

    let randomInt = getRandomInt(1, 3);
    let timeout = getRandomInt(1, 600);

    await sleep(timeout);

    let botImg = document.createElement('img');
    botImg.id = 'standard_img';
    if (randomInt === 1) {
        botImg.src = 'pictures/stone.png';
        botImg.alt = 'stone.png';
        lastBotAns = 'камень';
    } else if (randomInt === 2) {
        botImg.src = 'pictures/scissors.png';
        botImg.alt = 'scissors.png';
        lastBotAns = 'ножницы';
    } else {
        botImg.src = 'pictures/paper.png';
        botImg.alt = 'paper.png';
        lastBotAns = 'бумага';
    }

    let bot_res = document.getElementById('bot_res');
    bot_res.appendChild(botImg);

    pBot.innerText = 'Бот: *Орёт* Я выбрал ' + lastBotAns + '!';

    await sleep(600 - timeout);

    document.getElementById('rockroll').removeEventListener('click', rock);
    document.getElementById('scissor').removeEventListener('click', scissors);
    document.getElementById('paperroll').removeEventListener('click', paper);

    let result = document.createElement('p');
    let healMe = document.getElementById('results');

    if (!wasPressed){
        pBot.innerText = 'Бот: *Насмехается* Ха! Я выбрал ' + lastBotAns + ', а ты опоздал, я победил!';
        img = document.createElement('img');
        img.id = 'standard_img';
        img.src = 'pictures/error404.png';
        img.alt = 'error404.png';
        player_res.appendChild(img);
        result.innerText = 'Поражение!';
    } else if (lastPlayersAns === lastBotAns) {
        pBot.innerText = 'Бот: *Говорит* Я выбрал ' + lastBotAns + ', и ты ' + lastPlayersAns + '. Ничья!';
        result.innerText = 'Ничья!';
    } else if (
        (lastPlayersAns === 'камень' && lastBotAns === 'бумага') ||
        (lastPlayersAns === 'ножницы' && lastBotAns === 'камень') ||
        (lastPlayersAns === 'бумага' && lastBotAns === 'ножницы')
    ) {
        pBot.innerText = 'Бот: *Вопит* Я победил!';
        result.innerText = 'Поражение!'
    } else {
        pBot.innerText = 'Бот: *Молчит*...';
        result.innerText = 'Победа!'
    }

    healMe.appendChild(result);
    count += 1;

    let remov = function () {
        remove(notif, pNotif, body, divBot, button)
    };
    document.getElementById('note').addEventListener('click', remov);
}

function remove(notif, pNotif, body, divBot, button) {
    if (count > 2)
        return;
    notif.removeChild(pNotif);
    body.removeChild(divBot);
    notif.appendChild(button);
}