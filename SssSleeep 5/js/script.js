let startX = -1, startY = -1;
let to_input_index = -1;
let to_input_el = undefined;
let to_input_array = [];
let right_answers = 0;

let game_number = 0;
let game_results = [];


$(document).ready(function () {
    to_input_array = $('.to_inputS');
    start();

});

let num_of_fil_cont = 0;
let random_num = 0;

function start() {
    right_answers = 0;
    startX = -1;
    startY = -1;
    to_input_index = -1;
    to_input_el = undefined;

    document.getElementById('chbtn').onclick = function () {
        check()
    };

    num_of_fil_cont = random(0, 2);
    random_num = random(1, 8) + num_of_fil_cont;

    document.getElementsByClassName('inputSN')[num_of_fil_cont].innerText = random_num;

    let x1 = 0, i1 = 0;

    let temp_arr = $('.inputS');
    for (let el of temp_arr) {
        let element = $(el);
        element
            .css({
                left: x1,
            });
        x1 += 115;
        i1 += 1;
    }

    let y1 = 140;
    x1 = 0; i1 = 0;

    for (let el of to_input_array) {
        let element = $(el);
        element
            .css({
                left: x1,
                top: y1,
            });
        if (i1 === 4) {
            x1 = -67;
            y1 += 67;
        }
        x1 += 67;
        i1 += 1;
    }

    to_input_array
        .on('mousedown', init);
    $(document.body)
        .on('mousedown', down)
        .on('mousemove', move)
        .on('mouseup', up);
}

function create_table() {
    let parent = document.getElementById('results');
    let child = document.createElement('tr');
    child.innerHTML =
        '<td class="number"></td>\n' +
        '<td class="result"></td>';
    parent.appendChild(child);
    let number = document.getElementsByClassName('number')[game_number];
    let result = document.getElementsByClassName('result')[game_number];
    number.innerText = String(game_number) + ':';
    result.innerText = String(game_results[game_number - 1]);
    parent.cellPadding = 20;
}

function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

function init() {
    if (to_input_index < 0) {
        to_input_el = $(this);
        to_input_index = parseInt(to_input_el[0].innerText) - 1;
    }
}

function down(e) {
    if (to_input_el !== undefined) {
        startX = e.pageX;
        startY = e.pageY;
    }
}

function move(e) {
    if (to_input_el !== undefined && to_input_index > -1){
        let newX = e.pageX;
        let newY = e.pageY;
        to_input_el
            .css({
                left: to_input_array[to_input_index].x - 30 + newX - startX,
                top: to_input_array[to_input_index].y - 30 + newY - startY,
            });
    }
}

function up() {
    if (to_input_index > -1) {
        to_input_array[to_input_index].x = Math.round(to_input_el.position().left + 30);
        to_input_array[to_input_index].y = Math.round(to_input_el.position().top + 30);
        to_input_index = -1;
    }
    startX = -1;
    startY = -1;
}

function check() {
    document.getElementById('chbtn').onclick = do_nothing;
    game_number += 1;
    let doc = document.getElementsByClassName('inputS');
    let answers = [0, 0, 0];
    answers[num_of_fil_cont] = random_num;
    $('.to_inputS').each(function (index) {
        let x = Math.round($(this).position().left);
        let y = Math.round($(this).position().top);
        if (y > -38 && y < 78) {
            if (x > -38 && x < 78 && num_of_fil_cont !== 0) {
                answers[0] += index + 1;
                if (answers[0] === random_num - num_of_fil_cont) {
                    right_answers += 1;
                    doc[0].style.background = '#8fe18e';
                } else {
                    doc[0].style.background = 'crimson';
                }

            } else if (x > 77 && x < 193 && num_of_fil_cont !== 1) {
                answers[1] += index + 1;
                if (answers[1] === random_num - num_of_fil_cont + 1) {
                    right_answers += 1;
                    doc[1].style.background = '#8fe18e';
                } else {
                    doc[1].style.background = 'crimson';
                }


            } else if (x > 192 && x < 308 && num_of_fil_cont !== 2) {
                answers[2] += index + 1;
                if (answers[2] === random_num - num_of_fil_cont + 2) {
                    right_answers += 1;
                    doc[2].style.background = '#8fe18e';
                } else {
                    doc[2].style.background = 'crimson';
                }
            }
        }
    });
    let i = 0;
    for (let el of answers) {
        if (el === 0) {
            doc[i].style.background = 'crimson';
        }
        i += 1;
    }
    let button = document.getElementById('checkButton');
    if (right_answers === 2) {
        game_results.push('win');
        button.style.background = '#8fe18e';
    } else {
        game_results.push('lose');
        button.style.background = 'crimson';
    }
    document.getElementById('nextbtn').onclick = function () {
        next();
    };
    create_table();
}

function do_nothing() {
}

function next() {
    document.getElementById('checkButton').style.background = 'blanchedalmond';
    $('.inputS').each(function () {
       this.style.background = '#8fe18e';
    });
    $('.inputSN').each(function () {
       this.innerText = '?';
    });
    $('.to_inputS').each(function () {
        let el = $(this);
        el.css({
            top: 0,
            left: 0,
        });
    });
    document.getElementById('nextbtn').onclick = do_nothing();
    start();
}
