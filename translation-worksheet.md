# Portfolio Translation Worksheet

Edit the **ZH** lines. English is the source of truth; leave proper nouns / tech names as-is.

## UI Chrome (i18n.js)
- **motionOn** — `动效：开`
- **motionOff** — `动效：关`
- **credits** — `制作人员`
- **reboot** — `重启`
- **colophon** — `// 版权信息`
- **creditsTitle** — `制作人员`
- **music** — `背景音乐`
- **sfx** — `音效`
- **tapClose** — `点击任意处关闭`
- **initializing** — `加载中`
- **ready** — `// 就绪`
- **thesis** — `我做游戏设计，也写代码——系统、数值平衡，以及中间涉及的所有用户体验。`
- **pickDiscipline** — `选择一个方向深入了解 ↓`
- **coreCompetencies** — `核心专长`
- **supportingSkills** — `辅助技能`
- **selectDiscipline** — `选择方向`
- **operatorProfile** — `操作员 // 档案`
- **fieldNoteAI** — `现场笔记 // 关于 AI`
- **introKicker** — `作品集`
- **introCta** — `查看我的核心专长`
- **tapBegin** — `点击开始`
- **returnTo** — `返回`
- **system** — `主页`
- **discipline** — `方向`
- **entry / entries** — `条目`
- **selectToOpen** — `点击展开`
- **moreToCome** — `持续更新中`
- **futureUpdates** — `后续更新`
- **dossier** — `档案`
- **note** — `备注`
- **context** — `背景`
- **copyLink** — `复制链接`
- **copied** — `已复制`

---

## Profile
- **role**
  - EN: Technical Game Designer
  - ZH: 技术策划
- **name**
  - EN: Jack Yeoh
  - ZH: 杨欣 (Jack Yeoh)
- **blurb**
  - EN: I love exploring how mechanics interact with one another. To me, systems design is more than just spreadsheets and math—it forms the underlying skeleton of the game experience. I obsess over the micro-feel of game interactions and love crafting intense boss fights! But I also know when to take a breather, listen to game soundtracks, and hang out with close friends.
  - ZH: 我特别喜欢研究机制之间怎么互相影响。在我看来，系统设计不只是拉表和算数——它是整个游戏体验的底层骨架。我喜欢死磕游戏交互的微操手感，也爱设计紧张刺激的 Boss 战！但该歇的时候也懂得歇一歇，听听游戏 OST，跟好朋友聚聚。

## AI Note
- **note[0]**
  - EN: Yes — I use AI heavily to speed up coding and for rapid prototyping.
  - ZH: 是的，我会大量用 AI 来提速写代码和快速跑通原型。
- **note[1]**
  - EN: But the actual systems design, the tuning, and all the time spent iterating on mechanics—that's all me.
  - ZH: 但核心系统设计、拉表调数值，还有反复打磨机制花的那些时间——这些都是我自己亲力亲为的，一点没少。
- **note[2]**
  - EN: I prioritize gameplay over features. I build things because I care about the craft, and the logic and feel of what I ship stays authentically mine.
  - ZH: 我始终把核心玩法放在第一位，而不是为了堆功能而开发。做游戏是因为真的喜欢这门手艺，所以最终交出去的东西，底层逻辑和微手感都是我自己的风格。

## [00] Game Design  _(category)_
- **tagline**
  - EN: Systems & Loops
  - ZH: 系统与循环
- **blurb**
  - EN: Solving problems through systems and emergent mechanics.
  - ZH: 用系统设计和涌现性机制来解决问题。
- **summary**
  - EN: Designing core loops, progression curves, and enemy synergies from first principles. I build rulesets that encourage player expression, validated through playtesting.
  - ZH: 从第一性原理出发，设计核心循环、成长曲线和敌人间的协同联动。我搭建能让玩家自由发挥的规则体系，并通过实机测试不断验证迭代。

