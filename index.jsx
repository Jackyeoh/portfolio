import React, { useEffect, useState, useRef, useParams } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { TriangleAlert, Plus, ChevronLeft, Hexagon, RotateCcw, ExternalLink, ChevronDown, User, FileText, Mail, Linkedin, Link, Volume2, VolumeX } from 'lucide-react';
import { Analytics } from "@vercel/analytics/next"

// --- CONFIGURATION & DATA ---
const gameEase = [0.16, 1, 0.3, 1];

const SFX_GAME_START = 'foxboytails-game-start-317318.mp3';
const SFX_CLICK      = 'u_o8xh7gwsrj-app_interface_click_2-476372.mp3';
const SFX_WOOSH      = 'stereogenicstudio-woosh-357181.mp3';
const SFX_HOVER      = 'u_o8xh7gwsrj-bubble_pop_1-476367.mp3';
const playSFX = (src, volume = 0.7) => {
  const sfx = new Audio(src);
  sfx.volume = volume;
  sfx.play().catch(() => {});
};

const getSysVer = () => {
  const birth = new Date(1997, 7, 1); // Aug 1, 1997 (month is 0-indexed)
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear() - (now < new Date(now.getFullYear(), 7, 1) ? 1 : 0);
  const months = (now.getMonth() - 7 + 12) % 12;
  return `${years}.${months}`;
};

const RUNIC_CONTEXT = {
  type: 'context',
  title: 'Context: Runic Rush 2048 Roguelike',
  paragraphs: [
    'This is a short form roguelike game inspired by the 2048 game (move numbers around to smash similar numbers into bigger numbers, eventually attaining 2048). This take is to use that mechanic as a base to make a combat based roguelike.',
    'The player strategically swipes to move all runes on a board, runes of similar type and level would merge into higher level ones. But be careful, as each swipe also ticks down the cooldown for enemy abilities, which are mixed and matched from a pool into potentially challenging mechanics to handle.'
  ]
};

