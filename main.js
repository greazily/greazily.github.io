
function main(){
    const btnTop = document.getElementById('btn-top');
    const btnBottom = document.getElementById('btn-bottom');

    const source = ['Portfolio-Animation-Bottom-Shorter.mp4', 'Portfolio-Animation-Top-Shorter.mp4' ]

    function btnCLick(e){
        let video = document.getElementById('video-onclick');
        if(e.target.id == 'btn-top'){
            video.setAttribute('src', source[1]);
            video.play();
        } else {
            console.log(e.target.id == 'btn-top');
            video.setAttribute('src', source[0]);
            video.play();
        }

    }

    btnTop.addEventListener('click', btnCLick);
    btnBottom.addEventListener('click', btnCLick);


    

};
main();