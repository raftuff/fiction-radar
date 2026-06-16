/* =========================================================
   FICTION RADAR — script.js
   海外小説・翻訳小説ガイド

   1ファイルで index.html（一覧）と book.html（詳細）の
   両方に対応。作品データ（books 配列）は共通利用する。
   ページ判定：
     #sections    があれば一覧ページを描画
     #book-detail があれば詳細ページを描画
   ========================================================= */

/* ---------------------------------------------------------
   サイト全体設定
   --------------------------------------------------------- */
const siteLastUpdated = "2026-06-15"; // 最終更新日（毎週ここを更新）
const NEW_DAYS = 21;                  // addedDate からこの日数以内は自動でNEW扱い

/* セクション定義（トップページの表示順） */
const SECTIONS = [
  { id: "今週の注目翻訳小説", label: "今週の注目翻訳小説", note: "今いちばん気になる一冊から。", weekly: true },
  { id: "話題の新刊", label: "話題の新刊", note: "刊行されたばかり／話題沸騰中。" },
  { id: "受賞作", label: "受賞作から探す", note: "世界の文学賞・ミステリー賞から。" },
  { id: "映像化原作", label: "映像化原作", note: "ドラマ・映画になった／なる原作。" },
  { id: "サスペンス・犯罪小説", label: "サスペンス・犯罪小説", note: "ページをめくる手が止まらない。" },
  { id: "社会派・ディストピア", label: "社会派・ディストピア", note: "いまの世界を映す物語。" },
  { id: "日本で読まれている海外小説", label: "日本で読まれている海外小説", note: "国内でも広く読まれる定番＆話題作。" },
  { id: "名作・定番", label: "名作・定番", note: "いつ読んでも色あせない一冊。" },
  { id: "翻訳待ちウォッチ", label: "翻訳待ちウォッチ", note: "まだ日本語版なし。これから来るかも？" },
];

/* バッジの色分け（CSSクラスに対応） */
const BADGE_CLASS = {
  "日本語版あり": "badge--ja",
  "受賞作": "badge--award",
  "映像化原作": "badge--screen",
  "話題の新刊": "badge--new",
  "名作": "badge--classic",
  "本屋大賞翻訳小説部門": "badge--jp",
  "このミス海外編": "badge--jp",
  "文春ミステリーベスト10": "badge--jp",
  "読書メーター高反応": "badge--reader",
  "ブクログ話題": "badge--reader",
  "翻訳待ち": "badge--wait",
  "管理人おすすめ": "badge--pick",
  "NEW": "badge--newest",
};

/* =========================================================
   作品データ
   ========================================================= */