const ORBIT_DATA = [
  {
    id: 'game-design',
    title: 'GAME DESIGN',
    subtitle: 'SYSTEMS & LOOPS',
    orbSubtitle: 'HOW I CRAFT EXPERIENCES & SOLVE PROBLEMS',
    color: '#ffb000',
    ringIndex: 0,
    baseAngle: 0,
    role: 'Lead Systems Designer',
    engine: 'Unreal Engine 5 / Unity',
    duration: '6 Months',
    teamSize: '4 People',
    contributions: [
      'Designed core gameplay loop and player progression curve from scratch.',
      'Authored the GDD sections covering combat, economy, and meta-progression.',
      'Iterated on enemy AI behavior trees using structured playtesting data.',
      'Defined all ability costs, cooldowns, and stat scaling formulas.',
    ],
    processAssets: [
      { label: 'GDD Excerpt', note: 'Google Docs / Notion page placeholder' },
      { label: 'System Flowchart', note: 'Miro board / draw.io export placeholder' },
      { label: 'Playtesting Notes', note: 'Session log & feedback matrix placeholder' },
    ],
    subNodes: [
      {
        id: 'gd-1',
        title: 'Runic Rush',
        desc: 'Strategic 2048-Roguelike',
        content: [
          { type: 'image', url: 'runic-rush-header.png', height: 'h-32', fit: 'contain', text: 'Runic Rush' },
          {
            type: 'columns',
            left: [
              { type: 'header', text: 'A Roguelike Spin on 2048' },
              { type: 'paragraph', text: 'Runic Rush focuses on a short & strategic experience with epic thematic boss fights. As a solo project, I handled all game design and programming from the ground up.' },
              { type: 'button', text: 'Play on itch.io', url: 'https://indeptus-entertainment.itch.io/runic-rush' },
              { type: 'header', text: 'Iterative Design: The Merge Mechanics' },
              { type: 'paragraph', text: 'The rune merging took a few iterations to get right. Initially, you drag out runes on the top of the board to damage, drag out off the bottom of the board to heal. But that quickly became too limiting and I opted to just double tap to use.' },
              { type: 'image', url: 'runic-rush-attack.gif', height: 'h-56', fit: 'contain', text: 'Gameplay' },
              { type: 'header', text: 'Procedural Enemies & Strict Rulesets' },
              { type: 'paragraph', text: 'Initially designed a pool of abilities where each enemy randomly draws from to save time, but the end result created interesting puzzles to solve. Normal enemies have 2 abilities and elites have 3.' },
              { type: 'paragraph', text: '3 random abilities could result in 2 support + 1 high pressure ability which is unplayable. I imposed a rule: at most 1 support ability, which fixed the balance perfectly.' },
              { type: 'header', text: 'Boon Synergies in a Short Loop' },
              { type: 'paragraph', text: 'Even in this short game, I managed to design 4 major synergies into the boons:' },
              { type: 'list', items: [
                'Swarm vs Nuke: Generating and using many small runes vs. generating and using massive big runes.',
                'Sustain vs Leech: Traditional healing vs. converting heals into pure damage (Lifesteal).'
              ]},
              { type: 'header', text: 'Strategic Planning: The Preview System' },
              { type: 'paragraph', text: 'I built a preview system where hovering a rune shows projected damage or healing output (factoring in all active effects). The same system applies to enemy abilities.' },
              { type: 'paragraph', text: 'This was built to aid strategic planning. Unfortunately the system remained slightly buggy in the final build, especially during boss fights — a known issue for future iteration.' },
              { type: 'image', url: 'runic-rush-preview.gif', height: 'h-56', fit: 'contain', text: 'Preview System' },
            ],
            right: [
              {
                type: 'metadata',
                items: [
                  { label: 'Role', value: 'Solo Developer' },
                  { label: 'Genre', value: 'Puzzle Roguelike' },
                  { label: 'Engine', value: 'Unity / HTML5' },
                  { label: 'Status', value: 'Released' },
                  { label: 'Platform', value: 'Web Browser' },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'gd-2',
        title: 'Geometrite',
        desc: 'Co-op Boss Rush',
        content: [
          { type: 'image', url: 'geometrite-banner.png', height: 'h-28', fit: 'contain', text: 'Geometrite' },
          {
            type: 'columns',
            left: [
              { type: 'header', text: 'Co-op Boss Rush' },
              { type: 'paragraph', text: 'Developed solo for Boss Rush Jam 2024. Geometrite is a 2-player co-op boss fight where both players must coordinate closely — sharing responsibilities and reacting to mechanics that intentionally split the team apart.' },
              { type: 'button', text: 'Play on itch.io', url: 'https://jackyeoh.itch.io/geometrite' },
              { type: 'header', text: 'Exchange Mechanic' },
              { type: 'paragraph', text: 'Built around the jam theme of "exchange" — when a player drops a module, it becomes empowered for the other player, dramatically enhancing its effects. This turns mistakes into opportunities and rewards deliberate strategic passing.' },
              { type: 'header', text: 'Cooperative Mechanics Design' },
              { type: 'paragraph', text: 'Boss mechanics are designed to demand different roles from each player simultaneously. In the map-wide one-shot mechanic, one player must hold a shield while the other maintains long-range DPS — forcing the pair to communicate and divide responsibilities in real time.' },
            ],
            right: [
              {
                type: 'metadata',
                items: [
                  { label: 'Role', value: 'Solo Developer' },
                  { label: 'Engine', value: 'Unity' },
                  { label: 'Genre', value: 'Co-op Boss Rush' },
                  { label: 'Event', value: 'Boss Rush Jam 2024' },
                  { label: 'Status', value: 'Released' },
                ]
              }
            ]
          },
          { type: 'image-grid', images: [
            { url: 'geometrite-0.png', text: 'Geometrite Screenshot 1' },
            { url: 'geometrite-1.png', text: 'Geometrite Screenshot 2' },
            { url: 'geometrite-2.png', text: 'Geometrite Screenshot 3' },
          ]},
        ]
      },
      {
        id: 'gd-3',
        title: 'Unannounced Live Service Game',
        desc: 'Core Gameplay Design',
        content: [
          {
            type: 'columns',
            left: [
              { type: 'header', text: 'Under NDA' },
              { type: 'paragraph', text: 'Brought in as a designer on a live service title currently in development — despite holding an official title as game programmer. Trusted with ownership of core gameplay design on the ground level.' },
              { type: 'paragraph', text: 'Due to an active NDA, specific details about the project cannot be disclosed.' },
            ],
            right: [
              {
                type: 'metadata',
                items: [
                  { label: 'Role', value: 'Gameplay Designer' },
                  { label: 'Official Title', value: 'Game Programmer' },
                  { label: 'Genre', value: 'Live Service' },
                  { label: 'Status', value: 'In Development' },
                  { label: 'Disclosure', value: 'NDA Active' },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'gd-4',
        title: 'More to come',
        desc: 'Future Updates',
        isUnclickable: true,
        content: []
      }
    ]
  },
  {
    id: 'ue-dev',
    title: 'GAME DEVELOPMENT',
    subtitle: 'I MATERIALIZE WORLDS IN UE5, UNITY & WEB VIA DEEP UNDERSTANDING OF FULL STACK DEVELOPMENT',
    orbSubtitle: 'HOW I MATERIALIZE EPIC EXPERIENCES',
    color: '#00d4ff',
    ringIndex: 1,
    baseAngle: Math.PI / 2,
    role: 'Unreal Engine Developer',
    engine: 'Unreal Engine 5',
    duration: '4 Months',
    teamSize: '2 People',
    contributions: [
      'Built modular Blueprint Actor components for the ability system.',
      'Implemented C++ base classes extended by designers via Blueprint.',
      'Profiled and cut CPU/GPU overhead by 30% using Unreal Insights.',
      'Set up Git LFS pipeline for binary asset versioning across the team.',
    ],
    processAssets: [
      { label: 'Blueprint Graph', note: 'Ability system event graph screenshot placeholder' },
      { label: 'C++ Class Hierarchy', note: 'UML diagram placeholder' },
      { label: 'Profiler Capture', note: 'Unreal Insights session screenshot placeholder' },
    ],
    subNodes: [
      {
        id: 'ue-1',
        title: 'Metal Genesis',
        desc: 'Ability Framework',
        content: [
          { type: 'image', url: 'metal-genesis.png', height: 'h-56', fit: 'contain', text: 'Metal Genesis' },
          {
            type: 'columns',
            left: [
              { type: 'header', text: 'What is Metal Genesis' },
              { type: 'paragraph', text: 'The first project I worked in while in Lemonsky. Metal Genesis is a fast-paced action roguelike built in Unreal Engine. I focused heavily on the technical execution of the player experience.' },
              { type: 'button', text: 'Play the Steam Demo', url: 'https://store.steampowered.com/app/3296470/Metal_Genesis_Rogue_Regime/' },
              { type: 'header', text: 'Technical Contributions' },
              { type: 'paragraph', text: 'My work on Metal Genesis spanned from low-level character logic to high-level UI implementation:' },
              { type: 'list', items: [
                'Player Controller: Refined the responsiveness and movement feel to match the high-octane pace of the game.',
                'Custom Ability System: Developed a flexible framework for abilities that allows for complex modifiers and synergies.',
                'UI Implementation: Translated the aggressive "Rogue-Regime" aesthetic into a functional, data-rich HUD and menu system.',
                'Performance: Triaged and fixed a performance issue with the bullet system.',
              ]},
            ],
            right: [
              {
                type: 'metadata',
                items: [
                  { label: 'Role', value: 'Game Programmer' },
                  { label: 'Engine', value: 'Unreal Engine 5' },
                  { label: 'Status', value: 'Demo Released' },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ue-2',
        title: 'Animara World',
        desc: 'React + Konva R&D',
        content: [
          { type: 'image', url: 'animara.png', height: 'h-56', text: 'Animara World' },
          {
            type: 'columns',
            left: [
              { type: 'header', text: 'Living World on the Web' },
              { type: 'paragraph', text: 'Led a team of 2 junior developers and an outsource team to deliver a media-heavy marketing website. While the team handled core development, I owned the R&D for the flagship "World" section — a massive, living world map densely packed with animating elements.' },
              { type: 'button', text: 'Explore the World', url: 'https://www.animara.world/animara' },
              { type: 'header', text: 'Technical Contributions' },
              { type: 'list', items: [
                'R&D: Architected the interactive world map using React + Konva, balancing visual richness with performance under high element density.',
                'Asset Pipeline: Liaised with the internal art team to define and coordinate the asset delivery pipeline required for the world map.',
                'Technical Leadership: Unblocked team members on technical roadblocks throughout the project.',
                'CDN: Integrated Cloudflare CDN to optimize load times for the media-heavy site.',
              ]},
            ],
            right: [
              {
                type: 'metadata',
                items: [
                  { label: 'Role', value: 'Tech Lead' },
                  { label: 'Tech', value: 'React / Konva' },
                  { label: 'Infra', value: 'Cloudflare CDN' },
                  { label: 'Team', value: '2 Juniors + Outsource' },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ue-3',
        title: 'Casino Conqueror',
        desc: 'Card-based Roguelike',
        content: [
          { type: 'image', url: 'casino-conqueror-0.png', height: 'h-40', text: 'Casino Conqueror Banner' },
          {
            type: 'columns',
            left: [
              { type: 'header', text: 'Card-based Roguelike' },
              { type: 'paragraph', text: 'A card-based roguelike built in Unity. Headed development of the core game logic, map traversal system, and in-game gallery — bringing together the foundational systems that define the player experience.' },
              { type: 'button', text: 'View on Steam', url: 'https://store.steampowered.com/app/2610580/Casino_Conqueror/' },
              { type: 'header', text: 'Technical Contributions' },
              { type: 'list', items: [
                'Core Game Logic: Architected and implemented the central gameplay loop and rules engine.',
                'Map Traversal System: Designed and developed the procedural map navigation system.',
                'Gallery System: Built the in-game gallery feature for collectible card viewing.',
              ]},
            ],
            right: [
              { type: 'image', url: 'casino-conqueror-title.jpg', height: 'h-24', text: 'Casino Conqueror Title' },
              {
                type: 'metadata',
                items: [
                  { label: 'Role', value: 'Programmer' },
                  { label: 'Engine', value: 'Unity' },
                  { label: 'Genre', value: 'Card Roguelike' },
                  { label: 'Status', value: 'Demo Released' },
                ]
              }
            ]
          },
          { type: 'image', url: 'casino-conqueror-1.png', height: 'h-52', text: 'Casino Conqueror Screenshot' },
          { type: 'image', url: 'casino-conqueror-2.jpg', height: 'h-52', text: 'Casino Conqueror Screenshot 2' },
        ]
      },
      {
        id: 'ue-4',
        title: 'More to come',
        desc: 'Future Updates',
        isUnclickable: true,
        content: []
      }
    ]
  },
  {
    id: 'numerical',
    title: 'NUMERICAL DESIGN',
    subtitle: 'HOW I THINK ABOUT AND SOLVE BALANCING ISSUES WITH NUMBERS',
    orbSubtitle: 'HOW I SOLVE PROBLEMS WITH NUMBERS',
    color: '#ff3300',
    ringIndex: 2,
    baseAngle: Math.PI,
    role: 'Numerical Designer / Economy Analyst',
    engine: 'Google Sheets / Python',
    duration: '3 Months',
    teamSize: 'Solo',
    contributions: [
      'Built a live-editable spreadsheet model covering all player-facing stats.',
      'Designed currency sinks and drip rates to support long-term retention.',
      'Simulated 30-day progression curves to identify and fix pacing cliffs.',
      'Produced handoff docs mapping every formula to its in-game variable.',
    ],
    processAssets: [
      { label: 'Balance Spreadsheet', note: 'Google Sheets screenshot placeholder' },
      { label: 'Progression Curve Graph', note: 'Chart export placeholder' },
      { label: 'Economy Flow Diagram', note: 'Currency loop diagram placeholder' },
    ],
    subNodes: [
      {
        id: 'num-1',
        title: 'Case 1: Balance Enemy Scaling',
        desc: 'Moves-to-Kill Math',
        content: [
          { type: 'context', title: 'Context: Runic Rush 2048 Roguelike', paragraphs: ['This is a short form roguelike game inspired by the 2048 game (move numbers around to smash similar numbers into bigger numbers, eventually attaining 2048). This take is to use that mechanic as a base to make a combat based roguelike.', 'The player strategically swipes to move all runes on a board, runes of similar type and level would merge into higher level ones. But be careful, as each swipe also ticks down the cooldown for enemy abilities, which are mixed and matched from a pool into potentially challenging mechanics to handle.'] },
          { type: 'link', text: 'View Live Work Sheet', url: '#' },
          { type: 'header', text: 'My Process:' },
          { type: 'list', items: [
            'Identify what factor affects player output. Player merge runes at different efficiency. Most players won\'t be able to merge runes using the min required steps',
            'Model player skill distribution',
            'Establish baseline player & enemy scaling. Establish basic formula for how rune\'s power value scales across level. Establish basic formula for how enemy\'s HP scales across level',
            'Move on to do the important comparison. Using the baseline rune power (assume 1 power = 1 dmg), and enemy health, calculates the metric that mattered - moves to kill (MTK), aka how many moves does the player need to kill enemy (this is modeled around player focusing on using certain level of rune)',
            'Tweak Numbers and playtest until it feels good. Goal was to make the gameplay not too stale, yet need some work to defeat. Balance around certain mathematical sweetspots as subtle incentive for invested player to optimize against',
            'Repeat process on enemy attack -> player healing. Account for split focus (player can only heal or deal damage at any time)',
            'Brainstorm interesting enemy abilities. Start with basic attacks with variations. Then think of what kind of abilities can demand player to "play differently" => creates gameplay variant. Then think of some supportive abilities, and try to mix and match some of them to see if there are any interesting combinations (ex: haste + ravage is immediately a ton of pressure on player)',
            'Establish enemy ability numbers. from the baseline established above (+- within a range)',
            'Validate assumptions via playtest. learned that some ability proven to be more annoying than initially expected (ex: haste + charge + ravage is unplayable). Had to revise the rule so that the enemy can at most have 1 supportive ability + 2 others to keep things in check.',
            'Fine-tune values to final balance'
          ]}
        ]
      },
      {
        id: 'num-2',
        title: 'Case 2: Encounter Balancing',
        desc: 'Map Nodes',
        content: [
          RUNIC_CONTEXT,
          { type: 'link', text: 'View Map Nodes Work Sheet', url: '#' },
          { type: 'header', text: 'My Process:' },
          { type: 'list', items: [
            'Brainstorm interesting encounter examples. Combat, non-combat, etc. Trying to make things interesting using common encounter examples from other roguelikes',
            'Classify what reward they can grant',
            'Ensure good spread of different "kinds of experiences" (ex: risk/reward, events, pure rewards, etc)'
          ]}
        ]
      },
      {
        id: 'num-3',
        title: 'Case 3: Balancing Player Power',
        desc: 'Boons & Synergies',
        content: [
          { type: 'context', title: 'Context: Runic Rush 2048 Roguelike', paragraphs: ['This is a short form roguelike game inspired by the 2048 game (move numbers around to smash similar numbers into bigger numbers, eventually attaining 2048). This take is to use that mechanic as a base to make a combat based roguelike.', 'The player strategically swipes to move all runes on a board, runes of similar type and level would merge into higher level ones. But be careful, as each swipe also ticks down the cooldown for enemy abilities, which are mixed and matched from a pool into potentially challenging mechanics to handle.'] },
          { type: 'link', text: 'View Boons Work Sheet', url: '#' },
          { type: 'header', text: 'My Process:' },
          { type: 'list', items: [
            'Identify synergy. Based on core gameplay mechanics, brainstorm what synergy could be interesting to have. Ex: focus on making big rune vs rapid fire many small runes. Ex: sustain via heal vs lifesteal. Ex: econ-related, focusing on getting more stuff in general',
            'Brainstorm power ups. These are puzzle pieces that makes up each synergy. Jump between top-down (how would a power up for this synergy look like) and down-up (what kind of synergy can this power up idea creates)',
            'Design Rescoping. Initially designed a large pool of weaker power-ups (mirrors typical roguelike). Playtests showed this bloated pool contradicted the game\'s intended "short-form" experience (games going into hours as we need to have 20-30 stages to have chance of getting a decent experience)',
            'Rescope our baseline: player should not see everything in 1 run, but should have reasonable chance to see everything in ~3 good runs (10min runs x3 <= 40min target experience)',
            'Combine/Remove Boons to shrink into current list',
            'Check to ensure good spread of boons for each synergy / offense-defense-econ',
            'Playtest and do number balance based on player skill assumptions',
            'Playtest to revise numbers'
          ]}
        ]
      },
      {
        id: 'num-4',
        title: 'More to come',
        desc: 'Future Updates',
        isUnclickable: true,
        content: []
      }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI / UX',
    subtitle: 'FIGMA TO FRONTEND',
    orbSubtitle: 'HOW I MAKE SMOOTH EXPERIENCES',
    color: '#b026ff',
    ringIndex: 3,
    baseAngle: (3 * Math.PI) / 2,
    role: 'UI/UX Designer & Frontend Developer',
    engine: 'Figma / React / Tailwind',
    duration: '3 Months',
    teamSize: 'Solo',
    contributions: [
      'Designed a full widget library in Figma following a sci-fi terminal aesthetic.',
      'Implemented a responsive SPA in React with Framer Motion state transitions.',
      'Built data-driven HUD components backed by live game-state structs.',
      'Conducted usability passes and reduced average click-depth on core flows.',
    ],
    processAssets: [
      { label: 'Figma Component Library', note: 'Figma frame screenshot placeholder' },
      { label: 'HUD Wireframes', note: 'Low-fi wireframe export placeholder' },
      { label: 'User Flow Diagram', note: 'Navigation flow chart placeholder' },
    ],
    subNodes: [
      {
        id: 'ui-1',
        title: 'Meat Delivery Admin Portal',
        desc: 'Freelance UI/UX Design',
        content: [
          {
            type: 'columns',
            left: [
              { type: 'header', text: 'Freelance Admin Portal Design' },
              { type: 'paragraph', text: 'Designed the full admin portal for a meat delivery application as a freelance engagement. Owned the project end-to-end — from uncovering requirements to final Figma handoff.' },
              { type: 'button', text: 'View Figma Design', url: 'https://www.figma.com/design/DNUyIpizKWF3V0jRsCLTzX/Meat-Shopping-App---Super-Admin?node-id=0-1&t=DkQ6P5bmO4L3XyYP-1' },
              { type: 'header', text: 'Process' },
              { type: 'list', items: [
                'Requirements Discovery: Conducted stakeholder sessions to uncover business needs and admin workflows.',
                'User Journey Mapping: Charted end-to-end journeys for admin roles — order management, inventory, and vendor oversight.',
                'Wireframing: Produced lo-fi wireframes to validate structure and navigation before visual design.',
                'UI Design: Crafted the high-fidelity interface in Figma, covering all core admin screens with a clean, functional aesthetic.',
              ]},
            ],
            right: [
              {
                type: 'metadata',
                items: [
                  { label: 'Type', value: 'Freelance' },
                  { label: 'Role', value: 'UI/UX Designer' },
                  { label: 'Tools', value: 'Figma' },
                  { label: 'Deliverable', value: 'Admin Portal UI' },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ui-2',
        title: 'UX Improvement Initiative',
        desc: 'Interaction Design',
        content: [
          {
            type: 'columns',
            left: [
              { type: 'header', text: 'Proactive Interaction Design' },
              { type: 'paragraph', text: 'In several projects, I took the initiative to bridge the gap between static draft designs and high-fidelity user experiences.' },
              { type: 'paragraph', text: 'Based on initial drafts, I analyzed the intended user journey and proposed/implemented refinements to interaction feedback, transition timings, and visual clarity.' },
              { type: 'list', items: [
                'Fidelity Upgrades: Converting static mockups into responsive, animated components.',
                'Flow Optimization: Identifying and removing friction points in navigation menus and combat HUDs.',
                'User Feedback Loops: Enhancing the "impact" of player actions through subtle UI motion and state changes.',
              ]},
            ],
            right: [
              {
                type: 'metadata',
                items: [
                  { label: 'Type', value: 'Cross-Project Initiative' },
                  { label: 'Tools', value: 'Figma / React / Framer' },
                  { label: 'Focus', value: 'UX Polish & Motion' },
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ui-3',
        title: 'More to come',
        desc: 'Future Updates',
        isUnclickable: true,
        content: []
      }
    ]
  }
];

// Calculate orbital radii based on index (Top-Down view = perfect circles)
const getOrbitRadii = (index, isMobile) => {
  const baseR = isMobile ? 55 : 130;
  const gap = isMobile ? 28 : 75;
  const r = baseR + (index * gap);
  return { rx: r, ry: r };
};

// --- COMPONENTS ---

// 1. The Ambient Blueprint Grid — DOM dots with per-row CSS animation phase for row-glow effect
// isVisible = false during boot so the dots don't crossfade — they instant-swap on transition
const GRID_SPACING = 80;
const PULSE_CYCLE = 12;   // seconds per full cycle
const PULSE_STEP = 0.64;  // seconds between each row's pulse

const AmbientGrid = ({ isZoomed, isVisible }) => {
  const [dims, setDims] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const cols = Math.ceil(dims.w / GRID_SPACING) + 2;
  const rows = Math.ceil(dims.h / GRID_SPACING) + 2;
  // Align dots with the title screen's background-image grid:
  // background-position-x:center puts a dot at screen_center ± n×80.
  // background-position-y:0 puts dots at 0, 80, 160, …
  // We derive offsetX so a cell-center lands exactly on screen_center,
  // and fix offsetY so dots start at y=0 (not half-cell shifted).
  const offsetX = (dims.w / 2 - GRID_SPACING / 2) % GRID_SPACING - 2 * GRID_SPACING;
  const offsetY = -GRID_SPACING / 2;

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none bg-[#0a0a0c] overflow-hidden"
      style={{
        opacity: !isVisible ? 0 : isZoomed ? 0.05 : 1,
        transform: isZoomed ? 'scale(3)' : 'scale(1)',
        transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        transformOrigin: 'center center',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 55% 55% at 50% 50%, black 20%, transparent 65%)',
          maskImage: 'radial-gradient(ellipse 55% 55% at 50% 50%, black 20%, transparent 65%)',
        }}
      >
        {Array.from({ length: rows }).map((_, row) => (
          <div
            key={row}
            className="absolute flex"
            style={{ left: offsetX, top: offsetY + row * GRID_SPACING }}
          >
            {Array.from({ length: cols }).map((_, col) => (
              <div key={col} className="dot-grid-cell">
                <div
                  className="dot-inner"
                  style={{ '--dot-delay': `${row * PULSE_STEP - PULSE_CYCLE}s` }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// 2. Boot Sequence (title-demo)
const BootSequence = ({ onComplete }) => {
  const [mounted, setMounted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const gridControls = useAnimation();
  const gridRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const run = async () => {
      await new Promise(r => setTimeout(r, 200));
      gridControls.start({
        backgroundPositionY: ['0px', '2000px'],
        transition: { duration: 1.5, ease: gameEase },
      });
      setTimeout(() => {
        gridControls.start({
          backgroundPositionY: ['2000px', '12000px'],
          transition: { duration: 200, ease: 'linear', repeat: Infinity },
        });
      }, 1250);
    };
    run();
  }, [mounted, gridControls]);

  const triggerExit = () => {
    if (isExiting) return;
    playSFX(SFX_GAME_START);
    gridControls.stop();
    // Snap backgroundPositionY to nearest 80px multiple so dots align with AmbientGrid on handoff
    if (gridRef.current) {
      const raw = parseFloat(gridRef.current.style.backgroundPositionY) || 0;
      const snapped = Math.round(raw / GRID_SPACING) * GRID_SPACING;
      gridRef.current.style.backgroundPositionY = `${snapped}px`;
    }
    setIsExiting(true);
    setTimeout(onComplete, 650);
  };

  if (!mounted) return null;

  const exitT = { duration: 0.7, ease: 'easeIn' };

  return (
    <motion.div
      initial={{ backgroundColor: '#000000', filter: 'brightness(0.5)' }}
      animate={isExiting ? { backgroundColor: 'rgba(10,10,12,0)' } : { backgroundColor: '#0a0a0c', filter: 'brightness(1)' }}
      transition={isExiting ? { duration: 0.65, ease: 'easeInOut' } : { duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-0 z-50 overflow-hidden font-sans text-white select-none cursor-pointer"
      onClick={triggerExit}
    >
      {/* 3D Perspective Floor Grid — flattens to top-down on exit (camera pan effect) */}
      <motion.div
        className="absolute bottom-0 left-0 w-full z-0 overflow-hidden pointer-events-none"
        initial={{ height: '50vh' }}
        animate={isExiting ? { height: '100vh' } : { height: '50vh' }}
        transition={isExiting ? { duration: 0.65, ease: 'easeInOut' } : { duration: 0 }}
        style={{ perspective: '800px' }}
      >
        <motion.div
          initial={{ opacity: 0, rotateX: 85, y: 50 }}
          animate={isExiting ? { opacity: 1, rotateX: 0, y: 0 } : { opacity: 1, rotateX: 72, y: 0 }}
          transition={isExiting ? { duration: 0.65, ease: 'easeInOut' } : { duration: 1.5, delay: 0.2, ease: gameEase }}
          className="absolute bottom-0 left-[-50%] w-[200%] h-[200vh]"
          style={{
            transformOrigin: 'bottom center',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 60%)',
            maskImage: 'linear-gradient(to top, black 0%, transparent 60%)',
          }}
        >
          <motion.div
            ref={gridRef}
            animate={gridControls}
            initial={{ backgroundPositionY: '0px' }}
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(255,176,0,0.8) 1.5px, transparent 2px)`,
              backgroundSize: '80px 80px',
              backgroundPositionX: 'center',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Background Accents & Crosshairs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={isExiting ? { duration: 0.4, ease: 'easeIn' } : { duration: 1.5, delay: 0.3, ease: gameEase }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[60vh] h-[60vh] rounded-full border border-white/5"
        />
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={isExiting ? { opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={isExiting ? { duration: 0.4, ease: 'easeIn' } : { duration: 1.5, delay: 0.4, ease: gameEase }}
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[58vh] h-[58vh] rounded-full border border-white/10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={isExiting ? { opacity: 0, scale: 0, rotate: -90 } : { opacity: 1, scale: 1, rotate: 0 }}
          transition={isExiting ? { duration: 0.35, ease: 'easeIn' } : { delay: 1, duration: 0.6, ease: 'backOut' }}
          className="absolute top-[25%] left-[35%] flex items-center"
        >
          <Plus strokeWidth={1} size={24} className="text-[#ffb000]" />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={isExiting ? { opacity: 0 } : { opacity: 1, x: 0 }}
            transition={isExiting ? { duration: 0.25 } : { delay: 1.3, duration: 0.4 }}
            className="text-[10px] ml-1 tracking-widest font-mono font-bold text-white/50"
          >
            478.8
          </motion.span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 90 }}
          animate={isExiting ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1, rotate: 0 }}
          transition={isExiting ? { duration: 0.35, ease: 'easeIn' } : { delay: 1.1, duration: 0.6, ease: 'backOut' }}
          className="absolute bottom-[30%] left-[40%] text-[#ffb000]"
        >
          <Plus strokeWidth={1} size={20} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isExiting ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
          transition={isExiting ? { duration: 0.35, ease: 'easeIn' } : { delay: 1.2, duration: 0.6, ease: 'backOut' }}
          className="absolute bottom-[32%] left-[58%] text-white/30"
        >
          <Plus strokeWidth={1} size={16} />
        </motion.div>
      </div>

      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98, filter: 'blur(15px)' }}
        animate={isExiting ? { opacity: 0, y: -20, filter: 'blur(15px)' } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={isExiting ? { duration: 0.8, ease: 'easeIn' } : { duration: 1.5, delay: 0.3, ease: gameEase }}
        className="absolute bottom-0 right-[-5%] md:right-[5%] h-[85vh] z-20 pointer-events-none"
      >
        <img
          src="avatar-full.png"
          alt="Jack Avatar"
          className="h-full w-auto object-contain object-bottom drop-shadow-2xl"
          style={{ filter: 'drop-shadow(-20px 20px 40px rgba(0,0,0,0.8)) brightness(0.9) contrast(1.05)' }}
        />
      </motion.div>

      {/* Typography */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[15%] md:right-[25%] z-30 flex flex-col items-end pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isExiting ? { opacity: 0, y: -10 } : { opacity: [0, 1, 0, 1], y: 0 }}
          transition={isExiting ? { duration: 0.4, ease: 'easeIn' } : { duration: 0.6, delay: 0.4, ease: 'linear' }}
          className="text-2xl md:text-3xl font-bold tracking-[0.2em] mb-1 text-white/80"
        >
          Portfolio
        </motion.div>
        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)', y: 20 }}
          animate={isExiting ? { opacity: 0, clipPath: 'inset(0% 0 100% 0)', y: -20 } : { opacity: 1, clipPath: 'inset(0% 0 0 0)', y: 0 }}
          transition={isExiting ? { duration: 0.6, ease: 'easeIn' } : { duration: 0.9, delay: 0.5, ease: gameEase }}
          className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none drop-shadow-lg text-[#ffb000]"
        >
          Jack Yeoh
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isExiting ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={isExiting ? { duration: 0.4, ease: 'easeIn' } : { duration: 1, delay: 0.8, ease: 'circOut' }}
          className="absolute -right-8 top-12 w-[120%] h-32 border border-white/20 origin-right -z-10"
        />
      </div>

      {/* Neon Glitch Bar */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0, filter: 'brightness(2)' }}
        animate={isExiting ? { scaleX: 0, opacity: 0 } : { scaleX: 1, opacity: 1, filter: 'brightness(1)' }}
        transition={isExiting ? { duration: 0.5, ease: 'easeIn' } : { duration: 0.7, delay: 0.6, ease: gameEase }}
        className="absolute top-[48%] left-0 w-[80%] h-12 md:h-16 bg-[#18181c] border-y border-[#ffb000]/20 z-10 origin-left flex items-center shadow-[0_5px_20px_rgba(0,0,0,0.5)]"
      >
        <div className="h-full w-48 md:w-64 relative bg-[#222228] overflow-hidden border-r border-[#ffb000]/30">
          <motion.div
            initial={{ x: '-100%' }} animate={{ x: '0%' }}
            transition={{ duration: 1, delay: 0.7, ease: 'circOut' }}
            className="absolute inset-0 opacity-50"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,176,0,0.1) 2px, rgba(255,176,0,0.1) 4px)' }}
          />
          <div className="absolute top-2 left-2 w-16 h-4 bg-[#ffb000]/20" />
          <div className="absolute bottom-2 left-12 w-24 h-2 bg-[#ffb000]/20" />
          <div className="absolute bottom-1 left-2 flex gap-1">
            <div className="w-2 h-2 bg-[#ffb000]/40" />
            <div className="w-2 h-2 bg-[#ffb000]/40" />
            <div className="w-2 h-2 bg-[#ffb000]/40" />
          </div>
        </div>
      </motion.div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-40 pointer-events-none">
        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={isExiting ? { opacity: 0 } : { opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            transition={isExiting ? { duration: 0.3 } : { duration: 0.6, delay: 1.3, ease: 'easeOut' }}
            className="text-[10px] md:text-xs font-bold tracking-widest text-white/50 font-mono"
          >
            {`VER.${getSysVer()} // BUILD_C5769412`}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={isExiting ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1, y: 0 }}
          transition={isExiting ? exitT : { duration: 0.5, delay: 1.2, type: 'spring', stiffness: 200 }}
        >
          <TriangleAlert size={32} strokeWidth={1.5} className="text-[#ffb000]" />
        </motion.div>
      </div>

      {/* Click anywhere hint */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 text-white/30 text-[10px] uppercase tracking-widest text-center pointer-events-none"
        style={{ bottom: '25%' }}
        initial={{ opacity: 0 }}
        animate={isExiting ? { opacity: 0 } : { opacity: 0.5 }}
        transition={isExiting ? { duration: 0.2 } : { delay: 1.5 }}
      >
        [ click anywhere to enter ]
      </motion.div>
    </motion.div>
  );
};

// 3. The Solar System Hub (Macro View)
const SystemView = ({ onSelectNode }) => {
  const [globalAngle, setGlobalAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 800 });
  const [isAiExpanded, setIsAiExpanded] = useState(false);
  const requestRef = useRef();

  useEffect(() => {
    const handleResize = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIntroReady(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const animate = () => {
      if (!isPaused) setGlobalAngle(prev => prev + 0.0015);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused]);

  const isMobile = windowSize.w < 768;

  return (
    <motion.div
      key="system-view"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: gameEase }}
      className="absolute inset-0 z-10 flex items-center justify-center"
    >
      {/* --- ABOUT + AI LOG PANEL (bottom left) --- */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: gameEase }}
        className="absolute bottom-6 md:bottom-8 left-6 md:left-8 w-[85vw] md:w-[380px] z-50 pointer-events-auto flex flex-col gap-3"
      >
        {/* Terminal.User_Profile */}
        <motion.div
          className="p-5 border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.2, delay: 0.4, ease: gameEase }}
        >
          {/* Corner accents */}
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ffb000]" />
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ffb000]" />

          <h2 className="text-xs font-bold tracking-[0.2em] text-[#ffb000] mb-4 uppercase flex items-center gap-2">
            <User size={14} className="animate-pulse" />
            Terminal.User_Profile
          </h2>

          <div className="flex gap-4 items-start">
            {/* Tactical ID photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'brightness(2) blur(5px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'brightness(1) blur(0px)' }}
              transition={{ duration: 0.8, delay: 1.2, ease: gameEase }}
              className="w-16 h-20 shrink-0 border border-white/20 bg-black relative overflow-hidden flex-shrink-0 cursor-crosshair"
            >
              {/* Scan-line sweep */}
              <motion.div
                animate={{ y: [-80, 80] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-x-0 h-2 bg-white/5 z-30 pointer-events-none"
              />
              {/* Orange tint + scanlines — fade on hover */}
              <div className="absolute inset-0 bg-[#ffb000]/20 mix-blend-color z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px] z-20 pointer-events-none opacity-50 transition-opacity duration-300 group-hover:opacity-0" />
              <img
                src="selfie.png"
                alt="Jack Yeoh"
                className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-500"
              />
            </motion.div>

            <div className="flex flex-col gap-3 min-w-0">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="text-xs text-gray-300 leading-relaxed font-mono opacity-90"
              >
                Technical Game Designer bridging the gap between creative design and technical execution. I specialize in systems design, UI/UX, and rapid prototyping to build compelling, polished experiences.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.6, ease: gameEase }}
                className="flex flex-col gap-1.5 border-t border-white/10 pt-2"
              >
                <a
                  href="mailto:jackyeoh0808@gmail.com"
                  className="flex items-center gap-2 text-[10px] text-white/50 hover:text-[#ffb000] transition-colors font-mono uppercase tracking-widest"
                >
                  <Mail size={11} /> jackyeoh0808@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/yeoh-xin-16956878/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] text-white/50 hover:text-[#ffb000] transition-colors font-mono uppercase tracking-widest"
                >
                  <Linkedin size={11} /> LinkedIn Profile <Link size={10} className="ml-0.5 opacity-50" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* AI_Usage_Log.txt accordion */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-xl overflow-hidden shadow-2xl"
        >
          <button
            onClick={() => setIsAiExpanded(!isAiExpanded)}
            className="w-full flex justify-between items-center p-4 hover:bg-white/[0.05] transition-colors"
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 flex items-center gap-2">
              <FileText size={14} />
              AI_Usage_Log.txt
            </span>
            <ChevronDown className={`transition-transform duration-300 text-white/40 ${isAiExpanded ? 'rotate-180' : ''}`} size={14} />
          </button>

          <AnimatePresence>
            {isAiExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-[11px] text-gray-400 font-mono leading-relaxed border-t border-white/5 mt-2">
                  <div className="italic border-l-2 border-white/20 pl-3 py-1 flex flex-col gap-3">
                    <p>"Yes, a lot of things in this website and my recent work involve usage of AI.</p>
                    <p>But most of the time I'm using them to prototype/experiment faster or accelerate development — what I make remains authentically mine.</p>
                    <p>I take great joy (and ownership) in building, and strongly believe the things I make are valuable because they are uniquely mine.</p>
                    <p>The countless hours spent perfecting motion, debating designs — while AI-assisted — also represent the part of me I inject into my projects."</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Center Avatar (The "Sun") — behind all orbit rings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none mt-[10vh]"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 0.3, ease: gameEase }}
      >
        <img
          src="avatar-full.png"
          alt="Jack Yeoh"
          className="h-[65vh] w-auto object-contain drop-shadow-[0_0_60px_rgba(0,0,0,0.9)]"
          style={{ filter: 'brightness(0.6) contrast(1.3) grayscale(0.2) drop-shadow(0 0 40px rgba(255,176,0,0.08))' }}
        />
      </motion.div>

      {/* Orbits and Nodes */}
      <motion.div
        className={`relative w-full h-full flex items-center justify-center ${isMobile ? '-mt-[35vh]' : 'mt-[10vh]'}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: gameEase }}
      >
        {ORBIT_DATA.map((orb, i) => {
          const { rx, ry } = getOrbitRadii(orb.ringIndex, isMobile);
          const angle = orb.baseAngle + globalAngle;
          const x = Math.cos(angle) * rx;
          const y = Math.sin(angle) * ry;
          const zIndex = y > 0 ? 30 : 10;
          const isRightSide = Math.cos(angle) >= 0;

          return (
            <React.Fragment key={orb.id}>
              {/* The Geometric Ring */}
              <div
                className="absolute border border-white/[0.05] pointer-events-none left-1/2 top-1/2"
                style={{
                  width: rx * 2,
                  height: ry * 2,
                  borderRadius: '50%',
                  marginLeft: -rx,
                  marginTop: -ry,
                  borderStyle: i % 2 === 0 ? 'dashed' : 'solid'
                }}
              />

              {/* The Orbital Trail (Comet Tail) */}
              {Array.from({ length: 20 }).map((_, j) => {
                const delayAngle = angle - (j * 0.02);
                const tx = Math.cos(delayAngle) * rx;
                const ty = Math.sin(delayAngle) * ry;
                const trailZIndex = ty > 0 ? 29 : 9;
                const progress = 1 - (j / 20);
                const opacity = Math.pow(progress, 2) * 0.7;
                const size = 1 + (progress * 2);
                return (
                  <motion.div
                    key={`trail-${orb.id}-${j}`}
                    className="absolute rounded-full pointer-events-none left-1/2 top-1/2"
                    style={{
                      x: tx, y: ty, width: size, height: size,
                      backgroundColor: orb.color, opacity: opacity,
                      boxShadow: `0 0 ${size*2}px ${orb.color}`, zIndex: trailZIndex,
                      marginLeft: -(size/2), marginTop: -(size/2)
                    }}
                  />
                );
              })}

              {/* The Interactive Node */}
              <motion.button
                onClick={() => { playSFX(SFX_CLICK); onSelectNode(orb); }}
                onMouseEnter={() => { if (introReady) setIsPaused(true); }}
                onMouseLeave={() => setIsPaused(false)}
                whileHover={{ scale: 1.1 }}
                className="absolute flex items-center justify-center group cursor-pointer left-1/2 top-1/2"
                style={{ x, y, zIndex, width: isMobile ? 36 : 24, height: isMobile ? 36 : 24, marginLeft: isMobile ? -18 : -12, marginTop: isMobile ? -18 : -12 }}
              >
                <div className="absolute inset-0 border border-white/20 rotate-45 group-hover:border-white transition-colors duration-300" />
                <div className={isMobile ? 'w-3 h-3' : 'w-2 h-2'} style={{ backgroundColor: orb.color, boxShadow: `0 0 15px ${orb.color}` }} />

                {/* Smart Text Label — extends outward based on orbit position */}
                <motion.div
                  key={isRightSide ? 'r' : 'l'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.25, ease: 'easeIn' }}
                  className={`absolute top-1/2 -translate-y-1/2 flex items-center group-hover:!opacity-100 pointer-events-none ${isRightSide ? 'left-8 md:left-6 flex-row' : 'right-8 md:right-6 flex-row-reverse'}`}
                >
                  <div className={`hidden md:block w-10 h-[1px] ${isRightSide ? 'bg-gradient-to-r mr-3' : 'bg-gradient-to-l ml-3'} from-white/40 to-transparent`} />
                  <div className={`flex flex-col ${isRightSide ? 'items-start text-left' : 'items-end text-right'} max-w-[90px] md:max-w-[200px]`}>
                    <span className="text-[10px] md:text-sm font-bold tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">
                      {orb.title}
                    </span>
                    <span className="hidden md:block text-[10px] tracking-widest mt-0.5 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ color: orb.color }}>
                      {orb.orbSubtitle ?? orb.subtitle}
                    </span>
                  </div>
                </motion.div>
              </motion.button>
            </React.Fragment>
          );
        })}

        {/* Static "My Skills" label at orbit center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center gap-1 select-none" style={{ marginTop: isMobile ? 0 : '10vh' }}>
          <span className="text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-white/20 font-mono">my skills</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 4. The Planet View (Zoomed Micro View)
const PlanetView = ({ orb, onBack, onSelectSubNode }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  const triggerBack = () => {
    playSFX(SFX_CLICK);
    setIsLeaving(true);
    onBack(); // immediate — circle exit and page exit animate together
  };

  return (
    <motion.div
      key="planet-view"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: gameEase }}
      className="absolute inset-0 z-20 flex"
    >
      {/* Background Subtle Tint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 20% 50%, ${orb.color}, transparent 60%)` }}
      />

      {/* === MOBILE LAYOUT === */}
      <div className="md:hidden w-full h-full overflow-y-auto z-20 relative custom-scrollbar">
        <div className="min-h-full flex flex-col justify-center px-6 py-20 gap-8">
          <motion.button
            onClick={triggerBack}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center w-fit text-xs font-bold tracking-widest uppercase border border-white/20 bg-black/50 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/10 transition-all group"
          >
            <ChevronLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Return to System
          </motion.button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-3 mb-2">
              <Hexagon size={14} style={{ color: orb.color }} />
              <span className="text-xs tracking-[0.3em] text-white/50 uppercase">DATA CLUSTER</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-white mb-2">{orb.title}</h1>
            <h2 className="text-sm tracking-widest" style={{ color: orb.color }}>{orb.subtitle}</h2>
          </motion.div>
          <div className="flex flex-col gap-6">
            {orb.subNodes.map((node, i) => {
              const isUnclickable = node.isUnclickable;
              return (
                <motion.button
                  key={node.id}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                  onClick={() => !isUnclickable && (playSFX(SFX_CLICK), onSelectSubNode(node))}
                  className={`flex items-center gap-4 text-left ${isUnclickable ? 'cursor-default opacity-30' : 'cursor-pointer group'}`}
                >
                  <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 border rotate-45 transition-all ${isUnclickable ? 'border-white/10' : 'border-white/20 bg-black/80 group-hover:border-white group-hover:bg-white/10'}`}>
                    <div className="w-1.5 h-1.5" style={{ backgroundColor: isUnclickable ? 'transparent' : orb.color }} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-lg font-bold tracking-wider transition-colors ${isUnclickable ? 'text-gray-600' : 'text-white group-hover:text-[#ffb000]'}`}>{node.title}</span>
                    <span className={`text-[10px] tracking-[0.2em] uppercase ${isUnclickable ? 'text-gray-600' : 'text-white/50'}`}>{node.desc}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* === DESKTOP LAYOUT === */}
      {/* Left Side: The "Planet" and Sub-nodes */}
      <div className="hidden md:flex relative w-[60%] h-full items-center">

        {/* Massive Geometric Sphere Arc (The Planet) */}
        <motion.div
          initial={{ x: '-50%', opacity: 0, rotate: -30 }}
          animate={isLeaving ? { x: '-130%', opacity: 0, rotate: -25 } : { x: '-30%', opacity: 1, rotate: 0 }}
          transition={isLeaving ? { duration: 0.6, ease: gameEase } : { duration: 1.2, ease: gameEase }}
          className="absolute left-0 w-[80vh] h-[80vh] rounded-full border border-white/10 flex items-center justify-end"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
            className="absolute inset-0 rounded-full border-[2px] border-dashed border-white/[0.05]"
            style={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 rounded-full border border-white/[0.02]" style={{ transform: 'scale(1.15)' }} />
          <div className="absolute inset-0 rounded-full opacity-20" style={{ background: `radial-gradient(circle at right, ${orb.color}, transparent 70%)` }} />
        </motion.div>

        {/* Content row — flex so info and sub-nodes never overlap */}
        <div className="relative z-10 flex items-center w-full pl-[8%] pr-4 gap-10">
          {/* Planet Core Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex-shrink-0 max-w-[200px] md:max-w-xs"
          >
            <div className="flex items-center gap-3 mb-2">
              <Hexagon size={16} style={{ color: orb.color }} className="animate-spin-slow" />
              <span className="text-xs tracking-[0.3em] text-white/50 uppercase">DATA CLUSTER</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none drop-shadow-lg text-white mb-2">{orb.title}</h1>
            <h2 className="text-sm md:text-lg tracking-widest mb-6" style={{ color: orb.color }}>{orb.subtitle}</h2>
            <button
              onClick={triggerBack}
              className="group flex items-center text-xs font-bold tracking-widest uppercase border border-white/20 bg-black/50 px-4 md:px-6 py-3 hover:bg-white hover:text-black transition-all whitespace-nowrap"
            >
              <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Return to System
            </button>
          </motion.div>

          {/* Sub-Nodes */}
          <div className="flex flex-col gap-10 md:gap-12">
            {orb.subNodes.map((node, i) => {
              const isUnclickable = node.isUnclickable;
              return (
                <motion.button
                  key={node.id}
                  initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.1), duration: 0.8, ease: gameEase }}
                  onClick={() => !isUnclickable && (playSFX(SFX_CLICK), onSelectSubNode(node))}
                  className={`group relative flex items-center ${isUnclickable ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {/* SVG Connecting Line to Planet */}
                  <svg className={`absolute right-full w-32 h-20 pointer-events-none transition-opacity ${isUnclickable ? 'opacity-10' : 'opacity-30 group-hover:opacity-100'}`} style={{ top: '50%', transform: 'translateY(-50%)' }}>
                    <path d="M 0 10 Q 64 10 128 40" fill="transparent" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-white" />
                  </svg>
                  {/* Node Icon */}
                  <div className={`relative flex items-center justify-center w-8 h-8 mr-4 border rotate-45 transition-all flex-shrink-0 ${isUnclickable ? 'bg-transparent border-white/10' : 'bg-black/80 border-white/20 group-hover:border-white group-hover:bg-white/10'}`}>
                    {!isUnclickable && (
                      <div
                        className="absolute inset-0 border-2 opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none"
                        style={{ borderColor: orb.color }}
                      />
                    )}
                    <div className="w-1.5 h-1.5" style={{ backgroundColor: isUnclickable ? 'transparent' : orb.color }} />
                  </div>
                  {/* Node Text */}
                  <div className="flex flex-col text-left">
                    <span className={`text-lg md:text-xl font-bold tracking-wider transition-colors ${isUnclickable ? 'text-gray-600' : 'text-white group-hover:text-[#ffb000]'}`}>{node.title}</span>
                    <span className={`text-[10px] tracking-[0.2em] uppercase ${isUnclickable ? 'text-gray-600' : 'text-white/50'}`}>{node.desc}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side: Shifted Avatar View — desktop only */}
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1.05 }}
        transition={{ duration: 1, delay: 0.2, ease: gameEase }}
        className="hidden md:block absolute bottom-0 right-[-10%] md:right-[5%] h-[90vh] z-10 pointer-events-none drop-shadow-[-20px_0px_50px_rgba(0,0,0,0.9)]"
      >
        <img
          src="avatar-full.png"
          alt="Jack Avatar"
          className="h-full w-auto object-contain object-bottom"
          style={{ filter: 'brightness(0.7) contrast(1.2)' }}
        />
        <div
          className="absolute inset-0 mix-blend-color pointer-events-none opacity-30"
          style={{ background: `linear-gradient(to right, ${orb.color}, transparent)` }}
        />
      </motion.div>
    </motion.div>
  );
};

// 5. Numerical Planet View — inline document reader (demo-2 design)
const NumericalPlanetView = ({ orb, onBack }) => {
  const [activeDoc, setActiveDoc] = useState(null);
  const [isContextExpanded, setIsContextExpanded] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const hasOpenedBefore = useRef(false);

  const openDoc = (node) => {
    playSFX(SFX_CLICK);
    if (activeDoc?.id === node.id) { setActiveDoc(null); return; }
    setIsContextExpanded(true);
    hasOpenedBefore.current = true;
    setActiveDoc(node);
  };

  const triggerBack = () => {
    playSFX(SFX_CLICK);
    setIsLeaving(true);
    onBack(); // immediate — circle exit and page exit animate together
  };

  return (
    <motion.div
      key="planet-view"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: gameEase }}
      className="absolute inset-0 z-20 flex"
    >
      {/* Background tint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.1 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(circle at 20% 50%, ${orb.color}, transparent 60%)` }}
      />

      {/* Full-screen blur overlay — click anywhere outside doc to close */}
      <AnimatePresence>
        {activeDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: gameEase }}
            className="absolute inset-0 z-[25] bg-[#0a0a0c]/60 backdrop-blur-sm pointer-events-auto cursor-pointer"
            onClick={() => { playSFX(SFX_CLICK); setActiveDoc(null); }}
          />
        )}
      </AnimatePresence>

      {/* === MOBILE LAYOUT === */}
      <div className="md:hidden w-full h-full overflow-y-auto z-20 relative custom-scrollbar pointer-events-auto">
        <div className="min-h-full flex flex-col justify-center px-6 py-20 gap-8">
          <motion.button
            onClick={triggerBack}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center w-fit text-xs font-bold tracking-widest uppercase border border-white/20 bg-black/50 px-4 py-2.5 text-white/60 hover:text-white hover:bg-white/10 transition-all group"
          >
            <ChevronLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Return to System
          </motion.button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-3 mb-2">
              <Hexagon size={14} style={{ color: orb.color }} />
              <span className="text-xs tracking-[0.3em] text-white/50 uppercase">Data Cluster</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-white mb-2">{orb.title}</h1>
            <h2 className="text-sm tracking-widest leading-relaxed" style={{ color: orb.color }}>{orb.subtitle}</h2>
          </motion.div>
          <div className="flex flex-col gap-6">
            {orb.subNodes.map((node, i) => {
              const isActive = activeDoc?.id === node.id;
              const isUnclickable = node.isUnclickable;
              return (
                <motion.button
                  key={node.id}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.08 }}
                  onClick={() => !isUnclickable && openDoc(node)}
                  className={`flex items-center gap-4 text-left ${isUnclickable ? 'cursor-default opacity-30' : 'cursor-pointer group'}`}
                >
                  <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 border rotate-45 transition-all ${isActive ? 'border-white bg-white/10 scale-110' : (isUnclickable ? 'border-white/10' : 'border-white/20 bg-black/80 group-hover:border-white group-hover:bg-white/5')}`}>
                    <div className="w-1.5 h-1.5" style={{ backgroundColor: isUnclickable ? 'transparent' : orb.color, boxShadow: isActive ? `0 0 10px ${orb.color}` : 'none' }} />
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-lg font-bold tracking-wider transition-colors ${isActive ? 'text-white' : (isUnclickable ? 'text-gray-600' : 'text-gray-400 group-hover:text-white')}`}>{node.title}</span>
                    <span className={`text-[10px] tracking-[0.2em] uppercase mt-0.5 ${isActive ? '' : (isUnclickable ? 'text-gray-600' : 'text-white/40')}`} style={{ color: isActive ? orb.color : undefined }}>{node.desc}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* === DESKTOP LAYOUT === */}
      {/* Left Side: Planet + Sub-nodes */}
      <div className="hidden md:flex relative w-full md:w-[50%] h-full items-center z-20">

        {/* Planet Arc */}
        <motion.div
          initial={{ x: '-50%', opacity: 0, rotate: -30 }}
          animate={isLeaving ? { x: '-130%', opacity: 0, rotate: -25 } : { x: '-30%', opacity: 1, rotate: 0 }}
          transition={isLeaving ? { duration: 0.6, ease: gameEase } : { duration: 1.2, ease: gameEase }}
          className="absolute left-0 w-[80vh] h-[80vh] rounded-full border border-white/10 flex items-center justify-end pointer-events-none z-10"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 90, ease: 'linear', repeat: Infinity }}
            className="absolute inset-0 rounded-full border-[2px] border-dashed border-white/[0.05]"
            style={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 rounded-full border border-white/[0.02]" style={{ transform: 'scale(1.15)' }} />
          <div className="absolute inset-0 rounded-full opacity-20" style={{ background: `radial-gradient(circle at right, ${orb.color}, transparent 70%)` }} />
        </motion.div>

        {/* Planet Core Info */}
        <div className="absolute left-[10%] z-10 max-w-[300px] pointer-events-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-2">
              <Hexagon size={16} style={{ color: orb.color }} className="animate-spin-slow" />
              <span className="text-xs tracking-[0.3em] text-white/50 uppercase">Data Cluster</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none drop-shadow-lg text-white mb-4">{orb.title}</h1>
            <h2 className="text-sm tracking-widest mb-8 leading-relaxed" style={{ color: orb.color }}>{orb.subtitle}</h2>
            <button
              onClick={triggerBack}
              className="group flex items-center text-xs font-bold tracking-widest uppercase border border-white/20 bg-black/50 px-6 py-3 hover:bg-white hover:text-black transition-all"
            >
              <ChevronLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
              Return to System
            </button>
          </motion.div>
        </div>

        {/* Sub-Nodes */}
        <div className="absolute left-[60%] lg:left-[65%] flex flex-col gap-12 z-20 pointer-events-auto">
          {orb.subNodes.map((node, i) => {
            const isActive = activeDoc?.id === node.id;
            const isUnclickable = node.isUnclickable;
            return (
              <motion.button
                key={node.id}
                onClick={() => !isUnclickable && openDoc(node)}
                initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: gameEase }}
                className={`group relative flex items-center text-left ${isUnclickable ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {/* "Click to access" hint on first item */}
                {i === 0 && !activeDoc && !isUnclickable && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute left-[100%] ml-4 px-2 py-1 bg-white/10 border border-white/20 text-[9px] tracking-widest text-white/70 animate-pulse whitespace-nowrap pointer-events-none"
                  >
                    [ CLICK TO ACCESS ]
                  </motion.div>
                )}

                {/* Connecting line */}
                <svg viewBox="0 0 256 40" preserveAspectRatio="none"
                  className={`absolute right-full w-48 md:w-64 lg:w-[300px] h-20 pointer-events-none transition-opacity ${isActive ? 'opacity-80' : (isUnclickable ? 'opacity-10' : 'opacity-20 group-hover:opacity-60')}`}
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  <path d="M 0 10 Q 128 10 256 40" fill="transparent"
                    stroke={isActive ? orb.color : 'currentColor'} strokeWidth="1" strokeDasharray="4 4"
                    className={isActive ? '' : 'text-white'}
                  />
                </svg>

                {/* Node icon — hover border animates around diamond only */}
                <div className={`relative flex items-center justify-center w-8 h-8 mr-4 border rotate-45 transition-all flex-shrink-0 ${isActive ? 'border-white bg-white/10 scale-110' : (isUnclickable ? 'bg-transparent border-white/10' : 'bg-black/80 border-white/20 group-hover:border-white group-hover:bg-white/5')}`}>
                  {!isUnclickable && (
                    <div
                      className="absolute inset-0 border-2 opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-none"
                      style={{ borderColor: orb.color }}
                    />
                  )}
                  <div className="w-1.5 h-1.5" style={{ backgroundColor: isUnclickable ? 'transparent' : orb.color, boxShadow: isActive ? `0 0 10px ${orb.color}` : 'none' }} />
                </div>

                {/* Node text */}
                <div className="flex flex-col whitespace-nowrap">
                  <span className={`text-xl font-bold tracking-wider transition-colors ${isActive ? 'text-white' : (isUnclickable ? 'text-gray-600' : 'text-gray-400 group-hover:text-white')}`}>
                    {node.title}
                  </span>
                  <span className={`text-[10px] tracking-[0.2em] uppercase mt-0.5 ${isActive ? '' : (isUnclickable ? 'text-gray-600' : 'text-white/40')}`}
                    style={{ color: isActive ? orb.color : undefined }}
                  >
                    {node.desc}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Right Side: Avatar — desktop only */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: gameEase }}
        className="hidden md:block absolute bottom-0 right-[-10%] md:right-[5%] h-[90vh] z-10 pointer-events-none drop-shadow-[-20px_0px_50px_rgba(0,0,0,0.9)]"
      >
        <img src="avatar-full.png" alt="Jack Avatar" className="h-full w-auto object-contain object-bottom" style={{ filter: 'brightness(0.7) contrast(1.2)' }} />
        <div className="absolute inset-0 mix-blend-color pointer-events-none opacity-30" style={{ background: `linear-gradient(to right, ${orb.color}, transparent)` }} />
      </motion.div>

      {/* Document Reader — appears over avatar simultaneously with blur */}
      <AnimatePresence>
        {activeDoc && (
          <motion.div
            key="document-view"
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: gameEase }}
            className="absolute inset-x-[3%] top-[10%] bottom-[3%] md:inset-auto md:right-[5%] md:top-[15%] md:w-[45%] md:h-[70vh] flex flex-col z-[30] pointer-events-auto bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="relative flex justify-between items-center gap-4 p-6 border-b border-white/10 bg-white/[0.02]">
              <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: orb.color }} />
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.2em] text-white/40 mb-2 font-mono flex items-center">
                  <span className="w-2 h-2 mr-2 flex-shrink-0 animate-pulse" style={{ backgroundColor: orb.color }} />
                  FILE ACCESS: {activeDoc.id.toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-widest text-white truncate">{activeDoc.title}</h3>
              </div>
              {(() => {
                const linkBlock = activeDoc.content.find(b => b.type === 'link');
                return linkBlock ? (
                  <a
                    href={linkBlock.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-2 border border-white/20 hover:border-white/50 text-white/60 hover:text-white text-[10px] tracking-widest uppercase transition-all group"
                  >
                    <ExternalLink size={12} style={{ color: orb.color }} className="group-hover:scale-110 transition-transform" />
                    View Relevant Worksheet
                  </a>
                ) : null;
              })()}
            </div>

            {/* Terminal Content */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
              {activeDoc.content.length === 0 ? (
                <div className="text-white/30 font-mono text-sm tracking-widest text-center mt-20">NO DATA FOUND FOR THIS NODE.</div>
              ) : (
                activeDoc.content.map((block, idx) => {
                  if (block.type === 'context') {
                    return (
                      <div key={idx} className="border border-white/10 bg-white/[0.02] mb-2 rounded-sm overflow-hidden">
                        <button
                          onClick={() => setIsContextExpanded(!isContextExpanded)}
                          className="w-full flex justify-between items-center p-4 hover:bg-white/[0.05] transition-colors"
                        >
                          <span className="text-xs font-bold tracking-widest uppercase text-white/70 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: orb.color }} />
                            {block.title}
                          </span>
                          <ChevronDown className={`transition-transform duration-300 text-white/50 ${isContextExpanded ? 'rotate-180' : ''}`} size={16} />
                        </button>
                        <motion.div
                          initial={false}
                          animate={{ maxHeight: isContextExpanded ? 800 : 0, opacity: isContextExpanded ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 text-sm text-gray-400 font-mono leading-relaxed border-t border-white/5 mt-2 flex flex-col gap-3">
                            {block.paragraphs.map((p, pIdx) => <p key={pIdx}>{p}</p>)}
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                  if (block.type === 'header') {
                    return <h4 key={idx} className="text-lg font-bold tracking-widest uppercase mt-4" style={{ color: orb.color }}>{block.text}</h4>;
                  }
                  if (block.type === 'list') {
                    return (
                      <ul key={idx} className="flex flex-col gap-3">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-300 font-mono opacity-80">
                            <span className="mr-3 mt-1 text-xs" style={{ color: orb.color }}>►</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type === 'link') {
                    return null; // rendered in terminal header
                  }
                  return null;
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Block renderer for subNode.content
const renderBlock = (block, idx, color) => {
  if (block.type === 'header') return (
    <h3 key={idx} className="text-base font-bold tracking-widest uppercase mt-6 mb-2 first:mt-0" style={{ color }}>{block.text}</h3>
  );
  if (block.type === 'paragraph') return (
    <p key={idx} className="text-sm text-gray-300 leading-relaxed font-mono">{block.text}</p>
  );
  if (block.type === 'list') return (
    <ul key={idx} className="flex flex-col gap-2">
      {block.items.map((item, i) => {
        const colonIdx = item.indexOf(': ');
        const label = colonIdx !== -1 ? item.slice(0, colonIdx) : null;
        const body  = colonIdx !== -1 ? item.slice(colonIdx + 2) : item;
        return (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-mono leading-relaxed">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span>{label && <span className="font-bold" style={{ color }}>{label}: </span>}{body}</span>
          </li>
        );
      })}
    </ul>
  );
  if (block.type === 'button') return (
    <a key={idx} href={block.url} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-3 border font-bold text-sm tracking-widest uppercase transition-all group mt-2"
      style={{ borderColor: color, color }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = color; e.currentTarget.style.color = '#000'; }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = color; }}
    >
      <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
      {block.text}
    </a>
  );
  if (block.type === 'image') return block.url ? (
    <div key={idx} className={`w-full ${block.height || 'h-40'} mt-2 overflow-hidden rounded-sm border border-white/10 bg-black/40`}>
      <img src={block.url} alt={block.text} className={`w-full h-full ${block.fit === 'contain' ? 'object-contain' : 'object-cover'} object-center`} />
    </div>
  ) : (
    <div key={idx} className={`w-full ${block.height || 'h-40'} bg-black/60 border border-white/10 flex items-center justify-center rounded-sm mt-2`}>
      <span className="text-white/20 text-[10px] uppercase tracking-widest">{block.text}</span>
    </div>
  );
  if (block.type === 'image-grid') return (
    <div key={idx} className="grid grid-cols-3 gap-2 mt-2">
      {block.images.map((img, i) => (
        <div key={i} className="overflow-hidden rounded-sm border border-white/10 bg-black/40 aspect-video">
          <img src={img.url} alt={img.text} className="w-full h-full object-cover object-center" />
        </div>
      ))}
    </div>
  );
  if (block.type === 'metadata') return (
    <div key={idx} className="flex flex-col gap-px" style={{ backgroundColor: `${color}15` }}>
      {block.items.map(({ label, value }) => (
        <div key={label} className="bg-[#0d0d10] px-4 py-3">
          <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color }}>{label}</div>
          <div className="text-white text-sm font-bold">{value}</div>
        </div>
      ))}
    </div>
  );
  return null;
};

// 6. Project Detail View (sub-node deep dive)
const ProjectView = ({ orb, subNode, onBack }) => {
  const hasContent = subNode.content && subNode.content.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: gameEase }}
      className="relative w-full h-full overflow-y-auto z-20 custom-scrollbar"
    >
      <Analytics />
      <div className="max-w-4xl mx-auto px-8 md:px-12 pt-24 pb-24">

        {/* Back Button */}
        <button onClick={() => { playSFX(SFX_CLICK); onBack(); }} className="flex items-center text-white/50 hover:text-white transition-colors mb-10 w-fit group">
          <ChevronLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="tracking-widest text-sm font-bold uppercase">Return to {orb.title}</span>
        </button>

        {/* Title */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-1" style={{ color: orb.color }}>
          {subNode.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="text-sm tracking-widest text-gray-500 uppercase mb-2">{subNode.desc}</motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-xs tracking-[0.3em] mb-10 uppercase" style={{ color: orb.color }}>
          {orb.title} — {orb.subtitle}
        </motion.p>

        {hasContent ? (
          /* Rich subNode content */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            {subNode.content.map((block, idx) => {
              if (block.type === 'columns') {
                return (
                  <div key={idx} className="flex flex-col-reverse md:flex-row gap-8">
                    {/* Left: narrative content */}
                    <div className="flex-1 flex flex-col gap-4">
                      {block.left.map((b, i) => renderBlock(b, i, orb.color))}
                    </div>
                    {/* Right: metadata sidebar */}
                    <div className="md:w-56 flex-shrink-0 flex flex-col gap-4">
                      {block.right.map((b, i) => renderBlock(b, i, orb.color))}
                    </div>
                  </div>
                );
              }
              return renderBlock(block, idx, orb.color);
            })}
          </motion.div>
        ) : (
          /* Generic fallback — orb-level data */
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="w-full aspect-video bg-black/60 border rounded-sm flex items-center justify-center mb-10 overflow-hidden"
              style={{ borderColor: `${orb.color}30` }}>
              <div className="flex flex-col items-center gap-3 text-center px-8">
                <div className="w-12 h-12 rounded-full border flex items-center justify-center" style={{ borderColor: orb.color, color: orb.color }}>▶</div>
                <span className="text-white/30 text-xs uppercase tracking-widest">Hero Asset — Replace with looping GIF or ≤15s video</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-px mb-10" style={{ backgroundColor: `${orb.color}20` }}>
              {[{ label: 'Role', value: orb.role }, { label: 'Engine / Tools', value: orb.engine },
                { label: 'Duration', value: orb.duration }, { label: 'Team Size', value: orb.teamSize }]
                .map(({ label, value }) => (
                  <div key={label} className="bg-[#0a0a0c] px-6 py-4">
                    <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: orb.color }}>{label}</div>
                    <div className="text-white text-sm font-bold">{value}</div>
                  </div>
                ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-10">
              <h2 className="text-xs uppercase tracking-widest mb-4" style={{ color: orb.color }}>What I Built</h2>
              <ul className="space-y-3">
                {orb.contributions.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: orb.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h2 className="text-xs uppercase tracking-widest mb-4" style={{ color: orb.color }}>The Process</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {orb.processAssets.map(({ label, note }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-sm p-4 flex flex-col gap-3">
                    <div className="w-full aspect-video bg-black/50 rounded flex items-center justify-center">
                      <span className="text-white/20 text-[10px] uppercase tracking-widest text-center px-2">{note}</span>
                    </div>
                    <div className="text-white text-xs font-bold tracking-widest uppercase">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

      </div>
    </motion.div>
  );
};


// --- MAIN APP COMPONENT ---
const PRELOAD_ASSETS = ['avatar-full.png', 'selfie.png'];

export default function App() {
  const [assetsReady, setAssetsReady] = useState(false);
  const [appState, setAppState] = useState('boot'); // 'boot' | 'hub' | 'planet' | 'project'
  const [selectedOrb, setSelectedOrb] = useState(null);
  const [selectedSubNode, setSelectedSubNode] = useState(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const total = PRELOAD_ASSETS.length;
    const onDone = () => { if (++loaded >= total) setAssetsReady(true); };
    PRELOAD_ASSETS.forEach(src => {
      const img = new Image();
      img.onload = onDone;
      img.onerror = onDone; // don't block on broken assets
      img.src = src;
    });
  }, []);

  const audioRef = useRef(null);
  const bgmStarted = useRef(false);
  const [isMuted, setIsMuted] = useState(false);

  const startBGM = () => {
    if (bgmStarted.current || !audioRef.current) return;
    bgmStarted.current = true;
    audioRef.current.play().catch(() => {});
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.4;
    audio.play().then(() => {
      bgmStarted.current = true;
    }).catch(() => {
      const handler = () => { startBGM(); document.removeEventListener('click', handler); };
      document.addEventListener('click', handler);
      return () => document.removeEventListener('click', handler);
    });
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(m => !m);
  };

  useEffect(() => {
    const handler = (e) => {
      const el = e.target.closest('button, a');
      if (el && !el.contains(e.relatedTarget)) playSFX(SFX_HOVER, 0.4);
    };
    document.addEventListener('mouseover', handler);
    return () => document.removeEventListener('mouseover', handler);
  }, []);

  const handleBootComplete = () => {
    playSFX(SFX_WOOSH);
    setAppState('hub');
  };

  const handleSelectOrb = (orb) => {
    playSFX(SFX_WOOSH);
    setSelectedOrb(orb);
    setAppState('planet');
  };

  const handleSelectSubNode = (subNode) => {
    setSelectedSubNode(subNode);
    setAppState('project');
  };

  const handleBackToHub = () => {
    playSFX(SFX_WOOSH);
    setAppState('hub');
    setTimeout(() => setSelectedOrb(null), 500);
  };

  const handleBackToPlanet = () => {
    setAppState('planet');
    setTimeout(() => setSelectedSubNode(null), 500);
  };

  const replayIntro = () => {
    if (isGlitching) return;
    playSFX(SFX_CLICK);
    setIsGlitching(true);
    // Switch to boot once screen is solid black
    setTimeout(() => {
      setSelectedOrb(null);
      setSelectedSubNode(null);
      setAppState('boot');
    }, 650);
    // Keep glitch covering screen until hub has fully exited underneath
    setTimeout(() => setIsGlitching(false), 1200);
  };

  const themeColor = selectedOrb?.color || '#ffb000';

  if (!assetsReady) return <div className="fixed inset-0 bg-black" />;

  return (
    <div className="relative w-full h-screen bg-[#0a0a0c] overflow-hidden font-sans text-white select-none">
      <audio ref={audioRef} src="grand_project-ambitious-rangers-384187.mp3" preload="auto" />

      <AmbientGrid
        isZoomed={appState === 'planet' || appState === 'project'}
        isVisible={appState !== 'boot'}
      />


      {/* Global Top Bar */}
      {appState !== 'boot' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-start pointer-events-none bg-[#0a0a0c]/70 backdrop-blur-md border-b border-white/[0.04]"
        >
          <button
            onClick={() => appState !== 'hub' && (playSFX(SFX_CLICK), handleBackToHub())}
            className={`text-left group ${appState !== 'hub' ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none cursor-default'}`}
          >
            <h1
              className="text-xl md:text-2xl font-bold tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-opacity group-hover:opacity-70"
              style={{ color: themeColor }}
            >
              Jack Yeoh
            </h1>
            <div className="text-[10px] tracking-widest text-white/50 uppercase mt-1 transition-opacity group-hover:opacity-70">{`SYS.VER.${getSysVer()} // STATUS: NOMINAL`}</div>
          </button>
          <div className="flex items-center gap-1 pointer-events-auto">
            <button
              onClick={() => setShowCredits(true)}
              className="h-7 px-3 text-[9px] tracking-widest text-white/30 hover:text-white/70 transition-colors font-mono uppercase border border-white/10 hover:border-white/30"
            >
              Credits
            </button>
            <button onClick={toggleMute} className="h-7 w-7 flex items-center justify-center text-white/30 hover:text-white transition-colors border border-white/10 hover:border-white/30" title={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <button
              onClick={replayIntro}
              className="h-7 w-7 flex items-center justify-center text-white/30 hover:text-white transition-colors border border-white/10 hover:border-white/30"
              title="Reboot System"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Global Bottom Bar */}
      {appState !== 'boot' && (
        <div className="absolute bottom-6 left-6 right-6 flex justify-end items-end z-50 pointer-events-none">
          <TriangleAlert size={28} strokeWidth={1.5} className="text-[#ffb000]/70" />
        </div>
      )}

      {/* Credits Popup */}
      <AnimatePresence>
        {showCredits && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm pointer-events-auto"
            onClick={() => setShowCredits(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: gameEase }}
              className="relative bg-[#0d0d10] border border-white/20 p-8 max-w-lg w-full mx-4 cursor-default"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase font-mono mb-4">// CREDITS</div>
              <h2 className="text-xl font-black tracking-widest uppercase text-white mb-6">Asset Credits</h2>
              <div className="flex flex-col gap-4 text-[11px] font-mono text-white/50 leading-relaxed">
                <div>
                  <div className="text-white/20 uppercase tracking-widest text-[9px] mb-1">Music</div>
                  Music by <a href="https://pixabay.com/users/grand_project-19033897/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=384187" target="_blank" rel="noopener noreferrer" className="text-[#ffb000] hover:text-white transition-colors">Grand_Project</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=384187" target="_blank" rel="noopener noreferrer" className="text-[#ffb000] hover:text-white transition-colors">Pixabay</a>
                </div>
                <div>
                  <div className="text-white/20 uppercase tracking-widest text-[9px] mb-1">Sound Effects</div>
                  <div className="flex flex-col gap-2">
                    <div>Sound Effect by <a href="https://pixabay.com/users/u_o8xh7gwsrj-54433977/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=476372" target="_blank" rel="noopener noreferrer" className="text-[#ffb000] hover:text-white transition-colors">u_o8xh7gwsrj</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=476372" target="_blank" rel="noopener noreferrer" className="text-[#ffb000] hover:text-white transition-colors">Pixabay</a></div>
                    <div>Sound Effect by <a href="https://pixabay.com/users/foxboytails-49447089/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=317318" target="_blank" rel="noopener noreferrer" className="text-[#ffb000] hover:text-white transition-colors">FoxBoyTails</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=317318" target="_blank" rel="noopener noreferrer" className="text-[#ffb000] hover:text-white transition-colors">Pixabay</a></div>
                    <div>Sound Effect by <a href="https://pixabay.com/users/stereogenicstudio-50756880/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=357181" target="_blank" rel="noopener noreferrer" className="text-[#ffb000] hover:text-white transition-colors">Stereogenic Studio</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=357181" target="_blank" rel="noopener noreferrer" className="text-[#ffb000] hover:text-white transition-colors">Pixabay</a></div>
                    <div>Sound Effect by <a href="https://pixabay.com/users/u_o8xh7gwsrj-54433977/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=476367" target="_blank" rel="noopener noreferrer" className="text-[#ffb000] hover:text-white transition-colors">u_o8xh7gwsrj</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=476367" target="_blank" rel="noopener noreferrer" className="text-[#ffb000] hover:text-white transition-colors">Pixabay</a></div>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-[9px] tracking-widest uppercase text-white/20 font-mono text-center">
                tap anywhere to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glitch to black overlay — triggered on reboot */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            key="glitch"
            className="absolute inset-0 z-[200] pointer-events-none overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full"
                style={{ height: `${100 / 10}%`, top: `${i * (100 / 10)}%`, backgroundColor: i % 2 === 0 ? '#fff' : '#000' }}
                initial={{ scaleX: 0, x: 0, opacity: 0 }}
                animate={{ scaleX: [0, 1, 0.6, 1, 0], x: [0, -15 + i * 3, 8, -5, 0], opacity: [0, 0.9, 0.5, 0.9, 0] }}
                transition={{ duration: 0.45, delay: i * 0.025, ease: 'easeInOut' }}
              />
            ))}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0.6, 1] }}
              transition={{ duration: 0.65, ease: 'easeIn' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main State Router */}
      <AnimatePresence mode="wait">
        {appState === 'boot' && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}
        {appState === 'hub' && (
          <SystemView key="hub" onSelectNode={handleSelectOrb} />
        )}
        {appState === 'planet' && selectedOrb && (
          selectedOrb.id === 'numerical' ? (
            <NumericalPlanetView
              key="planet"
              orb={selectedOrb}
              onBack={handleBackToHub}
            />
          ) : (
            <PlanetView
              key="planet"
              orb={selectedOrb}
              onBack={handleBackToHub}
              onSelectSubNode={handleSelectSubNode}
            />
          )
        )}
        {appState === 'project' && selectedOrb && selectedSubNode && (
          <ProjectView
            key="project"
            orb={selectedOrb}
            subNode={selectedSubNode}
            onBack={handleBackToPlanet}
          />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.5); }

        .dot-grid-cell {
          width: ${GRID_SPACING}px;
          height: ${GRID_SPACING}px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dot-inner {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,176,0,0.8);
          animation-name: dotRowPulse;
          animation-duration: ${PULSE_CYCLE}s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-delay: var(--dot-delay, 0s);
        }
        @keyframes dotRowPulse {
          0%, 75%, 100% {
            transform: scale(1);
            background: rgba(255,176,0,0.8);
            box-shadow: none;
          }
          83% {
            transform: scale(2.8);
            background: rgba(255,176,0,1);
            box-shadow: 0 0 6px 2px rgba(255,176,0,0.4);
          }
        }
      `}} />
    </div>
  );
}
