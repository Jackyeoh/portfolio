/* =========================================================================
   PORTFOLIO CONTENT  — ported from the original ORBIT_DATA, restructured
   into a single unified schema so every inner view renders consistently.
   Plain global (no JSX) so it loads fast, before the React layer.

   LOCALIZATION: translatable fields are wrapped in L(en, zh) — a bilingual
   capsule { en, zh } resolved at render time by window.I18N.pick (see i18n.js).
   Proper nouns / product & tech names (Unity, UE5, Firebase, game titles…)
   stay as plain strings: pick() passes them through unchanged in any language.
   ========================================================================= */
(function () {
  const L = (en, zh) => ({ en, zh });

  // Section block schema used by the project deep-dive renderer:
  //   { kind:'lead',   text }
  //   { kind:'heading',text }
  //   { kind:'para',   text }
  //   { kind:'list',   items:[ "Label: body" | "body" ] }   // each item may be L()
  //   { kind:'image',  label, ratio:'wide'|'tall'|'square', span:1|2 }
  //   { kind:'gallery',items:[{label}] }
  //   { kind:'note',   text }   // muted callout (NDA, known-issue, etc.)
  // NOTE: list items keep a plain ASCII "Label: body" shape in BOTH languages
  // so the renderer's ": " split still bolds the label.

  // shared context blurb reused across the numerical worksheets
  const RUNIC_CONTEXT = L(
    'Runic Rush — a roguelike built on 2048 mechanics. Swiping moves runes; matches merge into stronger runes. Every swipe ticks down enemy ability cooldowns, forcing tactical decisions.',
    'Runic Rush —— 一款建立在 2048 机制之上的 Roguelike。滑动移动符文，相同符文合成更强的符文。每一次滑动都会递减敌人能力的冷却，迫使玩家做出战术取舍。'
  );

  const CONTACT = {
    name: 'Jack Yeoh',
    role: L('Technical Game Designer', '技术向游戏设计师'),
    blurb: L(
      'I find meaning in how things connect. To me, systems aren\'t just math—they\'re the invisible strings that create emotion. I obsess over the craft of every interaction, but always make time to step back, whether that\'s for a live game symphony or just navigating life with close friends.',
      '我着迷于事物之间的连接方式。对我而言，系统不只是数值——它们是创造情感的无形丝线。我执着于打磨每一次交互的手感，但也始终留出抽身回望的时间，无论是去听一场现场游戏交响乐，还是与挚友一起品味生活。'
    ),
    email: 'jackyeoh0808@gmail.com',
    linkedin: 'https://www.linkedin.com/in/yeoh-xin-16956878/',
    linkedinLabel: 'linkedin.com/in/yeoh-xin',
    birth: [1997, 7, 1], // Aug 1, 1997 (month 0-indexed) — drives the "system version"
  };

  const AI_NOTE = L(
    [
      'Yes — I use AI heavily to speed up coding and for rapid prototyping.',
      'But the actual systems design, the tuning, and all the time spent iterating on mechanics—that’s all me.',
      'I prioritize gameplay over features. I build things because I care about the craft, and the logic and feel of what I ship stays authentically mine.',
    ],
    [
      '是的——我大量使用 AI 来加速编码与快速原型设计。',
      '但真正的系统设计、数值调校，以及在机制上反复迭代所花的所有时间——这些都出自我自己。',
      '我把玩法置于功能之上。我做东西是因为在乎这门手艺，我交付的作品，其逻辑与手感始终是我本真的表达。',
    ]
  );

  const CREDITS = {
    music: 'Grand_Project — Pixabay',
    sfx: ['u_o8xh7gwsrj — Pixabay', 'FoxBoyTails — Pixabay', 'Stereogenic Studio — Pixabay'],
  };

  const CATEGORIES = [
    /* ---------------------------------------------------------------- 00 */
    {
      id: 'game-design',
      index: '00',
      title: L('Game Design', '游戏设计'),
      tagline: L('Systems & Loops', '系统与循环'),
      accent: 'game',
      blurb: L('Solving problems through systems and emergent mechanics.', '以系统与涌现式机制解决问题。'),
      summary: L(
        'Designing core loops, progression curves, and enemy synergies from first principles. I build rulesets that encourage player expression, validated through playtesting.',
        '从第一性原理出发，设计核心循环、成长曲线与敌人间的协同。我构建鼓励玩家自我表达的规则体系，并通过实机测试持续验证。'
      ),
      projects: [
        {
          id: 'gd-runic',
          title: 'Runic Rush',
          tag: L('Strategic 2048-Roguelike', '策略式 2048 Roguelike'),
          status: L('Released', '已发布'),
          hero: { label: 'assets/runic-rush-header.png' },
          meta: [
            { label: L('Role', '角色'), value: L('Solo Developer', '独立开发者') },
            { label: L('Genre', '类型'), value: L('Puzzle Roguelike', '解谜 Roguelike') },
            { label: L('Engine', '引擎'), value: 'Unreal Engine 5' },
            { label: L('Platform', '平台'), value: L('Web Browser', '网页浏览器') },
            { label: L('Status', '状态'), value: L('Released', '已发布') },
          ],
          links: [{ label: L('Play on itch.io', '在 itch.io 上游玩'), url: 'https://indeptus-entertainment.itch.io/runic-rush' }],
          sections: [
            {
              heading: L('A roguelike spin on 2048', '2048 的 Roguelike 演绎'),
              blocks: [
                { kind: 'lead', text: L(
                  'Short, strategic runs with structured boss fights. As a solo project, I handled all game design and programming.',
                  '短促而充满策略的局内流程，配以精心编排的 Boss 战。作为个人项目，游戏设计与程序开发均由我独立完成。'
                ) },
              ],
            },
            {
              heading: L('Iterating the merge mechanic', '打磨合成机制'),
              blocks: [
                { kind: 'para', text: L(
                  'The core merge interaction took a few iterations to feel right. Originally, players dragged runes off the top of the board to attack and off the bottom to heal. This was too limiting, so I simplified it to a double-tap execution.',
                  '核心的合成交互经过数轮迭代才达到理想手感。最初玩家需要把符文从棋盘顶部拖出来攻击、从底部拖出来治疗。这种方式限制太多，于是我将其简化为双击执行。'
                ) },
                { kind: 'image', label: 'assets/runic-rush-attack.gif', ratio: 'wide' },
              ],
            },
            {
              heading: L('Procedural enemies, strict rulesets', '程序化敌人，严格的规则'),
              blocks: [
                { kind: 'para', text: L(
                  'To save authoring time, enemies pull abilities from a shared pool. Normal enemies draw 2 abilities; elites draw 3. This created emergent, interesting puzzles.',
                  '为节省内容制作时间，敌人从一个共享能力池中抽取技能。普通敌人抽取 2 个能力，精英抽取 3 个。这带来了涌现式的有趣谜题。'
                ) },
                { kind: 'para', text: L(
                  'However, full RNG meant an enemy could pull 2 support abilities and 1 high-pressure attack, making runs unplayable. I implemented a strict rule: a maximum of 1 support ability per enemy, instantly fixing the combat balance.',
                  '然而完全随机意味着一个敌人可能抽到 2 个辅助能力外加 1 个高压攻击，使局面无法进行。我加入了一条严格规则：每个敌人最多 1 个辅助能力，瞬间修复了战斗平衡。'
                ) },
              ],
            },
            {
              heading: L('Boon synergies in a short loop', '短循环中的增益协同'),
              blocks: [
                { kind: 'para', text: L(
                  'I built four major synergies into the boon pool to support different buildcrafting strategies:',
                  '我在增益池中设计了四大协同方向，以支撑不同的 build 构筑策略：'
                ) },
                { kind: 'list', items: [
                  L('Swarm vs Nuke: Generating many small runes vs. building a few high-level ones.',
                    'Swarm vs Nuke: 生成大量小符文，还是堆叠少数高级符文。'),
                  L('Sustain vs Leech: Standard healing vs. converting heals directly into damage output.',
                    'Sustain vs Leech: 常规治疗，还是把治疗直接转化为输出。'),
                ] },
              ],
            },
            {
              heading: L('The preview system', '预览系统'),
              blocks: [
                { kind: 'para', text: L(
                  'Hovering over a rune projects its exact damage or healing output, factoring in all active modifiers. The same preview system applies to enemy abilities to help players plan their turns.',
                  '悬停在符文上会预测它精确的伤害或治疗数值，并计入所有生效的修正。同样的预览系统也适用于敌人能力，帮助玩家规划回合。'
                ) },
                { kind: 'note', text: L(
                  'Known issue: The preview system has minor bugs in the final build during boss fights. Flagged for a future patch.',
                  '已知问题：最终版本中预览系统在 Boss 战时存在小幅 bug，已标记于后续补丁修复。'
                ) },
                { kind: 'image', label: 'assets/runic-rush-preview.gif', ratio: 'wide' },
              ],
            },
          ],
        },
        {
          id: 'gd-geometrite',
          title: 'Geometrite',
          tag: L('Co-op Boss Rush', '合作 Boss Rush'),
          status: L('Released', '已发布'),
          hero: { label: 'assets/geometrite-banner.png' },
          meta: [
            { label: L('Role', '角色'), value: L('Solo Developer', '独立开发者') },
            { label: L('Engine', '引擎'), value: 'Unity' },
            { label: L('Genre', '类型'), value: L('Co-op Boss Rush', '合作 Boss Rush') },
            { label: L('Event', '活动'), value: 'Boss Rush Jam 2024' },
            { label: L('Status', '状态'), value: L('Released', '已发布') },
          ],
          links: [{ label: L('Play on itch.io', '在 itch.io 上游玩'), url: 'https://jackyeoh.itch.io/geometrite' }],
          sections: [
            {
              heading: L('Two players, one boss', '两名玩家，一个 Boss'),
              blocks: [
                { kind: 'lead', text: L(
                  'Built solo for Boss Rush Jam 2024. A 2-player co-op boss fight requiring tight coordination to handle mechanics designed to split the team up.',
                  '为 Boss Rush Jam 2024 独立开发。一场双人合作 Boss 战，需要紧密配合来应对那些刻意拆散队伍的机制。'
                ) },
              ],
            },
            {
              heading: L('The exchange mechanic', '“交换”机制'),
              blocks: [
                { kind: 'para', text: L(
                  'Designed around the jam theme "exchange." When a player drops a module, it becomes empowered for their partner, significantly buffing its effects. This rewards deliberate passing and turns mistakes into strategic opportunities.',
                  '围绕 Jam 主题“交换”设计。当一名玩家放下某个模块时，它会为搭档强化，大幅提升效果。这鼓励有意识的传递，把失误转化为战术机会。'
                ) },
              ],
            },
            {
              heading: L('Cooperative mechanics design', '合作机制设计'),
              blocks: [
                { kind: 'para', text: L(
                  'Boss attack patterns demand different simultaneous roles. For example, during the map-wide wipe mechanic, one player must hold a shield while the other maintains long-range DPS, forcing active communication and role division.',
                  'Boss 的攻击模式要求两人同时承担不同职责。例如在全屏清场机制中，一名玩家必须举盾，另一名维持远程输出，迫使玩家主动沟通、分工。'
                ) },
                { kind: 'gallery', items: [
                  { label: 'assets/geometrite-0.png' }, { label: 'assets/geometrite-1.png' }, { label: 'assets/geometrite-2.png' },
                ] },
              ],
            },
          ],
        },
        {
          id: 'gd-nda',
          title: L('Unannounced Live-Service Title', '未公开的长期运营项目'),
          tag: L('Core Gameplay Design', '核心玩法设计'),
          status: L('In Development', '研发中'),
          meta: [
            { label: L('Role', '角色'), value: L('Gameplay Designer', '玩法设计师') },
            { label: L('Official Title', '正式职称'), value: L('Game Programmer', '游戏程序') },
            { label: L('Genre', '类型'), value: L('Live Service', '长期运营') },
            { label: L('Status', '状态'), value: L('In Development', '研发中') },
            { label: L('Disclosure', '保密'), value: L('NDA Active', 'NDA 生效中') },
          ],
          sections: [
            {
              heading: L('Under NDA', 'NDA 之下'),
              blocks: [
                { kind: 'lead', text: L(
                  'Operating as a gameplay designer on an unannounced live-service title, despite my official title as a game programmer. I own core gameplay design responsibilities at the ground level.',
                  '在一款未公开的长期运营项目中担任玩法设计师，尽管我的正式职称是游戏程序。我在最基层承担核心玩法设计职责。'
                ) },
                { kind: 'note', text: L(
                  'Active NDA restricts disclosing specific mechanics or project details.',
                  '生效中的 NDA 限制披露具体机制或项目细节。'
                ) },
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
      title: L('Game Development', '游戏开发'),
      tagline: L('Engines & Code', '引擎与代码'),
      accent: 'dev',
      blurb: L('Building the technical foundation—UE5, Unity, and full-stack web.', '构建技术地基——UE5、Unity 与全栈 Web。'),
      summary: L(
        'Programming player controllers, custom ability frameworks, and full-stack architecture across Unreal Engine 5, Unity, and React.',
        '编写玩家控制器、自定义能力框架，以及横跨 Unreal Engine 5、Unity 与 React 的全栈架构。'
      ),
      projects: [
        {
          id: 'dev-metal',
          title: 'Metal Genesis',
          tag: L('Ability Framework', '能力框架'),
          status: L('Demo Released', '试玩版已发布'),
          hero: { label: 'assets/metal-genesis.png' },
          meta: [
            { label: L('Role', '角色'), value: L('Game Programmer', '游戏程序') },
            { label: L('Engine', '引擎'), value: 'Unreal Engine 5' },
            { label: L('Status', '状态'), value: L('Demo Released', '试玩版已发布') },
          ],
          links: [{ label: L('Play the Steam Demo', '体验 Steam 试玩版'), url: 'https://store.steampowered.com/app/3296470/Metal_Genesis_Rogue_Regime/' }],
          sections: [
            {
              heading: L('What is Metal Genesis', '关于 Metal Genesis'),
              blocks: [
                { kind: 'lead', text: L(
                  'An action roguelike built in Unreal Engine 5. I focused on programming the technical execution of the player experience.',
                  '一款基于 Unreal Engine 5 的动作 Roguelike。我专注于用程序实现玩家体验的技术落地。'
                ) },
              ],
            },
            {
              heading: L('Technical contributions', '技术贡献'),
              blocks: [
                { kind: 'para', text: L(
                  'My responsibilities ranged from low-level character logic to frontend UI integration:',
                  '我的职责从底层角色逻辑一直延伸到前端 UI 集成：'
                ) },
                { kind: 'list', items: [
                  L('Player Controller: Tuned movement logic and responsiveness to support the game’s fast-paced combat.',
                    'Player Controller: 调校移动逻辑与响应手感，以支撑游戏的快节奏战斗。'),
                  L('Custom Ability System: Architected a flexible framework to handle complex ability modifiers and synergies.',
                    'Custom Ability System: 设计灵活的框架，处理复杂的能力修正与协同。'),
                  L('UI Implementation: Programmed the data-rich HUD and translated aesthetic concepts into functional UI elements.',
                    'UI Implementation: 编写信息密集的 HUD，并将美术概念转化为可用的 UI 元素。'),
                  L('Optimization: Profiled, triaged, and fixed a major performance bottleneck within the bullet system.',
                    'Optimization: 对弹幕系统进行性能剖析、定位并修复了一处重大瓶颈。'),
                ] },
              ],
            },
          ],
        },
        {
          id: 'dev-animara',
          title: 'Animara World',
          tag: L('React + Konva R&D', 'React + Konva 研发'),
          status: L('Shipped', '已上线'),
          hero: { label: 'assets/animara.png' },
          meta: [
            { label: L('Role', '角色'), value: L('Tech Lead', '技术负责人') },
            { label: L('Tech', '技术'), value: 'React / Konva / Firebase' },
            { label: L('Infra', '基础设施'), value: 'Cloudflare CDN' },
            { label: L('Team', '团队'), value: L('2 Juniors + Outsource', '2 名初级 + 外包') },
          ],
          links: [{ label: L('Explore the World', '探索这个世界'), url: 'https://www.animara.world/animara' }],
          sections: [
            {
              heading: L('A living world on the web', '网页上的活态世界'),
              blocks: [
                { kind: 'lead', text: L(
                  'Led the technical development alongside two junior developers and an outsource team. Handled the R&D for the interactive world map.',
                  '带领技术开发，协同两名初级开发者与一支外包团队，主导了交互式世界地图的研发。'
                ) },
              ],
            },
            {
              heading: L('Technical contributions', '技术贡献'),
              blocks: [
                { kind: 'list', items: [
                  L('R&D: Architected the map using React and Konva. Optimized rendering performance to handle high element density and animations.',
                    'R&D: 用 React 与 Konva 搭建地图，优化渲染性能以承载高密度元素与动画。'),
                  L('Asset Pipeline: Defined technical requirements and coordinated the delivery pipeline with the art team.',
                    'Asset Pipeline: 制定技术规范，与美术团队协调交付流程。'),
                  L('Backend Integration: Implemented Firebase for real-time data handling and integration.',
                    'Backend Integration: 接入 Firebase 实现实时数据处理与集成。'),
                  L('Technical Leadership: Managed code reviews and unblocked team members on architectural roadblocks.',
                    'Technical Leadership: 主持代码评审，帮助成员扫清架构障碍。'),
                  L('CDN: Set up Cloudflare integration to optimize media load times.',
                    'CDN: 配置 Cloudflare，优化媒体加载速度。'),
                ] },
              ],
            },
          ],
        },
        {
          id: 'dev-casino',
          title: 'Casino Conqueror',
          tag: L('Card-based Roguelike', '卡牌 Roguelike'),
          status: L('Demo Released', '试玩版已发布'),
          hero: { label: 'assets/casino-conqueror-0.png' },
          meta: [
            { label: L('Role', '角色'), value: L('Programmer', '程序') },
            { label: L('Engine', '引擎'), value: 'Unity' },
            { label: L('Genre', '类型'), value: L('Card Roguelike', '卡牌 Roguelike') },
            { label: L('Status', '状态'), value: L('Demo Released', '试玩版已发布') },
          ],
          links: [{ label: L('View on Steam', '在 Steam 上查看'), url: 'https://store.steampowered.com/app/2610580/Casino_Conqueror/' }],
          sections: [
            {
              heading: L('Card-based roguelike', '卡牌 Roguelike'),
              blocks: [
                { kind: 'lead', text: L(
                  'A card-based roguelike in Unity. I headed the development for the core game logic, path nodes, and the in-game gallery.',
                  '一款基于卡牌的 Roguelike，使用 Unity 开发。我主导了核心游戏逻辑、路径节点与局内图鉴的开发。'
                ) },
              ],
            },
            {
              heading: L('Technical contributions', '技术贡献'),
              blocks: [
                { kind: 'list', items: [
                  L('Core Game Logic: Built the central gameplay loop and the underlying rules engine.',
                    'Core Game Logic: 构建中枢玩法循环与底层规则引擎。'),
                  L('Map Systems: Designed and implemented the procedural map generation and path nodes.',
                    'Map Systems: 设计并实现程序化地图生成与路径节点。'),
                  L('Gallery System: Programmed the collectible card viewing interface.',
                    'Gallery System: 编写可收集卡牌的查看界面。'),
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
      title: L('Numerical Design', '数值设计'),
      tagline: L('Balance & Math', '平衡与数学'),
      accent: 'num',
      blurb: L('Solving balance issues with math and metrics.', '用数学与指标解决平衡问题。'),
      summary: L(
        'Building spreadsheet models for skill distribution, scaling curves, and actual gameplay metrics. Tuning the math so the game feels right in playtests.',
        '为技能分布、成长曲线与真实玩法指标建立电子表格模型。把数学调到位，让游戏在实测中“手感对了”。'
      ),
      projects: [
        {
          id: 'num-scaling',
          title: L('Case 01 — Enemy Scaling', '案例 01 — 敌人数值成长'),
          tag: L('Moves-to-Kill Math', '击杀步数（MTK）数学'),
          status: L('Worksheet', '工作表'),
          context: RUNIC_CONTEXT,
          links: [{ label: L('View Live Worksheet', '查看在线工作表'), url: '#' }],
          sections: [
            {
              heading: L('My process', '我的流程'),
              blocks: [
                { kind: 'para', text: L(
                  'The core problem was that players merge runes at varying efficiencies, meaning the mathematical baseline couldn\'t assume perfect play.',
                  '核心问题在于玩家合成符文的效率参差不齐，意味着数学基线无法假设“完美操作”。'
                ) },
                { kind: 'para', text: L(
                  'So at first, I modeled expected player skill brackets to find the average moves-per-merge. Then, I established scaling curves for rune power versus enemy HP, and calculated the "Moves-to-Kill" (MTK) metric to balance the pacing.',
                  '于是起初，我对预期的玩家水平分层建模，求出平均“每次合成所需步数”。随后建立符文强度与敌人 HP 的成长曲线，并计算“击杀步数”（MTK）指标来平衡节奏。'
                ) },
                { kind: 'para', text: L(
                  'But during playtesting, I discovered that purely random enemy ability loadouts mathematically broke the game—combinations like haste plus charge plus ravage were completely unsurvivable.',
                  '但在测试中我发现，完全随机的敌人能力配装会在数学上击溃游戏——诸如急速 + 蓄力 + 蹂躏的组合根本无法生还。'
                ) },
                { kind: 'para', text: L(
                  'To fix it, I hard-capped enemy generation to a strict rule: a maximum of 1 support ability and 2 standard abilities. This instantly stabilized the encounter balance.',
                  '为修复它，我对敌人生成施加了严格上限：最多 1 个辅助能力与 2 个常规能力，瞬间稳定了遭遇战平衡。'
                ) },
              ],
            },
          ],
        },
        {
          id: 'num-encounter',
          title: L('Case 02 — Encounter Balancing', '案例 02 — 遭遇战平衡'),
          tag: L('Map Nodes', '地图节点'),
          status: L('Worksheet', '工作表'),
          context: RUNIC_CONTEXT,
          links: [{ label: L('View Map-Nodes Worksheet', '查看地图节点工作表'), url: '#' }],
          sections: [
            {
              heading: L('My process', '我的流程'),
              blocks: [
                { kind: 'para', text: L(
                  'The problem was pacing the run so the risk and reward felt consistent and fair throughout a procedural map.',
                  '问题在于如何编排整段流程，让风险与回报在程序化地图中始终保持一致与公平。'
                ) },
                { kind: 'para', text: L(
                  'At first, I defined the basic node archetypes—combat, elites, shops, and events—and mapped out exactly how much economic or power value each node should drop.',
                  '起初，我定义了基础节点原型——战斗、精英、商店与事件——并精确规划每个节点应当掉落多少经济或强度价值。'
                ) },
                { kind: 'para', text: L(
                  'Then I discovered that purely random node distribution created massive difficulty spikes and dead zones in the player\'s economy.',
                  '随后我发现，完全随机的节点分布会造成巨大的难度尖峰，以及玩家经济上的“死区”。'
                ) },
                { kind: 'para', text: L(
                  'So I went back and manually balanced the procedural generation weights, hard-coding the distribution logic to maintain a structured tension-and-release loop.',
                  '于是我回头手动平衡程序化生成的权重，将分布逻辑硬编码，以维持张弛有度的张力—释放循环。'
                ) },
              ],
            },
          ],
        },
        {
          id: 'num-power',
          title: L('Case 03 — Player Power', '案例 03 — 玩家强度'),
          tag: L('Boons & Synergies', '增益与协同'),
          status: L('Worksheet', '工作表'),
          context: RUNIC_CONTEXT,
          links: [{ label: L('View Boons Worksheet', '查看增益工作表'), url: '#' }],
          sections: [
            {
              heading: L('My process', '我的流程'),
              blocks: [
                { kind: 'para', text: L(
                  'The problem was building a set of boons that clearly supported the core synergies—Nuke, Swarm, Sustain, and Leech—without bloating the game.',
                  '问题在于构建一组能清晰支撑核心协同——Nuke、Swarm、Sustain、Leech——又不会让游戏臃肿的增益。'
                ) },
                { kind: 'para', text: L(
                  'At first, I designed a massive pool of items, working both top-down to fill mechanical gaps and bottom-up from cool emergent interactions.',
                  '起初，我设计了一个庞大的道具池，既自上而下填补机制空缺，也自下而上挖掘有趣的涌现互动。'
                ) },
                { kind: 'para', text: L(
                  'But then I discovered the pool was far too diluted with minor buffs. It dragged the fast-paced 10-minute loop into a slog because players couldn\'t consistently finish their builds.',
                  '但随后我发现池子被大量微小增益稀释了。它把原本明快的 10 分钟循环拖成了泥潭，玩家无法稳定地完成自己的 build。'
                ) },
                { kind: 'para', text: L(
                  'So I aggressively rescoped and pruned the pool. I tuned the RNG drop rates so a player sees the full pool across roughly three runs, locking in the math to keep runs short, punchy, and strategically dense.',
                  '于是我大刀阔斧地重新界定范围、精简池子，并调校 RNG 掉落率，让玩家大约三局就能见到完整池子——把数学锁定，使每一局都简短、有力且充满策略密度。'
                ) },
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
      title: L('UI / UX', 'UI / UX'),
      tagline: L('Figma to Frontend', '从 Figma 到前端'),
      accent: 'ui',
      blurb: L('Designing clean, functional interfaces.', '设计干净、好用的界面。'),
      summary: L(
        'Handling end-to-end UI implementation—from gathering requirements and wiring up Figma prototypes to writing the frontend logic and adding motion polish.',
        '负责端到端的 UI 落地——从收集需求、串联 Figma 原型，到编写前端逻辑并打磨动效。'
      ),
      projects: [
        {
          id: 'ui-meat',
          title: L('Meat Delivery Admin Portal', '生鲜配送管理后台'),
          tag: L('Freelance UI/UX', '自由接案 UI/UX'),
          status: L('Delivered', '已交付'),
          meta: [
            { label: L('Type', '类型'), value: L('Freelance', '自由接案') },
            { label: L('Role', '角色'), value: L('UI/UX Designer', 'UI/UX 设计师') },
            { label: L('Tools', '工具'), value: 'Figma' },
            { label: L('Deliverable', '交付物'), value: L('Admin Portal UI', '管理后台 UI') },
          ],
          links: [{ label: L('View Figma Design', '查看 Figma 设计'), url: 'https://www.figma.com/design/DNUyIpizKWF3V0jRsCLTzX/Meat-Shopping-App---Super-Admin?node-id=0-1&t=DkQ6P5bmO4L3XyYP-1' }],
          sections: [
            {
              heading: L('Freelance admin portal design', '自由接案的管理后台设计'),
              blocks: [
                { kind: 'lead', text: L(
                  'Owned the end-to-end design for a meat-delivery admin portal as a freelance contractor, handling everything from initial requirements to the final Figma handoff.',
                  '作为自由接案者，主导了一个生鲜配送管理后台的端到端设计，从最初的需求到最终的 Figma 交付一手包办。'
                ) },
              ],
            },
            {
              heading: L('Process', '流程'),
              blocks: [
                { kind: 'list', items: [
                  L('Requirements Gathering: Worked with stakeholders to map out business logic and admin workflows.',
                    'Requirements Gathering: 与相关方一起梳理业务逻辑与后台工作流。'),
                  L('Journey Mapping: Documented the user flow for order management, inventory, and vendor oversight.',
                    'Journey Mapping: 记录订单管理、库存与供应商管理的用户流程。'),
                  L('Wireframing: Built low-fidelity wireframes to lock in structure and navigation logic.',
                    'Wireframing: 制作低保真线框，确定结构与导航逻辑。'),
                  L('UI Design: Delivered high-fidelity Figma screens focused on clean, data-heavy functionality.',
                    'UI Design: 交付高保真 Figma 界面，聚焦干净、数据密集的功能性。'),
                ] },
              ],
            },
          ],
        },
        {
          id: 'ui-initiative',
          title: L('UX Improvement Initiative', '用户体验改进计划'),
          tag: L('Interaction Design', '交互设计'),
          status: L('Cross-Project', '跨项目'),
          meta: [
            { label: L('Type', '类型'), value: L('Cross-Project Initiative', '跨项目计划') },
            { label: L('Tools', '工具'), value: 'Figma / React / Framer' },
            { label: L('Focus', '重点'), value: L('UX Polish & Motion', 'UX 打磨与动效') },
          ],
          sections: [
            {
              heading: L('Proactive interaction design', '主动式交互设计'),
              blocks: [
                { kind: 'lead', text: L(
                  'Bridged the gap between static design drafts and the final implementation across multiple projects.',
                  '在多个项目中，弥合静态设计稿与最终实现之间的落差。'
                ) },
                { kind: 'para', text: L(
                  'Analyzed user journeys from initial mockups and implemented fixes to interaction feedback, UI timings, and visual hierarchy.',
                  '从初始视觉稿分析用户旅程，并对交互反馈、UI 时序与视觉层级实施改进。'
                ) },
                { kind: 'list', items: [
                  L('Fidelity Upgrades: Converted static Figma frames into responsive, animated frontend components.',
                    'Fidelity Upgrades: 把静态 Figma 帧转化为响应式、带动效的前端组件。'),
                  L('Flow Optimization: Streamlined navigation menus and reduced friction in combat HUDs.',
                    'Flow Optimization: 精简导航菜单，降低战斗 HUD 的操作摩擦。'),
                  L('Game Feel: Improved action feedback through specific UI state changes and motion design.',
                    'Game Feel: 通过具体的 UI 状态变化与动效设计提升动作反馈。'),
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