const books = [
  {
    id: "prophet-song",
    titleJa: "預言者の歌",
    titleOriginal: "Prophet Song",
    author: "ポール・リンチ",
    country: "アイルランド",

    publisherJa: "早川書房",
    translator: "",
    publicationDateJa: "",
    formatJa: "単行本",
    translationStatus: "translated",
    isbnJa: "9784152105141",   // 日本語版ISBN（13桁推奨）。入れると NDLサーチ／Google Books 経由で書影自動取得を試行

    coverJa: "assets/covers/prophet-song-ja.jpg",
    coverOriginal: "assets/covers/prophet-song-original.jpg",
    coverAlt: "『預言者の歌』書影",
    coverJaUrl: "",        // 外部の日本語版書影URL（例：出版社公式 / Amazonアソシエイト / 楽天アフィリエイト）
    coverOriginalUrl: "",  // 外部の原書版書影URL
    purchaseUrl: "",       // 書影クリックで開く商品ページURL

    genre: ["社会派文学", "ディストピア"],
    mood: ["不穏", "重い", "社会派"],
    badges: ["日本語版あり", "受賞作"],
    awards: ["ブッカー賞"],
    japanRecognition: ["書評掲載多数"],
    readerReaction: "国内でも話題",

    adaptation: "",
    section: ["今週の注目翻訳小説", "受賞作", "社会派・ディストピア"],

    summary: "全体主義化するアイルランドで、家族を守ろうとする母親の視点から描かれる不穏な文学。",
    recommendedFor: "『侍女の物語』や『1984年』のような社会派ディストピアが好きな人に。",

    curatorPick: false,
    weeklyPick: true,
    weeklyIssue: "2026-06-15",
    addedDate: "2026-06-15",
    isNew: true,

    hasAdminComment: true,
    adminCommentTitle: "管理人メモ",
    adminComment: "ブッカー賞受賞作。ここに1000字程度の管理人コメントを入れられます。読んでみての率直な感想、どんな人に刺さりそうか、似た読み味の作品との比較、訳文の印象などを自由に書いてください。（※これはサンプルテキストです。公開前に実際のコメントへ差し替えてください。）",

    relatedBooks: ["侍女の物語", "1984年"],
    links: [],
  },
  {
    id: "the-housemaid",
    titleJa: "ハウスメイド",
    titleOriginal: "The Housemaid",
    author: "フリーダ・マクファデン",
    country: "アメリカ",

    publisherJa: "新潮社",
    translator: "",
    publicationDateJa: "",
    formatJa: "文庫",
    translationStatus: "translated",

    isbnJa: "9784151867019",
    coverJa: "assets/covers/the-housemaid-ja.jpg",
    coverOriginal: "assets/covers/the-housemaid-original.jpg",
    coverAlt: "『ハウスメイド』書影",
    coverJaUrl: "",
    coverOriginalUrl: "",
    purchaseUrl: "",

    genre: ["心理スリラー", "サスペンス"],
    mood: ["どんでん返し", "イッキ読み", "不穏"],
    badges: ["日本語版あり", "話題の新刊", "読書メーター高反応"],
    awards: [],
    japanRecognition: ["話題の翻訳ミステリー"],
    readerReaction: "SNS・読書アプリで高反応",

    adaptation: "",
    section: ["話題の新刊", "サスペンス・犯罪小説", "日本で読まれている海外小説"],

    summary: "裕福な家庭の住み込み家政婦として働き始めた女性。屋根裏部屋の鍵は、なぜ内側からかからないのか。",
    recommendedFor: "二転三転するイッキ読み系の心理スリラーが好きな人に。",

    curatorPick: true,
    weeklyPick: true,
    weeklyIssue: "2026-06-15",
    addedDate: "2026-06-12",
    isNew: true,

    hasAdminComment: true,
    adminCommentTitle: "管理人メモ",
    adminComment: "とにかく一気読みできるタイプ。ここに1000字程度の管理人コメントを入れられます。（※サンプルテキスト。公開前に差し替えてください。）",

    relatedBooks: ["その女アレックス"],
    links: [],
  },
  {
    id: "babayaga-no-yoru",
    titleJa: "ババヤガの夜",
    titleOriginal: "",
    author: "王谷晶",
    country: "日本",

    publisherJa: "河出書房新社",
    translator: "",
    publicationDateJa: "",
    formatJa: "単行本",
    translationStatus: "translated",

    isbnJa: "",
    coverJa: "assets/covers/babayaga-no-yoru-ja.jpg",
    coverOriginal: "",
    coverAlt: "『ババヤガの夜』書影",
    coverJaUrl: "",
    coverOriginalUrl: "",
    purchaseUrl: "",

    genre: ["犯罪小説", "サスペンス"],
    mood: ["疾走感", "バイオレンス", "痛快"],
    badges: ["日本語版あり", "受賞作"],
    awards: ["英国ダガー賞 翻訳部門 受賞"],
    japanRecognition: ["国内ミステリーで高評価"],
    readerReaction: "海外受賞で再注目",

    adaptation: "",
    section: ["受賞作", "サスペンス・犯罪小説", "日本で読まれている海外小説"],

    summary: "暴力団組長の一人娘のボディガードに雇われた喧嘩無敗の女。日本のノワールが海を渡り、英国の賞を射止めた一作。",
    recommendedFor: "疾走感のある女性主人公のクライムノベルを読みたい人に。",

    curatorPick: true,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-05-20",
    isNew: false,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: [],
    links: [],
  },
  {
    id: "where-the-crawdads-sing",
    titleJa: "ザリガニの鳴くところ",
    titleOriginal: "Where the Crawdads Sing",
    author: "ディーリア・オーエンズ",
    country: "アメリカ",

    publisherJa: "早川書房",
    translator: "",
    publicationDateJa: "",
    formatJa: "文庫",
    translationStatus: "translated",

    isbnJa: "",
    coverJa: "assets/covers/where-the-crawdads-sing-ja.jpg",
    coverOriginal: "assets/covers/where-the-crawdads-sing-original.jpg",
    coverAlt: "『ザリガニの鳴くところ』書影",
    coverJaUrl: "",
    coverOriginalUrl: "",
    purchaseUrl: "",

    genre: ["ミステリー", "翻訳文学"],
    mood: ["叙情的", "切ない", "謎解き"],
    badges: ["日本語版あり", "映像化原作", "本屋大賞翻訳小説部門", "ブクログ話題"],
    awards: [],
    japanRecognition: ["本屋大賞 翻訳小説部門", "ベストセラー"],
    readerReaction: "国内ロングセラー",

    adaptation: "映画化（2022年）",
    section: ["映像化原作", "日本で読まれている海外小説", "名作・定番"],

    summary: "湿地でひとり生きる少女と、ある男の死をめぐる謎。自然描写とミステリーが溶け合うベストセラー。",
    recommendedFor: "美しい自然描写と謎解きを同時に味わいたい人に。",

    curatorPick: false,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-05-10",
    isNew: false,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: [],
    links: [],
  },
  {
    id: "santi",
    titleJa: "三体",
    titleOriginal: "三体 / The Three-Body Problem",
    author: "劉慈欣（リウ・ツーシン）",
    country: "中国",

    publisherJa: "早川書房",
    translator: "",
    publicationDateJa: "",
    formatJa: "単行本／文庫",
    translationStatus: "translated",

    isbnJa: "",
    coverJa: "assets/covers/santi-ja.jpg",
    coverOriginal: "assets/covers/santi-original.jpg",
    coverAlt: "『三体』書影",
    coverJaUrl: "",
    coverOriginalUrl: "",
    purchaseUrl: "",

    genre: ["社会派文学", "ディストピア"],
    mood: ["スケール大", "硬派", "知的興奮"],
    badges: ["日本語版あり", "受賞作", "映像化原作"],
    awards: ["ヒューゴー賞"],
    japanRecognition: ["国内でも大ヒット"],
    readerReaction: "シリーズで話題継続",

    adaptation: "ドラマ化（配信）",
    section: ["受賞作", "映像化原作", "社会派・ディストピア", "日本で読まれている海外小説"],

    summary: "文化大革命から始まり、人類と異星文明の接触へ。壮大なスケールで描かれる中国発の話題作。",
    recommendedFor: "社会と科学が交差する重厚な物語を読みたい人に。",

    curatorPick: false,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-05-01",
    isNew: false,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: ["1984年"],
    links: [],
  },
  {
    id: "the-handmaids-tale",
    titleJa: "侍女の物語",
    titleOriginal: "The Handmaid's Tale",
    author: "マーガレット・アトウッド",
    country: "カナダ",

    publisherJa: "早川書房",
    translator: "",
    publicationDateJa: "",
    formatJa: "文庫",
    translationStatus: "translated",

    isbnJa: "",
    coverJa: "assets/covers/the-handmaids-tale-ja.jpg",
    coverOriginal: "assets/covers/the-handmaids-tale-original.jpg",
    coverAlt: "『侍女の物語』書影",
    coverJaUrl: "",
    coverOriginalUrl: "",
    purchaseUrl: "",

    genre: ["ディストピア", "社会派文学"],
    mood: ["不穏", "静かな恐怖", "社会派"],
    badges: ["日本語版あり", "映像化原作", "名作"],
    awards: ["アーサー・C・クラーク賞"],
    japanRecognition: ["読み継がれる定番"],
    readerReaction: "ドラマ化で再評価",

    adaptation: "ドラマ化（『ハンドメイズ・テイル』）",
    section: ["映像化原作", "社会派・ディストピア", "名作・定番"],

    summary: "女性が出産の道具とされる近未来の管理社会。静かで容赦のないディストピアの古典。",
    recommendedFor: "『1984年』『預言者の歌』と並べて読みたい人に。",

    curatorPick: false,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-04-20",
    isNew: false,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: ["1984年", "預言者の歌"],
    links: [],
  },
  {
    id: "nineteen-eighty-four",
    titleJa: "1984年",
    titleOriginal: "Nineteen Eighty-Four",
    author: "ジョージ・オーウェル",
    country: "イギリス",

    publisherJa: "早川書房 ほか",
    translator: "",
    publicationDateJa: "",
    formatJa: "文庫",
    translationStatus: "translated",

    isbnJa: "",
    coverJa: "assets/covers/nineteen-eighty-four-ja.jpg",
    coverOriginal: "assets/covers/nineteen-eighty-four-original.jpg",
    coverAlt: "『1984年』書影",
    coverJaUrl: "",
    coverOriginalUrl: "",
    purchaseUrl: "",

    genre: ["ディストピア", "社会派文学"],
    mood: ["不穏", "重い", "古典"],
    badges: ["日本語版あり", "名作", "映像化原作"],
    awards: [],
    japanRecognition: ["不朽の定番"],
    readerReaction: "世代を超えて読まれる",

    adaptation: "映画化",
    section: ["社会派・ディストピア", "名作・定番"],

    summary: "監視と管理が行き届いた全体主義国家。ディストピア小説の原点にして到達点。",
    recommendedFor: "ディストピアの源流を一度は読んでおきたい人に。",

    curatorPick: false,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-04-10",
    isNew: false,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: ["侍女の物語"],
    links: [],
  },
  {
    id: "millennium-1",
    titleJa: "ミレニアム1 ドラゴン・タトゥーの女",
    titleOriginal: "Män som hatar kvinnor / The Girl with the Dragon Tattoo",
    author: "スティーグ・ラーソン",
    country: "スウェーデン",

    publisherJa: "早川書房",
    translator: "",
    publicationDateJa: "",
    formatJa: "文庫",
    translationStatus: "translated",

    isbnJa: "",
    coverJa: "assets/covers/millennium-1-ja.jpg",
    coverOriginal: "assets/covers/millennium-1-original.jpg",
    coverAlt: "『ミレニアム1 ドラゴン・タトゥーの女』書影",
    coverJaUrl: "",
    coverOriginalUrl: "",
    purchaseUrl: "",

    genre: ["犯罪小説", "サスペンス", "ミステリー"],
    mood: ["北欧ノワール", "重厚", "謎解き"],
    badges: ["日本語版あり", "受賞作", "映像化原作"],
    awards: ["ガラスの鍵賞"],
    japanRecognition: ["翻訳ミステリーの定番"],
    readerReaction: "シリーズで根強い人気",

    adaptation: "映画化（北欧版・ハリウッド版）",
    section: ["受賞作", "映像化原作", "サスペンス・犯罪小説"],

    summary: "失踪事件を追うジャーナリストと、天才ハッカーの女性。北欧ミステリーブームを牽引した一作。",
    recommendedFor: "硬派でボリュームのある北欧ノワールに浸りたい人に。",

    curatorPick: false,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-04-01",
    isNew: false,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: ["その女アレックス"],
    links: [],
  },
  {
    id: "alex",
    titleJa: "その女アレックス",
    titleOriginal: "Alex",
    author: "ピエール・ルメートル",
    country: "フランス",

    publisherJa: "文藝春秋",
    translator: "",
    publicationDateJa: "",
    formatJa: "文庫",
    translationStatus: "translated",

    isbnJa: "",
    coverJa: "assets/covers/alex-ja.jpg",
    coverOriginal: "assets/covers/alex-original.jpg",
    coverAlt: "『その女アレックス』書影",
    coverJaUrl: "",
    coverOriginalUrl: "",
    purchaseUrl: "",

    genre: ["犯罪小説", "心理スリラー", "ミステリー"],
    mood: ["どんでん返し", "緊迫", "イッキ読み"],
    badges: ["日本語版あり", "受賞作", "このミス海外編", "文春ミステリーベスト10"],
    awards: ["英国ダガー賞"],
    japanRecognition: ["このミス海外編 1位", "文春ミステリーベスト10"],
    readerReaction: "国内でも各賞を席巻",

    adaptation: "",
    section: ["受賞作", "サスペンス・犯罪小説", "日本で読まれている海外小説"],

    summary: "監禁された女アレックス。物語の構図がまるごとひっくり返る、フレンチ・サスペンスの代表作。",
    recommendedFor: "予想を裏切られる構成のミステリーが好きな人に。",

    curatorPick: true,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-03-20",
    isNew: false,

    hasAdminComment: true,
    adminCommentTitle: "管理人メモ",
    adminComment: "とにかく構成の妙。ここに1000字程度の管理人コメントを入れられます。前情報をできるだけ入れずに読むのがおすすめ、といった案内も書けます。（※サンプルテキスト。公開前に差し替えてください。）",

    relatedBooks: ["ハウスメイド", "羊たちの沈黙"],
    links: [],
  },
  {
    id: "silence-of-the-lambs",
    titleJa: "羊たちの沈黙",
    titleOriginal: "The Silence of the Lambs",
    author: "トマス・ハリス",
    country: "アメリカ",

    publisherJa: "新潮社",
    translator: "",
    publicationDateJa: "",
    formatJa: "文庫",
    translationStatus: "translated",

    isbnJa: "",
    coverJa: "assets/covers/silence-of-the-lambs-ja.jpg",
    coverOriginal: "assets/covers/silence-of-the-lambs-original.jpg",
    coverAlt: "『羊たちの沈黙』書影",
    coverJaUrl: "",
    coverOriginalUrl: "",
    purchaseUrl: "",

    genre: ["犯罪小説", "サスペンス", "心理スリラー"],
    mood: ["緊迫", "恐怖", "心理戦"],
    badges: ["日本語版あり", "映像化原作", "名作"],
    awards: [],
    japanRecognition: ["翻訳ミステリーの古典"],
    readerReaction: "映画と並ぶ知名度",

    adaptation: "映画化（アカデミー賞作品賞）",
    section: ["映像化原作", "サスペンス・犯罪小説", "名作・定番"],

    summary: "FBI訓練生クラリスと、獄中の天才精神科医ハンニバル・レクター。心理戦サスペンスの金字塔。",
    recommendedFor: "犯人との心理戦を味わうクライムスリラーが好きな人に。",

    curatorPick: false,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-03-10",
    isNew: false,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: ["その女アレックス"],
    links: [],
  },

  /* ---- 翻訳待ちウォッチ（日本語版がまだない想定の例） ---- */
  {
    id: "untranslated-watch-1",
    titleJa: "",
    titleOriginal: "（翻訳待ちの注目作）",
    author: "海外の注目作家",
    country: "—",

    publisherJa: "",
    translator: "",
    publicationDateJa: "",
    formatJa: "",
    translationStatus: "untranslated",
    isbnJa: "",   // 日本語版なし

    coverJa: "",
    coverOriginal: "assets/covers/untranslated-watch-1-original.jpg",
    coverAlt: "翻訳待ち作品の原書書影",
    coverJaUrl: "",
    coverOriginalUrl: "",
    purchaseUrl: "",

    genre: ["サスペンス"],
    mood: ["注目"],
    badges: ["翻訳待ち"],
    awards: ["海外で受賞・候補"],
    japanRecognition: [],
    readerReaction: "海外で話題",

    adaptation: "",
    section: ["翻訳待ちウォッチ"],

    summary: "海外で高く評価されつつ、まだ日本語版が出ていない作品をウォッチする枠。邦訳決定の報を待ちたい一冊。",
    recommendedFor: "原書でいち早く読みたい人、邦訳ニュースを追いたい人に。",

    curatorPick: false,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-06-14",
    isNew: true,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: [],
    links: [],
  },
];

