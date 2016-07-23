
var colours = ['GREEN', 'MAROON','YELLOWGREEN','CYAN','SEAGREEN','DARKORCHID','MIDNIGHTBLUE','DEEPSKYBLUE','REBECCAPURPLE','DARKTURQUOISE','STEELBLUE','DARKORANGE','ORANGERED','PURPLE','KHAKI','CORAL','GOLD','ORCHID','DODGERBLUE'];

var clicks = 0,
    topscore = 0,
    timeLimit = 30,
    timeCount = timeLimit;

function start() {
    var timer = window.setInterval(function () {
        console.log(timeCount);

        timeCount--;

        if(timeCount === 0) {
            var html = document.getElementsByTagName('html');
            html[0].classList.add('end');
            window.clearInterval(timer);
            var resetButton = document.getElementById('timer');
            resetButton.addEventListener('click', reset);
        }
    }, 1000);

    // set the timer off
    var timerBox = document.getElementById('timer');
    timerBox.classList.add('active');
}

// generate ball
function generate(top, left, content){

    if(clicks === 1) {
        start();
    }

    // create ball element and set default properties
    var el = document.createElement('div'),
        top = top === undefined ? Math.random() * (window.innerHeight - 120) : top,
        left = left === undefined ? Math.random() * (window.innerWidth - 120) : left,
        content = content === 'Click' ? content : clicks;

    // set the balls properties
    el.classList.add('ball');
    el.style.top =  top + 'px';
    el.style.left = left + 'px';
    el.style.backgroundColor = colours[Math.floor(Math.random() * colours.length)];
    el.appendChild(document.createTextNode(content));

    // when the ball is clicked on remove it and generate a new one
    el.addEventListener('click', function() {
        if(timeCount !== 0) {
            el.remove();
            generate();
        }
    });

    // increment the number of clicks
    clicks++;

    // add ball to body
    var body = document.getElementsByTagName('body');
    body[0].appendChild(el);
}

// reset EVERYTHING!!!
function reset() {
    var html = document.getElementsByTagName('html');
    var resetButton = document.getElementById('timer');
    var balls = document.getElementsByClassName('ball');
    var moon = document.getElementsByClassName('moon');
    var sun = document.getElementsByClassName('sun');

    balls[0].remove();
    html[0].classList.remove('end');
    timeCount = timeLimit;
    topscore = clicks > topscore ? clicks : topscore;
    sun[0].innerHTML = '';
    moon[0].innerHTML = '';
    sun[0].appendChild(document.createTextNode(topscore-1));
    moon[0].appendChild(document.createTextNode(topscore-1));
    clicks = 0;
    resetButton.classList.remove('active');
    resetButton.removeEventListener('click', reset);
    generate(10,10,'Click');
}

// set off the first ball!
generate(10,10,'Click');
