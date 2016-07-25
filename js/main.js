// don't pollute the global object
{

    // set properties
    let clicks = 0,
        topScore = 0,
        timeLimit = 30,
        timeCount = timeLimit;

    // set the constants
    const htmlEl = document.querySelector('html'),
        bodyEl = document.querySelector('body'),
        timerBall = document.querySelector('#timer'),
        moon = document.querySelector('.moon'),
        sun = document.querySelector('.sun'),
        colours = ['GREEN', 'MAROON','YELLOWGREEN','CYAN','SEAGREEN','DARKORCHID','MIDNIGHTBLUE','DEEPSKYBLUE','REBECCAPURPLE','DARKTURQUOISE','STEELBLUE','DARKORANGE','ORANGERED','PURPLE','KHAKI','CORAL','GOLD','ORCHID','DODGERBLUE'];

    // start the timer
    function start() {
        const timer = setInterval(() => {

            timeCount--;

            console.log(timeCount);

            // stop the timer once we reach 0
            if(timeCount === 0) {
                htmlEl.classList.add('end');
                clearInterval(timer);
                timerBall.addEventListener('click', reset);
            }
        }, 1000);

        timerBall.classList.add('active');
    }

    // generate ball
    function generate(
        content = clicks,
        top = Math.random() * (window.innerHeight - 120),
        left = Math.random() * (window.innerWidth - 120)
    ){

        if(clicks === 1) {
            start();
        }

        // create ball element and set default properties
        const el = document.createElement('div');

        // set the balls properties
        el.classList.add('ball');
        el.style.top =  top + 'px';
        el.style.left = left + 'px';
        el.style.backgroundColor = colours[Math.floor(Math.random() * colours.length)];
        el.textContent = `${content}`;

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
        bodyEl.appendChild(el);
    }

    // reset EVERYTHING!!!
    function reset() {

        // balls
        const balls = document.querySelectorAll('.ball');

        for (let ball of balls) {
            ball.remove();
        }

        // styles
        htmlEl.classList.remove('end');

        // add the top score to the timer
        topScore = clicks > topScore ? clicks : topScore;
        sun.textContent = `${topScore-1}`;
        moon.textContent = `${topScore-1}`;

        // clicks
        clicks = 0;

        // timer
        timeCount = timeLimit;
        timerBall.classList.remove('active');
        timerBall.removeEventListener('click', reset);

        // set off the first ball!
        generate('Click', 10, 10);
    }

    // set off the first ball!
    generate('Click', 10, 10);
}
