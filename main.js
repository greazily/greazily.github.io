gsap.registerPlugin(ScrollToPlugin, CustomEase);

function main(){
    let landHeight = 0;

    function viewHeight() {
        landHeight = document.getElementById('land').clientHeight;
        let windowHeight = innerHeight;
        document.documentElement.style.setProperty('--vh', windowHeight);

        console.log(landHeight);
    };

    function display(x) {
        const contentWrapper = document.getElementById('contain');
        const content = ['about', 'work'];

        contentWrapper.style.display = 'flex';
        let activeContent = document.getElementById(content[x]);
        activeContent.style.display = 'flex';

        scroll();   

    };

    function scroll() {
        gsap.to('.scroll', { 
            delay: 1.3,
            duration: 4,
            y: -landHeight,
            ease: "power4.inOut",
        });

    };

    viewHeight();

    window.addEventListener('resize', viewHeight);
    
    document.querySelectorAll('.btn').forEach((btn, index) =>{
        const buttons = ['vid-btn-t', 'vid-btn-b'];
        


        

        btn.addEventListener('click', ()=> {
            document.querySelectorAll('.vid-btn').forEach((video)=>{
                video.style.visibility = 'hidden'; // Get this to only hide the unselected button
                video.currentTime = 0;
            })
            let button = document.getElementById(buttons[index]);
            button.style.visibility = 'visible';
            button.play();     
            display(index);
        });

    });

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