/* =========================================================
   共通ヘルパー
   ========================================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const CURATOR_KEY = "__curator"; // 「管理人おすすめ」絞り込み用の擬似セクションID

/* "2026-06-15" → "2026.06.15" */
function formatDot(d) {
  if (!d) return "";
  return String(d).replaceAll("-", ".");
}

/* addedDate が NEW_DAYS 以内、または isNew=true なら NEW 扱い */
function isNewBook(book) {
  if (book.isNew === true) return true;
  if (!book.addedDate) return false;
  const added = new Date(book.addedDate);
  const base = new Date(siteLastUpdated || Date.now());
  if (isNaN(added) || isNaN(base)) return false;
  const diffDays = (base - added) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= NEW_DAYS;
}

/* 表示用バッジ配列（明示バッジ + 自動付与の NEW / 管理人おすすめ） */
function displayBadges(book) {
  const list = [...(book.badges || [])];
  if (book.curatorPick && !list.includes("管理人おすすめ")) list.unshift("管理人おすすめ");
  if (isNewBook(book) && !list.includes("NEW")) list.unshift("NEW");
  return list;
}

function badgeHtml(label) {
  const cls = BADGE_CLASS[label] || "badge--default";
  return `<span class="badge ${cls}">${label}</span>`;
}

/* ISBN を NDLサーチ書影API のURLに変換 */
function ndlThumb(isbn) {
  return isbn ? `https://ndlsearch.ndl.go.jp/thumbnail/${encodeURIComponent(isbn)}.jpg` : "";
}

