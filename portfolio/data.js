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
      'But the actual systems design, the tuning, and all the time spent iterating on mechanics—that\'s all me.',
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
            // TODO(jack): replace placeholders with real values you're comfortable disclosing
            { label: L('Team Size', '团队规模'), value: L('[TEAM SIZE — e.g. ~20]', '[团队规模 — 如 ~20 人]') },
            { label: L('Project Phase', '项目阶段'), value: L('[PHASE — e.g. Alpha]', '[阶段 — 如 Alpha]') },
            { label: L('Disclosure', '保密'), value: L('NDA Active', 'NDA 生效中') },
          ],
          sections: [
            {
              heading: L('Owning gameplay design under a programmer title', '以程序员身份承担玩法设计'),
              blocks: [
                { kind: 'lead', text: L(
                  'I operate as a gameplay designer on an unannounced live-service title while officially titled a game programmer. That dual position is my edge: I own core gameplay systems design at the ground level, and my engineering seat lets me prototype and validate those designs directly in-engine — closing the usual gap between a design doc and a shippable feature.',
                  '我在一款尚未公开的长线运营项目中实际承担玩法设计师的职责，正式职位则是游戏程序员。这种双重身份正是我的优势：我从最底层负责核心玩法系统设计，而程序岗的位置让我能亲手在引擎里做原型、验证设计——把「设计文档」到「可上线功能」之间那道常见的鸿沟直接抹平。'
                ) },
              ],
            },
            {
              heading: L('What I own', '我负责的部分'),
              blocks: [
                { kind: 'list', items: [
                  L('Systems Design: Own gameplay systems end-to-end — from concept and GDD-framework documentation through to in-engine validation.',
                    '系统设计：端到端负责玩法系统——从概念、GDD 框架文档，一直到引擎内的实机验证。'),
                  L('Numerical Balance: Lead balance and tuning passes, iterating through repeated internal playtest reviews.',
                    '数值平衡：主导平衡与调校，通过多轮内部实测复盘反复迭代。'),
                  L('Design-to-Code: Translate design intent into buildable specs, then implement and iterate them myself as a programmer.',
                    '设计落地：把设计意图转化为可实现的方案，再以程序员身份亲自实现并迭代。'),
                ] },
              ],
            },
            {
              heading: L('How I work', '我的工作方式'),
              blocks: [
                { kind: 'para', text: L(
                  'On a live-service team, design never ships in isolation. I drive features to the finish line across programming, art, and operations — aligning on scope, unblocking dependencies, and folding playtest and post-mortem feedback back into the next iteration.',
                  '在长线运营团队里，设计从来不是单打独斗就能上线的。我推动功能跨程序、美术、运营各方落地到底——对齐范围、疏通依赖，并把实测和复盘的反馈重新收进下一轮迭代。'
                ) },
                { kind: 'note', text: L(
                  'An active NDA prevents me from disclosing specific mechanics or project details — happy to discuss the design methodology in an interview.',
                  '受 NDA 约束，我无法透露具体机制或项目细节——但很乐意在面试中详聊设计方法论。'
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
                  L('Player Controller: Tuned movement logic and responsiveness to support the game\'s fast-paced combat.',
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
          id: 'num-runic',
          title: L('Case 01 — Runic Rush', '案例 01 — Runic Rush'),
          tag: L('Scaling, Encounters & Boons', '数值成长、遭遇战与增益'),
          status: L('Worksheet', '工作表'),
          context: RUNIC_CONTEXT,
          links: [{ label: L('View the Runic Rush Worksheet', '查看 Runic Rush 工作表'), url: 'https://docs.google.com/spreadsheets/d/17Jvu0me8yew0OHK90ydK1pv2RKo5evZk-QY6eTluJyk/edit?gid=1173070294#gid=1173070294' }],
          sections: [
            {
              heading: L('Pacing fights with a Moves-to-Kill metric', '用「击杀步数」指标把控战斗节奏'),
              blocks: [
                { kind: 'lead', text: L(
                  'Players merge runes at wildly different efficiencies, so the math baseline can\'t assume perfect play. I modeled player skill brackets to find the average moves-per-merge, then built rune-power-vs-enemy-HP scaling curves around a "Moves-to-Kill" (MTK) metric to pace every fight.',
                  '玩家合成符文的效率差异极大，数学基线不能假设「完美操作」。我对玩家水平分层建模，算出平均每次合成的步数，再围绕「击杀步数」（MTK）指标建立符文强度对敌人 HP 的成长曲线，用它把控每场战斗的节奏。'
                ) },
                { kind: 'para', text: L(
                  'Playtesting exposed that fully random enemy loadouts broke the math—combos like haste + charge + ravage were unsurvivable. A hard cap of 1 support and 2 standard abilities per enemy stabilized it instantly.',
                  '实测暴露出纯随机的敌人技能组合会把数值搞崩——急速 + 蓄力 + 蹂躏这类组合根本无解。给每个敌人加一条「最多 1 个辅助 + 2 个普通技能」的硬上限，平衡立刻稳住。'
                ) },
              ],
            },
            {
              heading: L('Structuring a 10-stage run', '把一局设计成 10 个关卡'),
              blocks: [
                { kind: 'lead', text: L(
                  'I sized the run at 10 stages from a target playtime to hit a "short and concise" goal, with a forced tough fight at stage 5 as a miniboss beat that splits the run into two acts.',
                  '为了「短小精悍」的目标，我从目标游玩时长反推，把一局定为 10 个关卡，并在第 5 关强制安排一场硬仗作为「小 Boss」节点，把整局切成前后两幕。'
                ) },
                { kind: 'para', text: L(
                  'Enemy scaling then climbs steeply from stage 6 to 9 to separate early- from late-game feel. That curve does double duty: builds that can\'t keep pace wash out faster so the player restarts sooner, while reaching the final boss stays genuinely hard.',
                  '敌人数值成长在第 6→9 关陡峭拉升，把「前期」和「后期」的手感区分开。这条曲线一举两得：跟不上的 Build 会更快出局，玩家更快重开；同时也让「打到最终 Boss」真正有难度。'
                ) },
              ],
            },
            {
              heading: L('Risk-reward boons', '风险回报型增益'),
              blocks: [
                { kind: 'para', text: L(
                  'On top of that, I layered in boons that let players push their own luck:',
                  '在此之上，我又叠了一批让玩家可以自己搏一把的增益：'
                ) },
                { kind: 'list', items: [
                  L('Extra miniboss stage: opt into an additional miniboss encounter—clear it and earn outsized rewards.',
                    '额外小 Boss 关：可以主动选择多打一场小 Boss——扛过去就能拿到超额奖励。'),
                  L('Damage-scaled luck: the more damage you take, intentionally or not, the higher your odds at bonus rewards.',
                    '受伤越多越走运：无论是不是故意的，你受到的伤害越多，拿到额外奖励的概率就越高。'),
                ] },
              ],
            },
            {
              heading: L('Pruning the boon pool', '精简增益池'),
              blocks: [
                { kind: 'lead', text: L(
                  'I needed boons that clearly served the four core synergies—Nuke, Swarm, Sustain, Leech—without bloating the game.',
                  '我需要一批能明确支撑四条核心联动——Nuke、Swarm、Sustain、Leech——又不会让内容臃肿的增益。'
                ) },
                { kind: 'para', text: L(
                  'My first pool was too diluted with minor buffs, dragging the snappy 10-minute loop into a slog. I aggressively pruned it and tuned drop rates so a player sees the whole pool across roughly three runs—keeping runs short, punchy, and build-focused.',
                  '最初的池子被大量小加成稀释，把明快的 10 分钟局拖成了苦役。我大刀阔斧地精简，并调整掉率，让玩家大约三局就能见到整个池子——保证每局都短促、有冲劲、Build 导向明确。'
                ) },
              ],
            },
          ],
        },
        {
          id: 'num-econ',
          title: L('Case 02 — Live-Service Economy', '案例 02 — 长线运营经济系统'),
          tag: L('Income Streams & Pacing', '收入流与节奏'),
          status: L('NDA Project', 'NDA 项目'),
          context: L(
            'From the unannounced live-service title where I own economy design. Details are generalized to respect an active NDA.',
            '来自我负责经济系统设计的那款未公开长线运营项目。受 NDA 约束，以下细节已做泛化处理。'
          ),
          sections: [
            {
              heading: L('Designing the income streams', '设计收入流'),
              blocks: [
                { kind: 'lead', text: L(
                  'I own economy design on the title. I split the economy into the standard live-service income streams—dailies, weeklies, battle pass, achievements, events, IAP—sort each into one-shot vs recurring, and use one-shot plus first-month recurring to gauge the onboarding curve against pacing goals like initial rush vs slow drip.',
                  '我负责这个项目的经济设计。我把经济拆成长线运营常见的几条收入流——日常、周常、战令、成就、活动、内购——每条归类为「一次性」或「循环」，再用「一次性 + 第一个月循环」衡量新手上手曲线，对齐「开局爆发」还是「细水长流」这类节奏目标。'
                ) },
                { kind: 'para', text: L(
                  'I tune each stream\'s output—say a twice-monthly 500-gem event—so they sum to target, and use paid-vs-F2P collection-completion rates to balance F2P baseline rewards against purchasable bundles, which drives the IAP store design. Each stream then expands into its own sheet, with sub-sheets simulating player pacing.',
                  '我调每条流的产出——比如每月两次、每次 500 宝石的活动——让加总正好命中目标；并用付费与免费玩家的收集完成度来平衡 F2P 基础奖励和可购礼包，进而驱动内购商店设计。每条流再展开成独立明细表，底下挂子表模拟玩家节奏。'
                ) },
                { kind: 'note', text: L(
                  'These pacing sims are estimates, flagged for tuning once larger-scale playtest data lands. An active NDA restricts specific figures.',
                  '这些节奏模拟只是估算值，已标记为待更大规模实测数据到位后再精调。受 NDA 约束，无法透露具体数字。'
                ) },
              ],
            },
          ],
        },
        {
          id: 'num-null',
          title: L('Case 03 — null://protocol', '案例 03 — null://protocol'),
          tag: L('Full-Game Baseline Balancing', '全局基线数值'),
          status: L('In Development', '研发中'),
          sections: [
            {
              heading: L('Baseline numbers at a larger scale', '更大体量下的基线数值'),
              blocks: [
                { kind: 'lead', text: L(
                  'On null://protocol—a larger, more complex project—I built the baseline numerical design for the whole game: enemy stat progression balanced against player power. Same Moves-to-Kill discipline as Runic Rush, scaled up across many more interacting systems and variables.',
                  '在 null://protocol 这个体量更大、更复杂的项目里，我为整个游戏搭建了基线数值：平衡敌人属性成长与玩家强度。方法和 Runic Rush 的「击杀步数（MTK）」一脉相承，只是规模更大，需要联动和制衡的系统与变量都多得多。'
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
