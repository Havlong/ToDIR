"use strict";

let buttons = document.getElementsByClassName('myBtn');

function click() {
    if (buttons.length > 0) {
        let button = buttons[0];
        for (let i = 0; i < 10; ++i) button.click();
    }
}