/* 書影の候補を優先度順に返す。
   各要素は「画像URL文字列」または「"gb:{isbn}"（Google Books API取得トークン）」。
   優先順位：
     1. coverJa         ローカル画像
     2. coverJaUrl      手入力の外部画像URL
     3. NDLサーチ書影    isbnJa から生成
     4. Google Books    isbnJa から取得（"gb:" トークン）
     5. coverOriginal
     6. coverOriginalUrl
     7. （尽きたら No Image）
   翻訳待ち等で coverJa/isbnJa が空なら、原書版が先頭に来る。 */
function coverCandidates(book) {
  const isbn = String(book.isbnJa || "").replace(/[-\s]/g, "");
  return [
    book.coverJa,
    book.coverJaUrl,
    isbn ? ndlThumb(isbn) : "",
    isbn ? "gb:" + isbn : "",
    book.coverOriginal,
    book.coverOriginalUrl,
  ].filter(Boolean);
}

/* 最初に表示する書影src（gbトークンは初期srcには来ない設計） */
function coverSrc(book) {
  const c = coverCandidates(book);
  const first = c.find((x) => !String(x).startsWith("gb:"));
  return first || "";
}

/* 商品ページURL（purchaseUrl 優先、なければ links[0]） */
function productUrl(book) {
  if (book.purchaseUrl) return book.purchaseUrl;
  if (book.links && book.links.length && book.links[0] && book.links[0].url) return book.links[0].url;
  return "";
}