### Project: Runic Rush
- **tag**
  - EN: Strategic 2048-Roguelike
  - ZH: 策略式 2048 Roguelike
- **status**
  - EN: Released
  - ZH: 已发布
- **meta[0].label**
  - EN: Role
  - ZH: 角色
- **meta[0].value**
  - EN: Solo Developer
  - ZH: 独立开发者
- **meta[1].label**
  - EN: Genre
  - ZH: 类型
- **meta[1].value**
  - EN: Puzzle Roguelike
  - ZH: 解谜 Roguelike
- **meta[2].label**
  - EN: Engine
  - ZH: 引擎
- **meta[3].label**
  - EN: Platform
  - ZH: 平台
- **meta[3].value**
  - EN: Web Browser
  - ZH: 网页浏览器
- **meta[4].label**
  - EN: Status
  - ZH: 状态
- **meta[4].value**
  - EN: Released
  - ZH: 已发布
- **link[0].label**
  - EN: Play on itch.io
  - ZH: 在 itch.io 上游玩

**Section 1:**
- **heading**
  - EN: A roguelike spin on 2048
  - ZH: 2048 的 Roguelike 演绎
- **lead[0]**
  - EN: Short, strategic runs with structured boss fights. As a solo project, I handled all game design and programming.
  - ZH: 节奏紧凑、充满策略的局内流程，配上精心设计的 Boss 战。全程独立开发，游戏设计和程序都是我一个人搞定的。

**Section 2:**
- **heading**
  - EN: Iterating the merge mechanic
  - ZH: 打磨合成机制
- **para[0]**
  - EN: The core merge interaction took a few iterations to feel right. Originally, players dragged runes off the top of the board to attack and off the bottom to heal. This was too limiting, so I simplified it to a double-tap execution.
  - ZH: 核心的合成操作迭代了好几轮才找到手感。最初的设计是把符文从棋盘顶部拖出来攻击、从底部拖出来治疗，限制太死，于是改成了双击直接触发。

**Section 3:**
- **heading**
  - EN: Procedural enemies, strict rulesets
  - ZH: 程序化敌人，严格的规则
- **para[0]**
  - EN: To save authoring time, enemies pull abilities from a shared pool. Normal enemies draw 2 abilities; elites draw 3. This created emergent, interesting puzzles.
  - ZH: 为了节省内容制作时间，敌人的技能从一个公用的能力池里随机抽取。普通敌人抽 2 个，精英敌人抽 3 个，由此产生了很多意想不到的有趣组合。
- **para[1]**
  - EN: However, full RNG meant an enemy could pull 2 support abilities and 1 high-pressure attack, making runs unplayable. I implemented a strict rule: a maximum of 1 support ability per enemy, instantly fixing the combat balance.
  - ZH: 不过纯随机会出问题——一个敌人可能同时抽到 2 个辅助技能加 1 个高压进攻技能，这种组合基本无解。于是我加了一条死规则：每个敌人最多只能有 1 个辅助技能，战斗平衡立刻稳了。

**Section 4:**
- **heading**
  - EN: Boon synergies in a short loop
  - ZH: 短循环中的增益协同
- **para[0]**
  - EN: I built four major synergies into the boon pool to support different buildcrafting strategies:
  - ZH: 我在增益池里设计了四条核心联动方向，让玩家能走出不同的 Build 路线：
- **list[1][0]**
  - EN: Swarm vs Nuke: Generating many small runes vs. building a few high-level ones.
  - ZH: Swarm vs Nuke：刷出大量小符文 vs. 集中堆几个高级大符文。
- **list[1][1]**
  - EN: Sustain vs Leech: Standard healing vs. converting heals directly into damage output.
  - ZH: Sustain vs Leech：常规回血 vs. 把回血量直接转化成伤害输出。

**Section 5:**
- **heading**
  - EN: The preview system
  - ZH: 预览系统
