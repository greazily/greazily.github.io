gsap.registerPlugin(ScrollTrigger);


let sections = gsap.utils.toArray("#panel"),
    container = document.querySelector(".container"),
    gallery = document.querySelector(".gallery"),
    header = document.querySelector(".header-grid"),
    st,
    scrollWidth = - 25 * (sections.length - 4),
    division = 1 / (sections.length - 4),
    divisions = ["0.000"];



function mediaQuery() {

    gsap.defaults({overwrite: "auto", ease: "power2.inOut"});
    gsap.set(".btn-close-panel", {transformOrigin: "center center", scale: 0,})
    gsap.set(".arrow", {yPercent: 200});

    let mobile = window.matchMedia("(max-width: 499.99px");
        

    if(!mobile.matches) { // ----- horizontal scrolling code for desktop -----
        st = gsap.to(container, { //initiates a scrolltrigger animation, affecting the container
            xPercent:()=> scrollWidth, //function that point to a variable that multiplies 25(percentage of vw each panel occupies) by the number of panels minus the ones already visible (4)
            ease: "none",
            scrollTrigger: {
                trigger: ".layout-rows",
                pin: true, //pins the container in place
                scrub: 1, //enables the user to scroll as a means of moving the animation backward or forward or stay still
                // markers: true, //for testing the scrolltrigger clearly visializing where the animation takes place
                end: ()=> sections[0].offsetWidth * (sections.length - 4),
                invalidateOnRefresh: true, //recaltulates start and end points when refreshed
                // onUpdate: self => console.log(self.progress.toFixed(3)) //prints to console the progress of the scrolltrigger animation between 0 and 1
            }
        });   
    }



    sections.forEach(section => {section.addEventListener("click", (e)=>{ //adds a click event to each panel, then executes the code on the panel that the event was triggered on
            
        let endSection = document.querySelector(".panel.end");
        
 
 
 
        let master = gsap.timeline() //initiates master timeline

        if(!section.classList.contains("active")) {

            if(!mobile.matches) { // ----- panel opening code for desktop -----
                section.classList.add("active");
                master.add(desktopScroll(section))
                      .add(desktopOpen(section))
                
    
            } else { // ----- panel opening code for mobile -----
                section.classList.add("active");
                endSection.style.display = "block"; //adds a spacer to end of panels enabling last panel to scroll to top of gallery
                master.add(mobileScroll(section))
                      .add(mobileOpen(section));
    
            }
        } 
        
        else {

            if(!mobile.matches) {
               let contentClasses = ["cover-image", "image"],
                   detailsClasses = ["btn-toggle-details", "arrow"];

                if(contentClasses.some(contentClasses => e.target.classList.contains(contentClasses))) {
                    let ts = st.scrollTrigger;
                    master.add(desktopClose(section, ts));
                    section.classList.remove("active");
                }

                if(detailsClasses.some(detailsClasses => e.target.classList.contains(detailsClasses))) {//handles the toggling of the detail drop down
                    master.add(detailsToggle(section));
                }
                

            } 
            
            else {// ----- panel closing code for mobile -----
                
                let detailsClasses = ["btn-toggle-details", "arrow"]

                if(detailsClasses.some(detailsClasses => e.target.classList.contains(detailsClasses))) {//handles the toggling of the detail drop down
                    master.add(detailsToggle(section));
                }

                let closeClasses = ["btn-close-panel", "cross"]

                if(closeClasses.some(closeClasses => e.target.classList.contains(closeClasses))) {
                    master.add(mobileClose(section));
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

function desktopOpen(section) {
    let details = section.querySelector(".details"),
        arrow = section.querySelector(".arrow");

    let tl = gsap.timeline()
    tl.to(section, {duration: .8, width: "100%", overflow: "scroll"})
      .to(gallery, {duration: .8, height: "90%"}, "<")
      .to(details, {duration: .4, height: "auto"})
      .to(arrow, {duration: .4, yPercent: 0}, "-=0.3")


    return tl;

}

// ----- panel closing function for desktop ----

function desktopClose(section, ts) {
    let details = section.querySelector(".details"),
        arrow = section.querySelector(".arrow");

    let tl = gsap.timeline()
    tl.to(details, {duration: .4, height: "0"})
      .to(gallery, {duration: .6,  height: "50%"})
      .to(section, {duration: .6, width: "25%", scrollTo: "0"}, "<")
      .set(section, {overflow: "hidden", onComplete: function() {gsap.set(this.targets(), {clearProps: "all"})}})
      .to(container, {duration: .6, xPercent: scrollWidth * ts.progress})
      .set(arrow, {yPercent: 200});

    return tl;
}


// ----- panel opening functions for mobile -----

function mobileScroll(section) {
    let tl = gsap.timeline();
    tl.to(gallery, {duration: .4, scrollTo: section}); //scrolls to the clicked panel
    return tl;
}

function mobileOpen(section) {
    let details = section.querySelector(".details"),
        detailsText = section.querySelector(".details-text"),
        close = section.querySelector(".btn-close-panel"),
        arrow = section.querySelector(".arrow");

    let tl = gsap.timeline();
    tl.to(header, {duration: .6, height: "calc(90px + 20px)"}) //disables the scroll(instantantly(.set)) and changes the height
      .to(section, {duration: .6, height: "100.5%", overflow: "scroll"}, "<") //set the panel height to fill the entire gallery and enables scrolling on it
      .to(gallery, {duration: .7, scrollTo: section}, "<")//scrolls to panel while height is changed, ensuring title is at top of gallery
      .to(details, {duration: .4, height: "auto"})
    //   .to(detailsText, {duration: .4, marginTop: "var(--main-padding-width)"}, "<")
      .to(gallery, {duration: .4, scrollTo: section}, "<") //scrolls to the title while it expands, looking as if it's not moving
      .to(arrow, {duration: .4, yPercent: 0}, "-=0.3")
      .to(close, {duration: .4, scale: 1, rotation: 360})
    return tl;
}

// ----- panel closing function for mobile ----

function mobileClose(section) {
    let details = section.querySelector(".details"),
        detailsText = section.querySelector(".details-text"),
        close = section.querySelector(".btn-close-panel"),
        arrow = section.querySelector(".arrow");


    let tl = gsap.timeline();
    tl.to(close, {duration: .4, scale: 0, rotation: "0"})
      .to(header, {duration: .6,  height: "auto"})
      .to(details, {duration: .6, height: "0", margin: "0"}, "<")
    //   .to(detailsText, {duration: .6, marginTop: "0"}, "<")
      .to(section, {duration: .6, height: "50%", scrollTo: "0"}, "<")
      .set(arrow, {yPercent: 200})
      .set(gallery, {overflow: "scroll"})
      .set(section, {overflow: "hidden", onComplete: function() {gsap.set(this.targets(), {clearProps: "all"})}})
    return tl;

}

//----- toggling 

function detailsToggle(section) {
    let detailsText = section.querySelector(".details-text");
        arrow = section.querySelector(".arrow");



    let tl = gsap.timeline({defaults: {duration: .4}})

    if(detailsText.offsetHeight != 0) {//checks if the details-text is "hidden"(height set to 0)
        tl.to(detailsText, {height: "0", marginTop: "0", marginBottom: "0"})
          .to(arrow, {rotation: 180}, "<")
          .to(gallery, {scrollTo: section}, "<")
    } 
    
    else {//but if its set to 0 add titleOpen tweens to master timeline
        tl.to(detailsText, {height: "auto", marginTop: "1.1rem", marginBottom: "2.2rem"})//needs to be manually set to the same value as --main-padding-width
          .to(arrow, {rotation: 0}, "<")
          .to(gallery, {scrollTo: section}, "<")
    }
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
    var gh = gallery.offsetHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
    document.documentElement.style.setProperty("--vw", vw + "px");
    document.documentElement.style.setProperty("--gh", gh + "px");

    console.log("VP", vw * 100, vh * 100, gh * 100);
}
calculateVp();
mediaQuery();

divide();

  // Initial calculation

  
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