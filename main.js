
function main(){
    const btnTop = document.getElementById('btn-top');
    const btnBottom = document.getElementById('btn-bottom');


    function btnCLick(e){
        let videoTop = document.getElementById('video-topclick');
        let videoBottom = document.getElementById('video-bottomclick');
        
        if(e.target.id == 'btn-top'){
            videoBottom.style.zIndex = '-10'
            videoTop.style.zIndex = '10';
            videoTop.currentTime = 0;
            videoTop.play();
        } else {
            // console.log(e.target.id == 'btn-top');
            videoTop.style.zIndex = '-10';
            videoBottom.style.zIndex = '10';
            videoBottom.currentTime = 0;
            videoBottom.play();
        }

    }

    btnTop.addEventListener('click', btnCLick);
    btnBottom.addEventListener('click', btnCLick);


    

};
main();