- **para[0]**
  - EN: Hovering over a rune projects its exact damage or healing output, factoring in all active modifiers. The same preview system applies to enemy abilities to help players plan their turns.
  - ZH: 鼠标悬停到符文上时，会预览计算好的精确伤害或回血数值，所有当前生效的加成都包含在内。敌人技能同样支持预览，方便玩家提前规划每一回合。
- **note[1]**
  - EN: Known issue: The preview system has minor bugs in the final build during boss fights. Flagged for a future patch.
  - ZH: 已知问题：正式版本中，预览系统在 Boss 战期间存在小 bug，已记录，后续版本会修复。

### Project: Geometrite
- **tag**
  - EN: Co-op Boss Rush
  - ZH: 合作 Boss Rush
- **status**
  - EN: Released
  - ZH: 已发布
- **meta[0].label**
  - EN: Role
  - ZH: 角色
- **meta[0].value**
  - EN: Solo Developer
  - ZH: 独立开发者
- **meta[1].label**
  - EN: Engine
  - ZH: 引擎
- **meta[2].label**
  - EN: Genre
  - ZH: 类型
- **meta[2].value**
  - EN: Co-op Boss Rush
  - ZH: 合作 Boss Rush
- **meta[3].label**
  - EN: Event
  - ZH: 活动
- **meta[4].label**
  - EN: Status
  - ZH: 状态
- **meta[4].value**
  - EN: Released
  - ZH: 已发布
- **link[0].label**
  - EN: Play on itch.io
  - ZH: 在 itch.io 上游玩

**Section 1:**
- **heading**
  - EN: Two players, one boss
  - ZH: 两名玩家，一个 Boss
- **lead[0]**
  - EN: Built solo for Boss Rush Jam 2024. A 2-player co-op boss fight requiring tight coordination to handle mechanics designed to split the team up.
  - ZH: 独立参加 Boss Rush Jam 2024 做的作品。双人合作打 Boss，核心机制都是专门设计来把两个人拆开的，需要高度配合才能应对。

**Section 2:**
- **heading**
  - EN: The exchange mechanic
  - ZH: 「交换」机制
- **para[0]**
  - EN: Designed around the jam theme "exchange." When a player drops a module, it becomes empowered for their partner, significantly buffing its effects. This rewards deliberate passing and turns mistakes into strategic opportunities.
  - ZH: 围绕 Jam 主题「交换」设计。某个玩家放下模块后，它会对搭档产生强化效果。这样一来主动传递会有回报，就连失误也可能变成战术机会。

**Section 3:**
- **heading**
  - EN: Cooperative mechanics design
  - ZH: 合作机制设计
- **para[0]**
  - EN: Boss attack patterns demand different simultaneous roles. For example, during the map-wide wipe mechanic, one player must hold a shield while the other maintains long-range DPS, forcing active communication and role division.
  - ZH: Boss 的攻击模式要求两个人同时扮演不同角色。比如全屏清场机制触发时，一个人必须举盾顶住，另一个要维持远程输出，逼着你们主动喊话、分工。

### Project: Unannounced Live-Service Title
- **title**
  - EN: Unannounced Live-Service Title
  - ZH: 未公开的长线运营项目
- **tag**
  - EN: Core Gameplay Design
  - ZH: 核心玩法设计
- **status**
  - EN: In Development
  - ZH: 研发中
- **meta[0].label**
  - EN: Role
  - ZH: 角色
- **meta[0].value**
  - EN: Gameplay Designer
  - ZH: 玩法设计师
- **meta[1].label**
  - EN: Official Title
  - ZH: 正式职称
- **meta[1].value**
  - EN: Game Programmer
  - ZH: 游戏程序员
- **meta[2].label**
  - EN: Genre
  - ZH: 类型
- **meta[2].value**
  - EN: Live Service
  - ZH: 长线运营
- **meta[3].label**
  - EN: Status
  - ZH: 状态
- **meta[3].value**
  - EN: In Development
  - ZH: 研发中
