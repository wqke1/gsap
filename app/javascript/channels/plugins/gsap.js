import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(Flip, ScrollTrigger, Observer, ScrollToPlugin, Draggable, EaselPlugin, MotionPathPlugin, PixiPlugin, TextPlugin);

// gsap.timeline()
//     .from('h1', { duration: 1.5, text: 'Loubet Thomas', ease: 'slow', repeat: -1, yoyo: true, repeatDelay: 1 });

// gsap.to("section", {
//   scrollTrigger: {
//     trigger: "section",
//     toggleActions: "restart pause reverse reset"
//   },
//   x: 500
// });
export { gsap };
