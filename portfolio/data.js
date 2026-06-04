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
      'I bridge creative design and technical execution — systems design, UI/UX, and rapid prototyping that ships as polished, playable experiences.',
    email: 'jackyeoh0808@gmail.com',
    linkedin: 'https://www.linkedin.com/in/yeoh-xin-16956878/',
    linkedinLabel: 'linkedin.com/in/yeoh-xin',
    birth: [1997, 7, 1], // Aug 1, 1997 (month 0-indexed) — drives the "system version"
  };

  const AI_NOTE = [
    'Yes — a lot of this site, and my recent work, involves AI.',
    'But I use it to prototype faster and accelerate development. What I make stays authentically mine.',
    'I take real joy and ownership in building, and the countless hours spent perfecting motion and debating decisions are the part of me I inject into every project.',
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
      blurb: 'How I craft experiences and solve problems with systems.',
      summary:
        'Core loops, progression curves, enemy design and synergy systems — designed from first principles and tuned through structured playtesting.',
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
            { label: 'Engine', value: 'Unity / HTML5' },
            { label: 'Platform', value: 'Web Browser' },
            { label: 'Status', value: 'Released' },
          ],
          links: [{ label: 'Play on itch.io', url: 'https://indeptus-entertainment.itch.io/runic-rush' }],
          sections: [
            {
              heading: 'A roguelike spin on 2048',
              blocks: [
                { kind: 'lead', text: 'Short, strategic runs with epic thematic boss fights. Solo project — I handled all game design and programming from the ground up.' },
              ],
            },
            {
              heading: 'Iterating the merge mechanic',
              blocks: [
                { kind: 'para', text: 'The rune merging took a few iterations to land. Originally you dragged runes off the top of the board to damage and off the bottom to heal — but that was too limiting, so I moved to a simple double-tap to use.' },
                { kind: 'image', label: 'assets/runic-rush-attack.gif', ratio: 'wide' },
              ],
            },
            {
              heading: 'Procedural enemies, strict rulesets',
              blocks: [
                { kind: 'para', text: 'Enemies draw abilities from a shared pool to save authoring time, but the result created genuinely interesting puzzles. Normal enemies pull 2 abilities, elites pull 3.' },
                { kind: 'para', text: '3 random abilities could land as 2 support + 1 high-pressure ability — unplayable. I imposed a rule: at most 1 support ability per enemy, which fixed the balance perfectly.' },
              ],
            },
            {
              heading: 'Boon synergies in a short loop',
              blocks: [
                { kind: 'para', text: 'Even in a short game I built four major synergies into the boons:' },
                { kind: 'list', items: [
                  'Swarm vs Nuke: many small runes vs. a few massive ones.',
                  'Sustain vs Leech: traditional healing vs. converting heals into pure damage.',
                ] },
              ],
            },
            {
              heading: 'The preview system',
              blocks: [
                { kind: 'para', text: 'Hovering a rune projects its damage or healing output, factoring in every active effect — the same system applies to enemy abilities, built to aid strategic planning.' },
                { kind: 'note', text: 'Known issue: the preview stayed slightly buggy in the final build, especially during boss fights — flagged for a future pass.' },
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
                { kind: 'lead', text: 'Built solo for Boss Rush Jam 2024 — a 2-player co-op boss fight where both players must coordinate closely, reacting to mechanics designed to split the team apart.' },
              ],
            },
            {
              heading: 'The exchange mechanic',
              blocks: [
                { kind: 'para', text: 'Built around the jam theme "exchange": when a player drops a module it becomes empowered for the other player, dramatically enhancing its effects. Mistakes become opportunities, and deliberate passing is rewarded.' },
              ],
            },
            {
              heading: 'Cooperative mechanics design',
              blocks: [
                { kind: 'para', text: 'Boss mechanics demand different roles from each player simultaneously. In the map-wide one-shot mechanic, one player holds a shield while the other maintains long-range DPS — forcing real-time communication and a clear division of responsibility.' },
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
                { kind: 'lead', text: 'Brought in as a designer on a live-service title in development — despite holding an official title as game programmer. Trusted with ownership of core gameplay design at the ground level.' },
                { kind: 'note', text: 'An active NDA means specific details about the project can\u2019t be disclosed.' },
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
      blurb: 'How I materialize worlds — UE5, Unity & the web, full-stack.',
      summary:
        'Gameplay frameworks, ability systems, performance work and full-stack R&D across Unreal Engine 5, Unity and React.',
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
                { kind: 'lead', text: 'My first project at Lemonsky — a fast-paced action roguelike in Unreal Engine. I focused heavily on the technical execution of the player experience.' },
              ],
            },
            {
              heading: 'Technical contributions',
              blocks: [
                { kind: 'para', text: 'My work spanned low-level character logic to high-level UI implementation:' },
                { kind: 'list', items: [
                  'Player Controller: refined responsiveness and movement feel to match the game\u2019s high-octane pace.',
                  'Custom Ability System: a flexible framework supporting complex modifiers and synergies.',
                  'UI Implementation: translated the aggressive Rogue-Regime aesthetic into a functional, data-rich HUD.',
                  'Performance: triaged and fixed a performance issue in the bullet system.',
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
            { label: 'Tech', value: 'React / Konva' },
            { label: 'Infra', value: 'Cloudflare CDN' },
            { label: 'Team', value: '2 Juniors + Outsource' },
          ],
          links: [{ label: 'Explore the World', url: 'https://www.animara.world/animara' }],
          sections: [
            {
              heading: 'A living world on the web',
              blocks: [
                { kind: 'lead', text: 'Led 2 junior developers and an outsource team to deliver a media-heavy marketing site. I owned R&D for the flagship "World" section — a massive, living map densely packed with animating elements.' },
              ],
            },
            {
              heading: 'Technical contributions',
              blocks: [
                { kind: 'list', items: [
                  'R&D: architected the interactive map in React + Konva, balancing visual richness against performance under high element density.',
                  'Asset Pipeline: defined and coordinated the delivery pipeline with the internal art team.',
                  'Technical Leadership: unblocked team members on roadblocks throughout the project.',
                  'CDN: integrated Cloudflare to optimize load times for the media-heavy site.',
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
                { kind: 'lead', text: 'A card-based roguelike in Unity. I headed development of the core game logic, map traversal, and in-game gallery — the foundational systems that define the player experience.' },
              ],
            },
            {
              heading: 'Technical contributions',
              blocks: [
                { kind: 'list', items: [
                  'Core Game Logic: architected and implemented the central gameplay loop and rules engine.',
                  'Map Traversal: designed and built the procedural map navigation system.',
                  'Gallery System: built the in-game gallery for collectible card viewing.',
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
      blurb: 'How I solve balancing problems with numbers.',
      summary:
        'Spreadsheet-driven balance: modeling player skill, scaling curves, and the metrics that actually matter, then validating through playtests.',
      projects: [
        {
          id: 'num-scaling',
          title: 'Case 01 — Enemy Scaling',
          tag: 'Moves-to-Kill Math',
          status: 'Worksheet',
          context: 'Runic Rush — a short-form roguelike built on the 2048 mechanic. Players swipe to move every rune; matching types and levels merge into stronger runes. Each swipe also ticks down enemy ability cooldowns, mixed and matched from a pool into challenging mechanics.',
          links: [{ label: 'View Live Worksheet', url: '#' }],
          sections: [
            {
              heading: 'My process',
              blocks: [
                { kind: 'list', items: [
                  'Identify what drives player output — players merge runes at different efficiency; most won\u2019t hit the minimum-step optimum.',
                  'Model the player skill distribution.',
                  'Establish baseline scaling — formulas for how rune power and enemy HP scale across levels.',
                  'Compute the metric that matters: Moves-to-Kill (MTK), how many moves to kill an enemy, modeled around a player focusing on a given rune level.',
                  'Tweak and playtest until it feels good — not too stale, but requiring real work. Balance around mathematical sweet-spots as a subtle incentive for invested players to optimize.',
                  'Repeat for enemy attack \u2192 player healing, accounting for split focus (heal or damage, never both at once).',
                  'Brainstorm interesting enemy abilities — basic attacks first, then abilities that demand the player "play differently," then supportive abilities mixed to find interesting combinations.',
                  'Set ability numbers from the established baseline (\u00b1 a range).',
                  'Validate via playtest — some abilities proved nastier than expected (haste + charge + ravage was unplayable), so enemies are capped at 1 supportive + 2 others.',
                  'Fine-tune values to final balance.',
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
          context: 'Runic Rush — a short-form roguelike built on the 2048 mechanic. Players swipe to move every rune; matching types and levels merge into stronger runes. Each swipe also ticks down enemy ability cooldowns, mixed and matched from a pool into challenging mechanics.',
          links: [{ label: 'View Map-Nodes Worksheet', url: '#' }],
          sections: [
            {
              heading: 'My process',
              blocks: [
                { kind: 'list', items: [
                  'Brainstorm interesting encounters — combat, non-combat and more, drawing on common examples from other roguelikes.',
                  'Classify the reward each can grant.',
                  'Ensure a good spread of experiences — risk/reward, events, pure rewards, and so on.',
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
          context: 'Runic Rush — a short-form roguelike built on the 2048 mechanic. Players swipe to move every rune; matching types and levels merge into stronger runes. Each swipe also ticks down enemy ability cooldowns, mixed and matched from a pool into challenging mechanics.',
          links: [{ label: 'View Boons Worksheet', url: '#' }],
          sections: [
            {
              heading: 'My process',
              blocks: [
                { kind: 'list', items: [
                  'Identify synergies from core mechanics — big runes vs. rapid small runes; heal-sustain vs. lifesteal; economy-focused builds.',
                  'Brainstorm power-ups as puzzle pieces for each synergy, jumping between top-down (what would a power-up here look like) and bottom-up (what synergy could this idea create).',
                  'Design rescoping: an initial large pool of weak power-ups contradicted the intended short-form experience — runs ran into hours to see decent variety.',
                  'Rescope the baseline: a player shouldn\u2019t see everything in one run, but should reasonably see everything across ~3 good runs (3 \u00d7 10-min runs \u2264 40-min target).',
                  'Combine and remove boons to shrink to the current list.',
                  'Check coverage across each synergy and offense / defense / economy.',
                  'Playtest and balance numbers around player-skill assumptions, then revise.',
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
      blurb: 'How I make smooth, considered experiences.',
      summary:
        'End-to-end interface work — requirements discovery, journey mapping, high-fidelity Figma, and the motion polish that turns static drafts into living products.',
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
                { kind: 'lead', text: 'Designed the full admin portal for a meat-delivery app as a freelance engagement — owned end-to-end, from uncovering requirements to final Figma handoff.' },
              ],
            },
            {
              heading: 'Process',
              blocks: [
                { kind: 'list', items: [
                  'Requirements Discovery: stakeholder sessions to surface business needs and admin workflows.',
                  'Journey Mapping: charted end-to-end journeys for admin roles — orders, inventory, vendor oversight.',
                  'Wireframing: lo-fi wireframes to validate structure and navigation before visual design.',
                  'UI Design: high-fidelity Figma covering all core admin screens with a clean, functional aesthetic.',
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
                { kind: 'lead', text: 'Across several projects I took the initiative to bridge the gap between static draft designs and high-fidelity user experiences.' },
                { kind: 'para', text: 'Starting from initial drafts, I analyzed the intended journey and proposed/implemented refinements to interaction feedback, transition timing, and visual clarity.' },
                { kind: 'list', items: [
                  'Fidelity Upgrades: converting static mockups into responsive, animated components.',
                  'Flow Optimization: removing friction in navigation menus and combat HUDs.',
                  'Feedback Loops: enhancing the impact of player actions through subtle UI motion and state changes.',
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