- **meta[4].label**
  - EN: Disclosure
  - ZH: 保密
- **meta[4].value**
  - EN: NDA Active
  - ZH: NDA 生效中

**Section 1:**
- **heading**
  - EN: Under NDA
  - ZH: NDA 之下
- **lead[0]**
  - EN: Operating as a gameplay designer on an unannounced live-service title, despite my official title as a game programmer. I own core gameplay design responsibilities at the ground level.
  - ZH: 在一款尚未公开的长线运营项目中实际承担玩法设计师的职责，虽然我的正式职位是游戏程序员。从最基础的层面负责核心玩法设计。
- **note[1]**
  - EN: Active NDA restricts disclosing specific mechanics or project details.
  - ZH: 受 NDA 约束，无法透露具体的机制或项目细节。

## [01] Game Development  _(category)_
- **tagline**
  - EN: Engines & Code
  - ZH: 引擎与代码
- **blurb**
  - EN: Building the technical foundation—UE5, Unity, and full-stack web.
  - ZH: 搭建技术底座——UE5、Unity 与全栈 Web。
- **summary**
  - EN: Programming player controllers, custom ability frameworks, and full-stack architecture across Unreal Engine 5, Unity, and React.
  - ZH: 负责开发玩家控制器、自定义技能框架，以及横跨 Unreal Engine 5、Unity 与 React 的全栈架构。

### Project: Metal Genesis
- **tag**
  - EN: Ability Framework
  - ZH: 能力框架
- **status**
  - EN: Demo Released
  - ZH: 试玩版已发布
- **meta[0].label**
  - EN: Role
  - ZH: 角色
- **meta[0].value**
  - EN: Game Programmer
  - ZH: 游戏程序员
- **meta[1].label**
  - EN: Engine
  - ZH: 引擎
- **meta[2].label**
  - EN: Status
  - ZH: 状态
- **meta[2].value**
  - EN: Demo Released
  - ZH: 试玩版已发布
- **link[0].label**
  - EN: Play the Steam Demo
  - ZH: 体验 Steam 试玩版

**Section 1:**
- **heading**
  - EN: What is Metal Genesis
  - ZH: 关于 Metal Genesis
- **lead[0]**
  - EN: An action roguelike built in Unreal Engine 5. I focused on programming the technical execution of the player experience.
  - ZH: 一款基于 Unreal Engine 5 开发的动作 Roguelike。我的主要工作是用程序把玩家体验的设计意图落实到技术层面。

**Section 2:**
- **heading**
  - EN: Technical contributions
  - ZH: 技术贡献
- **para[0]**
  - EN: My responsibilities ranged from low-level character logic to frontend UI integration:
  - ZH: 我的工作范围从底层角色逻辑一直延伸到前端 UI 对接：
- **list[1][0]**
  - EN: Player Controller: Tuned movement logic and responsiveness to support the game's fast-paced combat.
  - ZH: Player Controller：调校移动逻辑和操作响应感，让手感能撑得住游戏的快节奏战斗。
- **list[1][1]**
  - EN: Custom Ability System: Architected a flexible framework to handle complex ability modifiers and synergies.
  - ZH: Custom Ability System：搭建了一套灵活的技能框架，用来处理复杂的能力修正和技能联动。
- **list[1][2]**
  - EN: UI Implementation: Programmed the data-rich HUD and translated aesthetic concepts into functional UI elements.
  - ZH: UI Implementation：开发信息密度较高的 HUD，把美术设计稿转化为实际可用的 UI 组件。
- **list[1][3]**
  - EN: Optimization: Profiled, triaged, and fixed a major performance bottleneck within the bullet system.
  - ZH: Optimization：对子弹系统做了性能分析，定位并修复了一处严重的性能瓶颈。

### Project: Animara World
- **tag**
  - EN: React + Konva R&D
  - ZH: React + Konva 研发