/* Google Books API から書影サムネイルURLを取得（http→httpsに正規化） */
function fetchGoogleBooksThumb(isbn) {
  const api = `https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn)}`;
  return fetch(api)
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      if (!d || !d.items || !d.items.length) return "";
      const il = (d.items[0].volumeInfo || {}).imageLinks || {};
      let u = il.thumbnail || il.smallThumbnail || "";
      return u ? u.replace(/^http:/, "https:") : "";
    })
    .catch(() => "");
}
if (typeof window !== "undefined") window.fetchGoogleBooksThumb = fetchGoogleBooksThumb;

/* 読み込み失敗時に次の候補へ。"gb:" トークンは Google Books を非同期取得し、
   取得できれば差し替え、ダメなら次へ。候補が尽きたらプレースホルダー表示。
   inline onerror から呼ぶためグローバル関数として定義。 */
function coverFallback(img) {
  let fb = [];
  try { fb = JSON.parse(img.getAttribute("data-fallbacks") || "[]"); } catch (e) {}
  if (!fb.length) { img.classList.add("is-missing"); return; }
  const next = fb.shift();
  img.setAttribute("data-fallbacks", JSON.stringify(fb));
  if (typeof next === "string" && next.startsWith("gb:")) {
    fetchGoogleBooksThumb(next.slice(3)).then((url) => {
      if (url) { img.src = url; } else { coverFallback(img); }
    }).catch(() => coverFallback(img));
  } else {
    img.src = next;
  }
}
if (typeof window !== "undefined") window.coverFallback = coverFallback;

