function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
}

function start() {
    let notif = document.getElementsByClassName('notification')[0];

    notif.removeChild(document.getElementsByTagName('button')[0]);

    let p = document.createElement('p');

    notif.appendChild(p);
    p.innerText = 'цу';

    sleep(1000);
    p.innerText = 'цу-е';

    sleep(1000);
    p.innerText = 'фа!';

    let div = document.createElement('div');
    div.className = 'bot';
    notif.insertBefore(div, document.getElementsByClassName('all')[0]);

    // document.getElementById('clckRock').onclick =
}

function rock() {

}