- **status**
  - EN: Shipped
  - ZH: 已上线
- **meta[0].label**
  - EN: Role
  - ZH: 角色
- **meta[0].value**
  - EN: Tech Lead
  - ZH: 技术负责人
- **meta[1].label**
  - EN: Tech
  - ZH: 技术
- **meta[2].label**
  - EN: Infra
  - ZH: 基础设施
- **meta[3].label**
  - EN: Team
  - ZH: 团队
- **meta[3].value**
  - EN: 2 Juniors + Outsource
  - ZH: 2 名初级开发 + 外包
- **link[0].label**
  - EN: Explore the World
  - ZH: 探索这个世界

**Section 1:**
- **heading**
  - EN: A living world on the web
  - ZH: 网页上的活态世界
- **lead[0]**
  - EN: Led the technical development alongside two junior developers and an outsource team. Handled the R&D for the interactive world map.
  - ZH: 带领技术团队开发，成员包括两名初级开发和一支外包团队，负责交互式世界地图的技术预研和落地。

**Section 2:**
- **heading**
  - EN: Technical contributions
  - ZH: 技术贡献
- **list[0][0]**
  - EN: R&D: Architected the map using React and Konva. Optimized rendering performance to handle high element density and animations.
  - ZH: R&D：用 React + Konva 搭建地图，优化渲染性能来承载大量元素和动画的同时运行。
- **list[0][1]**
  - EN: Asset Pipeline: Defined technical requirements and coordinated the delivery pipeline with the art team.
  - ZH: Asset Pipeline：制定技术规范，跟美术团队对齐资源交付流程。
- **list[0][2]**
  - EN: Backend Integration: Implemented Firebase for real-time data handling and integration.
  - ZH: Backend Integration：接入 Firebase，实现实时数据处理和前后端联调。
- **list[0][3]**
  - EN: Technical Leadership: Managed code reviews and unblocked team members on architectural roadblocks.
  - ZH: Technical Leadership：主导代码评审，帮助团队成员解决架构层面的阻塞问题。
- **list[0][4]**
  - EN: CDN: Set up Cloudflare integration to optimize media load times.
  - ZH: CDN：配置 Cloudflare 接入，优化媒体资源的加载速度。

### Project: Casino Conqueror
- **tag**
  - EN: Card-based Roguelike
  - ZH: 卡牌 Roguelike
- **status**
  - EN: Demo Released
  - ZH: 试玩版已发布
- **meta[0].label**
  - EN: Role
  - ZH: 角色
- **meta[0].value**
  - EN: Programmer
  - ZH: 程序员
- **meta[1].label**
  - EN: Engine
  - ZH: 引擎
- **meta[2].label**
  - EN: Genre
  - ZH: 类型
- **meta[2].value**
  - EN: Card Roguelike
  - ZH: 卡牌 Roguelike
- **meta[3].label**
  - EN: Status
  - ZH: 状态
- **meta[3].value**
  - EN: Demo Released
  - ZH: 试玩版已发布
- **link[0].label**
  - EN: View on Steam
  - ZH: 在 Steam 上查看

**Section 1:**
- **heading**
  - EN: Card-based roguelike
  - ZH: 卡牌 Roguelike
- **lead[0]**
  - EN: A card-based roguelike in Unity. I headed the development for the core game logic, path nodes, and the in-game gallery.
  - ZH: 一款用 Unity 开发的卡牌 Roguelike。我负责主导核心游戏逻辑、路径节点以及局内图鉴系统的开发。

**Section 2:**
- **heading**
  - EN: Technical contributions
  - ZH: 技术贡献
- **list[0][0]**
  - EN: Core Game Logic: Built the central gameplay loop and the underlying rules engine.
  - ZH: Core Game Logic：搭建核心玩法循环和底层规则引擎。
- **list[0][1]**
  - EN: Map Systems: Designed and implemented the procedural map generation and path nodes.
  - ZH: Map Systems：设计并实现程序化地图生成和路径节点系统。
