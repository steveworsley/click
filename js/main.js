// don't pollute the global object
(function () {

    var colours = ['GREEN', 'MAROON','YELLOWGREEN','CYAN','SEAGREEN','DARKORCHID','MIDNIGHTBLUE','DEEPSKYBLUE','REBECCAPURPLE','DARKTURQUOISE','STEELBLUE','DARKORANGE','ORANGERED','PURPLE','KHAKI','CORAL','GOLD','ORCHID','DODGERBLUE'];

    // set properties
    var clicks = 0,
        topscore = 0,
        timeLimit = 30,
        timeCount = timeLimit;

    // grab the elements we are going to be using
    var htmlEl = document.getElementsByTagName('html'),
        bodyEl = document.getElementsByTagName('body'),
        timerBall = document.getElementById('timer'),
        moon = document.getElementsByClassName('moon'),
        sun = document.getElementsByClassName('sun');

    // start the timer
    function start() {
        var timer = window.setInterval(function () {

            timeCount--;

            // stop the timer once we reach 0
            if(timeCount === 0) {
                htmlEl[0].classList.add('end');
                window.clearInterval(timer);
                timerBall.addEventListener('click', reset);
            }
        }, 1000);

        timerBall.classList.add('active');
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
        bodyEl[0].appendChild(el);
    }

    // reset EVERYTHING!!!
    function reset() {

        // balls
        var balls = document.getElementsByClassName('ball');
        balls[0].remove();

        // styles
        htmlEl[0].classList.remove('end');

        // add the top score to the timer
        topscore = clicks > topscore ? clicks : topscore;
        sun[0].innerHTML = '';
        moon[0].innerHTML = '';
        sun[0].appendChild(document.createTextNode(topscore-1));
        moon[0].appendChild(document.createTextNode(topscore-1));

        // clicks
        clicks = 0;

        // timer
        timeCount = timeLimit;
        timerBall.classList.remove('active');
        timerBall.removeEventListener('click', reset);

        // set off the first ball!
        generate(10,10,'Click');
    }

    // set off the first ball!
    generate(10,10,'Click');

})();
