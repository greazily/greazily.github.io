gsap.registerPlugin(ScrollTrigger)

function main() {

    function fadeIn() {
        gsap.to('.shade', {
            duration: 2, 
            autoAlpha: 0, 
            ease: 'power4.inOut', 
        });
    }

    function goToPage(x) {
        let link = x;
        gsap.to('.shade', {
            delay: 1, 
            duration: 1, 
            autoAlpha: 1, 
            ease: 'power4.inOut', 
            onComplete: ()=> {window.location.href = link;}
        });
    };

    function projectButtons() {
        let prj = document.querySelector('.title');
        prj.addEventListener('click', (e)=> {
            let video = e.currentTarget.querySelector('.vid-btn-x');
            let link = video.dataset.link;
            video.currentTime = 0;
            video.play();
            goToPage(link);
        });
    };

    function returning() {      
        let getInput = 1;
        localStorage.setItem('returning', getInput);
        console.log(localStorage.getItem('returning'));

    };

    fadeIn();
    projectButtons();
    returning();


};

window.onload = main();