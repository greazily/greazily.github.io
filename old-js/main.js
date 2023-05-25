gsap.registerPlugin(ScrollTrigger);


let sections = gsap.utils.toArray("#panel"),
    container = document.querySelector(".container"),
    gallery = document.querySelector(".gallery"),
    st,
    scrollWidth = - 25 * (sections.length - 4),
    division = 1 / (sections.length - 4),
    divisions = ["0.000"];

    gsap.defaults({overwrite: "auto", ease: "power2.inOut"});
    gsap.set(".btn-close-panel", {transformOrigin: "center center", scale: 0,})
    gsap.set(".arrow", {yPercent: 200});

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








// /*
// This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

// Features:
//  - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
//  - When each item animates to the left or right enough, it will loop back to the other side
//  - Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
//  - The returned timeline will have the following methods added to it:
//    - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
//    - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
//    - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
//    - current() - returns the current index (if an animation is in-progress, it reflects the final index)
//    - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
//  */
// function horizontalLoop(items, config) {
//   items = gsap.utils.toArray(items);
//   config = config || {};
//   let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)}),
//     length = items.length,
//     startX = items[0].offsetLeft,
//     times = [],
//     widths = [],
//     xPercents = [],
//     curIndex = 0,
//     pixelsPerSecond = (config.speed || 0.3) * 100,
//     snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
//     totalWidth, curX, distanceToStart, distanceToLoop, item, i;
//   gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
//     xPercent: (i, el) => {
//       let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
//       xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
//       return xPercents[i];
//     }
//   });
//   gsap.set(items, {x: 0});
//   totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
//   for (i = 0; i < length; i++) {
//     item = items[i];
//     curX = xPercents[i] / 100 * widths[i];
//     distanceToStart = item.offsetLeft + curX - startX;
//     distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
//     tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
//       .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
//       .add("label" + i, distanceToStart / pixelsPerSecond);
//     times[i] = distanceToStart / pixelsPerSecond;
//   }
//   function toIndex(index, vars) {
//     vars = vars || {};
//     (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
//     let newIndex = gsap.utils.wrap(0, length, index),
//       time = times[newIndex];
//     if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
//       vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
//       time += tl.duration() * (index > curIndex ? 1 : -1);
//     }
//     curIndex = newIndex;
//     vars.overwrite = true;
//     return tl.tweenTo(time, vars);
//   }
//   tl.next = vars => toIndex(curIndex+1, vars);
//   tl.previous = vars => toIndex(curIndex-1, vars);
//   tl.current = () => curIndex;
//   tl.toIndex = (index, vars) => toIndex(index, vars);
//   tl.times = times;
//   tl.progress(1, true).progress(0, true); // pre-render for performance
//   if (config.reversed) {
//     tl.vars.onReverseComplete();
//     tl.reverse();
//   }
//   return tl;
// }



// function marqueeScroll() {
// // const colors = ["#f38630","#6fb936", "#ccc", "#6fb936"];
    

//     function textLength(texts) {
//         let Length = 0;

//     texts.forEach(text => {
//         Length += text.clientWidth

//     })

//     return Length;
//     }

    

    
//     let marquees = document.querySelectorAll(".marquee");
//     marquees.forEach(marquee => {
//         let letters = marquee.querySelectorAll("p");
//         console.log(textLength(letters))

//         if(marquee.clientWidth < textLength(letters)) {
//             const loop = horizontalLoop(letters, {paused: false,repeat: -1,});
//         }
//     })
// }


// marqueeScroll()


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
        close = section.querySelector(".btn-close-panel"),
        arrow = section.querySelector(".arrow");

    let tl = gsap.timeline();
    tl.to(gallery, {duration: .6, height: "90%"}) //disables the scroll(instantantly(.set)) and changes the height
      .to(section, {duration: .6, height: "100.5%", overflow: "scroll"}, "<") //set the panel height to fill the entire gallery and enables scrolling on it
      .to(gallery, {duration: .6, scrollTo: section}, "<")//scrolls to panel while height is changed, ensuring title is at top of gallery
      .to(details, {duration: .4, height: "auto"})
      .to(gallery, {duration: .4, scrollTo: section}, "<") //scrolls to the title while it expands, looking as if it's not moving
      .to(arrow, {duration: .4, yPercent: 0}, "-=0.3")
      .to(close, {duration: .4, scale: 1, rotation: 360})
    return tl;
}

// ----- panel closing function for mobile ----

function mobileClose(section) {
    let details = section.querySelector(".details"),
        close = section.querySelector(".btn-close-panel"),
        arrow = section.querySelector(".arrow");


    let tl = gsap.timeline();
    tl.to(close, {duration: .4, scale: 0, rotation: "0"})
      .to(gallery, {duration: .6,  height: "60%", scrollTo: section})
      .to(details, {duration: .6, height: "0"}, "<")
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
        tl.to(detailsText, {height: "0"})
          .to(arrow, {rotation: 180}, "<")
          .to(gallery, {scrollTo: section}, "<")
    } 
    
    else {//but if its set to 0 add titleOpen tweens to master timeline
        tl.to(detailsText, {height: "auto"})
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