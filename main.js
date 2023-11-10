function main(){
    let landHeight = 0;
    let returning = localStorage.getItem('returning');


    function fadeIn() {
        gsap.to('.shade', { 
            duration: 2, 
            autoAlpha: 0, 
            ease: 'power4.inOut', 
        });
    }

    function viewHeight() {
        landHeight = document.getElementById('land').clientHeight;
        let windowHeight = innerHeight;
        document.documentElement.style.setProperty('--vh', windowHeight);
    };

    function scroll(y) {
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
        const contentWrapper = document.getElementById('contain');
        const content = ['about', 'work'];
        contentWrapper.style.display = 'flex';
        let activeContent = document.getElementById(content[selected]);
        activeContent.style.display = 'flex';
        scroll(-landHeight);   
    };

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

    function landingButtons() {
        document.querySelectorAll('.btn').forEach((btn, clicked) =>{

            const buttons = ['vid-btn-t', 'vid-btn-b']

            btn.addEventListener('click', ()=> {
                // document.getElementById('scroll').setAttribute('overflow', 'visible');
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
            const contentWrapper = document.getElementById('contain');
            const work = document.getElementById('work');
            const about = document.getElementById('about');
            contentWrapper.style.display = 'flex';
            work.style.display = 'flex';
            about.style.display = 'none';
            localStorage.setItem('returning', 0);
            gsap.set('.scroll', { 
                y: -landHeight,
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

    viewHeight();
    landingButtons();
    projectButtons();
    fadeIn();
    returned();
    back();
    
    
    window.addEventListener('resize', viewHeight);


    
   

};

window.onload = main();