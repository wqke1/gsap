import { gsap } from "gsap";
import { ExpoScaleEase, RoughEase, SlowMo } from "gsap/EasePack";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";

import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";


gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, EaselPlugin, MotionPathPlugin, PixiPlugin, TextPlugin, DrawSVGPlugin, ScrollSmoother, GSDevTools, InertiaPlugin, MorphSVGPlugin, MotionPathHelper, Physics2DPlugin, PhysicsPropsPlugin, ScrambleTextPlugin, SplitText, ExpoScaleEase, RoughEase, SlowMo);



window.addEventListener('load', function () {
  var tl = gsap.timeline();
  tl.to('.loading-home', { duration: 1, yPercent: 150, ease: 'power3.in'});
  tl.to('.loading-home', { opacity: 0, y: '100%'});
  tl.from('#background-image', { scale: 1.5, duration: 1, ease: 'power1'}, "-=1");
});


ScrollSmoother.create({
  content: '.home',
  smooth: 0.7,   // seconds it takes to "catch up" to native scroll position
  effects: true // look for data-speed and data-lag attributes on elements and animate accordingly
});

var split = new SplitText("#your-data");
gsap.fromTo(split.lines, {
  opacity: 0,
  y: 50,
  duration: 1.4,
  ease: "back.in(8)",
}, {
  opacity: 1,
  y: 0,
  ease: "back.in(8)",
  stagger: 0.2,
  duration: 1.4
});
gsap.from('#homep', { duration: 2, delay: 0, opacity: 0, ease: "back.in(1)"})



var cards = gsap.utils.toArray(".creative-pro"),
  dragDistancePerRotation = 3000,
  radius = 520,
  proxy = document.createElement("div"), // just a dummy element that'll get dragged, but we don't care about it.
  progressWrap = gsap.utils.wrap(0, 1),
  spin = gsap.fromTo(cards, {
    rotationY: i => i * 360 / cards.length
  }, {
    rotationY: "-=360",
    duration: 20,
    ease: "none",
    repeat: -1,
    transformOrigin: "50% 50% " + -radius + "px"
  }),
  startProgress;

Draggable.create(proxy, {
  trigger: ".demoWrapper", // activate the dragging when the user presses on the .demoWrapper
  type: "x", // we only care about movement on the x-axis.
  inertia: true,
  allowNativeTouchScrolling: true,
  onPress() {
    gsap.killTweensOf(spin); // if it's in the middle of animating the spin back to timeScale: 1, kill that.
    spin.timeScale(0); // stop the spin.
    startProgress = spin.progress(); // remember the current progress value because we'll make the drag relative to that.
  },
  onDrag: updateRotation,
  onThrowUpdate: updateRotation,
  onRelease() {
    if (!this.tween || !this.tween.isActive()) { // if the user clicked and released (no inertia flick), resume the spin
      gsap.to(spin, { timeScale: 1, duration: 1 });
    }
  },
  onThrowComplete() { // resume the spin after the inertia tween finishes
    gsap.to(spin, { timeScale: 1, duration: 1 });
  }
});

function updateRotation() {
  let p = startProgress + (this.startX - this.x) / dragDistancePerRotation;
  spin.progress(progressWrap(p));
}



// inertia spin
console.clear();

//it doesn't get much easier than this ;)
const draggable = Draggable.create("#knob", {
  type: "rotation",
  inertia: true,
  onDrag: function () {
    console.log(this.rotation)
  }
});

$("#rotation").click(function () {
  console.log(gsap.getProperty("#knob", "rotation"), "from element");
  console.log(Draggable.get("#knob").rotation, "from the Draggable");
});

/*
More info on Club GreenSock and other bonus plugins
https://www.greensock.com/club
*/

export { gsap };
