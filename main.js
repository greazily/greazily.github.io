
function main(){
    const btnTop = document.getElementById('btn-top');
    const btnBottom = document.getElementById('btn-bottom');


    function btnCLick(e){
        let clickTop = document.getElementById('click-top');
        let clickBottom = document.getElementById('click-bottom');
        
        if(e.target.id == 'btn-top'){
            clickTop.currentTime = 0;
            clickBottom.classList.add('invisible');
            clickTop.classList.remove('invisible');
            clickTop.play();
        } else {
            clickBottom.currentTime = 0;
            clickTop.classList.add('invisible');
            clickBottom.classList.remove('invisible');
            clickBottom.play();
        }

    }

    btnTop.addEventListener('click', btnCLick);
    btnBottom.addEventListener('click', btnCLick);


    

};
main();