- **list[0][2]**
  - EN: Gallery System: Programmed the collectible card viewing interface.
  - ZH: Gallery System：开发收集卡牌的查看展示界面。

## [02] Numerical Design  _(category)_
- **tagline**
  - EN: Balance & Math
  - ZH: 平衡与数学
- **blurb**
  - EN: Solving balance issues with math and metrics.
  - ZH: 用数学和数据指标解决平衡性问题。
- **summary**
  - EN: Building spreadsheet models for skill distribution, scaling curves, and actual gameplay metrics. Tuning the math so the game feels right in playtests.
  - ZH: 针对技能分布、成长曲线和实际玩法数据建立表格模型，把数值调到位，让游戏在实测中真正有手感。

### Project: Case 01 — Enemy Scaling
- **title**
  - EN: Case 01 — Enemy Scaling
  - ZH: 案例 01 — 敌人数值成长
- **tag**
  - EN: Moves-to-Kill Math
  - ZH: 击杀步数（MTK）数学
- **status**
  - EN: Worksheet
  - ZH: 工作表
- **context**
  - EN: Runic Rush — a roguelike built on 2048 mechanics. Swiping moves runes; matches merge into stronger runes. Every swipe ticks down enemy ability cooldowns, forcing tactical decisions.
  - ZH: Runic Rush——一款建立在 2048 机制上的 Roguelike。滑动来移动符文，相同符文合并成更强的符文。每次滑动都会推进敌人技能的冷却倒计时，逼着玩家做出战术判断。
- **link[0].label**
  - EN: View Live Worksheet
  - ZH: 查看在线工作表

**Section 1:**
- **heading**
  - EN: My process
  - ZH: 我的流程
- **para[0]**
  - EN: The core problem was that players merge runes at varying efficiencies, meaning the mathematical baseline couldn't assume perfect play.
  - ZH: 核心难点在于玩家合成符文的效率差异很大，数学基线不能直接假设"完美操作"。
- **para[1]**
  - EN: So at first, I modeled expected player skill brackets to find the average moves-per-merge. Then, I established scaling curves for rune power versus enemy HP, and calculated the "Moves-to-Kill" (MTK) metric to balance the pacing.
  - ZH: 所以一开始，我对玩家的预期水平做了分层建模，算出平均每次合成所需步数。然后建立符文强度对敌人 HP 的成长曲线，用"击杀步数"（MTK）这个指标来平衡整体节奏。
- **para[2]**
  - EN: But during playtesting, I discovered that purely random enemy ability loadouts mathematically broke the game—combinations like haste plus charge plus ravage were completely unsurvivable.
  - ZH: 但测试时发现，敌人技能纯随机组合在数学上就会把游戏搞崩——比如急速 + 蓄力 + 蹂躏这种组合，玩家根本活不下去。
- **para[3]**
  - EN: To fix it, I hard-capped enemy generation to a strict rule: a maximum of 1 support ability and 2 standard abilities. This instantly stabilized the encounter balance.
  - ZH: 为了解决这个问题，给敌人生成加了一条硬性规则：最多 1 个辅助技能加 2 个普通技能。战斗平衡立竿见影地稳住了。

### Project: Case 02 — Encounter Balancing
- **title**
  - EN: Case 02 — Encounter Balancing
  - ZH: 案例 02 — 遭遇战平衡
- **tag**
  - EN: Map Nodes
  - ZH: 地图节点
- **status**
  - EN: Worksheet
  - ZH: 工作表
- **link[0].label**
  - EN: View Map-Nodes Worksheet
  - ZH: 查看地图节点工作表

**Section 1:**
- **heading**
  - EN: My process
  - ZH: 我的流程
- **para[0]**
  - EN: The problem was pacing the run so the risk and reward felt consistent and fair throughout a procedural map.
  - ZH: 问题是如何把控整局的节奏，让风险和回报在程序化地图里始终保持合理和公平。
