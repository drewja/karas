// animations.js


//cssAnimaiton(name, keyframes, duration) > returns a function to trigger the animation
var cssAnimation = (function(){
    let animation = (name, keyframes, duration) => {
        addKeyFrames(name, keyframes);
        addRule("." + name, {'animation': name + ' ' + duration + 'ms'});
        return ((elements) => newTrigger(elements, name, duration));
    }

    var sheet = document.createElement('style');
    sheet.type = 'text/css';
    sheet.id = 'animations'
    document.head.appendChild(sheet);

    function addKeyFrames(name, text){
        sheet.sheet.insertRule(`@keyframes ${ name } {
            ${ text }
        }`, sheet.sheet.length)
    }

    function addRule(selector, obj){
        text = selector + " { "
        for (prop in obj){
            text += `${prop} : ${obj[prop]};`
        }
        text += " }"
        sheet.sheet.insertRule(text);
    }

    function newTrigger(elements, cssAnimationClass, duration, done) {
        // set up a new callable to trigger a css animation on a set of elements
        //
        // recieves:
        //  elements:            list: elements to animate
        //  cssAnimationClass: string: css class with an existing animation property
        //  duration:          number: duration of the animation in ms
        //  done:            function: (optional) final callback function called
        //                             duration ms after the trigger was called.
        //
        // returns:
        //  function: optional 'delay' argument. triggers animation.
        done = done || (() => {});

        let animate = () => {
            each(elements, (l)=>{
                l.classList.add(cssAnimationClass);
            });

            setTimeout(
                ()=>{
                    each(elements,
                        (el) => {
                            el.classList.remove(cssAnimationClass);
                        })
                    done();
                },
                duration
            );
        }

        let trigger = (delay) => {
            delay = delay || 0;
            setTimeout(animate, delay);
        }

        return trigger;
    }

    return animation;

})();

function scrolled(scroll_pos) {
    // Do something with the scroll position
    noop();
  }
  
  
var last_known_scroll_position = 0;
var ticking = false;
window.addEventListener('scroll', function(e) {
last_known_scroll_position = window.scrollY;

if (!ticking) {
    ticking = true;  
    window.requestAnimationFrame(function() {
    scrolled(last_known_scroll_position);
    setTimeout( ()=> ticking = false, 200)
    }); 
}
});