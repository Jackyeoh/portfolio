/* =========================================================================
   I18N  — tiny localization layer (English + Simplified Chinese).
   Plain global (no JSX) so it loads before the React layer, alongside data.js.

   Authoring model — "seamless" incremental localization:
     • Any translatable value is either a plain string OR a { en, zh } object.
     • pick(value, lang) resolves it; a plain string passes through untouched,
       and a { en, zh } object missing the active language falls back to `en`.
     • So proper nouns / tech names (Unity, Firebase, Steam…) stay plain, and a
       half-translated field still renders — never blank.

   Content lives bilingually in data.js (via its L() helper, which just makes
   { en, zh }); UI chrome strings live in the UI dictionary below.
   ========================================================================= */
(function () {
  const L = (en, zh) => ({ en, zh });

  // is this a bilingual capsule rather than a plain value?
  const isCapsule = (v) =>
    v != null && typeof v === 'object' && !Array.isArray(v) && ('en' in v || 'zh' in v);

  // resolve a (possibly bilingual) value for the active language.
  // returns plain values as-is; falls back to English when a translation is absent.
  function pick(value, lang) {
    if (!isCapsule(value)) return value;
    const v = value[lang];
    return v != null ? v : value.en;
  }

  const LANGS = ['en', 'zh'];

  // initial language: saved choice > browser preference > English
  function detect() {
    try {
      const saved = localStorage.getItem('jy_lang');
      if (saved === 'en' || saved === 'zh') return saved;
    } catch (e) { /* storage blocked */ }
    const nav = ((typeof navigator !== 'undefined' && navigator.language) || '').toLowerCase();
    return nav.indexOf('zh') === 0 ? 'zh' : 'en';
  }

  function save(lang) {
    try { localStorage.setItem('jy_lang', lang); } catch (e) { /* storage blocked */ }
  }

  // short label shown on the toggle for the *other* language (the one you'd switch to)
  const TOGGLE_LABEL = { en: '中文', zh: 'EN' };

  /* ---- UI chrome strings (everything not in data.js) ----
     Purely decorative "machine readout" labels (SYS.VER, TRACE_ACTIVE,
     SYSTEM_NOMINAL, core // jack_yeoh, etc.) are intentionally left as English
     constants — they read as system output, not prose, in both languages. */
  const UI = {
    // top bar
    motionOn:  L('Motion: On',  '动效：开'),
    motionOff: L('Motion: Off', '动效：关'),
    credits:   L('Credits',     '制作名单'),
    reboot:    L('Reboot',      '重启'),
    langSwitch: L('Switch to 中文', '切换到 English'), // title attr on the toggle (current-language)

    // credits modal
    colophon:    L('// Colophon',          '// 版本说明'),
    creditsTitle: L('Credits',             '制作名单'),
    music:       L('Music',                '音乐'),
    sfx:         L('Sound Effects',        '音效'),
    tapClose:    L('tap anywhere to close', '点击任意处关闭'),

    // preloader
    initializing: L('Initializing', '正在初始化'),
    ready:        L('// Ready',     '// 就绪'),

    // hub
    thesis:           L('I design and build games — systems, code, balance, and the UX in between.',
                        '我设计并开发游戏——系统、代码、数值平衡，以及介于其间的用户体验。'),
    pickDiscipline:   L('Pick a discipline to go deeper ↓', '选择一个领域深入了解 ↓'),
    coreCompetencies: L('Core Competencies', '核心能力'),
    supportingSkills: L('Supporting Skills', '辅助技能'),
    selectDiscipline: L('Select Discipline', '选择领域'),
    operatorProfile:  L('Operator // Profile', '操作员 // 档案'),
    fieldNoteAI:      L('Field_Note // On_AI', '现场笔记 // 关于 AI'),

    // intro cinematic
    introKicker: L('Portfolio',                       '作品集'),
    introCta:    L('Check out my core competencies',  '了解我的核心能力'),
    tapBegin:    L('Tap to begin',                    '点击开始'),

    // category view
    returnTo:      L('Return to', '返回'),
    system:        L('System',    '主页'),
    discipline:    L('Discipline', '领域'),
    entry:         L('Entry',     '条目'),
    entries:       L('Entries',   '条目'),
    selectToOpen:  L('select to open', '点击展开'),
    moreToCome:    L('More to come', '更多即将到来'),
    futureUpdates: L('Future updates', '未来更新'),

    // project view
    dossier:  L('Dossier',   '档案'),
    note:     L('Note',      '注'),
    context:  L('Context',   '背景'),
    copyLink: L('Copy Link', '复制链接'),
    copied:   L('Copied',    '已复制'),
  };

  window.I18N = { L, pick, detect, save, LANGS, TOGGLE_LABEL, UI };
})();
