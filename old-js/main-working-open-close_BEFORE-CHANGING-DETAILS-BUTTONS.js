gsap.registerPlugin(ScrollTrigger, Flip);


let sections = gsap.utils.toArray("#panel"),
    container = document.querySelector(".container"),
    headerGrid = document.querySelector(".header-grid"),
    gallery = document.querySelector(".gallery"),
    st,
    scrollWidth = - 25 * (sections.length - 4),
    scrolledDistance = 0,
    division = 1 / (sections.length - 4),
    divisions = ["0.000"];

gsap.defaults({overwrite: "auto", ease: "power2.inOut"});

function mediaQuery() {

    let mobile = window.matchMedia("(max-width: 499.99px");
        

    if(!mobile.matches) { // ----- horizontal scrolling code for desktop -----
        st = gsap.to(container, { //initiates a scrolltrigger animation, affecting the container
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
    }



    sections.forEach(section => {section.addEventListener("click", (e)=>{ //adds a click event to each panel, then executes the code on the panel that the event was triggered on
            
        let title = section.querySelector(".title"),
            heading = section.querySelector(".heading"),
            endSection = document.querySelector(".panel.end");
            

        console.log(e.target);
 
 
 
        let master = gsap.timeline() //initiates master timeline

        if(!section.classList.contains("active")) {

            if(!mobile.matches) { // ----- panel opening code for desktop -----
                section.classList.add("active");
                master.add(desktopScroll(section))
                      .add(desktopOpen(title, section, heading))
                
    
            } else { // ----- panel opening code for mobile -----
                section.classList.add("active");
                // title.classList.add("active");
                endSection.style.display = "block"; //adds a spacer to end of panels enabling last panel to scroll to top of gallery
                master.add(mobileScroll(section))
                      .add(mobileOpen(title, section, heading));
    
            }
        } else {

            if(!mobile.matches) {
                let ts = st.scrollTrigger;
                master.add(desktopClose(title, section, heading, ts));
                section.classList.remove("active");
            } else {// ----- panel closing code for mobile -----
                // title.classList.remove("active");
                if(e.target.classList.contains("heading")) {
                    master.add(titleOpen(title, section, heading))
                    
                }

                if(e.target.classList.contains("details")) {
                    master.add(titleClose(title, section, heading));

                }

                if(e.target.classList.contains("close")) {
                    master.add(mobileClose(title, section, heading));
                    endSection.style.display = "none";
                    section.classList.remove("active");
                }

                
            }

        }
              
    })});


    

}   


// ----- panel opening functions for desktop -----


function desktopScroll(section) {
    let tl = gsap.timeline();
    tl.to(container, {duration: .6, xPercent: ()=> -25 * sections.indexOf(section)})//scrolls to the clicked panel
    return tl;
}

function desktopOpen(title, section, heading) {
    let tl = gsap.timeline()
    tl.to(section, {duration: .8, width: "100%", overflow: "scroll"})
      .to(gallery, {duration: .8, height: "90%"}, "<")
      .to(title, {duration: .4, height: "200px", onStart: headingActive, onStartParams: [heading]})
    return tl;

}

// ----- panel closing function for desktop ----

function desktopClose(title, section, heading, ts) {
    let tl = gsap.timeline()
    tl.to(gallery, {duration: .6,  height: "50%"})
      .to(section, {duration: .6, width: "25%", scrollTo: "0"}, "<")
      .to(title, {duration: .6, height: "20px", onComplete: headingActive, onCompleteParams: [heading]}, "<")
      .set(section, {overflow: "hidden", onComplete: function() {gsap.set(this.targets(), {clearProps: "all"})}})
      .to(container, {duration: .6, xPercent: scrollWidth * ts.progress});
    return tl;
}


// ----- panel opening functions for mobile -----

function mobileScroll(section) {
    let tl = gsap.timeline();
    tl.to(gallery, {duration: .4, scrollTo: section}); //scrolls to the clicked panel
    return tl;
}

function mobileOpen(title, section, heading) {
    let tl = gsap.timeline();
    tl.to(gallery, {duration: .6, overflow: "hidden", height: "90%"}) //disables the scroll(instantantly(.set)) and changes the height
      .to(section, {duration: .6, height: "100.5%", overflow: "scroll"}, "<") //set the panel height to fill the entire gallery and enables scrolling on it
      .to(title, {duration: .4, height: "auto", onStart: headingActive, onStartParams: [heading]}) //expands the title section, which causes scrolling problems
      .to(gallery, {duration: .4, scrollTo: section}, "<") //scrolls to the title while it expands, looking as if it's not moving
    return tl;
}

// ----- panel closing function for mobile ----

function mobileClose(title, section, heading) {
    let tl = gsap.timeline();
    tl.to(gallery, {duration: .6,  height: "50%"})
      .to(title, {duration: .6, height: "20px", onComplete: headingActive, onCompleteParams: [heading]}, "<")
      .to(section, {duration: .6, height: "50%", scrollTo: "0"}, "<")
      .set(gallery, {overflow: "scroll"})
      .set(section, {overflow: "hidden", onComplete: function() {gsap.set(this.targets(), {clearProps: "all"})}})
    return tl;

}







function titleOpen(title, section, heading) {
    let tl = gsap.timeline()
    tl.to(title, {duration: .4, height: "200px", onStart: headingActive, onStartParams: [heading]})
    .to(gallery, {duration: .4, scrollTo: section}, "<")
    return tl;
}

function titleClose(title, section, heading) {
    let tl = gsap.timeline()
    .to(title, {duration: .4, height: "20px", onComplete: headingActive, onCompleteParams: [heading]})
    .to(gallery, {duration: .4, scrollTo: section}, "<")
    return tl;
}

function headingActive(heading) {
    if(!heading.classList.contains("active")){
        heading.classList.add("active")
    } else {
        heading.classList.remove("active")
    }
};


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