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
    "B.A. Digital Art and Videogame Development", "Ayna — pitched to PlayStation at GDC",
    "Best VR Game, Best Illustration, Best AR Game, Best 3D Game @ Tec de Monterrey", "2 times winner of state short film contest",
    "National Illustration Award by Guillermo del Toro · 3rd place", "Unity · Unreal · C# · HTML · Adobe Creative Suite"
  ],

  // "Selected work" grid at the bottom of the home page. The first tile is big; `wide: true` makes a tile
  // two columns wide. `project` is the project id the tile opens; for work that isn't a project, use
  // `goto` (a screen id, e.g. "motion") and `from` (the small label). Videos play silently on a loop;
  // a YouTube link shows the video's thumbnail.
  // Layout: 4 columns. The big tile fills 4 cells, a `wide` tile 2, the rest 1 — keep the total a multiple
  // of 4 so the grid has no gaps (now: 1 big + 6 single + 1 wide = 12 cells, three full rows).
  homeGallery: [
    { src: "assets/projects/ayna/vendor.mp4", poster: "assets/projects/ayna/vendor.jpg", project: "ayna", caption: "Videogame UI programming" },
    { src: "assets/projects/ayna/platforms.mp4", poster: "assets/projects/ayna/platforms.jpg", project: "ayna", caption: "Videogame Gameplay programming" },
    { src: "assets/projects/clinicvet/organs.mp4", project: "clinicvet", caption: "Medical app UI design" },
    { src: "assets/projects/clinicvet/draw.mp4", project: "clinicvet", caption: "Medical app UI programming" },
    { src: "assets/projects/argent-xr/join.gif", project: "argent-xr", caption: "Motion animations" },
    { src: "assets/projects/unreal-ui/custom.mp4", project: "unreal-ui", caption: "Custom UI for Unreal Engine" },
    { src: "https://youtu.be/KNDuetcXZGM", goto: "motion", from: "Short film", caption: "Award Winning Short Film", wide: true },
    { src: "assets/illustration/creando-sabor.webp", goto: "illustration", from: "Contest by Guillermo del Toro", caption: "Award Winning Illustration" }
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
      { title: "National Illustration Award, 3rd Place", by: "“Creando Sabor Con Mis Monstruos”", year: "2019", detail: "National contest held in conjunction with Guillermo del Toro's 'At Home with My Monsters' exhibition in Guadalajara, Mexico.", cta: "See the art" }
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
    intro: "Motion graphics assets and animations created for multiple projects. Award-winning short films", // PLACEHOLDER
    reel: [
      {
        title: "Falsa Alarma",
        context: "Short film · “Transparencia en Corto”", year: "2026",
        award: "3rd place, state level",
        description: "Short film entry for the state-level “Transparencia en Corto” contest. Created assets in illustrator as original characters, animated in After Effects and Premiere Pro.", // TODO: a line about the idea
        video: "https://youtu.be/KNDuetcXZGM", poster: null, hue: 330, tools: ["Illustrator", "After Effects", "Premiere Pro"],
        // `storyboard`: page images shown as thumbnails when the piece is open (click one to view it big)
        storyboard: ["assets/motion/FalsaAlarma_GuionStoryboard_page-0005.jpg", "assets/motion/FalsaAlarma_GuionStoryboard_page-0006.jpg"]
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
        description: "Short film entry for the state-level “Transparencia en Corto” contest. Created assets in illustrator as original characters, animated in After Effects and Premiere Pro.",
        video: "https://youtu.be/V969WK2lWOY", poster: null, hue: 30, tools: ["Illustrator", "After Effects", "Premiere Pro"]
      },
     /* {
        title: "Brewmaster’s Remedies",
        context: "VR game demo", year: "2023",
        award: "Best VR Game Project 2023 @ Tec de Monterrey",
        description: "A VR game demo made in Unreal Engine. Designer of full UI and art direction. Also worked on 3D assets and textures.",
        video: "https://youtu.be/7uF-FRlBHMY", poster: null, hue: 100, tools: ["Unreal Engine", "Substance Designer", "Illustrator"]
      },
       {
        title: "UI motion studies",              // PLACEHOLDER — swap for real UI animation clips
        context: "Interface animation", year: "2025",
        description: "Menu transitions, button feedback and HUD reveals, animated in After Effects and Cavalry, then rebuilt in-engine.",
        video: null, poster: null, hue: 160, tools: ["After Effects", "Cavalry", "Unity"]
      } */
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
        note: "Illustration selected for MUMA’s Expo Postre.", image: "assets/illustration/let-them-eat-cake.webp", ratio: 0.8, hue: 330,
        sticker: "Personal fav ♥" },   // `sticker`: optional tilted label on the piece
      { title: "Just Like Heaven", medium: "Mixed media", year: "2026",
        note: "Mixed media, combining digital and traditional techniques.", image: "assets/illustration/just-like-heaven.webp", ratio: 1, hue: 340 },   // TODO: swap for the GIF (still frame for now)
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
        award: "National award · 3rd place", note: "Selected as a national winner in the contest held in conjunction with Guillermo del Toro's \"At Home with My Monsters\" exhibition in Guadalajara, Mexico.", image: "assets/illustration/creando-sabor.webp", ratio: 1, hue: 15 },
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
    { id: "projects", label: "Projects", short: "Games, apps & client work", preview: "assets/projects/ayna/cover.jpeg", kicker: "Level select", body: "Games, client UI and apps — each with its own gallery of photos and video." },
    { id: "ui",       label: "UI", short: "Interfaces, HUDs & menus", preview: "assets/projects/clinicvet/devices.webp",       kicker: "HUD & menus", body: "Every project where I designed or built the interface." },
    { id: "motion",   label: "Motion", short: "Motion graphics & short films", preview: "https://i.ytimg.com/vi/KNDuetcXZGM/hqdefault.jpg",   kicker: "Cutscenes", body: "Award-winning motion graphics and short films." },
    { id: "illustration", label: "Illustration", short: "Drawings & urban art", preview: "assets/illustration/lad-digital-art.webp", kicker: "Concept art", body: "Award-winning illustration, urban art and sketchbook pieces." },
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
 *   sub:    on a section, a short one-line description shown next to its title.
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
      cover: "assets/projects/ayna/cover.jpg",
      studio: "Designmatic",
      role: "Associate Game Engineer",
      tools: ["Unity", "C#", "UI Toolkit"],
      award: "Pitched to PlayStation at GDC",
      ribbon: "▶ Playable demo on Steam",               // optional label on the project card
      sticker: "Pitched to PlayStation!",               // optional tilted sticker on the project card's corner
      ctaTitle: "Play the demo on Steam",
      ctaText: "Ayna: Shattered Truth has a playable demo on Steam. Try the systems above in the game.",
      summary: "UI, gameplay and enemy systems for a Unity game with a playable demo on Steam, pitched to PlayStation at GDC.",
      description: [
        "As Associate Game Engineer in Designmatic’s Game Development division, I worked remotely on “Ayna: Shattered Truth” from July 2024 to December 2025, building systems across the game’s UI, gameplay and enemies in C# and Unity. I also contributed to the game’s PlayStation pitch at GDC."
      ],
      // Optional: headed lists shown under the description
      sections: [
        {
          title: "User interface", sub: "Programming of the game's UI, done with C#, UI Toolkit and data bindings. None of the UI elements were designed by me.", tags: ["ui"],
          points: [
            { title: "Vendor system", text: "Built the vendor system end to end, from data management to UI: player and vendor inventories, and purchasable items that unlock gameplay with working currency. Built using Unity’s UI Toolkit and Data Bindings.", media: "assets/projects/ayna/vendor.mp4", poster: "assets/projects/ayna/vendor.jpg" },
            { title: "NPC upgrader", text: "Created an upgrader system for specific NPCs that lets players buy and unlock upgrades, handling the full process. Built using Unity’s UI Toolkit and Data Bindings", media: "assets/projects/ayna/upgrader.mp4", poster: "assets/projects/ayna/upgrader.jpg" },
            { title: "Favourites", text: "Added a favourites system so players can keep track of vendor and upgrader items they want to buy.", media: "assets/projects/ayna/favourites.jpg", poster: "assets/projects/ayna/favourites.jpg" },
            { title: "Player inventory", text: "Developed the runtime player inventory with Unity’s UI Toolkit and data bindings.", media: "assets/projects/ayna/inventory.jpg", poster: "assets/projects/ayna/inventory.jpg" },
            { title: "Dialog bubbles", text: "Built a dialog bubble system that plays dialog sequences in-game with custom timing and transitions.", media: "assets/projects/ayna/dialog-bubbles.mp4", poster: "assets/projects/ayna/dialog-bubbles.jpg" },
            { title: "Pick-up notifications", text: "Implemented item pick-up notifications on the HUD using a list view.", media: "assets/projects/ayna/pickupNotification.jpg", poster: "assets/projects/ayna/pickupNotification.jpg" },
           // { title: "Journal UI", text: "Created a tab-based journal UI that shows the player’s abilities and upgrades." },
            { title: "Settings menu", text: "Extended the settings menu: VSync, FPS limiter, language, monitor resolution and display mode.", media: "assets/projects/ayna/settings-menu.mp4", poster: "assets/projects/ayna/settings-menu.jpg" },
           // { title: "Narrative inspection", text: "Built a narrative inspection setup that shows an icon and story text when players interact with objects." }
          ]
        },
        {
          title: "Gameplay", sub: "Interactive objects, platforms and level mechanics programmed using C# in Unity. This assets were created to work as customizable prefabs and are used throughout the game.", tags: ["game"],
          points: [
            { title: "Chest opening", text: "Chest opening: the player walks automatically into position while animations, VFX and SFX play in sync.", media: "assets/projects/ayna/chests.mp4", poster: "assets/projects/ayna/chests.jpg" },
            { title: "Door unlocking", text: "Door unlocking: Once the player picks up the required items and on click, the door animates and plays SFX.", media: "assets/projects/ayna/door.mp4", poster: "assets/projects/ayna/door.jpg" },
            // { title: "Map system", text: "A map system that unlocks map areas in the UI, plus map posts where players pick up maps." },
            { title: "Rotating platforms", text: "A rotating platform system with smooth transitions between fixed steps, including looping and reverse looping.", media: "assets/projects/ayna/rotating-platforms.mp4", poster: "assets/projects/ayna/rotating-platforms.jpg" },
            { title: "Flower Elevators", text: "Timed flower elevators with setup by phases, VFX and SFX synced to gameplay logic.", media: "assets/projects/ayna/collapsible-platforms.mp4", poster: "assets/projects/ayna/collapsible-platforms.jpg" },
            { title: "Collapsible platforms", text: "Collapsible platforms that react on contact, with animations, VFX and SFX synced to gameplay logic.", media: "assets/projects/ayna/platforms.mp4", poster: "assets/projects/ayna/platforms.jpg" },
            { title: "Checkpoints", text: "Saved checkpoint interactions, including player animations for left and right triggers.", media: "assets/projects/ayna/checkpoint.mp4", poster: "assets/projects/ayna/checkpoint.jpg" },
            { title: "Automatic pick-ups", text: "A new item pick-up system: items the player collects automatically.", media: "assets/projects/ayna/automatic-pickup-and-dialog.mp4", poster: "assets/projects/ayna/automatic-pickup-and-dialog.jpg" },
            { title: "Manual pick-ups", text: "A new item pick-up system: items the player picks up manually.", media: "assets/projects/ayna/manual-pickup.mp4", poster: "assets/projects/ayna/manual-pickup.jpg" },
            { title: "Moving platforms", text: "Moving platforms that react to player projectiles, with game-feel touches like shader glow.", media: "assets/projects/ayna/platformsShoot.mp4", poster: "assets/projects/ayna/platforms.jpg" },
            { title: "Traps & hazards", text: "Breakable ground and falling block traps.", media: "assets/projects/ayna/falling-traps.mp4", poster: "assets/projects/ayna/falling-traps.jpg" },
            { title: "Bouncing Mushrooms", text: "Bouncing mushrooms for dynamic level design.", media: "assets/projects/ayna/mushrooms.mp4", poster: "assets/projects/ayna/mushrooms.jpg" }
          ]
        },
        {
          title: "Enemy behaviour", sub: "Enemy AI, attacks and traps programmed in C# in Unity", tags: ["game"],
          points: [
            { title: "Mosquito - Flying Enemy", text: "Built a flying enemies framework from scratch that can be used to create the behaviour and gameplay of all flying enemies in the game, with the mosquito as the primary example.", media: "assets/projects/ayna/mosquito.mp4", poster: "assets/projects/ayna/mosquito.jpg" },
            { title: "Ground enemies", text: "Developed several ground enemies from the game design requirements, including behaviour, VFX and SFX.", media: "assets/projects/ayna/ground-enemies.mp4", poster: "assets/projects/ayna/ground-enemies.jpg" },
            { title: "Smoke enemy", text: "Programmed a smoke enemy that triggers a fullscreen shader effect to block the player’s vision.", media: "assets/projects/ayna/smoke-enemy.mp4", poster: "assets/projects/ayna/smoke-enemy.jpg" },
            { title: "Snake trap", text: "Created a ground snake trap system that tracks player movement, shoots projectiles and switches tracking sides.", media: "assets/projects/ayna/snakes.mp4", poster: "assets/projects/ayna/snakes.jpg" }
          ]
        }
      ],
      // Optional: buttons at the end of the page
      links: [
        { label: "Play the demo on Steam", play: true, url: "https://store.steampowered.com/app/1742390/Ayna_Shattered_Truth/" }
      ],
      media: [
        { src: "https://www.youtube.com/watch?v=nv50lLZvoJU", caption: "Official trailer" },
        { src: "assets/projects/ayna/mosquito.mp4", poster: "assets/projects/ayna/mosquito.jpg", caption: "Mosquito · First flying enemy" },
        { src: "assets/projects/ayna/falling-traps.mp4", poster: "assets/projects/ayna/falling-traps.jpg", caption: "Falling traps for environmental hazards" }
      ]
    },
    /* ----- Grayscale Interactive: one project per piece of work ----- */
    {
      id: "clinicvet",
      title: "ClinicVET",
      year: 2023-2026,                                           // TODO: year(s) you worked on it
      category: "ui",
      hue: 200,
      cover: "assets/projects/clinicvet/hero.webp",
      studio: "Grayscale Interactive · for NUPEC",
      role: "UI/UX Artist & Programmer",
      tools: ["Unreal Engine", "Blueprint Programming", "C++", "Illustrator", "Affinity"],
      summary: "A 3D veterinary app for NUPEC. The app was built by the Grayscale Interactive team, and I was responsible for all of its UI.",
      description: [
        "ClinicVET gives veterinarians interactive 3D anatomy, side-by-side condition comparisons and annotations to help them explain a dog’s health to its owner. It works as a visual communication aid, not a diagnostic tool, and runs on desktop, tablet and mobile."
      ],
      sections: [
        {
          title: "My part", sub: "UI design and Unreal implementation", featured: true, tags: ["ui"],
          points: [
            { title: "Complete UI design", text: "Designed the complete user interface, from screen layouts to interactive elements, buttons, color palettes, and icons. The project's admin panel was not designed by me.", media: "assets/projects/clinicvet/devices.webp" },
            { title: "UI programming in Unreal", text: "Programmed all of the UI and screens in Unreal Engine, ensuring responsiveness, proper sizing and animations, as well as custom widgets for blueprints.", media: "assets/projects/clinicvet/blueprint.png" }
          ]
        },
        {
          title: "ClinicVET UI features", sub: "What the vet can do with the app and some of the features I worked on", tags: ["ui"],
          points: [
            { title: "Dog anatomy in 3d view", text: "Starts from a dog model that can switch between male and female anatomy. Implementation of custom toggle button connected to this feature.", media: "assets/projects/clinicvet/hero.webp" },
            { title: "Exterior to organs and condition comparisons", text: "Moves from the exterior to the skeleton and organ systems, with rotate, zoom and pan. Implementation of custom controls and widget instantiation in real time for these functions. Shows common clinical conditions with the affected organ next to a healthy reference. I designed and programmed the second camera rendering the healthy organ", media: "assets/projects/clinicvet/organs.mp4" },
            { title: "Draw & save notes", text: "Lets the vet write or draw directly over the model and save the annotated images for later consultations. I designed and programmed the annotation system's UI.", media: "assets/projects/clinicvet/draw.mp4" }
          ]
        },
        {
          // screens: cards take each screenshot's shape (tall phone screens, wide landscape ones), same-height rows
          title: "Screens", sub: "The app, screen by screen. All UI was done to use Unreal Engine's UMG and localization system", tags: ["ui"], screens: true,   // TODO: the card texts are placeholders, rewrite them
          points: [
            { title: "Home", text: "The vet’s home screen: their profile, plan and registered tutors, with a button to register a new tutor. All UI design and implementation for this screen was done by me.", media: "assets/projects/clinicvet/home.jpeg" },
            { title: "Register a patient", text: "A short form to register a new patient with a text input for name and custom dropdown widget for size and age. All UI design and implementation for this screen was done by me.", media: "assets/projects/clinicvet/registerPatient.jpeg" },
            { title: "Patient card", text: "The patient card information, with the patient’s annotations shown below.", media: "assets/projects/clinicvet/card.jpeg" },
            //{ title: "Saved annotation", text: "After drawing on the model, the vet can add a written note to the annotation. Custom UI elements were designed and the logic was programmed by me for this feature.", media: "assets/projects/clinicvet/anotateEntry.jpeg" },
            { title: "Drawer", text: "UI designed to adapt to the freemium plan, shown in a custom made responsive drawer, based on layout principles, accompanied by visual feedback and custom animations when purchased or failed. All UI design and implementation for this screen was done by me.", media: "assets/projects/clinicvet/drawer.mp4" },
            { title: "Edit profile", text: "Edit the vet’s profile: name, phone, country, state and clinic details. All UI design and implementation for this screen was done by me.", media: "assets/projects/clinicvet/editProfile.jpeg" },
            { title: "Settings", text: "Settings: language (Spanish / English), profile, subscription, privacy notice and log out. This screen works with a switcher to mantain consistency throughout sub screens. All UI design and implementation for this screen was done by me.", media: "assets/projects/clinicvet/settings.jpeg" },
            { title: "Log out", text: "Confirmation before logging out or other actions shown throughout the app. All UI design and implementation for this screen was done by me.", media: "assets/projects/clinicvet/logout.jpeg" },
           // { title: "3D view", text: "The 3D view: switch between male and female, show or hide the skin, and explore the dog’s anatomy. All UI design and implementation for this screen was done by me.", media: "assets/projects/clinicvet/3dview.jpeg" },
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
      cover: "assets/projects/argent-xr/argentHome.png",
      studio: "Grayscale Interactive",
      role: "UI/UX Artist",
      tools: ["Affinity Designer", "Cavalry"],                                            // TODO: e.g. ["Figma", "After Effects", "Illustrator"]
      summary: "Grayscale’s browser-based platform for turning 3D and CAD models into interactive web and AR experiences. I designed part of its icons, motion graphics, splash screens and visual assets for marketing.",
      description: [
        "ArgentXR turns 3D and CAD models into interactive web and augmented reality experiences, with no coding and no app downloads. Free public beta, November 2026."
      ],
      sections: [
        {
          title: "My part", sub: "Icons, motion and UI proposals", tags: ["ui"],
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
            { title: "Intro motion graphics", text: "Motion graphics I animated for the ArgentXR page.", media: "assets/projects/argent-xr/intro.mp4", tags: ["motion"] },
            { title: "Motion animations", text: "Motion graphics I animated as proposals for the ArgentXR page.", media: "assets/projects/argent-xr/join.gif", tags: ["motion"] },
            { title: "Social media assets", text: "Posts I designed and animated as proposals for the ArgentXR social media page.", media: "assets/projects/argent-xr/img.jpg" },
            { title: "Social media assets", text: "Stories I designed and animated as proposals for the ArgentXR social media page.", media: "assets/projects/argent-xr/video.mp4", tags: ["motion"] },
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
      year: "2023-2026",
      category: "ui",
      hue: 160,
      cover: "assets/projects/the-explant/cover.jpg",
      studio: "Grayscale Interactive",
      role: "Programmer, UI & motion graphics designer and animator",                        // TODO: confirm
      tools: ["After Effects", "Unreal Engine"],
      summary: "I was in charge of the complete programming of the mobile app on Unreal Engine, rebuilt from an Unity project. I also did the implementation of AR functionality and the creation of all educational graphics and animations seen in the app.",   // TODO: confirm / rewrite
      description: [
        // TODO: confirm / rewrite — drafted from the app recording
        "The Explant is an educational app developed for Tec de Monterrey about plant tissue culture, explained with step-by-step animations, visualization of 3d models in AR, documentation in form of diagrams, embedded videos, links to external resources and an interactive quiz."
      ],
      sections: [
        {
          title: "Screens", sub: "The app, screen by screen", tags: ["ui"], screens: true,     // screens: cards take each screenshot's shape, same-height rows
          points: [
            { title: "Parts of the plant", text: "Implementation of interactive elements for exploring different parts of the plant, adaptation of tweening in Unreal Engine.", media: "assets/projects/the-explant/screen-parts.webp" },
            { title: "Phytohormones", text: "Implementation of interactive elements for exploring different parts of the plant, adaptation of tweening in Unreal Engine.", media: "assets/projects/the-explant/screen-hormones.webp" },
            { title: "Process menu", text: "Main menu with custom built navigation.", media: "assets/projects/the-explant/screen-menu.webp" },
            { title: "Process timeline", text: "Slide, or use Previous and Next, to step through a process. Each step plays its animation, created in After Effects and implemented as sprite sheets optimized for performance. This screen also opens the 3D model in AR.", media: "assets/projects/the-explant/screen-timeline.webp" },
            { title: "Theory", text: "Each process has its documentation, a diagram and external info.", media: "assets/projects/the-explant/screen-theory.webp" },
            { title: "Quiz", text: "A quiz with a progress bar; answers turn green or red when you submit for immediate feedback. The quiz can be filled in through a data table, which can be modified at any time, and it supports real-time updates.", media: "assets/projects/the-explant/screen-quiz.webp" }
          ]
        },
        {
          title: "Animations", sub: "Step-by-step process animations", tags: ["motion"],
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
      title: "Custom panel and dropdown for Unreal Engine projects",
      year: 2026,                                           // TODO
      category: "ui",
      hue: 250,
      cover: "assets/projects/unreal-ui/custom.jpg",                                          // TODO
      studio: "Grayscale Interactive",
      role: "UI Programmer",                                // TODO: confirm
      tools: ["Unreal Engine", "Blueprints", "Illustrator"],          // TODO: confirm
      summary: "Custom UI widgets and Blueprint tools for the studio’s Unreal Engine projects.",   // TODO: confirm / rewrite
      description: [
        "Reusable UI widgets and Blueprint tools I built for the studio's Unreal projects with UMG, no plug-ins."
      ],

      sections: [
        {
          title: "Custom panel for Unreal Engine projects", sub: "Design and programming of reusable UI widget", tags: ["ui"],
          points: [
            { title: "Mix and match UI", text: "The custom panel allows for flexible UI composition, with a pre made list of modular assets to choose from. I designed all assets, exported game ready and created and programmed the widget. This widget uses assets created with a sci fi project in mind but it can be adapted to any other themes.", media: "assets/projects/unreal-ui/custom.mp4" },      
            { title: "UI Shader creation", text: "I also worked on a custom shader that allows to tint the widget's border and fill, opacity, emissive properties, and other visual effects. WIP", media: "assets/projects/unreal-ui/colors.mp4" },
            { title: "Size responsiveness", text: "The widget is designed to be responsive to desired sizes and aspect ratios, either adjusted manually or with specific measurements, which can all be edited as they are exposed in the editor's details panel.", media: "assets/projects/unreal-ui/sizing.mp4" },
          ]
        },
        {
          title: "Custom dropdown for Unreal Engine projects", sub: "Programming of reusable UI widget country and state dropdown, built for ClinicVet", tags: ["ui"],
          points: [
            { title: "Dropdown", text: "The custom dropdown widget is designed to be highly customizable, including the option to have picture per option. It is built to take data from a data source, like string tables, or to be filled manually and in real time. It has a fallback design to avoid errors with null options and is also size responsive. It was created for the ClinicVet project fill in forms, and the input data is handled through a custom data structure. It reacts in real time and the options change depending on the user's input in-app", media: "assets/projects/unreal-ui/dropdown.mp4" },      
          ]
        }
      ],
    },
    // TODO: Ford — "some UI assets" for EV Cooling System Diagnostics (image was assets/projects/grayscale/ford.webp)
    {
      id: "brewmasters-remedies",
      title: "Brewmaster’s Remedies",
      year: "2023",
      category: "game",
      tags: ["ui"],
      hue: 100,
      cover: "assets/projects/brewmasters/cover.jpeg",
      studio: "Tecnológico de Monterrey · school project",
      role: "UI design & art direction",
      tools: ["Unreal Engine", "Substance Designer", "Illustrator", "Autodesk Maya"],
      award: "Best VR Game Project 2023",
      summary: "A VR game demo made in Unreal Engine. I designed the full UI and the art direction, and also worked on 3D assets and textures.",
      description: [
        "Brewmaster’s Remedies is a VR game demo made in Unreal Engine as a school project at Tecnológico de Monterrey. It won Best VR Game Project at the 2023 EAAD Academic Excellence Awards."
        // TODO: one or two lines about the game (what the player does)
      ],
      sections: [
        {
          title: "My work", sub: "UI, art direction and collaborative 3D assets, textures and materials",
          points: [
            { title: "Visual identity", text: "Title card design for the game. Designed and rendered in Illustrator.s", media: "assets/projects/brewmasters/cover.jpeg" , tags: ["ui"] },      
            { title: "UI design and assets", text: "Designed game ready UI elements for VR interaction.", media: "assets/projects/brewmasters/ui.png" , tags: ["ui"] },      
            { title: "Art direction", text: "Worked on the visual style and color palette for the game, visual inspiration and overall aesthetic.", media: "assets/projects/brewmasters/art.png" },
            { title: "3D assets and textures", text: "Worked on 3D assets, textures and materials for the game.", media: "assets/projects/brewmasters/models.png" }
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
      cover: "assets/projects/trayecto-q/cover.png",
      studio: "1st Querétaro Digital Hackathon",
      role: "UI/UX & development",                          // TODO: confirm your role
      tools: [],                                            // TODO
      award: "3rd place — Querétaro Digital Hackathon",
      summary: "Mobile app prototype and fully interactive demo, built during a hackathon.",
      description: [
        "Development of “Trayecto Q”, a mobile app prototype and fully interactive demo.",
        "Won 3rd place at the 1st Querétaro Digital Hackathon (2022)."
      ],
      sections: [
        {
          // screens: cards take each screenshot's shape (tall phone screens), same-height rows
          title: "Screens", sub: "The prototype, screen by screen", tags: ["ui"], screens: true,   // TODO: card texts are drafts, rewrite them
          points: [
            { title: "App Animated intro", text: "Introduction video, a traditional doll from Querétaro welcomes the user and guides them through their new passport for discovering the state. Character was illustrated and animated by me.", media: "assets/projects/trayecto-q/01 Bienvenida Lele.png" },
            { title: "Passport intro", text: "Passport cover, designed by me.", media: "assets/projects/trayecto-q/02 Pasaporte Intro.png" },
            { title: "Passport type", text: "Account type selection, after creating a new user. Screen assets and layouts designed by me", media: "assets/projects/trayecto-q/04 Tipo de pasaporte.png" },
            { title: "Small map", text: "A closer map view of nearby places. HUD and icons designed by me.", media: "assets/projects/trayecto-q/07 Mapa pequeño.png" },
            { title: "Profile", text: "The user's profile, editable. Screen assets and layouts designed by me.", media: "assets/projects/trayecto-q/09 Perfil.png" },
            { title: "Achievements", text: "The user's achievements, adquired by completing challenges that promote local tourism. Screen assets and layouts designed by me.", media: "assets/projects/trayecto-q/11 Perfil Copy.png" },
            { title: "Calendar", text: "Upcoming events around the state implemented in an interactive way. Screen assets and layouts designed by me.", media: "assets/projects/trayecto-q/13 Calendario.png" },
            { title: "Place description", text: "Information about a place. Screen assets and layouts designed by me.", media: "assets/projects/trayecto-q/15 Descripción.png" },
            { title: "Passport stamp", text: "Each visit adds a page to the passport: the photo, the date, facts about the place and an official stamp.", media: "assets/projects/trayecto-q/17 Pasaporte.png" }
          ]
        }
      ],
      media: [
        { src: "assets/projects/trayecto-q/waltkhrough.mp4", poster: "assets/projects/trayecto-q/01 Bienvenida Lele.png", caption: "Interactive demo walkthrough" }
      ]
    },
    /*{
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
    } */
  ],

  // Toolbox on the Skills screen: every tool listed in your projects and motion pieces is added
  // automatically; put any extra tools here.
  toolbox: ["Procreate", "Figma", "CapCut"],

  // Skills screen: one card per group. `note` is the proof shown under each skill. (`level` is no longer shown.)
  skills: [
    {
      group: "UI & UX",
      items: [
        { name: "Interactive UI design and implementation", level: 90, note: "HUDs, menus and flows for projects, such as videogames, mobile, pc, and VR apps, websites, and more — clients include Ford, NUPEC and Tec de Monterrey." },
        { name: "Visual development for UI", level: 85, note: "Creating visual assets, consistent design systems and mockups for user interfaces." },
        { name: "Prototyping", level: 85, note: "Clickable flows and component libraries before anything hits the engine." },
        { name: "Motion and Animation", level: 80, note: "Creation of 2D animations to enhance user experience, as well as tweens and transitions." }, 
        { name: "UX research", level: 80, note: "Conducting user research to inform design decisions and improve overall user experience." }, 
      ]
    },
    {
      group: "Programming",
      items: [
        { name: "C# / Unity", level: 85, note: "Object-oriented gameplay mechanics and UI systems." },
        { name: "C++ / Unreal", level: 70, note: "Notable experience on Unreal Engine's Motion Graphics System, completed with a specialization in C++ for Game Programming (U-Echo, 2024)." },
        { name: "AR / VR", level: 70, note: "Developed augmented and virtual reality experiences for academic and commercial projects, as well as traspassing projects from one engine to another." },
        { name: "Web (HTML, CSS, JS)", level: 75, note: "Including this site, built by hand." }
      ]
      
    },
    {
      group: "Illustration & 3D",
      items: [
        { name: "Digital illustration", level: 88, note: "Procreate, Photoshop and Illustrator." },
        { name: "Murals and Street Art", level: 75, note: "Selected artist for “Creajolote”; finalist in “Distrito Sejuve”; Mural artist for project by Sobrevivientes, activist group based in Puebla." },
        { name: "3D modelling", level: 65, note: "Basic hard surface modeling in Autodesk Maya." }
      ]
    },
    {
      group: "Motion",
      items: [
        { name: "Motion graphics", level: 88, note: "Creation of assets setup for animations with motion graphics for various media." },
        { name: "UI animation", level: 85, note: "Transitions and feedback in After Effects and Cavalry, rebuilt in-engine." },
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