/* 書影HTML（画像未設定・読み込み失敗でもプレースホルダーが出る）
   linkUrl を渡すと書影クリックで商品ページ等へ遷移（別タブ）。 */
function coverHtml(book, sizeClass = "", linkUrl = "") {
  const cand = coverCandidates(book);
  const alt = book.coverAlt || (book.titleJa || book.titleOriginal || "") + " 書影";
  // 初期srcは実URLを採用（"gb:"トークンは初期srcにしない）。残りはフォールバックへ。
  const startIdx = cand.findIndex((x) => !String(x).startsWith("gb:"));
  const first = startIdx >= 0 ? cand[startIdx] : "";
  const rest = JSON.stringify(startIdx >= 0 ? cand.slice(startIdx + 1) : []).replace(/'/g, "&#39;");
  const img = first
    ? `<img class="cover__img" src="${first}" alt="${alt}" loading="lazy" data-fallbacks='${rest}' onerror="coverFallback(this)">`
    : "";
  const inner = `
    <div class="cover ${sizeClass}">
      ${img}
      <div class="cover__ph" aria-hidden="true">
        <span class="cover__ph-icon">📖</span>
        <span class="cover__ph-text">No Image</span>
      </div>
    </div>`;
  if (linkUrl) {
    return `<a class="cover-link" href="${linkUrl}" target="_blank" rel="noopener" title="商品ページを開く">${inner}</a>`;
  }
  return inner;
}

/* カード上の出版元・翻訳者の簡潔表示 */
function briefPublisher(book) {
  if (book.translationStatus !== "translated") return "";
  const parts = [];
  if (book.publisherJa) parts.push(book.publisherJa);
  if (book.translator) parts.push(`翻訳：${book.translator}`);
  return parts.join("｜");
}

/* 著者｜原題 のサブ表示 */
function subLine(book) {
  const hasJa = book.translationStatus === "translated" && book.titleJa;
  let sub = book.author || "";
  if (book.titleOriginal && hasJa) sub += `｜原題：${book.titleOriginal}`;
  return sub;
}

function mainTitle(book) {
  const hasJa = book.translationStatus === "translated" && book.titleJa;
  return hasJa ? book.titleJa : (book.titleOriginal || "（タイトル未定）");
}

/* =========================================================
   一覧ページ（index.html）
   ========================================================= */
const state = { query: "", genre: "all", activeSection: "all" };

function cardHtml(book) {
  const title = mainTitle(book);
  const sub = subLine(book);
  const genreLine = book.genre.join("・");
  const badges = displayBadges(book).map(badgeHtml).join("");
  const brief = briefPublisher(book);

  const statusChip = book.translationStatus === "translated"
    ? `<span class="chip chip--ja">日本語版あり</span>`
    : `<span class="chip chip--wait">翻訳待ち</span>`;

  return `
  <a class="card" href="book.html?id=${encodeURIComponent(book.id)}">
    ${coverHtml(book, "cover--card")}
    <div class="card__body">
      <div class="card__badges">${badges}</div>
      <h3 class="card__title">${title}</h3>
      <p class="card__sub">${sub}</p>
      ${brief ? `<p class="card__pub">${brief}</p>` : ""}
      <p class="card__genre">${genreLine}　${statusChip}</p>
      <p class="card__summary">${book.summary}</p>
      <span class="card__more">詳しく見る →</span>
    </div>
  </a>`;
}

function applyFilters(list) {
  return list.filter((b) => {
    if (state.genre !== "all" && !b.genre.includes(state.genre)) return false;
    if (state.query) {
      const hay = (b.titleJa + " " + b.titleOriginal + " " + b.author + " " + b.genre.join(" ") + " " + b.summary).toLowerCase();
      if (!hay.includes(state.query.toLowerCase())) return false;
    }
    return true;
  });
}

function booksForSection(sec) {
  let base;
  if (sec.weekly) {
    // 「今週の注目翻訳小説」は weeklyPick:true を表示（無ければ section 所属でフォールバック）
    base = books.filter((b) => b.weeklyPick === true);
    if (base.length === 0) base = books.filter((b) => b.section.includes(sec.id));
  } else {
    base = books.filter((b) => b.section.includes(sec.id));
  }
  return applyFilters(base);
}

function renderIndex() {
  const root = $("#sections");
  if (!root) return;
  root.innerHTML = "";

  // 管理人おすすめの絞り込み
  if (state.activeSection === CURATOR_KEY) {
    const list = applyFilters(books.filter((b) => b.curatorPick === true));
    root.innerHTML = sectionBlock("サイト管理人おすすめ", "サイトの方向性に合う、管理人が推したい作品。", list, false);
    return;
  }

  let anyResult = false;
  SECTIONS.forEach((sec) => {
    if (state.activeSection !== "all" && state.activeSection !== sec.id) return;
    const list = booksForSection(sec);
    if (list.length === 0 && (state.query || state.genre !== "all")) return;
    anyResult = anyResult || list.length > 0;
    const noteExtra = sec.weekly ? `${formatDot(siteLastUpdated)} 更新｜` : "";
    root.insertAdjacentHTML("beforeend", sectionBlock(sec.label, noteExtra + sec.note, list, sec.weekly));
  });

  if (!anyResult) {
    root.innerHTML = `<p class="empty empty--big">条件に合う作品が見つかりませんでした。検索ワードや絞り込みを変えてみてください。</p>`;
  }
}

function sectionBlock(label, note, list, feature) {
  const cards = list.map(cardHtml).join("") || `<p class="empty">該当する作品はまだありません。</p>`;
  return `
    <section class="section">
      <div class="section__head">
        <h2 class="section__title">${label}</h2>
        <p class="section__note">${note}</p>
      </div>
      <div class="cards ${feature ? "cards--feature" : ""}">${cards}</div>
    </section>`;
}

function setupIndexControls() {
  const search = $("#search");
  if (search) {
    search.addEventListener("input", (e) => { state.query = e.target.value.trim(); renderIndex(); });
  }

  const genreSel = $("#genre-filter");
  if (genreSel) {
    [...new Set(books.flatMap((b) => b.genre))].sort().forEach((g) => {
      const opt = document.createElement("option");
      opt.value = g; opt.textContent = g;
      genreSel.appendChild(opt);
    });
    genreSel.addEventListener("change", (e) => { state.genre = e.target.value; renderIndex(); });
  }

  $$("[data-section]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      state.activeSection = a.getAttribute("data-section");
      $$("[data-section]").forEach((n) => n.classList.remove("is-active"));
      a.classList.add("is-active");
      renderIndex();
      const top = $("#sections").offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
      const nav = $("#main-nav");
      if (nav) nav.classList.remove("is-open");
    });
  });

  const reset = $("#show-all");
  if (reset) {
    reset.addEventListener("click", (e) => {
      e.preventDefault();
      state.activeSection = "all"; state.query = ""; state.genre = "all";
      if (search) search.value = "";
      if (genreSel) genreSel.value = "all";
      $$("[data-section]").forEach((n) => n.classList.remove("is-active"));
      renderIndex();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const menuBtn = $("#menu-toggle");
  const nav = $("#main-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", nav.classList.contains("is-open"));
    });
  }
}

