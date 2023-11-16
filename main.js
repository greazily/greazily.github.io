gsap.registerPlugin(ScrollToPlugin);

function main(){
    let returning = localStorage.getItem('returning');


    function fadeIn() {
        gsap.to('.shade', { 
            duration: 1, 
            autoAlpha: 0, 
            ease: 'power4.inOut', 
        });
    }

    function viewHeight() {
        let backgroundHeight = document.getElementById('vid-bg').clientHeight;
        let workHeight = document.getElementById('work').clientHeight;
        let windowHeight = innerHeight;
        let projectHeight = document.querySelector('.project').clientHeight;

        document.documentElement.style.setProperty('--ph', projectHeight + 'px');
        document.documentElement.style.setProperty('--wh', workHeight + 'px');
        document.documentElement.style.setProperty('--bgh', backgroundHeight);
        document.documentElement.style.setProperty('--vh', windowHeight);
        console.log(document.documentElement.style.getPropertyValue('--ph'));
        // return backgroundHeight;
        return workHeight;
    };

    function resetScroll() {
        const buttons = ['vid-btn-t', 'vid-btn-b'];
        buttons.forEach((btn)=>{
            let x = document.getElementById(btn);
            console.log(x);
            x.style.visibility = 'hidden';
        });
        const load = document.getElementById('vid-btn-onld');
        load.style.visibility = 'visible';
        load.currentTime = 0;
        load.play();
        gsap.to('.wrapper', {
            duration: 1.8,
            scrollTo: 0,
            ease: 'power1.inOut',
        });

    }

    function scroll(y) {
        viewHeight();
        if(y == 0) {
            resetScroll();
        }
        gsap.to('.scroll', { 
            delay: .7,
            duration: 3.5,
            y: y,
            ease: 'power4.inOut',
            onComplete: close,
            onCompleteParams: [y]
        });
    };

    function close(y) {
        if(y == 0) {
            const work = document.getElementById('work');
            const about = document.getElementById('about');
            const contain = document.getElementById('contain');
            about.style.display = 'none';
            work.style.display = 'none';
            contain.style.display = 'none';
            console.log(work)
        } else {
            return;
        }

    };

    function display(selected) {
        const contain = document.getElementById('contain');
        const content = ['about', 'work'];
        contain.style.display = 'grid';
        let activeContent = document.getElementById(content[selected]);
        activeContent.style.display = 'grid';
        scroll(-2800);   
    };

    function goToPage(x) {
        let link = x;
        gsap.to('.shade', {
            delay: .7, 
            duration: 1, 
            autoAlpha: 1, 
            ease: 'power4.inOut', 
            onComplete: ()=> {window.location.href = link;}
        });
    };

    function landingButtons() {
        document.querySelectorAll('.btn').forEach((btn, clicked) =>{
            const buttons = ['vid-btn-t', 'vid-btn-b']
            btn.addEventListener('click', ()=> {
                document.querySelectorAll('.vid-btn').forEach((video)=>{
                    video.style.visibility = 'hidden'; // Get this to only hide the unselected button
                    video.currentTime = 0;
                })
                let button = document.getElementById(buttons[clicked]);
                button.style.visibility = 'visible';
                button.play();     
                display(clicked);
            });
        });
    };

    function projectButtons() {
        document.querySelectorAll('.project').forEach((prj) =>{
            prj.addEventListener('click', (e)=> {
                let button = e.currentTarget.querySelector('.vid-btn-p');
                let link = button.dataset.link;
                button.currentTime = 0;
                button.play();
                goToPage(link);
            });

        });
    };

    function returned() {
        if(returning == 1){
            const contain = document.getElementById('contain');
            const work = document.getElementById('work');
            const about = document.getElementById('about');
            contain.style.display = 'grid';
            work.style.display = 'grid';
            about.style.display = 'none';
            localStorage.setItem('returning', 0);
            gsap.set('.scroll', { 
                y: -2800,
            });
        };
    };

    function back() {
        const back = document.querySelector('.back');
        back.addEventListener('click', (e)=> {
            let video = e.currentTarget.querySelector('.vid-btn-x');
            video.currentTime = 0;
            video.play();
            scroll(0);
        })
    };
    landingButtons();
    projectButtons();
    fadeIn();
    returned();
    back();
    viewHeight();
    
    
    window.addEventListener('resize', viewHeight);


    
   

};

window.onload = main();