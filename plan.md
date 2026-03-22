# **📂 Project Blueprint: Jack Yeoh Portfolio**

**Role:** Technical Game Designer (Systems, UE5, UI/UX, Full-Stack)

**Core Aesthetic:** *Arknights: Endfield* / Tech-wear / Sci-Fi Terminal

**Format:** Single Page Application (SPA)

## **1\. Executive Summary**

This portfolio is designed to be a frictionless, cinematic experience tailored to the "30-Second Rule" of recruiters and Lead Designers. It avoids traditional scrolling lists in favor of a "Self-Selection Terminal" (Hub-and-Spoke model). The visual language relies on snappy, state-based animations, orbital navigation, and dynamic theming, presenting Jack as a highly polished "T-Shaped" professional.

## **2\. Technical Stack**

* **Core Framework:** React (for component state and SPA routing)  
* **Animation Engine:** Framer Motion (for layout transitions, enter/exit states, and snappy easing)  
* **Styling:** Tailwind CSS (for rapid layout, gradients, and responsive breakpoints)  
* **Ambient Effects:** HTML5 \<canvas\> (for lightweight, non-blocking background particles and tech grids)  
* **Asset Handling:** CSS filters and static 2D avatars (avoiding heavy WebGL/Spine overhead to prioritize load speed)

## **3\. Information Architecture & User Flow**

### **Phase A: The Boot Sequence (First Touchpoint)**

* **Action:** A rapid (0.5s \- 1s) terminal boot-up sequence.  
* **Visuals:** Loading bar fills \-\> "Initializing OS..." \-\> "Welcome, to Jack Yeoh's Portfolio."  
* **UX Rules:** \* Clicking anywhere instantly skips the animation.  
  * Uses sessionStorage so it only plays on the *first* visit.  
  * A subtle "Reboot" icon (RotateCcw) remains in the top right of the main app to replay the sequence if desired.

### **Phase B: The Main Hub (Self-Selection Menu)**

* **Layout:** Central 2D Avatar acting as the anchor.  
* **Navigation:** 4 to 5 "Orbs" rotating on a slanted, faux-3D elliptical orbit around the avatar.  
  * *Nodes:* \[ GAME DESIGN \], \[ UE DEV \], \[ NUMERICAL \], \[ UI / UX \]  
* **Interaction:** Orbit speed is slow. Hovering over an orb pauses the orbit and displays a subtitle (e.g., "Blueprints & C++"). Clicking an orb triggers the deep-dive transition.

### **Phase C: Project Deep Dive (Dynamic Theming)**

* **Transition:** Selected category remains, other UI elements fade/slide out. The background canvas interpolates to a new theme color (e.g., Orange for Game Design \-\> Blue for Numerical).  
* **Content Layout (Strict Recruiter Format):**  
  1. **Back Button:** Foolproof "Return to Hub" button.  
  2. **Hero Asset:** Looping GIF or 15-second video immediately at the top.  
  3. **The Stats:** Role, Engine, Duration, Team Size.  
  4. **Explicit Contributions:** Bullet points stating exactly what Jack built (No vague "we did this" language).  
  5. **The "Why" (Process):** Screenshots of spreadsheets, architecture nodes, or Figma flows.

## **4\. Responsive & Layout Rules**

* **Desktop (16:9):** Full orbital navigation. Text and controls framed cleanly around the edges.  
* **Ultrawide Screens:** Left and right edges fade to black (bg-gradient-to-r). A max-w-screen-2xl container ensures the UI doesn't stretch awkwardly across extreme widths.  
* **Mobile (Vertical):** \* Orbital radii shrink dynamically to fit the screen.  
  * Global controls (Name, Reboot button) sit in a neat top bar.  
  * The "About Me" text moves from the center to a bottom-anchored panel. A sliver of it peeks above the fold to encourage the user to scroll up and read the intro without cluttering the interactive orbs.

## **5\. Development Roadmap**

* **Milestone 1: The Sandbox (Completed)**  
  * *Goal:* Build the core orbital math, Canvas ambience, and Framer Motion SPA routing in a standalone React prototype.  
* **Milestone 2: Content Generation**  
  * *Goal:* Prepare the "Proof Assets." Record 10-second gameplay GIFs for *Metal Genesis* and *Runic Rush*. Clean up balancing spreadsheets for screenshots. Slice the static 2D avatar.  
* **Milestone 3: Data Integration**  
  * *Goal:* Plug the specific project data, tags, and theme colors into the JSON/State structure of the React app. Build the responsive CSS Grid for the Project Deep Dive views.  
* **Milestone 4: Polish & Performance**  
  * *Goal:* Audit Framer Motion performance. Ensure mobile tap targets for the orbs are large enough. Test browser "Back" button handling via React Router or custom History API hooks.