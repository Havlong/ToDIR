"use strict";

const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
let a = document.getElementsByClassName('password');

function generatePassword() {
    if (a.length === 0) {
        let newPassword = "";
        for (let i = 0; i < 8; ++i) {
            newPassword += (str[Math.floor(Math.random() * 62)]);
        }
        let newElement = document.createElement('tr');
        newElement.innerHTML =
            '<td class="passwordId">' + 1 + '</td><td class="password">' + newPassword + '</td>';
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
            '<td class="passwordId">' + (a.length + 1) + '</td><td class="password">' + newPassword + '</td>';
        document.getElementById('passwords').appendChild(newElement);
    }
}
