gsap.registerPlugin(ScrollToPlugin, CustomEase);

function main(){
    let landHeight = 0;

    function viewHeight() {
        landHeight = document.getElementById('land').clientHeight;
        let windowHeight = innerHeight;
        document.documentElement.style.setProperty('--vh', windowHeight);

        console.log(landHeight);
    };

    function display(selected) {
        const contentWrapper = document.getElementById('contain');
        const content = ['about', 'work'];

        contentWrapper.style.display = 'flex';
        let activeContent = document.getElementById(content[selected]);
        activeContent.style.display = 'flex';

        scroll();   

    };

    function scroll() {
        gsap.to('.scroll', { 
            delay: 1.3,
            duration: 3.5,
            y: -landHeight,
            ease: "power4.inOut",
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
        document.querySelectorAll('.project').forEach((prj, clicked) =>{

            const projects = ['p1', 'p2', 'p3'];

            prj.addEventListener('click', (e)=> {
                console.log(e.currentTarget.querySelector('.vid-btn-p'));
                let button = e.currentTarget.querySelector('.vid-btn-p');
                button.currentTime = 0;
                button.play(); 

            });

        });
    };

    viewHeight();
    landingButtons();
    projectButtons();

    window.addEventListener('resize', viewHeight);


    
   

};

main();






   // Old code ***********************************************
   
    // const btnTop = document.getElementById('btn-top');
    // const btnBottom = document.getElementById('btn-bottom');


    // function btnCLick(e){
    //     const start = performance.now();
    //     let clickTop = document.getElementById('click-top');
    //     let clickBottom = document.getElementById('click-bottom');
        
    //     if(e.target.id == 'btn-top'){
    //         clickTop.currentTime = 0;
    //         clickBottom.classList.add('invisible');
    //         clickTop.classList.remove('invisible');
    //         clickTop.play();
    //     } else {
    //         clickBottom.currentTime = 0;
    //         clickTop.classList.add('invisible');
    //         clickBottom.classList.remove('invisible');
    //         clickBottom.play();
    //     }
    //     const end = performance.now();
    //     console.log('executed ' + (end-start));

    // }

    // btnTop.addEventListener('click', btnCLick);
    // btnBottom.addEventListener('click', btnCLick);