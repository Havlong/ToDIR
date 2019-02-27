"use strict";

const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let a = document.getElementsByClassName('password');

function generate() {
    if (a.length === 0) {
        let newPassword = "";
        for (let i = 0; i < 8; ++i) {
            newPassword += (str[Math.floor(Math.random() * 62)]);
        }
        let newElement = document.createElement('tr');
        newElement.innerHTML =
            '<th class="passwordId">' + (a.length + 1) + '</th>' +
            '<td class="password">' + newPassword + '</td>';
        document.getElementById('passwords').appendChild(newElement);
    } else {
        let passwords = [];
        for (let i = 0; i < a.length; ++i) {
            passwords.push(a[i].innerHTML);
        }

        let newPassword = "";
        while (newPassword === "" || passwords.includes(newPassword)) {
            newPassword = "";
            for (let i = 0; i < 8; ++i) {
                newPassword += (str[Math.floor(Math.random() * 62)]);
            }
        }
        let newElement = document.createElement('tr');
        newElement.innerHTML =
            '<th class="passwordId">' + (a.length + 1) + '</th>' +
            '<td class="password">' + newPassword + '</td>';
        document.getElementById('passwords').appendChild(newElement);
    }
}
