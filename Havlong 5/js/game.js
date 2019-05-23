"use strict";

let moneyArray = [];
let sum;
let moneyIndex = -1, startX = -1, startY = -1;
let moneyElement = undefined;
let tries = 0;
let game = 1;

class Money {
    constructor(x, y, number) {
        this.x = x;
        this.y = y;
        this.number = number;

    }
}

$(document).ready(function () {
    $('#container').animate({top: '+=320px', left: "+=160px"}, 0);
    $('#sum').animate({top: '+=320px', left: "+=40px"}, 0);
    $('#button').animate({top: '+=320px', left: "+=480px"}, 0);
    $('#container, #sum, #button').css({display: 'block'});
    start();
});

function start() {
    tries = 0;
    sum = random(16, 100);
    let sumCopy = sum;
    $('#sum').html(sum);
    document.getElementById('button').onclick = check;
    let moneyCount = random(6, 12);
    let rightMoneyCount = random(4, moneyCount - 2);
    moneyArray = [];
    for (let i = 0; i < rightMoneyCount - 1; i++) {
        let number = random(2, sumCopy - (rightMoneyCount - i));
        sumCopy -= number;
        moneyArray.push(generateMoney(number));
    }
    moneyArray.push(generateMoney(sumCopy));
    for (let i = rightMoneyCount; i < moneyCount; ++i) {
        moneyArray.push(generateMoney(random(4, sum - 2)));
    }
    $('div.money').remove();
    for (let i = 0; i < moneyArray.length; i++) {
        let money = '<div class="money">' + moneyArray[i].number + '</div>';
        $('div#game').append(money);
        $('div.money:last')
            .animate({
                top: moneyArray[i].y - 32,
                left: moneyArray[i].x - 32
            }, 0)
            .on('mousedown', init);
    }
    $(document.body)
        .on('mousedown', down)
        .on('mousemove', move)
        .on('mouseup', up);
}

function generateMoney(number) {
    let x, y;
    let flag;
    do {
        flag = true;
        x = random(32, 640 - 64);
        y = random(32, 320 - 64);
        for (let i = 0; i < moneyArray.length && flag; ++i) {
            flag = isDistant(x, y, moneyArray[i].x, moneyArray[i].y);
        }
    } while (!flag);
    return new Money(x, y, number);
}

function isDistant(x1, y1, x2, y2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) > 4096;
}

function check() {
    let curSum = 0;
    $('div.money').each(function () {
        let x = Math.round($(this).position().left);
        let y = Math.round($(this).position().top);
        if (y + 64 > 320 && y < 440 && x + 64 > 160 && x < 440) {
            curSum += find(x, y);
        }
    });
    document.getElementById('button').onclick = doNothing;
    let element = $('div#sum');
    if (curSum === sum) {
        element.css({
            backgroundColor: '#3cf03d'
        });
        setTimeout(rightColor, 2000);
    } else {
        tries += 1;
        element.css({
            backgroundColor: '#f60011'
        });
        setTimeout(anotherColor, 2000);
    }
}

function doNothing() {

}

function rightColor() {
    let element = $('div#sum');
    element.css({
        backgroundColor: '#ffdc48'
    });
    document.getElementById('button').onclick = check;
    let results = document.getElementById('results');
    results.innerHTML += '<tr><td>' + game +
        '</td><td>' + (tries + 1) + '</td></tr>';
    game += 1;
    tries = 0;
    start()

}

function anotherColor() {
    let element = $('div#sum');
    element.css({
        backgroundColor: '#ffdc48'
    });
    document.getElementById('button').onclick = check;
}

function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

function find(x, y) {
    x += 32;
    y += 32;
    for (let i = 0; i < moneyArray.length; i++) {
        if (moneyArray[i].x === x && moneyArray[i].y === y) {
            return moneyArray[i].number;
        }
    }
}

function down(e) {
    if (moneyElement !== undefined) {
        startX = e.pageX;
        startY = e.pageY;
    }
}

function move(e) {
    if (moneyElement !== undefined && moneyIndex > -1) {
        let newX = e.pageX;
        let newY = e.pageY;
        moneyElement
            .css({
                left: Math.min(640 - 64, Math.max(0, moneyArray[moneyIndex].x - 32 + newX - startX)),
                top: Math.min(480 - 64, Math.max(0, moneyArray[moneyIndex].y - 32 + newY - startY))
            });
    }
}

function up() {
    if (moneyIndex > -1) {
        moneyArray[moneyIndex].x = Math.round(moneyElement.position().left + 32);
        moneyArray[moneyIndex].y = Math.round(moneyElement.position().top + 32);
        moneyIndex = -1;
    }
    startX = -1;
    startY = -1;
}

function init() {
    if (moneyIndex < 0) {
        moneyElement = $(this);
        let x = Math.round(moneyElement.position().left + 32);
        let y = Math.round(moneyElement.position().top + 32);
        for (let j = 0; j < moneyArray.length; j++) {
            if (moneyArray[j].x === x && moneyArray[j].y === y) {
                moneyIndex = j;
                break;
            }
        }
    }
    return 0;
}
