gsap.registerPlugin(ScrollTrigger, Flip);


let sections = gsap.utils.toArray("#panel"),
    container = document.querySelector(".container"),
    headerGrid = document.querySelector(".header-grid"),
    gallery = document.querySelector(".gallery"),
    scrollWidth = - 25 * (sections.length - 4),
    scrollHeight = - 50 * (sections.length - 2),
    scrolledDistance = 0,
    division = 1 / (sections.length - 4),
    divisions = ["0.000"];









    
function mediaQuery() {
    let mobile = window.matchMedia("(max-width: 499.99px"),
        endSection = document.querySelector(".panel.end"),
        gallery = document.querySelector(".gallery");

    if(mobile.matches) {
        sections.forEach(section => {section.addEventListener("click", (e)=>{
            
            let title = section.querySelector(".title"),
                heading = section.querySelector(".heading");

            let tl = gsap.timeline({defaults: {ease: "power2.inOut"}});
            tl.to(endSection, {duration: .1, display: "revert"})
              .to(gallery, {duration: .4, scrollTo: section, overflow: "hidden"})
              .to(section, {duration: .3, height: "100.5%", overflow: "scroll"})
              .to(headerGrid, {duration: .4, height: "50px"}, "<")
              .to(title, {delay: .4, duration: .4, height: "200px"}, "<"); 

        })});

    } else {
        let st = gsap.to(container, {
            xPercent:()=> scrollWidth,
            ease: "none",
            scrollTrigger: {
                trigger: ".layout-rows",
                pin: true,
                scrub: 1,
                markers: true,
                end: ()=> sections[0].offsetWidth * (sections.length - 4),
                invalidateOnRefresh: true,
                onUpdate: self => console.log(self.progress.toFixed(3))
            }
            });

        sections.forEach(section => {section.addEventListener("click", (e)=>{
    

            let ts = st.scrollTrigger,
                title = section.querySelector(".title"),
                heading = section.querySelector(".heading"),
                position = section.getBoundingClientRect();

            console.log(ts.progress.toFixed(3), divisions[sections.indexOf(section)]);
        
            if(section.classList.contains("active")){
                // insert if statement to handle section index 0
                title.classList.remove("expand");
                
                setTimeout(function() {
                    heading.classList.remove("active");
                    section.classList.remove("active");
                    headerGrid.classList.remove("active");
                    section.scrollTo({top: 0, behavior: "smooth"});
                    // gsap.to(section, {
                    //     duration: 1,
                    //     scrollTo: ".cover-image",
                    //     ease:"power2.inOut"
                    // });
    
                if(divisions.includes(ts.progress.toFixed(3)) && ts.progress.toFixed(3) == divisions[sections.indexOf(section)]) {
                    setTimeout(resetScroll, 800);
                } else {
                    gsap.to(container, {
                        xPercent: scrollWidth * ts.progress,
                        duration: .8,
                        delay: .8,
                        ease: "power2.inOut",
                        onComplete: resetScroll})
                    
                    
                }
                
    
                }, 400);

            function resetScroll() {
                ts.scroll(scrolledDistance);
                ts.enable(false);
                ts.getTween().progress(1);

            }

            } else {
    
                if(divisions.includes(ts.progress.toFixed(3)) && position.left == 0){
                    activate();
                    
                } else {
                    gsap.to(container, {
                        xPercent: ()=> -25 * sections.indexOf(section),
                        duration: .8,
                        ease: "power2.inOut",
                        onComplete: activate
                    });
                    
                }
    
                function activate() {
                    section.classList.add("active");
                    headerGrid.classList.add("active");
                    
                    ts.disable(false);
                    scrolledDistance = ts.scroll();
                    setTimeout(function(){
                        title.classList.add("expand");
                        heading.classList.add("active");
                    }, 800);
                }   
            } 
        })});
    }

}



function divide() {
   
    let counter = 0;

    for(let i = 0; i < (sections.length - 4); i++) {
        counter += 1;
        console.log(division * counter);
        divisions.push((division * counter).toFixed(3));
    }

};

function calculateVp() {
    var vh = window.innerHeight * 0.01;
    var vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
    document.documentElement.style.setProperty("--vw", vw + "px");

    console.log(vw * 100, vh * 100);
}

mediaQuery();

divide();

  // Initial calculation
calculateVp();
  
  // Re-calculate on resize
window.addEventListener("resize", ()=> {
    calculateVp();
    mediaQuery();
    divide();
} );
  
  // Re-calculate on device orientation change
window.addEventListener("orientationchange", ()=> {
    calculateVp();
    mediaQuery();
    divide();
});