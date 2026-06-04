/* =========================================================================
   PORTFOLIO CONTENT  — ported from the original ORBIT_DATA, restructured
   into a single unified schema so every inner view renders consistently.
   Plain global (no JSX) so it loads fast, before the React layer.
   ========================================================================= */
(function () {
  // Section block schema used by the project deep-dive renderer:
  //   { kind:'lead',   text }
  //   { kind:'heading',text }
  //   { kind:'para',   text }
  //   { kind:'list',   items:[ "Label: body" | "body" ] }
  //   { kind:'image',  label, ratio:'wide'|'tall'|'square', span:1|2 }
  //   { kind:'gallery',items:[{label}] }
  //   { kind:'note',   text }   // muted callout (NDA, known-issue, etc.)

  const CONTACT = {
    name: 'Jack Yeoh',
    role: 'Technical Game Designer',
    blurb:
      'I bridge game design and technical execution[cite: 2]. I specialize in systems design, UI/UX, and rapid prototyping to ship playable, polished games[cite: 2].',
    email: 'jackyeoh0808@gmail.com',
    linkedin: 'https://www.linkedin.com/in/yeoh-xin-16956878/',
    linkedinLabel: 'linkedin.com/in/yeoh-xin',
    birth: [1997, 7, 1], // Aug 1, 1997 (month 0-indexed) — drives the "system version"
  };

  const AI_NOTE = [
    'Yes — I use AI heavily to speed up coding and for rapid prototyping[cite: 2].',
    'But the actual systems design, the tuning, and all the time spent iterating on mechanics—that’s all me[cite: 2].',
    'I prioritize gameplay over features[cite: 2]. I build things because I care about the craft, and the logic and feel of what I ship stays authentically mine[cite: 2].',
  ];

  const CREDITS = {
    music: 'Grand_Project — Pixabay',
    sfx: ['u_o8xh7gwsrj — Pixabay', 'FoxBoyTails — Pixabay', 'Stereogenic Studio — Pixabay'],
  };

  const CATEGORIES = [
    /* ---------------------------------------------------------------- 00 */
    {
      id: 'game-design',
      index: '00',
      title: 'Game Design',
      tagline: 'Systems & Loops',
      accent: 'game',
      blurb: 'Solving problems through systems and emergent mechanics[cite: 2].',
      summary:
        'Designing core loops, progression curves, and enemy synergies from first principles[cite: 2]. I build rulesets that encourage player expression, validated through playtesting[cite: 2].',
      projects: [
        {
          id: 'gd-runic',
          title: 'Runic Rush',
          tag: 'Strategic 2048-Roguelike',
          status: 'Released',
          hero: { label: 'assets/runic-rush-header.png' },
          meta: [
            { label: 'Role', value: 'Solo Developer' },
            { label: 'Genre', value: 'Puzzle Roguelike' },
            { label: 'Engine', value: 'Unreal Engine 5' },
            { label: 'Platform', value: 'Web Browser' },
            { label: 'Status', value: 'Released' },
          ],
          links: [{ label: 'Play on itch.io', url: 'https://indeptus-entertainment.itch.io/runic-rush' }],
          sections: [
            {
              heading: 'A roguelike spin on 2048',
              blocks: [
                { kind: 'lead', text: 'Short, strategic runs with structured boss fights[cite: 2]. As a solo project, I handled all game design and programming[cite: 2].' },
              ],
            },
            {
              heading: 'Iterating the merge mechanic',
              blocks: [
                { kind: 'para', text: 'The core merge interaction took a few iterations to feel right[cite: 2]. Originally, players dragged runes off the top of the board to attack and off the bottom to heal[cite: 2]. This was too limiting, so I simplified it to a double-tap execution[cite: 2].' },
                { kind: 'image', label: 'assets/runic-rush-attack.gif', ratio: 'wide' },
              ],
            },
            {
              heading: 'Procedural enemies, strict rulesets',
              blocks: [
                { kind: 'para', text: 'To save authoring time, enemies pull abilities from a shared pool[cite: 2]. Normal enemies draw 2 abilities; elites draw 3[cite: 2]. This created emergent, interesting puzzles[cite: 2].' },
                { kind: 'para', text: 'However, full RNG meant an enemy could pull 2 support abilities and 1 high-pressure attack, making runs unplayable[cite: 2]. I implemented a strict rule: a maximum of 1 support ability per enemy, instantly fixing the combat balance[cite: 2].' },
              ],
            },
            {
              heading: 'Boon synergies in a short loop',
              blocks: [
                { kind: 'para', text: 'I built four major synergies into the boon pool to support different buildcrafting strategies[cite: 2]:' },
                { kind: 'list', items: [
                  'Swarm vs Nuke: Generating many small runes vs. building a few high-level ones[cite: 2].',
                  'Sustain vs Leech: Standard healing vs. converting heals directly into damage output[cite: 2].',
                ] },
              ],
            },
            {
              heading: 'The preview system',
              blocks: [
                { kind: 'para', text: 'Hovering over a rune projects its exact damage or healing output, factoring in all active modifiers[cite: 2]. The same preview system applies to enemy abilities to help players plan their turns[cite: 2].' },
                { kind: 'note', text: 'Known issue: The preview system has minor bugs in the final build during boss fights[cite: 2]. Flagged for a future patch[cite: 2].' },
                { kind: 'image', label: 'assets/runic-rush-preview.gif', ratio: 'wide' },
              ],
            },
          ],
        },
        {
          id: 'gd-geometrite',
          title: 'Geometrite',
          tag: 'Co-op Boss Rush',
          status: 'Released',
          hero: { label: 'assets/geometrite-banner.png' },
          meta: [
            { label: 'Role', value: 'Solo Developer' },
            { label: 'Engine', value: 'Unity' },
            { label: 'Genre', value: 'Co-op Boss Rush' },
            { label: 'Event', value: 'Boss Rush Jam 2024' },
            { label: 'Status', value: 'Released' },
          ],
          links: [{ label: 'Play on itch.io', url: 'https://jackyeoh.itch.io/geometrite' }],
          sections: [
            {
              heading: 'Two players, one boss',
              blocks: [
                { kind: 'lead', text: 'Built solo for Boss Rush Jam 2024[cite: 2]. A 2-player co-op boss fight requiring tight coordination to handle mechanics designed to split the team up[cite: 2].' },
              ],
            },
            {
              heading: 'The exchange mechanic',
              blocks: [
                { kind: 'para', text: 'Designed around the jam theme "exchange[cite: 2]." When a player drops a module, it becomes empowered for their partner, significantly buffing its effects[cite: 2]. This rewards deliberate passing and turns mistakes into strategic opportunities[cite: 2].' },
              ],
            },
            {
              heading: 'Cooperative mechanics design',
              blocks: [
                { kind: 'para', text: 'Boss attack patterns demand different simultaneous roles[cite: 2]. For example, during the map-wide wipe mechanic, one player must hold a shield while the other maintains long-range DPS, forcing active communication and role division[cite: 2].' },
                { kind: 'gallery', items: [
                  { label: 'assets/geometrite-0.png' }, { label: 'assets/geometrite-1.png' }, { label: 'assets/geometrite-2.png' },
                ] },
              ],
            },
          ],
        },
        {
          id: 'gd-nda',
          title: 'Unannounced Live-Service Title',
          tag: 'Core Gameplay Design',
          status: 'In Development',
          meta: [
            { label: 'Role', value: 'Gameplay Designer' },
            { label: 'Official Title', value: 'Game Programmer' },
            { label: 'Genre', value: 'Live Service' },
            { label: 'Status', value: 'In Development' },
            { label: 'Disclosure', value: 'NDA Active' },
          ],
          sections: [
            {
              heading: 'Under NDA',
              blocks: [
                { kind: 'lead', text: 'Operating as a gameplay designer on an unannounced live-service title, despite my official title as a game programmer[cite: 2]. I own core gameplay design responsibilities at the ground level[cite: 2].' },
                { kind: 'note', text: 'Active NDA restricts disclosing specific mechanics or project details[cite: 2].' },
              ],
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- 01 */
    {
      id: 'game-dev',
      index: '01',
      title: 'Game Development',
      tagline: 'Engines & Code',
      accent: 'dev',
      blurb: 'Building the technical foundation—UE5, Unity, and full-stack web[cite: 2].',
      summary:
        'Programming player controllers, custom ability frameworks, and full-stack architecture across Unreal Engine 5, Unity, and React[cite: 2].',
      projects: [
        {
          id: 'dev-metal',
          title: 'Metal Genesis',
          tag: 'Ability Framework',
          status: 'Demo Released',
          hero: { label: 'assets/metal-genesis.png' },
          meta: [
            { label: 'Role', value: 'Game Programmer' },
            { label: 'Engine', value: 'Unreal Engine 5' },
            { label: 'Status', value: 'Demo Released' },
          ],
          links: [{ label: 'Play the Steam Demo', url: 'https://store.steampowered.com/app/3296470/Metal_Genesis_Rogue_Regime/' }],
          sections: [
            {
              heading: 'What is Metal Genesis',
              blocks: [
                { kind: 'lead', text: 'An action roguelike built in Unreal Engine 5[cite: 2]. I focused on programming the technical execution of the player experience[cite: 2].' },
              ],
            },
            {
              heading: 'Technical contributions',
              blocks: [
                { kind: 'para', text: 'My responsibilities ranged from low-level character logic to frontend UI integration[cite: 2]:' },
                { kind: 'list', items: [
                  'Player Controller: Tuned movement logic and responsiveness to support the game’s fast-paced combat[cite: 2].',
                  'Custom Ability System: Architected a flexible framework to handle complex ability modifiers and synergies[cite: 2].',
                  'UI Implementation: Programmed the data-rich HUD and translated aesthetic concepts into functional UI elements[cite: 2].',
                  'Optimization: Profiled, triaged, and fixed a major performance bottleneck within the bullet system[cite: 2].',
                ] },
              ],
            },
          ],
        },
        {
          id: 'dev-animara',
          title: 'Animara World',
          tag: 'React + Konva R&D',
          status: 'Shipped',
          hero: { label: 'assets/animara.png' },
          meta: [
            { label: 'Role', value: 'Tech Lead' },
            { label: 'Tech', value: 'React / Konva / Firebase' },
            { label: 'Infra', value: 'Cloudflare CDN' },
            { label: 'Team', value: '2 Juniors + Outsource' },
          ],
          links: [{ label: 'Explore the World', url: 'https://www.animara.world/animara' }],
          sections: [
            {
              heading: 'A living world on the web',
              blocks: [
                { kind: 'lead', text: 'Led the technical development alongside two junior developers and an outsource team[cite: 2]. Handled the R&D for the interactive world map[cite: 2].' },
              ],
            },
            {
              heading: 'Technical contributions',
              blocks: [
                { kind: 'list', items: [
                  'R&D: Architected the map using React and Konva[cite: 2]. Optimized rendering performance to handle high element density and animations[cite: 2].',
                  'Asset Pipeline: Defined technical requirements and coordinated the delivery pipeline with the art team[cite: 2].',
                  'Backend Integration: Implemented Firebase for real-time data handling and integration.',
                  'Technical Leadership: Managed code reviews and unblocked team members on architectural roadblocks[cite: 2].',
                  'CDN: Set up Cloudflare integration to optimize media load times[cite: 2].',
                ] },
              ],
            },
          ],
        },
        {
          id: 'dev-casino',
          title: 'Casino Conqueror',
          tag: 'Card-based Roguelike',
          status: 'Demo Released',
          hero: { label: 'assets/casino-conqueror-0.png' },
          meta: [
            { label: 'Role', value: 'Programmer' },
            { label: 'Engine', value: 'Unity' },
            { label: 'Genre', value: 'Card Roguelike' },
            { label: 'Status', value: 'Demo Released' },
          ],
          links: [{ label: 'View on Steam', url: 'https://store.steampowered.com/app/2610580/Casino_Conqueror/' }],
          sections: [
            {
              heading: 'Card-based roguelike',
              blocks: [
                { kind: 'lead', text: 'A card-based roguelike in Unity[cite: 2]. I headed the development for the core game logic, path nodes, and the in-game gallery[cite: 2].' },
              ],
            },
            {
              heading: 'Technical contributions',
              blocks: [
                { kind: 'list', items: [
                  'Core Game Logic: Built the central gameplay loop and the underlying rules engine[cite: 2].',
                  'Map Systems: Designed and implemented the procedural map generation and path nodes[cite: 2].',
                  'Gallery System: Programmed the collectible card viewing interface[cite: 2].',
                ] },
                { kind: 'gallery', items: [
                  { label: 'assets/casino-conqueror-1.png' }, { label: 'assets/casino-conqueror-2.jpg' },
                ] },
              ],
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- 02 */
    {
      id: 'numerical',
      index: '02',
      title: 'Numerical Design',
      tagline: 'Balance & Math',
      accent: 'num',
      blurb: 'Solving balance issues with math and metrics[cite: 2].',
      summary:
        'Building spreadsheet models for skill distribution, scaling curves, and actual gameplay metrics[cite: 2]. Tuning the math so the game feels right in playtests[cite: 2].',
      projects: [
        {
          id: 'num-scaling',
          title: 'Case 01 — Enemy Scaling',
          tag: 'Moves-to-Kill Math',
          status: 'Worksheet',
          context: 'Runic Rush — a roguelike built on 2048 mechanics[cite: 2]. Swiping moves runes; matches merge into stronger runes[cite: 2]. Every swipe ticks down enemy ability cooldowns, forcing tactical decisions[cite: 2].',
          links: [{ label: 'View Live Worksheet', url: '#' }],
          sections: [
            {
              heading: 'My process',
              blocks: [
                { kind: 'list', items: [
                  'Primary Metric: Players merge runes at varying efficiencies[cite: 2]. The mathematical baseline cannot assume optimal, perfect moves[cite: 2].',
                  'Skill Distribution: Modeled expected player skill brackets to define average moves per merge[cite: 2].',
                  'Baseline Formulas: Established the foundational scaling curves for rune power and enemy HP per level[cite: 2].',
                  'Moves-to-Kill (MTK): Calculated the required number of swipes to kill an enemy based on the player targeting specific rune tiers[cite: 2].',
                  'Sustain Balancing: Mirrored the MTK process for enemy damage vs. player healing, factoring in split focus[cite: 2].',
                  'Loadout Limits: Playtesting revealed raw RNG loadouts (e.g., haste + charge + ravage) mathematically broke the game[cite: 2]. Hard-capped enemies at 1 support + 2 standard abilities[cite: 2].',
                ] },
              ],
            },
          ],
        },
        {
          id: 'num-encounter',
          title: 'Case 02 — Encounter Balancing',
          tag: 'Map Nodes',
          status: 'Worksheet',
          context: 'Runic Rush — a roguelike built on 2048 mechanics[cite: 2]. Swiping moves runes; matches merge into stronger runes[cite: 2]. Every swipe ticks down enemy ability cooldowns, forcing tactical decisions[cite: 2].',
          links: [{ label: 'View Map-Nodes Worksheet', url: '#' }],
          sections: [
            {
              heading: 'My process',
              blocks: [
                { kind: 'list', items: [
                  'Node Archetypes: Defined combat, elites, shops, and event nodes based on established roguelike structural standards[cite: 2].',
                  'Reward Weighting: Mapped out the specific economic or power reward thresholds for each node type[cite: 2].',
                  'Risk/Reward Distribution: Balanced the procedural generation weights to maintain consistent pressure and payout loops throughout a run[cite: 2].',
                ] },
              ],
            },
          ],
        },
        {
          id: 'num-power',
          title: 'Case 03 — Player Power',
          tag: 'Boons & Synergies',
          status: 'Worksheet',
          context: 'Runic Rush — a roguelike built on 2048 mechanics[cite: 2]. Swiping moves runes; matches merge into stronger runes[cite: 2]. Every swipe ticks down enemy ability cooldowns, forcing tactical decisions[cite: 2].',
          links: [{ label: 'View Boons Worksheet', url: '#' }],
          sections: [
            {
              heading: 'My process',
              blocks: [
                { kind: 'list', items: [
                  'Core Synergies: Defined macro build paths: Nuke vs. Swarm, Sustain vs. Leech, and pure economy[cite: 2].',
                  'Item Design: Built power-ups top-down (filling a mechanical gap) and bottom-up (codifying an emergent interaction)[cite: 2].',
                  'Pool Pruning: Rescoped the pool[cite: 2]. The initial set was too diluted with minor buffs, dragging out the intended short-form gameplay loop[cite: 2].',
                  'Drop Rates: Tuned the RNG so a player sees the full pool across roughly three 10-minute runs, preventing single-run saturation[cite: 2].',
                  'Data Validation: Playtested, tweaked the math based on real metric output, and locked the final values[cite: 2].',
                ] },
              ],
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------- 03 */
    {
      id: 'ui-ux',
      index: '03',
      title: 'UI / UX',
      tagline: 'Figma to Frontend',
      accent: 'ui',
      blurb: 'Designing clean, functional interfaces[cite: 2].',
      summary:
        'Handling end-to-end UI implementation—from gathering requirements and wiring up Figma prototypes to writing the frontend logic and adding motion polish[cite: 2].',
      projects: [
        {
          id: 'ui-meat',
          title: 'Meat Delivery Admin Portal',
          tag: 'Freelance UI/UX',
          status: 'Delivered',
          meta: [
            { label: 'Type', value: 'Freelance' },
            { label: 'Role', value: 'UI/UX Designer' },
            { label: 'Tools', value: 'Figma' },
            { label: 'Deliverable', value: 'Admin Portal UI' },
          ],
          links: [{ label: 'View Figma Design', url: 'https://www.figma.com/design/DNUyIpizKWF3V0jRsCLTzX/Meat-Shopping-App---Super-Admin?node-id=0-1&t=DkQ6P5bmO4L3XyYP-1' }],
          sections: [
            {
              heading: 'Freelance admin portal design',
              blocks: [
                { kind: 'lead', text: 'Owned the end-to-end design for a meat-delivery admin portal as a freelance contractor, handling everything from initial requirements to the final Figma handoff[cite: 2].' },
              ],
            },
            {
              heading: 'Process',
              blocks: [
                { kind: 'list', items: [
                  'Requirements Gathering: Worked with stakeholders to map out business logic and admin workflows[cite: 2].',
                  'Journey Mapping: Documented the user flow for order management, inventory, and vendor oversight[cite: 2].',
                  'Wireframing: Built low-fidelity wireframes to lock in structure and navigation logic[cite: 2].',
                  'UI Design: Delivered high-fidelity Figma screens focused on clean, data-heavy functionality[cite: 2].',
                ] },
              ],
            },
          ],
        },
        {
          id: 'ui-initiative',
          title: 'UX Improvement Initiative',
          tag: 'Interaction Design',
          status: 'Cross-Project',
          meta: [
            { label: 'Type', value: 'Cross-Project Initiative' },
            { label: 'Tools', value: 'Figma / React / Framer' },
            { label: 'Focus', value: 'UX Polish & Motion' },
          ],
          sections: [
            {
              heading: 'Proactive interaction design',
              blocks: [
                { kind: 'lead', text: 'Bridged the gap between static design drafts and the final implementation across multiple projects[cite: 2].' },
                { kind: 'para', text: 'Analyzed user journeys from initial mockups and implemented fixes to interaction feedback, UI timings, and visual hierarchy[cite: 2].' },
                { kind: 'list', items: [
                  'Fidelity Upgrades: Converted static Figma frames into responsive, animated frontend components[cite: 2].',
                  'Flow Optimization: Streamlined navigation menus and reduced friction in combat HUDs[cite: 2].',
                  'Game Feel: Improved action feedback through specific UI state changes and motion design[cite: 2].',
                ] },
              ],
            },
          ],
        },
      ],
    },
  ];

  window.PORTFOLIO = { CONTACT, AI_NOTE, CREDITS, CATEGORIES };
})();