/* =========================================================
   詳細ページ（book.html）
   ========================================================= */
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function detailRow(label, value) {
  if (!value) return "";
  return `<div class="d-row"><dt>${label}</dt><dd>${value}</dd></div>`;
}

function renderDetail() {
  const root = $("#book-detail");
  if (!root) return;

  const id = getParam("id");
  const book = books.find((b) => b.id === id);

  if (!book) {
    root.innerHTML = `
      <p class="empty empty--big">作品が見つかりませんでした。<br>
      <a class="back-link" href="index.html">← 一覧に戻る</a></p>`;
    document.title = "作品が見つかりません｜FICTION RADAR";
    return;
  }

  const title = mainTitle(book);
  document.title = `${title}｜FICTION RADAR`;

  const badges = displayBadges(book).map(badgeHtml).join("");
  const genreLine = book.genre.join("・");
  const moodLine = (book.mood || []).join("・");

  // 基本情報（dl）
  const info = [
    detailRow("原題", book.titleOriginal),
    detailRow("著者", book.author),
    detailRow("国・地域", book.country),
    detailRow("出版社", book.translationStatus === "translated" ? book.publisherJa : ""),
    detailRow("翻訳者", book.translator),
    detailRow("日本語版発売日", book.publicationDateJa),
    detailRow("形態", book.formatJa),
    detailRow("ジャンル", genreLine),
    detailRow("読み味", moodLine),
    detailRow("海外評価", (book.awards || []).join(" / ")),
    detailRow("日本評価", (book.japanRecognition || []).join(" / ")),
    detailRow("読者反応", book.readerReaction),
    detailRow("映像化", book.adaptation),
  ].join("");

  // 管理人メモ
  let adminBlock = "";
  if (book.hasAdminComment && book.adminComment) {
    adminBlock = `
      <section class="d-section d-admin">
        <h2 class="d-h2">${book.adminCommentTitle || "管理人メモ"}</h2>
        <div class="d-admin__body">${book.adminComment.replace(/\n/g, "<br>")}</div>
      </section>`;
  }

  // 関連作品
  let relatedBlock = "";
  if (book.relatedBooks && book.relatedBooks.length) {
    const items = book.relatedBooks.map((t) => {
      const rb = books.find((b) => b.titleJa === t || b.titleOriginal === t);
      if (rb) return `<a class="related-chip" href="book.html?id=${encodeURIComponent(rb.id)}">${t}</a>`;
      return `<span class="related-chip related-chip--plain">${t}</span>`;
    }).join("");
    relatedBlock = `
      <section class="d-section">
        <h2 class="d-h2">関連作品</h2>
        <div class="related-list">${items}</div>
      </section>`;
  }

  // 購入・参照リンク
  let linksBlock = "";
  if (book.links && book.links.length) {
    const items = book.links.map((l) => `<a class="d-link" href="${l.url}" target="_blank" rel="noopener">${l.label || l.url}</a>`).join("");
    linksBlock = `
      <section class="d-section">
        <h2 class="d-h2">購入・参照リンク</h2>
        <div class="d-links">${items}</div>
      </section>`;
  }

  const statusChip = book.translationStatus === "translated"
    ? `<span class="chip chip--ja">日本語版あり</span>`
    : `<span class="chip chip--wait">翻訳待ち（日本語版なし）</span>`;

  root.innerHTML = `
    <p class="d-back"><a class="back-link" href="index.html">← 一覧に戻る</a></p>

    <div class="d-hero">
      <div class="d-cover">${coverHtml(book, "cover--detail", productUrl(book))}
        ${productUrl(book) ? `<p class="d-cover-note">画像クリックで商品ページへ</p>` : ""}
      </div>
      <div class="d-head">
        <div class="card__badges">${badges}</div>
        <h1 class="d-title">${title}</h1>
        ${(book.titleOriginal && book.translationStatus === "translated") ? `<p class="d-original">原題：${book.titleOriginal}</p>` : ""}
        <p class="d-author">${book.author}${book.country ? `（${book.country}）` : ""}</p>
        <p class="d-status">${statusChip}</p>
        ${briefPublisher(book) ? `<p class="d-pub">${briefPublisher(book)}</p>` : ""}
      </div>
    </div>

    <section class="d-section">
      <h2 class="d-h2">作品情報</h2>
      <dl class="d-info">${info}</dl>
    </section>

    <section class="d-section">
      <h2 class="d-h2">紹介</h2>
      <p class="d-summary">${book.summary}</p>
      ${book.recommendedFor ? `<p class="d-rec"><b>こんな人におすすめ：</b>${book.recommendedFor}</p>` : ""}
    </section>

    ${adminBlock}
    ${relatedBlock}
    ${linksBlock}

    <p class="d-back d-back--bottom"><a class="back-link" href="index.html">← 一覧に戻る</a></p>
  `;
}

/* =========================================================
   起動
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  // 最終更新日の表示（両ページ共通）
  $$("[data-last-updated]").forEach((el) => { el.textContent = formatDot(siteLastUpdated); });

  // 年表示
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  if ($("#sections")) {           // 一覧ページ
    renderIndex();
    setupIndexControls();
  }
  if ($("#book-detail")) {        // 詳細ページ
    renderDetail();
    const menuBtn = $("#menu-toggle");
    const nav = $("#main-nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", () => nav.classList.toggle("is-open"));
    }
  }
});