- **para[1]**
  - EN: At first, I defined the basic node archetypes—combat, elites, shops, and events—and mapped out exactly how much economic or power value each node should drop.
  - ZH: 一开始先定义了基础的节点类型——战斗、精英、商店、事件，并精确规划了每种节点应该给出多少经济价值或强度收益。
- **para[2]**
  - EN: Then I discovered that purely random node distribution created massive difficulty spikes and dead zones in the player's economy.
  - ZH: 然后发现纯随机的节点分布会导致难度剧烈波动，玩家的经济也会出现大段的"空窗期"。
- **para[3]**
  - EN: So I went back and manually balanced the procedural generation weights, hard-coding the distribution logic to maintain a structured tension-and-release loop.
  - ZH: 于是回头手动调整程序化生成的权重，把分布逻辑写死，维持有节奏感的张弛循环。

### Project: Case 03 — Player Power
- **title**
  - EN: Case 03 — Player Power
  - ZH: 案例 03 — 玩家强度
- **tag**
  - EN: Boons & Synergies
  - ZH: 增益与协同
- **status**
  - EN: Worksheet
  - ZH: 工作表
- **link[0].label**
  - EN: View Boons Worksheet
  - ZH: 查看增益工作表

**Section 1:**
- **heading**
  - EN: My process
  - ZH: 我的流程
- **para[0]**
  - EN: The problem was building a set of boons that clearly supported the core synergies—Nuke, Swarm, Sustain, and Leech—without bloating the game.
  - ZH: 难点在于设计出一批能明确支撑核心联动方向——Nuke、Swarm、Sustain、Leech——又不会让内容变得臃肿的增益道具。
- **para[1]**
  - EN: At first, I designed a massive pool of items, working both top-down to fill mechanical gaps and bottom-up from cool emergent interactions.
  - ZH: 一开始设计了一个很大的道具池，既自上而下填补机制缺口，也从底层有趣的联动效果出发往上推。
- **para[2]**
  - EN: But then I discovered the pool was far too diluted with minor buffs. It dragged the fast-paced 10-minute loop into a slog because players couldn't consistently finish their builds.
  - ZH: 结果发现池子被大量小加成道具稀释了，把原本节奏明快的 10 分钟局给拖慢了——玩家很难稳定打出完整的 Build 路线。
- **para[3]**
  - EN: So I aggressively rescoped and pruned the pool. I tuned the RNG drop rates so a player sees the full pool across roughly three runs, locking in the math to keep runs short, punchy, and strategically dense.
  - ZH: 于是大刀阔斧地缩减并精简了池子，同时调整 RNG 掉落概率，让玩家大约三局就能把整个池子见一遍——从数学上保证每局都短促、有冲劲，策略密度也拉满。

## [03] UI / UX  _(category)_
- **tagline**
  - EN: Figma to Frontend
  - ZH: 从 Figma 到前端
- **blurb**
  - EN: Designing clean, functional interfaces.
  - ZH: 做简洁、好用的界面设计。
- **summary**
  - EN: Handling end-to-end UI implementation—from gathering requirements and wiring up Figma prototypes to writing the frontend logic and adding motion polish.
  - ZH: 负责 UI 从头到尾的落地——包括收集需求、串联 Figma 原型，到写前端逻辑、打磨动效细节。

### Project: Meat Delivery Admin Portal
- **title**
  - EN: Meat Delivery Admin Portal
  - ZH: 生鲜配送管理后台
- **tag**
  - EN: Freelance UI/UX
  - ZH: 自由职业 UI/UX
- **status**
  - EN: Delivered
  - ZH: 已交付
- **meta[0].label**
  - EN: Type
  - ZH: 类型
- **meta[0].value**
  - EN: Freelance
  - ZH: 自由职业
- **meta[1].label**
  - EN: Role
  - ZH: 角色
