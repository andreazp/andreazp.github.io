/*
 * All portfolio content lives here. Edit this file to make the site yours.
 * Anything marked "PLACEHOLDER" or "TODO" still needs your real content.
 *
 * Media folders:
 *   assets/projects/<project id>/   photos & videos for each project
 *   assets/motion/                  motion graphics videos
 *   assets/illustration/            illustration images
 */
window.PORTFOLIO = {
  // Splash animation shown when the site opens (once per visit). Export from After Effects / Cavalry as .mp4
  // and put it in assets/splash/. Leave video as null to turn the splash off.
  splash: {
    video: null,                // e.g. "assets/splash/splash.mp4" (landscape, 16:9)
    videoMobile: null,          // optional portrait version for phones, e.g. "assets/splash/splash-mobile.mp4"
    background: "#f5f2ec"       // colour behind the video (match your animation's first/last frame)
  },

  name: "Andrea Zamudio",
  role: "UI Artist & Programmer",
  // Shown big on the title screen. Wrap one word in *asterisks* to highlight it; \n starts a new line.
  catchphrase: "UI that looks good,\nand *feels* good.\nFrom design to code.",
  availability: "Open to work",         // shown in the top HUD
  // Scrolling strip at the bottom of the home page — clients, highlights and awards.
  ticker: [
    "Ford", "ClinicVET for NUPEC", "Tec de Monterrey", "Ayna — pitched to PlayStation at GDC",
    "Best VR Game Project 2023", "1st place · Transparencia en Corto", "American Eagle motion contest winner",
    "National Illustration Award · 3rd place", "Unity · Unreal · C#"
  ],

  // "Selected work" grid at the bottom of the home page. The first tile is big; `wide: true` makes a tile
  // two columns wide. `project` is the project id the tile opens. Videos play silently on a loop.
  homeGallery: [
    { src: "assets/projects/ayna/vendor.mp4", poster: "assets/projects/ayna/vendor.jpg", project: "ayna", caption: "Vendor system" },
    { src: "assets/projects/clinicvet/devices.webp", project: "clinicvet", caption: "Complete UI design" },
    { src: "assets/projects/argent-xr/intro.mp4", project: "argent-xr", caption: "Motion graphics" },
    { src: "assets/projects/ayna/settings-menu.mp4", poster: "assets/projects/ayna/settings-menu.jpg", project: "ayna", caption: "Settings menu" },
    { src: "assets/projects/clinicvet/3dview.jpeg", project: "clinicvet", caption: "3D view" },
    { src: "assets/projects/ayna/dialog-bubbles.mp4", poster: "assets/projects/ayna/dialog-bubbles.jpg", project: "ayna", caption: "Dialog bubbles", wide: true },
    { src: "assets/projects/argent-xr/editor.webp", project: "argent-xr", caption: "ArgentXR editor", wide: true }
  ],

  // Your CV — shown on the CV screen. The PDF lives in /assets; `file` powers the
  // "Download PDF" buttons (set `file: null` to hide them).
  // Any section can be removed or left as an empty list.
  cv: {
    file: "assets/CV_AndreaZamudio2026.pdf",
    updated: "2026",                    // optional, shown next to the download button
    summary: "Videogame developer specializing in UI/UX and object-oriented programming in C#. With a foundation in both art and interactive programming, I bridge the gap between aesthetics and functionality.",

    experience: [                       // current role first, then newest first
      {
        role: "UI/UX Artist & Programmer",
        company: "Grayscale Interactive",
        location: "Querétaro, Mexico",
        start: "2023", end: "Present",
        points: [
          "Developed UI/UX designs and programming across high-profile Unity and Unreal Engine projects for major clients, including Ford, NUPEC and Tec de Monterrey."
        ]
      },
      {
        role: "Associate Game Engineer",
        company: "Designmatic",
        location: "Remote / Germany",
        start: "2024", end: "2025",
        points: [
          "Developed core gameplay mechanics and UI systems using C# and Unity.",
          "Contributed to the PlayStation pitch for “Ayna: Shattered Truth” at GDC."
        ]
      },
      {
        role: "Digital Marketing Intern",
        company: "Lab Mkt Digital, Tecnológico de Monterrey",
        location: "Querétaro, Mexico",
        start: "2023", end: "",
        points: [
          "Part of the Digital Marketing Lab team, creating social media content, graphics and videos for Tec de Monterrey campus Querétaro and Prepa Tec campus Querétaro."
        ]
      },
      {
        role: "STEAM Arts Teacher",
        company: "UNESCO Center for Peace",
        location: "Frederick, MD, USA",
        start: "2021", end: "2023",
        points: [
          "Led international Art & Technology programs regulated by the UNESCO Center for Peace."
        ]
      },
      {
        role: "UI/UX Artist",
        company: "Tec Audio Coders",
        location: "Puebla, Mexico",
        start: "2020", end: "2021",
        points: [
          "Developed user interfaces and interactive workflows for custom VST audio plugins."
        ]
      }
    ],

    education: [
      { title: "B.A. in Digital Art, Game Development concentration", place: "Tecnológico de Monterrey", start: "2020", end: "2024" },
      { title: "Specialization in C++ for Game Programming", place: "U-Echo Training Center", start: "2024" },
      { title: "Engineering Summer Academy at Penn — Computer Graphics", place: "University of Pennsylvania", start: "2017" }
    ],

    // What you do, shown as chips under the summary.
    focus: ["UI/UX design", "Motion design", "Illustration", "Gameplay programming"],

    // Highlight tiles at the top of the CV.
    highlights: [
      { value: "2×", label: "Latam Video Games Federation scholar — GDC 2024 & Gamescom 2026" },
      { value: "GDC", label: "PlayStation pitch for “Ayna: Shattered Truth”" }
    ],

    // Shown under the experience timeline. `items` makes a sub-list.
    // `goto` turns the card into a link to another screen (e.g. "motion").
    awards: [
      { title: "Full Scholarship — Gamescom", by: "Gamescom 2026", year: "2026", detail: "Awarded by the Latam Video Games Federation." },
      { title: "3rd Place, State Level", by: "“Transparencia en Corto” Short Film Contest", year: "2026", goto: "motion", cta: "Watch the film" },
      { title: "Trip to Barcelona — Winner", by: "American Eagle motion graphics contest", year: "2026",
        detail: "Won with an original motion graphics video.", goto: "motion", cta: "Watch the video" },
      { title: "GDC All-Access Scholarship", by: "Game Developers Conference", year: "2024", detail: "Awarded by the Latam Video Games Federation." },
      { title: "Academic Excellence Awards", by: "Tecnológico de Monterrey (EAAD)", year: "2021 — 2023",
        items: ["Best AR Game Project · 2023", "Best VR Game Project · 2023", "Best 3D Game Project · 2022", "Best Drawing Project · 2021"] },
      { title: "1st Place, State Level", by: "“Transparencia en Corto” Short Film Contest", year: "2023", goto: "motion", cta: "Watch the film" },
      { title: "Selected Artist", by: "“Creajolote” Urban Art Intervention", year: "2023", detail: "Commissioned by the Secretary of Youth (SEJUVE).", goto: "illustration", cta: "See the art" },
      { title: "3rd Place", by: "1st Querétaro Digital Hackathon", year: "2022", detail: "Built “Trayecto Q”, a mobile app prototype and fully interactive demo." },
      { title: "Finalist", by: "“Distrito Sejuve” Urban Art & Design Contest", year: "2022" },
      { title: "National Illustration Award, 3rd Place", by: "“Creando Sabor Con Mis Monstruos”", year: "2019", detail: "Curated by Guillermo del Toro & La Costeña.", goto: "illustration", cta: "See the art" }
    ],

    // Short lists shown as chips in the side column.
    extras: [
      { heading: "Code", items: ["C#", "C++", "HTML", "CSS", "JavaScript"] },
      { heading: "Engines", items: ["Unity", "Unreal Engine"] },
      { heading: "Design & motion", items: ["Figma", "Adobe After Effects", "Cavalry", "Adobe Illustrator", "Affinity"] },
      { heading: "Illustration & 3D", items: ["Procreate", "Autodesk Maya"] },
      { heading: "Languages", items: ["Spanish — native", "English — full professional", "French — B2"] }
    ]
  },

  /* ---------- Motion screen ----------
   * Videos go in /assets/motion. `video` can be:
   *   - a file:     "assets/motion/american-eagle.mp4"   (plays right on the page)
   *   - YouTube:    "https://youtu.be/VIDEO_ID"           (plays inside the page)
   *   - Vimeo:      "https://vimeo.com/123456789"         (plays inside the page)
   *   - null        → an animated placeholder is shown
   * `poster` (optional) is an image shown before the video plays.
   */
  motion: {
    reel: [
      {
        title: "Falsa Alarma",
        context: "Short film · “Transparencia en Corto”", year: "2026",
        award: "3rd place, state level",
        description: "Short film entry for the state-level “Transparencia en Corto” contest.",
        video: "https://youtu.be/KNDuetcXZGM", poster: null, hue: 330, tools: ["Illustrator", "After Effects", "Premiere Pro"]
      },
      /*{
        title: "American Eagle — winning video",
        context: "Motion graphics", year: "2026",
        award: "Won a trip to Barcelona",
        description: "Original motion graphics piece that won American Eagle's contest.", // TODO: a line about the idea
        video: null, poster: null, hue: 215, tools: []  // TODO: add the video + tools used (e.g. After Effects, Cavalry)
      },*/
      {
        title: "Verdad y Justicia",
        context: "Short film · “Transparencia en Corto”", year: "2023",
        award: "1st place, state level",
        description: "Short film entry for the state-level “Transparencia en Corto” contest.",
        video: "https://youtu.be/V969WK2lWOY", poster: null, hue: 30, tools: ["Illustrator", "After Effects", "Premiere Pro"]
      },
      {
        title: "Brewmaster’s Remedies",
        context: "VR game demo", year: "2023",
        award: "Best VR Game Project 2023",
        description: "A VR game demo made in Unreal Engine. Designer of full UI and art direction. Also worked on 3D assets and textures.",
        video: "https://youtu.be/7uF-FRlBHMY", poster: null, hue: 100, tools: ["Unreal Engine", "Substance Designer", "Illustrator"]
      },
      {
        title: "UI motion studies",              // PLACEHOLDER — swap for real UI animation clips
        context: "Interface animation", year: "2025",
        description: "Menu transitions, button feedback and HUD reveals, animated in After Effects and Cavalry, then rebuilt in-engine.",
        video: null, poster: null, hue: 160, tools: ["After Effects", "Cavalry", "Unity"]
      }
    ]
  },

  /* ---------- Illustration screen ----------
   * Images go in /assets/illustration. Without an `image`, a generated placeholder is drawn.
   * `ratio` is width / height of the placeholder (e.g. 0.8 = portrait, 1.5 = landscape).
   */
  illustration: {
    // Shown as buttons under the intro — where people can see more of your art.
    links: [
      { label: "ArtStation", url: "https://www.artstation.com/boeroart" },
      { label: "Instagram · @boeroart", url: "https://www.instagram.com/boeroart" }
    ],
    intro: "Drawing is where my UI work starts — shape language, colour and character carry into every icon and screen.", // PLACEHOLDER
    pieces: [
      // From Instagram (@boeroart). TODO: check titles, mediums and notes.
      { title: "Let them eat cake", medium: "Digital illustration", year: "2023",
        note: "Illustration selected for MUMA’s Expo Postre.", image: "assets/illustration/let-them-eat-cake.webp", ratio: 0.8, hue: 330 },
      { title: "Just Like Heaven", medium: "Sketchbook", year: "2026",
        note: "", image: "assets/illustration/just-like-heaven.webp", ratio: 1, hue: 340 },   // TODO: swap for the GIF (still frame for now)
      { title: "Gruss vom Krampus", medium: "Digital illustration", year: "2023",
        note: "", image: "assets/illustration/gruss-vom-krampus.webp", ratio: 1, hue: 0 },
      { title: "LAD", medium: "Digital illustration", year: "2024",
        note: "A badge for my B.A. in Digital Art (LAD), made in the countdown to graduation.", image: "assets/illustration/lad-badge.webp", ratio: 1, hue: 300 },
      { title: "Lantli & Oni", medium: "Character design", year: "2020",
        note: "Mascot characters for Pilot Pen México.", image: "assets/illustration/lantli-and-oni.webp", ratio: 1, hue: 45 },
      { title: "Digital Art", medium: "Digital illustration", year: "2021",
        note: "A love letter to my degree.", image: "assets/illustration/lad-digital-art.webp", ratio: 1.13, hue: 200 },
      // Awarded pieces
      { title: "Creando Sabor Con Mis Monstruos", medium: "Coloured pencil", year: "2019",
        award: "National award · 3rd place", note: "Guillermo del Toro and his creatures. Contest curated by Guillermo del Toro & La Costeña.", image: "assets/illustration/creando-sabor.webp", ratio: 1, hue: 15 },
      { title: "Creajolote", medium: "Urban art intervention", year: "2023",
        award: "Selected artist", image: "assets/illustration/creajolote-axolotls.webp", ratio: 0.707, hue: 190,
        images: ["assets/illustration/creajolote-moth.webp", "assets/illustration/creajolote-intervention.webp"],
        note: "“Bajo la aguja y las escamas”: an axolotl sculpture painted with talavera-inspired tattoo designs, gold piercing-style jewellery and papier-mâché wings, about how young people express their identity through tattoos and body art. Commissioned by the Secretary of Youth (SEJUVE)." },
      { title: "Distrito Sejuve", medium: "Urban art & design", year: "2022",
        award: "Finalist", note: "", image: "assets/illustration/distrito-sejuve.webp", ratio: 1, hue: 280 }
    ]
  },

  // Sections. `short` is the line under each button on the home page; `preview` (optional) is the image
  // that follows the cursor when hovering that button.
  menu: [
    { id: "projects", label: "Projects", short: "Games, apps & client work", preview: "assets/projects/ayna/vendor.jpg", kicker: "Level select", body: "Games, client UI and apps — each with its own gallery of photos and video." },
    { id: "ui",       label: "UI", short: "Interfaces, HUDs & menus", preview: "assets/projects/clinicvet/devices.webp",       kicker: "HUD & menus", body: "Every project where I designed or built the interface." },
    { id: "motion",   label: "Motion", short: "Motion graphics & short film", preview: "https://i.ytimg.com/vi/KNDuetcXZGM/hqdefault.jpg",   kicker: "Cutscenes", body: "Award-winning motion graphics and short films." },
    { id: "illustration", label: "Illustration", short: "Drawings & urban art", kicker: "Concept art", body: "Award-winning illustration, urban art and sketchbook pieces." },
    { id: "skills",   label: "Skills", short: "Tools & what I do",   kicker: "Skill tree", body: "Art and engineering abilities, levelled up over the years." },
    { id: "cv",       label: "CV", short: "Experience, studies & awards",       kicker: "Quest log", body: "Where I've worked, what I studied, and a PDF copy to keep." },
    { id: "contact",  label: "Contact", short: "Let’s work together",  kicker: "Multiplayer", body: "Looking for a UI artist who can also ship the code? Let's talk." }
  ],

  // Filter tabs on the Projects screen. `id` matches a project's `category` (or one of its `tags`).
  // The UI screen shows every highlight card whose section (or the card itself) has tags: ["ui"].
  categories: [
    { id: "all",  label: "All" },
    { id: "ui",   label: "UI/UX" },
    { id: "game", label: "Games" },
    { id: "app",  label: "Apps" }
  ],

  /* ---------- Projects ----------
   * Each project gets its own page inside the site.
   *   cover:  image for the card (optional — falls back to the first image in `media`,
   *           then to a generated cover in the project's `hue`)
   *   media:  photos and videos shown in the project's gallery, in order. `src` can be
   *           an image ("assets/projects/ayna/01.jpg"), a video file (".mp4"),
   *           a YouTube or Vimeo link (plays inside the page), or null for a placeholder.
   *           `kind: "video"` only changes how an empty placeholder looks.
 *           `portrait: true` on a media item shows it in a tall, phone-shaped frame.
 *   tags:   extra categories, e.g. tags: ["ui"] also lists a game under the UI/UX filter.
 *           On a section (or a single card) tags: ["ui"] puts those cards on the UI screen.
   * Put each project's files in its own folder: assets/projects/<id>/
   */
  projects: [
    {
      id: "ayna",
      title: "Ayna: Shattered Truth",
      year: "2024 — 2025",
      category: "game",
      tags: ["ui"],
      hue: 265,
      cover: "assets/projects/ayna/vendor.jpg",
      studio: "Designmatic",
      role: "Associate Game Engineer",
      tools: ["Unity", "C#", "UI Toolkit"],
      award: "Pitched to PlayStation at GDC",
      ribbon: "▶ Playable demo on Steam",               // optional label on the project card
      ctaTitle: "Play the demo on Steam",
      ctaText: "Ayna: Shattered Truth has a playable demo on Steam. Try the systems above in the game.",
      summary: "UI, gameplay and enemy systems for a Unity game with a playable demo on Steam, pitched to PlayStation at GDC.",
      description: [
        "As Associate Game Engineer in Designmatic’s Game Development division, I worked remotely on “Ayna: Shattered Truth” from July 2024 to December 2025, building systems across the game’s UI, gameplay and enemies in C# and Unity. I also contributed to the game’s PlayStation pitch at GDC."
      ],
      // Optional: headed lists shown under the description
      sections: [
        {
          title: "User interface", tags: ["ui"],
          points: [
            { title: "Vendor system", text: "Built the vendor system end to end, from data management to UI: player and vendor inventories, and purchasable items that unlock gameplay.", media: "assets/projects/ayna/vendor.mp4", poster: "assets/projects/ayna/vendor.jpg" },
            { title: "NPC upgrader", text: "Created an upgrader system for specific NPCs that lets players buy and unlock upgrades, handling the full process.", media: "assets/projects/ayna/upgrader.mp4", poster: "assets/projects/ayna/upgrader.jpg" },
            { title: "Favourites", text: "Added a favourites system so players can keep track of vendor and upgrader items they want to buy." },
            { title: "Player inventory", text: "Developed the runtime player inventory with Unity’s UI Toolkit and data bindings." },
            { title: "Dialog bubbles", text: "Built a dialog bubble system that plays dialog sequences in-game.", media: "assets/projects/ayna/dialog-bubbles.mp4", poster: "assets/projects/ayna/dialog-bubbles.jpg" },
            { title: "Pick-up notifications", text: "Implemented item pick-up notifications on the HUD using a list view." },
            { title: "Journal UI", text: "Created a tab-based journal UI that shows the player’s abilities and upgrades." },
            { title: "Settings menu", text: "Extended the settings menu: VSync, FPS limiter, language, monitor resolution and display mode.", media: "assets/projects/ayna/settings-menu.mp4", poster: "assets/projects/ayna/settings-menu.jpg" },
            { title: "Narrative inspection", text: "Built a narrative inspection setup that shows an icon and story text when players interact with objects." }
          ]
        },
        {
          title: "Gameplay",
          points: [
            { title: "Chest opening", text: "Chest opening: the player walks automatically into position while animations, VFX and SFX play in sync.", media: "assets/projects/ayna/chests.mp4", poster: "assets/projects/ayna/chests.jpg" },
            { title: "Door unlocking", text: "Door unlocking: Once the player picks up the required items and on click, the door animates and plays SFX.", media: "assets/projects/ayna/door.mp4", poster: "assets/projects/ayna/door.jpg" },
            { title: "Map system", text: "A map system that unlocks map areas in the UI, plus map posts where players pick up maps." },
            { title: "Rotating platforms", text: "A rotating platform system with smooth transitions between fixed steps, including looping and reverse looping.", media: "assets/projects/ayna/rotating-platforms.mp4", poster: "assets/projects/ayna/rotating-platforms.jpg" },
            { title: "Collapsible platforms", text: "Collapsible platforms with animations, VFX and SFX synced to gameplay logic.", media: "assets/projects/ayna/collapsible-platforms.mp4", poster: "assets/projects/ayna/collapsible-platforms.jpg" },
            { title: "Checkpoints", text: "Checkpoint interactions, including player animations for left and right triggers.", media: "assets/projects/ayna/checkpoint.mp4", poster: "assets/projects/ayna/checkpoint.jpg" },
            { title: "Automatic pick-ups", text: "A new item pick-up system: items the player collects automatically.", media: "assets/projects/ayna/automatic-pickup-and-dialog.mp4", poster: "assets/projects/ayna/automatic-pickup-and-dialog.jpg" },
            { title: "Manual pick-ups", text: "A new item pick-up system: items the player picks up manually.", media: "assets/projects/ayna/manual-pickup.mp4", poster: "assets/projects/ayna/manual-pickup.jpg" },
            { title: "Moving platforms", text: "Moving platforms that react to player projectiles, with game-feel touches like shader glow.", media: "assets/projects/ayna/platforms.mp4", poster: "assets/projects/ayna/platforms.jpg" },
            { title: "Traps & hazards", text: "Breakable ground and falling block traps.", media: "assets/projects/ayna/falling-traps.mp4", poster: "assets/projects/ayna/falling-traps.jpg" },
            { title: "Bouncing Mushrooms", text: "Bouncing mushrooms for dynamic level design.", media: "assets/projects/ayna/mushrooms.mp4", poster: "assets/projects/ayna/mushrooms.jpg" }
          ]
        },
        {
          title: "Enemy behaviour",
          points: [
            { title: "Mosquito - Flying Enemy", text: "Built a flying enemies framework from scratch that can be used to create the behaviour and gameplay of all flying enemies in the game, with the mosquito as the primary example.", media: "assets/projects/ayna/mosquito.mp4", poster: "assets/projects/ayna/mosquito.jpg" },
            { title: "Ground enemies", text: "Developed several ground enemies from the game design requirements, including behaviour, VFX and SFX.", media: "assets/projects/ayna/ground-enemies.mp4", poster: "assets/projects/ayna/ground-enemies.jpg" },
            { title: "Smoke enemy", text: "Programmed a smoke enemy that triggers a fullscreen shader effect to block the player’s vision.", media: "assets/projects/ayna/smoke-enemy.mp4", poster: "assets/projects/ayna/smoke-enemy.jpg" },
            { title: "Snake trap", text: "Created a ground snake trap system that tracks player movement, shoots projectiles and switches tracking sides." }
          ]
        }
      ],
      // Optional: buttons at the end of the page
      links: [
        { label: "Play the demo on Steam", play: true, url: "https://store.steampowered.com/app/1742390/Ayna_Shattered_Truth/" }
      ],
      media: [
        { src: "https://www.youtube.com/watch?v=nv50lLZvoJU", caption: "Official trailer" },
        { src: "assets/projects/ayna/door-system.mp4", poster: "assets/projects/ayna/door-system.jpg", caption: "Door system · full sequence" },
        { src: "assets/projects/ayna/platforms-2.mp4", poster: "assets/projects/ayna/platforms-2.jpg", caption: "Platforms" },
        { src: "assets/projects/ayna/ground-enemies-2.mp4", poster: "assets/projects/ayna/ground-enemies-2.jpg", caption: "Ground enemies" }
      ]
    },
    /* ----- Grayscale Interactive: one project per piece of work ----- */
    {
      id: "clinicvet",
      title: "ClinicVET",
      year: null,                                           // TODO: year(s) you worked on it
      category: "ui",
      hue: 200,
      cover: "assets/projects/clinicvet/hero.webp",
      studio: "Grayscale Interactive · for NUPEC",
      role: "UI/UX Artist & Programmer",
      tools: ["Unreal Engine", "Blueprints"],
      summary: "A 3D veterinary app for NUPEC. The app was built by the Grayscale Interactive team, and I was responsible for all of its UI.",
      description: [
        "ClinicVET gives veterinarians interactive 3D anatomy, side-by-side condition comparisons and annotations to help them explain a dog’s health to its owner. It works as a visual communication aid, not a diagnostic tool, and runs on desktop, tablet and mobile."
      ],
      sections: [
        {
          title: "My part", featured: true, tags: ["ui"],
          points: [
            { title: "Complete UI design", text: "Designed the complete user interface.", media: "assets/projects/clinicvet/devices.webp" },
            { title: "UI programming in Unreal", text: "Programmed all of the UI in Unreal Engine, including custom Blueprints." }
          ]
        },
        {
          title: "ClinicVET UI features", tags: ["ui"],
          points: [
            { title: "Male & female anatomy", text: "Starts from a dog model that can switch between male and female anatomy.", media: "assets/projects/clinicvet/hero.webp" },
            { title: "Exterior to organs", text: "Moves from the exterior to the skeleton and organ systems, with rotate, zoom and pan." },
            { title: "Condition comparisons", text: "Shows common clinical conditions with the affected organ next to a healthy reference." },
            { title: "Draw & save notes", text: "Lets the vet write or draw directly over the model and save the annotated images for later consultations." }
          ]
        },
        {
          // screens: cards take each screenshot's shape (tall phone screens, wide landscape ones), same-height rows
          title: "Screens", tags: ["ui"], screens: true,   // TODO: the card texts are placeholders, rewrite them
          points: [
            { title: "Home", text: "The vet’s home screen: their profile, plan and registered tutors, with a button to register a new tutor.", media: "assets/projects/clinicvet/home.jpeg" },
            { title: "Register a patient", text: "A short form to register a new patient: name, size and age.", media: "assets/projects/clinicvet/registerPatient.jpeg" },
            { title: "Patient card", text: "The patient card: photo, name, age and size, with the patient’s 3D model below.", media: "assets/projects/clinicvet/card.jpeg" },
            { title: "Saved annotation", text: "After drawing on the model, the vet can add a written note to the annotation.", media: "assets/projects/clinicvet/anotateEntry.jpeg" },
            { title: "Plans", text: "The current subscription plan and everything it includes.", media: "assets/projects/clinicvet/plans.jpeg" },
            { title: "Edit profile", text: "Edit the vet’s profile: name, phone, country, state and clinic details.", media: "assets/projects/clinicvet/editProfile.jpeg" },
            { title: "Settings", text: "Settings: language (Spanish / English), profile, subscription, privacy notice and log out.", media: "assets/projects/clinicvet/settings.jpeg" },
            { title: "Log out", text: "A confirmation before logging out.", media: "assets/projects/clinicvet/logout.jpeg" },
            { title: "3D view", text: "The 3D view: switch between male and female, show or hide the skin, and explore the dog’s anatomy.", media: "assets/projects/clinicvet/3dview.jpeg" },
            { title: "Annotations", text: "Annotation mode: draw over an organ with different colours, then save or share the image.", media: "assets/projects/clinicvet/anotate.jpeg" }
          ]
        }
      ],
      media: [
        { src: "assets/projects/clinicvet/preview.mp4", poster: "assets/projects/clinicvet/preview-poster.webp", caption: "App preview" }
      ]
    },
    {
      id: "argent-xr",
      title: "ArgentXR",
      year: "2026",
      category: "ui",
      hue: 225,
      cover: "assets/projects/argent-xr/editor.webp",
      studio: "Grayscale Interactive",
      role: "UI/UX Artist",
      tools: [],                                            // TODO: e.g. ["Figma", "After Effects", "Illustrator"]
      summary: "Grayscale’s browser-based platform for turning 3D and CAD models into interactive web and AR experiences. I designed its icons, motion graphics, splash screens and UI proposals.",
      description: [
        "ArgentXR turns 3D and CAD models into interactive web and augmented reality experiences, with no coding and no app downloads. Free public beta, November 2026."
      ],
      sections: [
        {
          title: "My part", tags: ["ui"],
          // Interactive icon board. Files are `${path}${prefix}${name}.svg` — remove a name to hide that icon.
          icons: {
            title: "ArgentXR icon set",
            path: "assets/projects/argent-xr/icons/", prefix: "argent_icon_",
            files: ["actions", "actionsSquare", "actionsSquare2", "animation1", "animation2", "cam", "camSpeed", "camSquare",
              "component", "cube", "cursor", "cut", "cutSquare", "directionalLight", "enterFullscreen", "exitFullscreen",
              "explode", "explodeSquare", "farClipping", "focus", "fov", "fovSquare", "gizmo", "library1", "library2",
              "library3", "library4", "lightning", "materials", "nearClipping", "newPalette", "newPalette2",
              "rotate", "running", "seated", "send", "standing", "starterLibrary1", "starterLibrary2",
              "starterLibrary3", "sync", "timing", "translate", "uiActor", "viewfinder", "wireframe", "xray"]
          },
          points: [
            "Icon design",
            { title: "Motion animations", text: "Motion graphics I animated for the ArgentXR page.", media: "assets/projects/argent-xr/join.gif" },
            "Splash screens",
            "UI proposals"
            // TODO: add media, e.g. { title: "Splash screens", text: "…", media: "assets/projects/argent-xr/splash.png" }
          ]
        }
      ],
      media: [
        { src: "assets/projects/argent-xr/intro.mp4", caption: "Motion graphics for the ArgentXR page" },
        { src: "assets/projects/argent-xr/editor.webp", caption: "ArgentXR editor" }
      ]
    },
    {
      id: "the-explant",
      title: "The Explant",
      year: "2026",
      category: "ui",
      hue: 160,
      cover: "assets/projects/the-explant/cover.webp",
      studio: "Grayscale Interactive",
      role: "UI & motion graphics",                        // TODO: confirm
      tools: ["After Effects", "Unreal Engine"],
      summary: "Motion graphics animations for The Explant, played in the app as sprite sheets you scrub with a slider.",   // TODO: confirm / rewrite
      description: [
        // TODO: confirm / rewrite — drafted from the app recording
        "The Explant is an educational app for Plant Innovation Lab about plant tissue culture: the parts of a plant, phytohormones, and processes like callogenesis, organogenesis and embryogenesis, explained with step-by-step animations, AR, theory and a quiz."
      ],
      sections: [
        {
          title: "Screens", tags: ["ui"], screens: true,     // screens: cards take each screenshot's shape, same-height rows
          points: [
            { title: "Parts of the plant", text: "Tap the (i) on each part of the plant to learn what it does.", media: "assets/projects/the-explant/screen-parts.webp" },
            { title: "Phytohormones", text: "Labels for the key plant hormones that regulate growth and development.", media: "assets/projects/the-explant/screen-hormones.webp" },
            { title: "Process menu", text: "Pick a plant tissue culture process to explore.", media: "assets/projects/the-explant/screen-menu.webp" },
            { title: "Process timeline", text: "Slide, or use Previous and Next, to step through a process. Each step plays its animation and shows how long it takes.", media: "assets/projects/the-explant/screen-timeline.webp" },
            { title: "Theory", text: "Each process has its documentation, a diagram and external info.", media: "assets/projects/the-explant/screen-theory.webp" },
            { title: "Quiz", text: "A quiz with a progress bar; answers turn green or red when you submit.", media: "assets/projects/the-explant/screen-quiz.webp" }
          ]
        },
        {
          title: "Animations",
          intro: "I animated these in After Effects and exported them as sprite sheets. In the Unreal app each process plays step by step: move the slider, or use Previous and Next, and that step’s animation plays.",
          // Sprite sheet players, rebuilt from the Unreal flipbooks: one continuous sequence per process, in sprite-sheet order.
          // Sheets are `${path}-1.webp`, `${path}-2.webp`… — 4×4 grids of frames, read left to right, top to bottom.
          // `frames` is the real frame count; `steps` are the frames where each Unreal step (flipbook) starts.
          // `labels` are the captions shown for each step (from the Unreal timeline widget).
          // `fps` sets the speed (default 24). Remove a line to hide that animation.
          flipbooks: [
            { title: "Cells in suspension", path: "assets/projects/the-explant/suspension", sheets: 2, frames: 32, steps: [0, 16, 21] },
            { title: "Bioreactor", path: "assets/projects/the-explant/bioreactor", sheets: 8, frames: 128, steps: [0, 32, 64, 96] },
            { title: "Seeds in vitro", path: "assets/projects/the-explant/in-vitro", sheets: 5, frames: 69, steps: [0, 3, 16, 32, 49] },
            { title: "Callogenesis", path: "assets/projects/the-explant/callogenesis", sheets: 3, frames: 46, steps: [0, 30, 39],
              labels: ["Plant cleaning and explant obtention: 2 – 5 h*", "Callus induction: 15 – 30 days", "Callus regeneration: 15 – 45 days"] },
            { title: "Direct organogenesis", path: "assets/projects/the-explant/organo-direct", sheets: 8, frames: 123, steps: [0, 21, 32, 67],
              labels: ["Plant cleaning and axillary bud isolation: 2 – 5 h*, formation of axillary buds with axillary meristems", "Formation of shoots in the axillary area", "Root induction", "Greenhouse or open field conditions: 15 to 30 days for adaptation"] },
            { title: "Indirect organogenesis", path: "assets/projects/the-explant/organo-indirect", sheets: 1, frames: 16, steps: [0],
              labels: ["Indirect organogenesis: after callus induction (callogenesis), the callus can regenerate to produce new shoots. * It depends on the plant’s species, age, tissue source, morphology and complexity."] },
            { title: "Direct embryogenesis", path: "assets/projects/the-explant/embryo-direct", sheets: 4, frames: 57, steps: [0, 3, 10, 26, 48],
              labels: ["Plant cleaning and explant obtention: 2 – 5 h*", "Induction of pre-globular structures, 1 – 3 months", "Maturation of globular structures, 1 – 3 months", "Maturation to heart structures, 3 – 6 months", "Somatic seed germination, 3 – 7 months"] },
            { title: "Indirect embryogenesis", path: "assets/projects/the-explant/embryo-indirect", sheets: 5, frames: 68, steps: [0, 32, 58] },
            { title: "Medal", path: "assets/projects/the-explant/medal", sheets: 2, frames: 28, steps: [0, 16] }
          ],
          points: []
        }
      ],
      media: [
        { src: "assets/projects/the-explant/app-recording.mp4", poster: "assets/projects/the-explant/app-recording.jpg", caption: "App walkthrough", portrait: true }
      ]
    },
    {
      id: "unreal-ui",
      title: "Custom UI for Unreal Engine",
      year: null,                                           // TODO
      category: "ui",
      hue: 250,
      cover: null,                                          // TODO
      studio: "Grayscale Interactive",
      role: "UI Programmer",                                // TODO: confirm
      tools: ["Unreal Engine", "Blueprints"],
      summary: "Custom UI widgets and Blueprint tools for the studio’s Unreal Engine projects.",   // TODO: confirm / rewrite
      description: [
        // TODO: e.g. "Reusable UI widgets and Blueprint tools I built for the studio's Unreal projects."
      ],
      sections: [
        // { title: "Widgets", points: [ { title: "…", text: "…", media: "assets/projects/unreal-ui/….mp4" } ] }
      ],
      media: [
        // TODO: e.g. { src: "assets/projects/unreal-ui/01.mp4", caption: "…" }
      ]
    },
    // TODO: Ford — "some UI assets" for EV Cooling System Diagnostics (image was assets/projects/grayscale/ford.webp)
    {
      id: "brewmasters-remedies",
      title: "Brewmaster’s Remedies",
      year: "2023",
      category: "game",
      tags: ["ui"],
      hue: 100,
      cover: "https://i.ytimg.com/vi/7uF-FRlBHMY/hqdefault.jpg",
      studio: "Tecnológico de Monterrey · school project",
      role: "UI design & art direction",
      tools: ["Unreal Engine", "Substance Designer", "Illustrator"],
      award: "Best VR Game Project 2023",
      summary: "A VR game demo made in Unreal Engine. I designed the full UI and the art direction, and also worked on 3D assets and textures.",
      description: [
        "Brewmaster’s Remedies is a VR game demo made in Unreal Engine as a school project at Tecnológico de Monterrey. It won Best VR Game Project at the 2023 EAAD Academic Excellence Awards."
        // TODO: one or two lines about the game (what the player does)
      ],
      sections: [
        {
          title: "My work",
          points: [
            { text: "Full UI design", tags: ["ui"] },
            "Art direction",
            "3D assets",
            "Textures"
          ]
        }
      ],
      media: [
        { src: "https://youtu.be/7uF-FRlBHMY", caption: "Gameplay video" }
      ]
    },
    {
      id: "trayecto-q",
      title: "Trayecto Q",
      year: "2022",
      category: "app",
      tags: ["ui"],
      hue: 190,
      cover: null,
      studio: "1st Querétaro Digital Hackathon",
      role: "UI/UX & development",                          // TODO: confirm your role
      tools: [],                                            // TODO
      award: "3rd place — Querétaro Digital Hackathon",
      summary: "Mobile app prototype and fully interactive demo, built during a hackathon.",
      description: [
        "Development of “Trayecto Q”, a mobile app prototype and fully interactive demo.",
        "Won 3rd place at the 1st Querétaro Digital Hackathon (2022)."
      ],
      media: [
        { src: null, caption: "App screens" },               // TODO
        { src: null, caption: "Interactive demo", kind: "video" } // TODO
      ]
    },
    {
      id: "tec-xr",
      title: "AR, VR & 3D game projects",
      year: "2022 — 2023",
      category: "game",
      hue: 320,
      cover: null,
      studio: "Tecnológico de Monterrey",
      role: "",                                             // TODO
      tools: ["Unity", "Autodesk Maya"],                    // TODO: confirm
      award: "Best AR, VR & 3D Game Project awards",
      summary: "Academic game projects that won Best AR and Best VR Game Project (2023) and Best 3D Game Project (2022).",
      description: [
        "Tecnológico de Monterrey (EAAD) Academic Excellence Awards: Best AR Game Project (2023), Best VR Game Project (2023) and Best 3D Game Project (2022).",
        "The Best VR Game Project winner was Brewmaster’s Remedies, which has its own page."
        // TODO: what each game was about
      ],
      media: [
        { src: null, caption: "AR game", kind: "video" },    // TODO
        { src: "https://youtu.be/7uF-FRlBHMY", caption: "VR game: Brewmaster’s Remedies" },
        { src: null, caption: "3D game" }                    // TODO
      ]
    }
  ],

  // Toolbox on the Skills screen: every tool listed in your projects and motion pieces is added
  // automatically; put any extra tools here.
  toolbox: ["Figma", "Procreate", "Autodesk Maya"],

  // Skills screen: one card per group. `note` is the proof shown under each skill. (`level` is no longer shown.)
  skills: [
    {
      group: "UI & UX",
      items: [
        { name: "Game UI design", level: 90, note: "HUDs, menus and flows for Unity and Unreal projects — clients include Ford, NUPEC and Tec de Monterrey." },
        { name: "UX & interaction", level: 85, note: "Interactive workflows, from custom VST audio plugins to game menus." },
        { name: "Figma prototyping", level: 85, note: "Clickable flows and component libraries before anything hits the engine." }
      ]
    },
    {
      group: "Motion",
      items: [
        { name: "Motion graphics", level: 88, note: "Won American Eagle's motion graphics contest — prize: a trip to Barcelona." },
        { name: "UI animation", level: 85, note: "Transitions and feedback in After Effects and Cavalry, rebuilt in-engine." },
        { name: "Short film", level: 75, note: "“Transparencia en Corto”: 1st place in 2023, 3rd place in 2026 (state level)." }
      ]
    },
    {
      group: "Illustration & 3D",
      items: [
        { name: "Digital illustration", level: 88, note: "Procreate and Illustrator. National Illustration Award, 3rd place." },
        { name: "Urban art", level: 75, note: "Selected artist for “Creajolote”; finalist in “Distrito Sejuve”." },
        { name: "3D modelling", level: 65, note: "Autodesk Maya. Best 3D Game Project, Tec de Monterrey 2022." }
      ]
    },
    {
      group: "Programming",
      items: [
        { name: "C# / Unity", level: 85, note: "Object-oriented gameplay mechanics and UI systems." },
        { name: "C++ / Unreal", level: 70, note: "Specialization in C++ for Game Programming (U-Echo, 2024)." },
        { name: "AR / VR", level: 70, note: "Best AR and Best VR Game Project, Tec de Monterrey 2023." },
        { name: "Web (HTML, CSS, JS)", level: 75, note: "Including this site, built by hand." }
      ]
    }
  ],

  contact: {
    lead: "Got a game, a website, or a project that needs an interface? Send a message.",
    email: "andrea.zpalafox@gmail.com",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/andreazpalafox" },
      { label: "ArtStation", url: "https://www.artstation.com/boeroart" },
      { label: "Instagram", url: "https://www.instagram.com/boeroart" }
    ]
  }
};
