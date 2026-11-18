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
  name: "Andrea Zamudio",
  role: "UI Artist & Programmer",
  // Shown big on the title screen. Wrap one word in *asterisks* to highlight it.
  catchphrase: "Interfaces you can *feel* — designed and coded by hand.", // PLACEHOLDER
  availability: "Open to work",         // shown in the top HUD

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
        title: "American Eagle — winning video",
        context: "Motion graphics", year: "2026",
        award: "Won a trip to Barcelona",
        description: "Original motion graphics piece that won American Eagle's contest.", // TODO: a line about the idea
        video: null, poster: null, hue: 215, tools: []  // TODO: add the video + tools used (e.g. After Effects, Cavalry)
      },
      {
        title: "“Transparencia en Corto” 2026",
        context: "Short film", year: "2026",
        award: "3rd place, state level",
        description: "Short film entry for the state-level “Transparencia en Corto” contest.",
        video: null, poster: null, hue: 330, tools: []
      },
      {
        title: "“Transparencia en Corto” 2023",
        context: "Short film", year: "2023",
        award: "1st place, state level",
        description: "Short film entry for the state-level “Transparencia en Corto” contest.",
        video: null, poster: null, hue: 30, tools: []
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
      { title: "Creando Sabor Con Mis Monstruos", medium: "Digital illustration", year: "2019",
        award: "National award · 3rd place", note: "Contest curated by Guillermo del Toro & La Costeña.", image: null, ratio: 0.8, hue: 15 },
      { title: "Creajolote", medium: "Urban art intervention", year: "2023",
        award: "Selected artist", note: "Commissioned by the Secretary of Youth (SEJUVE).", image: null, ratio: 1.4, hue: 190 },
      { title: "Distrito Sejuve", medium: "Urban art & design", year: "2022",
        award: "Finalist", note: "", image: null, ratio: 1, hue: 280 },
      { title: "Character study", medium: "Procreate", year: "2025", note: "", image: null, ratio: 0.75, hue: 340 },  // PLACEHOLDER
      { title: "Environment sketch", medium: "Procreate", year: "2025", note: "", image: null, ratio: 1.3, hue: 100 }, // PLACEHOLDER
      { title: "Poster series", medium: "Adobe Illustrator", year: "2024", note: "", image: null, ratio: 0.7, hue: 45 } // PLACEHOLDER
    ]
  },

  menu: [
    { id: "projects", label: "Projects", kicker: "Level select", body: "Games, client UI and apps — each with its own gallery of photos and video." },
    { id: "motion",   label: "Motion",   kicker: "Cutscenes", body: "Award-winning motion graphics and short films." },
    { id: "illustration", label: "Illustration", kicker: "Concept art", body: "Award-winning illustration, urban art and sketchbook pieces." },
    { id: "about",    label: "About",    kicker: "Player profile", body: "Who I am, how I work, and the stats behind the character." },
    { id: "skills",   label: "Skills",   kicker: "Skill tree", body: "Art and engineering abilities, levelled up over the years." },
    { id: "cv",       label: "CV",       kicker: "Quest log", body: "Where I've worked, what I studied, and a PDF copy to keep." },
    { id: "contact",  label: "Contact",  kicker: "Multiplayer", body: "Looking for a UI artist who can also ship the code? Let's talk." }
  ],

  // Filter tabs on the Projects screen. `id` matches a project's `category`.
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
   * Put each project's files in its own folder: assets/projects/<id>/
   */
  projects: [
    {
      id: "ayna",
      title: "Ayna: Shattered Truth",
      year: "2024 — 2025",
      category: "game",
      hue: 265,
      cover: null,
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
          title: "User interface",
          points: [
            "Built the vendor system end to end, from data management to UI: player and vendor inventories, and purchasable items that unlock gameplay.",
            "Created an upgrader system for specific NPCs that lets players buy and unlock upgrades, handling the full process.",
            "Added a favourites system so players can keep track of vendor and upgrader items they want to buy.",
            "Developed the runtime player inventory with Unity’s UI Toolkit and data bindings.",
            "Built a dialog bubble system that plays dialog sequences in-game.",
            "Implemented item pick-up notifications on the HUD using a list view.",
            "Created a tab-based journal UI that shows the player’s abilities and upgrades.",
            "Extended the settings menu: VSync, FPS limiter, language, monitor resolution and display mode.",
            "Built a narrative inspection setup that shows an icon and story text when players interact with objects."
          ]
        },
        {
          title: "Gameplay",
          points: [
            "Chest opening: the player walks automatically into position while animations, VFX and SFX play in sync.",
            "A map system that unlocks map areas in the UI, plus map posts where players pick up maps.",
            "A rotating platform system with smooth transitions between fixed steps, including looping and reverse looping.",
            "Collapsible platforms with animations, VFX and SFX synced to gameplay logic.",
            "Checkpoint interactions, including player animations for left and right triggers.",
            "A new item pick-up system for automatic and manual pick-ups.",
            "Moving platforms that react to player projectiles, with game-feel touches like shader glow.",
            "Breakable ground, bouncing mushrooms and falling block traps."
          ]
        },
        {
          title: "Enemy behaviour",
          points: [
            "Built a flying enemies framework from scratch that can be used to create the behaviour and gameplay of all flying enemies in the game.",
            "Developed several ground enemies from the game design requirements, including behaviour, VFX and SFX.",
            "Programmed a smoke enemy that triggers a fullscreen shader effect to block the player’s vision.",
            "Created a ground snake trap system that tracks player movement, shoots projectiles and switches tracking sides."
          ]
        }
      ],
      // Optional: buttons at the end of the page
      links: [
        { label: "Play the demo on Steam", play: true, url: "https://store.steampowered.com/app/1742390/Ayna_Shattered_Truth/" }
      ],
      media: [
        { src: null, caption: "Gameplay", kind: "video" },   // TODO
        { src: null, caption: "UI systems" },                // TODO
        { src: null, caption: "Menus" }                      // TODO
      ]
    },
    {
      id: "clinicvet",
      title: "ClinicVET",
      year: "",                                             // TODO: year
      category: "ui",
      hue: 200,
      cover: "assets/projects/clinicvet/hero.webp",
      studio: "Grayscale Interactive · for NUPEC",
      role: "UI/UX design & programming (all UI)",
      tools: ["Unreal Engine", "Blueprints", "Firebase"],
      summary: "A 3D veterinary app for NUPEC. I designed and built its entire user interface, from the first designs to the programming.",
      description: [
        "ClinicVET is a custom app made by Grayscale Interactive for NUPEC. It gives veterinarians interactive 3D anatomy, side-by-side condition comparisons and annotations to help them explain a dog’s health to its owner. It works as a visual communication aid, not a diagnostic tool, and runs on desktop, tablet and mobile.",
        "I was responsible for everything UI-related in the app."
      ],
      sections: [
        {
          title: "My work",
          points: [
            "Designed the complete user interface.",
            "Programmed all of the UI in Unreal Engine, including custom Blueprints.",
            "Connected parts of the UI to Firebase."
          ]
        },
        {
          title: "What the app does",
          points: [
            "Starts from a dog model that can switch between male and female anatomy.",
            "Moves from the exterior to the skeleton and organ systems, with rotate, zoom and pan.",
            "Shows common clinical conditions with the affected organ next to a healthy reference.",
            "Lets the vet write or draw directly over the model and save the annotated images for later consultations."
          ]
        }
      ],
      media: [
        { src: "assets/projects/clinicvet/preview.mp4", poster: "assets/projects/clinicvet/preview-poster.webp", caption: "App preview" },
        { src: "assets/projects/clinicvet/hero.webp", caption: "3D anatomy view" },
        { src: "assets/projects/clinicvet/devices.webp", caption: "Desktop, tablet and mobile" }
      ]
    },
    {
      id: "argent-xr",
      title: "ArgentXR",
      year: "2026",
      category: "ui",
      hue: 280,
      cover: "assets/projects/argent-xr/cover.png",
      studio: "Grayscale Interactive",
      role: "Icon design, motion & UI proposals",
      tools: [],                                            // TODO: tools you used
      ribbon: "Free public beta · Nov 2026",
      summary: "Grayscale’s browser platform that turns 3D and CAD models into interactive web and AR experiences. I designed its icons, motion animations and splash screens.",
      description: [
        "ArgentXR is Grayscale Interactive’s browser-based platform for turning 3D and CAD models into interactive web and augmented reality experiences, with no coding and no app downloads. Models come in from tools like Blender, Rhino, SketchUp, SOLIDWORKS and Siemens NX, and can be shared as a link or embedded on sites built with Webflow, WordPress, Wix and more."
      ],
      sections: [
        {
          title: "My work",
          points: [
            "Icon design.",
            "Motion animations.",
            "Splash screens.",
            "UI proposals."
          ]
        }
      ],
      ctaTitle: "See ArgentXR",
      ctaText: "Free public beta, November 2026.",
      links: [
        { label: "Visit ArgentXR", url: "https://argentxr.com/en/" }
      ],
      media: [
        { src: "assets/projects/argent-xr/cover.png", caption: "ArgentXR" },
        { src: null, caption: "Icons" },                     // TODO
        { src: null, caption: "Motion", kind: "video" }      // TODO
      ]
    },
    {
      id: "grayscale",
      title: "Client projects at Grayscale Interactive",
      year: "2023 — Present",
      category: "ui",
      hue: 20,
      cover: "assets/projects/grayscale/ford.webp",
      studio: "Grayscale Interactive",
      role: "UI/UX Artist & Programmer",
      tools: ["Unity", "Unreal Engine"],
      summary: "UI/UX design and programming for VR, AR and interactive 3D projects — clients include Ford, NUPEC and Tec de Monterrey.",
      description: [
        "Grayscale Interactive is a studio in Querétaro, Mexico, that builds VR training, AR and interactive 3D experiences for clients across North America. I develop UI/UX designs and programming across its Unity and Unreal Engine projects. My biggest ones have their own pages: ClinicVET and ArgentXR."
      ],
      sections: [
        {
          title: "Other projects",
          points: [
            "Ford: UI assets for EV Cooling System Diagnostics."   // TODO: confirm project
            // TODO: add the other projects you worked on
          ]
        }
      ],
      media: [
        { src: "assets/projects/grayscale/ford.webp", caption: "Ford" }
      ]
    },
    {
      id: "trayecto-q",
      title: "Trayecto Q",
      year: "2022",
      category: "app",
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
      id: "vst-plugins",
      title: "VST audio plugin interfaces",
      year: "2020 — 2021",
      category: "ui",
      hue: 150,
      cover: null,
      studio: "Tec Audio Coders",
      role: "UI/UX Artist",
      tools: [],                                            // TODO
      summary: "User interfaces and interactive workflows for custom VST audio plugins.",
      description: [
        "Developed user interfaces and interactive workflows for custom VST audio plugins."
      ],
      media: [
        { src: null, caption: "Plugin UI" }                  // TODO
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
        "Tecnológico de Monterrey (EAAD) Academic Excellence Awards: Best AR Game Project (2023), Best VR Game Project (2023) and Best 3D Game Project (2022)."
        // TODO: what each game was about
      ],
      media: [
        { src: null, caption: "AR game", kind: "video" },    // TODO
        { src: null, caption: "VR game", kind: "video" },    // TODO
        { src: null, caption: "3D game" }                    // TODO
      ]
    }
  ],

  about: {
    class: "Class: Artist / Engineer hybrid", // PLACEHOLDER
    bio: [
      "I'm a UI artist and programmer who lives in the space between a beautiful mockup and a shipped, responsive interface.", // PLACEHOLDER
      "I care about readability under pressure, motion that explains itself, and menus that feel great on a controller."
    ],
    stats: [
      { label: "Years in games", value: "6" },    // PLACEHOLDER
      { label: "Titles shipped", value: "4" },
      { label: "Icons drawn", value: "1,200+" },
      { label: "Coffee / day", value: "3" }
    ],
    traits: ["Pixel-precise", "Controller-first", "Accessibility nerd", "Motion design", "Design systems"]
  },

  // level: 0–100 — PLACEHOLDER levels, adjust to taste. Notes come from the CV.
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
    lead: "Got a game that needs an interface? Send a message — I usually reply within a day.",
    email: "andrea.zpalafox@gmail.com",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/andreazpalafox" },
      { label: "ArtStation", url: "https://www.artstation.com/boeroart" },
      { label: "Instagram", url: "https://www.instagram.com/boeroart" }
    ]
  }
};
