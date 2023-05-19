gsap.registerPlugin(ScrollTrigger, Flip);


let sections = gsap.utils.toArray("#panel"),
    container = document.querySelector(".container"),
    headerGrid = document.querySelector(".header-grid"),
    gallery = document.querySelector(".gallery"),
    scrollWidth = - 25 * (sections.length - 4),
    scrolledDistance = 0,
    division = 1 / (sections.length - 4),
    divisions = ["0.000"];



    function mediaQuery() {

    let mobile = window.matchMedia("(max-width: 499.99px"),
        endSection = document.querySelector(".panel.end"),
        gallery = document.querySelector(".gallery");

    if(mobile.matches) {
        sections.forEach(section => {section.addEventListener("click", (e)=>{ //adds a click event to each panel, then executes the code on the panel that the event was triggered on
            
            let title = section.querySelector(".title"),
                heading = section.querySelector(".heading");

            endSection.style.display = "revert"; //adds a spacer to end of panels enabling last panel to scroll to top of gallery
            function headingActive() {heading.classList.add("active")};


            let tl = gsap.timeline({defaults: {ease: "power2.inOut"}}); //initiates a timeline

            tl.to(gallery, {duration: .4, scrollTo: section}) //scrolls to the clicked panel
              .to(headerGrid, {duration: .6, height: "50px"}) //set the header grid to a smaller height, creating more space for the gallery to occupy
              .to(gallery, {duration: .1, scrollTo: section, overflow: "hidden"}, "<") //reseats the scroll to avoid bugs (very hacky solution) and disables the scroll
              .to(section, {duration: .6, height: "100.5%", overflow: "scroll", onComplete: headingActive}, "<") //set the panel height to fill the entire gallery and enables scrolling on it
              .to(title, {duration: .4, height: "200px"}) //expands the title section, which causes scrolling problems
              .to(gallery, {duration: .4, scrollTo: section}, "<") //reseats scroll again avoiding the problem from the line above

        })});

    } else {


        let st = gsap.to(container, { //initiates a scrolltrigger animation, affecting the container
            xPercent:()=> scrollWidth, //function that point to a variable that multiplies 25(percentage of vw each panel occupies) by the number of panels minus the ones already visible (4)
            ease: "none",
            scrollTrigger: {
                trigger: ".layout-rows",
                pin: true, //pins the container in place
                scrub: 1, //enables the user to scroll as a means of moving the animation backward or forward or stay still
                markers: true, //for testing the scrolltrigger clearly visializing where the animation takes place
                end: ()=> sections[0].offsetWidth * (sections.length - 4),
                invalidateOnRefresh: true, //recaltulates start and end points when refreshed
                onUpdate: self => console.log(self.progress.toFixed(3)) //prints to console the progress of the scrolltrigger animation between 0 and 1
            }
            });

        sections.forEach(section => {section.addEventListener("click", (e)=>{
    

            let ts = st.scrollTrigger,
                title = section.querySelector(".title"),
                heading = section.querySelector(".heading");

            function headingActive() {heading.classList.add("active")};

            let tl = gsap.timeline({defaults: {ease: "power2.inOut"}})
            tl.to(container, {duration: .6, xPercent: ()=> -25 * sections.indexOf(section)})
              .to(section, {duration: .8, width: "100%", overflow: "scroll"})
              .to(headerGrid, {duration: .8, height: "50px", onComplete: headingActive}, "<")
              .to(title, {duration: .4, height: "200px"});
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