- **meta[1].value**
  - EN: UI/UX Designer
  - ZH: UI/UX 设计师
- **meta[2].label**
  - EN: Tools
  - ZH: 工具
- **meta[3].label**
  - EN: Deliverable
  - ZH: 交付物
- **meta[3].value**
  - EN: Admin Portal UI
  - ZH: 管理后台 UI
- **link[0].label**
  - EN: View Figma Design
  - ZH: 查看 Figma 设计

**Section 1:**
- **heading**
  - EN: Freelance admin portal design
  - ZH: 自由职业的管理后台设计
- **lead[0]**
  - EN: Owned the end-to-end design for a meat-delivery admin portal as a freelance contractor, handling everything from initial requirements to the final Figma handoff.
  - ZH: 以自由职业者身份主导了一个生鲜配送管理后台的完整设计，从最初的需求梳理到最终的 Figma 交付，全程一手包办。

**Section 2:**
- **heading**
  - EN: Process
  - ZH: 流程
- **list[0][0]**
  - EN: Requirements Gathering: Worked with stakeholders to map out business logic and admin workflows.
  - ZH: Requirements Gathering：和相关方一起把业务逻辑与后台操作流程梳理清楚。
- **list[0][1]**
  - EN: Journey Mapping: Documented the user flow for order management, inventory, and vendor oversight.
  - ZH: Journey Mapping：梳理并记录订单管理、库存管理和供应商管理的用户操作路径。
- **list[0][2]**
  - EN: Wireframing: Built low-fidelity wireframes to lock in structure and navigation logic.
  - ZH: Wireframing：制作低保真线框图，确定页面结构与导航逻辑。
- **list[0][3]**
  - EN: UI Design: Delivered high-fidelity Figma screens focused on clean, data-heavy functionality.
  - ZH: UI Design：交付高保真 Figma 界面，重点保持干净简洁、信息密度高的功能导向风格。

### Project: UX Improvement Initiative
- **title**
  - EN: UX Improvement Initiative
  - ZH: 用户体验改进计划
- **tag**
  - EN: Interaction Design
  - ZH: 交互设计
- **status**
  - EN: Cross-Project
  - ZH: 跨项目专项
- **meta[0].label**
  - EN: Type
  - ZH: 类型
- **meta[0].value**
  - EN: Cross-Project Initiative
  - ZH: 跨项目专项
- **meta[1].label**
  - EN: Tools
  - ZH: 工具
- **meta[2].label**
  - EN: Focus
  - ZH: 重点
- **meta[2].value**
  - EN: UX Polish & Motion
  - ZH: UX 打磨与动效

**Section 1:**
- **heading**
  - EN: Proactive interaction design
  - ZH: 主动式交互设计
- **lead[0]**
  - EN: Implemented dynamic interactions for static UI designs to elevate the overall user experience.
  - ZH: 主动给静态 UI 设计加上动态交互，整体提升用户体验。
- **para[1]**
  - EN: Analyzed user journeys from initial mockups and implemented fixes to interaction feedback, UI timings, and visual hierarchy.
  - ZH: 从早期视觉稿出发拆解用户操作路径，持续优化交互反馈、UI 动效时序和视觉层级关系。
- **list[2][0]**
  - EN: Fidelity Upgrades: Converted static Figma frames into responsive, animated frontend components.
  - ZH: 提升还原度：把 Figma 静态设计稿转化为支持响应式和复杂动效的前端组件。
- **list[2][1]**
  - EN: Flow Optimization: Streamlined navigation menus and reduced friction in combat HUDs.
  - ZH: 流程优化：精简导航菜单层级，降低战斗 HUD 的操作卡顿感。
- **list[2][2]**
  - EN: Game Feel: Improved action feedback through specific UI state changes and motion design.
  - ZH: 游戏手感：通过精细的 UI 状态切换和动效设计，大幅强化玩家的操作反馈感。
