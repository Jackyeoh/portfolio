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
    'Runic Rush——一款建立在 2048 机制上的 Roguelike。滑动来移动符文，相同符文合并成更强的符文。每次滑动都会推进敌人技能的冷却倒计时，逼着玩家做出战术判断。'
  );

  const CONTACT = {
    name: L('Jack Yeoh', '杨欣 (Jack Yeoh)'),
    role: L('Technical Game Designer', '技术策划'),
    blurb: L(
      'I love exploring how mechanics interact with one another. To me, systems design is more than just spreadsheets and math—it forms the underlying skeleton of the game experience. I obsess over the micro-feel of game interactions and love crafting intense boss fights! But I also know when to take a breather, listen to game soundtracks, and hang out with close friends.',
      '我特别喜欢研究机制之间怎么互相影响。在我看来，系统设计不只是拉表和算数——它是整个游戏体验的底层骨架。我喜欢死磕游戏交互的微操手感，也爱设计紧张刺激的 Boss 战！但该歇的时候也懂得歇一歇，听听游戏 OST，跟好朋友聚聚。'
    ),
    email: 'jackyeoh0808@gmail.com',
    linkedin: 'https://www.linkedin.com/in/yeoh-xin-16956878/',
    linkedinLabel: 'linkedin.com/in/yeoh-xin',
    birth: [1997, 7, 1], // Aug 1, 1997 (month 0-indexed) — drives the "system version"
  };

  const AI_NOTE = L(
    [
      'Yes — I use AI heavily to speed up coding and for rapid prototyping.',
      'But the actual systems design, the tuning, and all the time spent iterating on mechanics—that's all me.',
      'I prioritize gameplay over features. I build things because I care about the craft, and the logic and feel of what I ship stays authentically mine.',
    ],
    [
      '是的，我会大量用 AI 来提速写代码和快速跑通原型。',
      '但核心系统设计、拉表调数值，还有反复打磨机制花的那些时间——这些都是我自己亲力亲为的，一点没少。',
      '我始终把核心玩法放在第一位，而不是为了堆功能而开发。做游戏是因为真的喜欢这门手艺，所以最终交出去的东西，底层逻辑和微手感都是我自己的风格。',
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
      blurb: L('Solving problems through systems and emergent mechanics.', '用系统设计和涌现性机制来解决问题。'),
      summary: L(
        'Designing core loops, progression curves, and enemy synergies from first principles. I build rulesets that encourage player expression, validated through playtesting.',
        '从第一性原理出发，设计核心循环、成长曲线和敌人间的协同联动。我搭建能让玩家自由发挥的规则体系，并通过实机测试不断验证迭代。'
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
                  '节奏紧凑、充满策略的局内流程，配上精心设计的 Boss 战。全程独立开发，游戏设计和程序都是我一个人搞定的。'
                ) },
              ],
            },
            {
              heading: L('Iterating the merge mechanic', '打磨合成机制'),
              blocks: [
                { kind: 'para', text: L(
                  'The core merge interaction took a few iterations to feel right. Originally, players dragged runes off the top of the board to attack and off the bottom to heal. This was too limiting, so I simplified it to a double-tap execution.',
                  '核心的合成操作迭代了好几轮才找到手感。最初的设计是把符文从棋盘顶部拖出来攻击、从底部拖出来治疗，限制太死，于是改成了双击直接触发。'
                ) },
                { kind: 'image', label: 'assets/runic-rush-attack.gif', ratio: 'wide' },
              ],
            },
            {
              heading: L('Procedural enemies, strict rulesets', '程序化敌人，严格的规则'),
              blocks: [
                { kind: 'para', text: L(
                  'To save authoring time, enemies pull abilities from a shared pool. Normal enemies draw 2 abilities; elites draw 3. This created emergent, interesting puzzles.',
                  '为了节省内容制作时间，敌人的技能从一个公用的能力池里随机抽取。普通敌人抽 2 个，精英敌人抽 3 个，由此产生了很多意想不到的有趣组合。'
                ) },
                { kind: 'para', text: L(
                  'However, full RNG meant an enemy could pull 2 support abilities and 1 high-pressure attack, making runs unplayable. I implemented a strict rule: a maximum of 1 support ability per enemy, instantly fixing the combat balance.',
                  '不过纯随机会出问题——一个敌人可能同时抽到 2 个辅助技能加 1 个高压进攻技能，这种组合基本无解。于是我加了一条死规则：每个敌人最多只能有 1 个辅助技能，战斗平衡立刻稳了。'
                ) },
              ],
            },
            {
              heading: L('Boon synergies in a short loop', '短循环中的增益协同'),
              blocks: [
                { kind: 'para', text: L(
                  'I built four major synergies into the boon pool to support different buildcrafting strategies:',
                  '我在增益池里设计了四条核心联动方向，让玩家能走出不同的 Build 路线：'
                ) },
                { kind: 'list', items: [
                  L('Swarm vs Nuke: Generating many small runes vs. building a few high-level ones.',
                    'Swarm vs Nuke：刷出大量小符文 vs. 集中堆几个高级大符文。'),
                  L('Sustain vs Leech: Standard healing vs. converting heals directly into damage output.',
                    'Sustain vs Leech：常规回血 vs. 把回血量直接转化成伤害输出。'),
                ] },
              ],
            },
            {
              heading: L('The preview system', '预览系统'),
              blocks: [
                { kind: 'para', text: L(
                  'Hovering over a rune projects its exact damage or healing output, factoring in all active modifiers. The same preview system applies to enemy abilities to help players plan their turns.',
                  '鼠标悬停到符文上时，会预览计算好的精确伤害或回血数值，所有当前生效的加成都包含在内。敌人技能同样支持预览，方便玩家提前规划每一回合。'
                ) },
                { kind: 'note', text: L(
                  'Known issue: The preview system has minor bugs in the final build during boss fights. Flagged for a future patch.',
                  '已知问题：正式版本中，预览系统在 Boss 战期间存在小 bug，已记录，后续版本会修复。'
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
                  '独立参加 Boss Rush Jam 2024 做的作品。双人合作打 Boss，核心机制都是专门设计来把两个人拆开的，需要高度配合才能应对。'
                ) },
              ],
            },
            {
              heading: L('The exchange mechanic', '"交换"机制'),
              blocks: [
                { kind: 'para', text: L(
                  'Designed around the jam theme "exchange." When a player drops a module, it becomes empowered for their partner, significantly buffing its effects. This rewards deliberate passing and turns mistakes into strategic opportunities.',
                  '围绕 Jam 主题「交换」设计。某个玩家放下模块后，它会对搭档产生强化效果。这样一来主动传递会有回报，就连失误也可能变成战术机会。'
                ) },
              ],
            },
            {
              heading: L('Cooperative mechanics design', '合作机制设计'),
              blocks: [
                { kind: 'para', text: L(
                  'Boss attack patterns demand different simultaneous roles. For example, during the map-wide wipe mechanic, one player must hold a shield while the other maintains long-range DPS, forcing active communication and role division.',
                  'Boss 的攻击模式要求两个人同时扮演不同角色。比如全屏清场机制触发时，一个人必须举盾顶住，另一个要维持远程输出，逼着你们主动喊话、分工。'
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
          title: L('Unannounced Live-Service Title', '未公开的长线运营项目'),
          tag: L('Core Gameplay Design', '核心玩法设计'),
          status: L('In Development', '研发中'),
          meta: [
            { label: L('Role', '角色'), value: L('Gameplay Designer', '玩法设计师') },
            { label: L('Official Title', '正式职称'), value: L('Game Programmer', '游戏程序员') },
            { label: L('Genre', '类型'), value: L('Live Service', '长线运营') },
            { label: L('Status', '状态'), value: L('In Development', '研发中') },
            { label: L('Disclosure', '保密'), value: L('NDA Active', 'NDA 生效中') },
          ],
          sections: [
            {
              heading: L('Under NDA', 'NDA 保密'),
              blocks: [
                { kind: 'lead', text: L(
                  'Operating as a gameplay designer on an unannounced live-service title, despite my official title as a game programmer. I own core gameplay design responsibilities at the ground level.',
                  '在一款尚未公开的长线运营项目中实际承担玩法设计师的职责，虽然我的正式职位是游戏程序员。从最基础的层面负责核心玩法设计。'
                ) },
                { kind: 'note', text: L(
                  'Active NDA restricts disclosing specific mechanics or project details.',
                  '受 NDA 约束，无法透露具体的机制或项目细节。'
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
      blurb: L('Building the technical foundation—UE5, Unity, and full-stack web.', '搭建技术底座——UE5、Unity 与全栈 Web。'),
      summary: L(
        'Programming player controllers, custom ability frameworks, and full-stack architecture across Unreal Engine 5, Unity, and React.',
        '负责开发玩家控制器、自定义技能框架，以及横跨 Unreal Engine 5、Unity 与 React 的全栈架构。'
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
                  '一款基于 Unreal Engine 5 开发的动作 Roguelike。我的主要工作是用程序把玩家体验的设计意图落实到技术层面。'
                ) },
              ],
            },
            {
              heading: L('Technical contributions', '技术贡献'),
              blocks: [
                { kind: 'para', text: L(
                  'My responsibilities ranged from low-level character logic to frontend UI integration:',
                  '我的工作范围从底层角色逻辑一直延伸到前端 UI 对接：'
                ) },
                { kind: 'list', items: [
                  L('Player Controller: Tuned movement logic and responsiveness to support the game's fast-paced combat.',
                    'Player Controller：调校移动逻辑和操作响应感，让手感能撑得住游戏的快节奏战斗。'),
                  L('Custom Ability System: Architected a flexible framework to handle complex ability modifiers and synergies.',
                    'Custom Ability System：搭建了一套灵活的技能框架，用来处理复杂的能力修正和技能联动。'),
                  L('UI Implementation: Programmed the data-rich HUD and translated aesthetic concepts into functional UI elements.',
                    'UI Implementation：开发信息密度较高的 HUD，把美术设计稿转化为实际可用的 UI 组件。'),
                  L('Optimization: Profiled, triaged, and fixed a major performance bottleneck within the bullet system.',
                    'Optimization：对子弹系统做了性能分析，定位并修复了一处严重的性能瓶颈。'),
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
                  '带领技术团队开发，成员包括两名初级开发和一支外包团队，负责交互式世界地图的技术预研和落地。'
                ) },
              ],
            },
            {
              heading: L('Technical contributions', '技术贡献'),
              blocks: [
                { kind: 'list', items: [
                  L('R&D: Architected the map using React and Konva. Optimized rendering performance to handle high element density and animations.',
                    'R&D：用 React + Konva 搭建地图，优化渲染性能来承载大量元素和动画的同时运行。'),
                  L('Asset Pipeline: Defined technical requirements and coordinated the delivery pipeline with the art team.',
                    'Asset Pipeline：制定技术规范，跟美术团队对齐资源交付流程。'),
                  L('Backend Integration: Implemented Firebase for real-time data handling and integration.',
                    'Backend Integration：接入 Firebase，实现实时数据处理和前后端联调。'),
                  L('Technical Leadership: Managed code reviews and unblocked team members on architectural roadblocks.',
                    'Technical Leadership：主导代码评审，帮助团队成员解决架构层面的阻塞问题。'),
                  L('CDN: Set up Cloudflare integration to optimize media load times.',
                    'CDN：配置 Cloudflare 接入，优化媒体资源的加载速度。'),
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
                  '一款用 Unity 开发的卡牌 Roguelike。我负责主导核心游戏逻辑、路径节点以及局内图鉴系统的开发。'
                ) },
              ],
            },
            {
              heading: L('Technical contributions', '技术贡献'),
              blocks: [
                { kind: 'list', items: [
                  L('Core Game Logic: Built the central gameplay loop and the underlying rules engine.',
                    'Core Game Logic：搭建核心玩法循环和底层规则引擎。'),
                  L('Map Systems: Designed and implemented the procedural map generation and path nodes.',
                    'Map Systems：设计并实现程序化地图生成和路径节点系统。'),
                  L('Gallery System: Programmed the collectible card viewing interface.',
                    'Gallery System：开发收集卡牌的查看展示界面。'),
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
      blurb: L('Solving balance issues with math and metrics.', '用数学和数据指标解决平衡性问题。'),
      summary: L(
        'Building spreadsheet models for skill distribution, scaling curves, and actual gameplay metrics. Tuning the math so the game feels right in playtests.',
        '针对技能分布、成长曲线和实际玩法数据建立表格模型，把数值调到位，让游戏在实测中真正有手感。'
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
                  '核心难点在于玩家合成符文的效率差异很大，数学基线不能直接假设"完美操作"。'
                ) },
                { kind: 'para', text: L(
                  'So at first, I modeled expected player skill brackets to find the average moves-per-merge. Then, I established scaling curves for rune power versus enemy HP, and calculated the "Moves-to-Kill" (MTK) metric to balance the pacing.',
                  '所以一开始，我对玩家的预期水平做了分层建模，算出平均每次合成所需步数。然后建立符文强度对敌人 HP 的成长曲线，用"击杀步数"（MTK）这个指标来平衡整体节奏。'
                ) },
                { kind: 'para', text: L(
                  'But during playtesting, I discovered that purely random enemy ability loadouts mathematically broke the game—combinations like haste plus charge plus ravage were completely unsurvivable.',
                  '但测试时发现，敌人技能纯随机组合在数学上就会把游戏搞崩——比如急速 + 蓄力 + 蹂躏这种组合，玩家根本活不下去。'
                ) },
                { kind: 'para', text: L(
                  'To fix it, I hard-capped enemy generation to a strict rule: a maximum of 1 support ability and 2 standard abilities. This instantly stabilized the encounter balance.',
                  '为了解决这个问题，给敌人生成加了一条硬性规则：最多 1 个辅助技能加 2 个普通技能。战斗平衡立竿见影地稳住了。'
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
                  '问题是如何把控整局的节奏，让风险和回报在程序化地图里始终保持合理和公平。'
                ) },
                { kind: 'para', text: L(
                  'At first, I defined the basic node archetypes—combat, elites, shops, and events—and mapped out exactly how much economic or power value each node should drop.',
                  '一开始先定义了基础的节点类型——战斗、精英、商店、事件，并精确规划了每种节点应该给出多少经济价值或强度收益。'
                ) },
                { kind: 'para', text: L(
                  'Then I discovered that purely random node distribution created massive difficulty spikes and dead zones in the player\'s economy.',
                  '然后发现纯随机的节点分布会导致难度剧烈波动，玩家的经济也会出现大段的"空窗期"。'
                ) },
                { kind: 'para', text: L(
                  'So I went back and manually balanced the procedural generation weights, hard-coding the distribution logic to maintain a structured tension-and-release loop.',
                  '于是回头手动调整程序化生成的权重，把分布逻辑写死，维持有节奏感的张弛循环。'
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
                  '难点在于设计出一批能明确支撑核心联动方向——Nuke、Swarm、Sustain、Leech——又不会让内容变得臃肿的增益道具。'
                ) },
                { kind: 'para', text: L(
                  'At first, I designed a massive pool of items, working both top-down to fill mechanical gaps and bottom-up from cool emergent interactions.',
                  '一开始设计了一个很大的道具池，既自上而下填补机制缺口，也从底层有趣的联动效果出发往上推。'
                ) },
                { kind: 'para', text: L(
                  'But then I discovered the pool was far too diluted with minor buffs. It dragged the fast-paced 10-minute loop into a slog because players couldn\'t consistently finish their builds.',
                  '结果发现池子被大量小加成道具稀释了，把原本节奏明快的 10 分钟局给拖慢了——玩家很难稳定打出完整的 Build 路线。'
                ) },
                { kind: 'para', text: L(
                  'So I aggressively rescoped and pruned the pool. I tuned the RNG drop rates so a player sees the full pool across roughly three runs, locking in the math to keep runs short, punchy, and strategically dense.',
                  '于是大刀阔斧地缩减并精简了池子，同时调整 RNG 掉落概率，让玩家大约三局就能把整个池子见一遍——从数学上保证每局都短促、有冲劲，策略密度也拉满。'
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
      blurb: L('Designing clean, functional interfaces.', '做简洁、好用的界面设计。'),
      summary: L(
        'Handling end-to-end UI implementation—from gathering requirements and wiring up Figma prototypes to writing the frontend logic and adding motion polish.',
        '负责 UI 从头到尾的落地——包括收集需求、串联 Figma 原型，到写前端逻辑、打磨动效细节。'
      ),
      projects: [
        {
          id: 'ui-meat',
          title: L('Meat Delivery Admin Portal', '生鲜配送管理后台'),
          tag: L('Freelance UI/UX', '自由职业 UI/UX'),
          status: L('Delivered', '已交付'),
          meta: [
            { label: L('Type', '类型'), value: L('Freelance', '自由职业') },
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
                  '以自由职业者身份主导了一个生鲜配送管理后台的完整设计，从最初的需求梳理到最终的 Figma 交付，全程一手包办。'
                ) },
              ],
            },
            {
              heading: L('Process', '流程'),
              blocks: [
                { kind: 'list', items: [
                  L('Requirements Gathering: Worked with stakeholders to map out business logic and admin workflows.',
                    'Requirements Gathering：和相关方一起把业务逻辑与后台操作流程梳理清楚。'),
                  L('Journey Mapping: Documented the user flow for order management, inventory, and vendor oversight.',
                    'Journey Mapping：梳理并记录订单管理、库存管理和供应商管理的用户操作路径。'),
                  L('Wireframing: Built low-fidelity wireframes to lock in structure and navigation logic.',
                    'Wireframing：制作低保真线框图，确定页面结构与导航逻辑。'),
                  L('UI Design: Delivered high-fidelity Figma screens focused on clean, data-heavy functionality.',
                    'UI Design：交付高保真 Figma 界面，重点保持干净简洁、信息密度高的功能导向风格。'),
                ] },
              ],
            },
          ],
        },
        {
          id: 'ui-initiative',
          title: L('UX Improvement Initiative', '用户体验改进计划'),
          tag: L('Interaction Design', '交互设计'),
          status: L('Cross-Project', '跨项目专项'),
          meta: [
            { label: L('Type', '类型'), value: L('Cross-Project Initiative', '跨项目专项') },
            { label: L('Tools', '工具'), value: 'Figma / React / Framer' },
            { label: L('Focus', '重点'), value: L('UX Polish & Motion', 'UX 打磨与动效') },
          ],
          sections: [
            {
              heading: L('Proactive interaction design', '主动式交互设计'),
              blocks: [
                { kind: 'lead', text: L(
                  'Implemented dynamic interactions for static UI designs to elevate the overall user experience.',
                  '主动给静态 UI 设计加上动态交互，整体提升用户体验。'
                ) },
                { kind: 'para', text: L(
                  'Analyzed user journeys from initial mockups and implemented fixes to interaction feedback, UI timings, and visual hierarchy.',
                  '从早期视觉稿出发拆解用户操作路径，持续优化交互反馈、UI 动效时序和视觉层级关系。'
                ) },
                { kind: 'list', items: [
                  L('Fidelity Upgrades: Converted static Figma frames into responsive, animated frontend components.',
                    '提升还原度：把 Figma 静态设计稿转化为支持响应式和复杂动效的前端组件。'),
                  L('Flow Optimization: Streamlined navigation menus and reduced friction in combat HUDs.',
                    '流程优化：精简导航菜单层级，降低战斗 HUD 的操作卡顿感。'),
                  L('Game Feel: Improved action feedback through specific UI state changes and motion design.',
                    '游戏手感：通过精细的 UI 状态切换和动效设计，大幅强化玩家的操作反馈感。'),
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
