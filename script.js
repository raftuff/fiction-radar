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
const siteLastUpdated = "2026-07-01"; // 最終更新日（毎週ここを更新）
const NEW_DAYS = 21;                  // addedDate からこの日数以内は自動でNEW扱い

/* セクション定義（トップページの表示順） */
const SECTIONS = [
  { id: "新着・注目の翻訳本", label: "新着・注目の翻訳本", note: "刊行されたばかりの翻訳本や、いま注目したい海外小説。", weekly: true },
  { id: "管理人おすすめ", label: "管理人おすすめ", note: "サイトの方向性に合う、推したい一冊。" },
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
    primarySection: "新着・注目の翻訳本",   // TOP初期表示で出すセクション（重複防止）
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

    coverJa: "",
    coverOriginal: "assets/covers/prophet-song-original.jpg",
    coverAlt: "『預言者の歌』書影",
    coverJaUrl: "https://www.hayakawa-online.co.jp/img/goods/L/5210514.jpg",  // 外部の日本語版書影URL
    coverOriginalUrl: "",  // 外部の原書版書影URL
    purchaseUrl: "https://www.hayakawa-online.co.jp/shop/g/g0005210514/",    // 書影クリックで開く商品ページURL

    genre: ["社会派文学", "ディストピア"],
    mood: ["不穏", "重い", "社会派"],
    badges: ["日本語版あり", "受賞作"],
    awards: ["ブッカー賞"],
    japanRecognition: ["書評掲載多数"],
    readerReaction: "国内でも話題",

    adaptation: "",
    section: ["新着・注目の翻訳本", "受賞作", "社会派・ディストピア"],

    summary: "全体主義化するアイルランドで、家族を守ろうとする母親の視点から描かれる不穏な文学。",
    recommendedFor: "『侍女の物語』や『1984年』のような社会派ディストピアが好きな人に。",

    curatorPick: false,
    weeklyPick: true,
    weeklyIssue: "2026-06-15",
    addedDate: "2026-06-15",
    isNew: true,

    hasAdminComment: true,
    adminCommentTitle: "管理人メモ",
    adminComment: `【登場人物リスト】

エイリッシュ・スタック：
本作の主人公。科学者であり、母であり、崩れていく日常のなかで家族を守ろうとする人物。国家の変質を「大きな政治の話」としてではなく、家庭のなかに入り込んでくる恐怖として受け止めていく。

ラリー・スタック：
エイリッシュの夫。教員組合の幹部。国家権力の圧力にさらされ、家族の生活にも不穏な影を落としていく存在。

マーク：
エイリッシュとラリーの長男。成長しつつある息子として描かれ、政治や戦争の影響が若い世代にも及んでいくことを象徴する。

モリー：
エイリッシュとラリーの娘。家庭のなかの不安や変化を敏感に受け止める存在。

ベイリー：
エイリッシュとラリーの子ども。家族の日常が失われていく過程で、守るべき生活の象徴として印象に残る。

ベン：
エイリッシュとラリーの幼い子ども。まだ世界の変化を理解できない年齢であり、その無防備さが物語の切実さを強めている。

サイモン：
エイリッシュの父。老いや記憶の揺らぎを抱える存在として、家庭内の負荷と社会の崩壊が重なっていく。

【管理人メモ】

『預言者の歌』は、いわゆる近未来ディストピア小説でありながら、読み味としてはかなり『1984年』に近いものがある。ただし、監視社会や全体主義を理念として描くというより、もっと生活に近い。ある日突然、国家の空気が変わり、警察が家に来て、夫が消え、子どもたちの日常が壊れていく。その変化が、ニュースの中の出来事ではなく、台所や玄関や子ども部屋にまで染み込んでくる。

怖いのは、世界が一気に壊れるわけではないところ。最初はまだ「何とかなる」と思える。少し待てば戻るかもしれない。自分の家族だけは守れるかもしれない。けれど、その判断の遅れや希望そのものが、だんだん逃げ道を狭めていく。そこに今読むべき切実さがある。

『1984年』が国家による支配の完成形を描いた小説だとするなら、『預言者の歌』は、そこへ向かう途中で普通の人が何を失っていくのかを描いた小説だと思う。政治的なテーマは重いが、中心にあるのは母親が家族を守ろうとする物語で、その視点があるからこそ読後感が強く残る。世界情勢や社会の分断が現実のものとして感じられる今だからこそ、かなり刺さる一冊。`,

    relatedBooks: ["侍女の物語", "1984年"],
    links: [],
  },
  {
    id: "the-housemaid",
    primarySection: "新着・注目の翻訳本",
    titleJa: "ハウスメイド",
    titleOriginal: "The Housemaid",
    author: "フリーダ・マクファデン",
    country: "アメリカ",

    publisherJa: "早川書房",
    translator: "",
    publicationDateJa: "",
    formatJa: "文庫",
    translationStatus: "translated",

    isbnJa: "9784151867019",
    coverJa: "",
    coverOriginal: "assets/covers/the-housemaid-original.jpg",
    coverAlt: "『ハウスメイド』書影",
    coverJaUrl: "https://www.hayakawa-online.co.jp/img/goods/L/614856.jpg",
    coverOriginalUrl: "",
    purchaseUrl: "https://www.hayakawa-online.co.jp/shop/g/g0000614856/",

    genre: ["心理スリラー", "サスペンス"],
    mood: ["どんでん返し", "イッキ読み", "不穏"],
    badges: ["日本語版あり", "話題の新刊", "読書メーター高反応"],
    awards: [],
    japanRecognition: ["話題の翻訳ミステリー"],
    readerReaction: "SNS・読書アプリで高反応",

    adaptation: "",
    section: ["新着・注目の翻訳本", "サスペンス・犯罪小説", "日本で読まれている海外小説"],

    summary: "裕福な家庭の住み込み家政婦として働き始めた女性。屋根裏部屋の鍵は、なぜ内側からかからないのか。",
    recommendedFor: "二転三転するイッキ読み系の心理スリラーが好きな人に。",

    curatorPick: false,
    weeklyPick: true,
    weeklyIssue: "2026-06-15",
    addedDate: "2026-06-12",
    isNew: true,

    hasAdminComment: false,
    adminCommentTitle: "",
    adminComment: "",

    relatedBooks: ["その女アレックス"],
    links: [],
  },
  {
    id: "where-the-crawdads-sing",
    primarySection: "映像化原作",
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
    coverJa: "",
    coverOriginal: "assets/covers/where-the-crawdads-sing-original.jpg",
    coverAlt: "『ザリガニの鳴くところ』書影",
    coverJaUrl: "https://www.hayakawa-online.co.jp/img/goods/L/614440.jpg",
    coverOriginalUrl: "",
    purchaseUrl: "https://www.hayakawa-online.co.jp/shop/g/g0000031519/",

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
    primarySection: "日本で読まれている海外小説",
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
    coverJa: "",
    coverOriginal: "assets/covers/santi-original.jpg",
    coverAlt: "『三体』書影",
    coverJaUrl: "https://www.hayakawa-online.co.jp/img/goods/L/614488.jpg",
    coverOriginalUrl: "",
    purchaseUrl: "https://www.hayakawa-online.co.jp/shop/g/g0000614488/",

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
    primarySection: "社会派・ディストピア",
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
    coverJa: "",
    coverOriginal: "assets/covers/the-handmaids-tale-original.jpg",
    coverAlt: "『侍女の物語』書影",
    coverJaUrl: "https://www.hayakawa-online.co.jp/img/goods/L/611254.jpg",
    coverOriginalUrl: "",
    purchaseUrl: "https://www.hayakawa-online.co.jp/shop/g/g0000611254/",

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
    primarySection: "名作・定番",
    titleJa: "1984年",
    titleOriginal: "Nineteen Eighty-Four",
    author: "ジョージ・オーウェル",
    country: "イギリス",

    publisherJa: "早川書房",
    translator: "",
    publicationDateJa: "",
    formatJa: "文庫",
    translationStatus: "translated",

    isbnJa: "",
    coverJa: "",
    coverOriginal: "assets/covers/nineteen-eighty-four-original.jpg",
    coverAlt: "『1984年』書影",
    coverJaUrl: "https://www.hayakawa-online.co.jp/img/goods/L/610293.jpg",
    coverOriginalUrl: "",
    purchaseUrl: "https://www.hayakawa-online.co.jp/shop/g/g0000610293/",

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
    primarySection: "サスペンス・犯罪小説",
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
    coverJa: "",
    coverOriginal: "assets/covers/millennium-1-original.jpg",
    coverAlt: "『ミレニアム1 ドラゴン・タトゥーの女』書影",
    coverJaUrl: "https://www.hayakawa-online.co.jp/img/goods/L/610275.jpg",
    coverOriginalUrl: "",
    purchaseUrl: "https://www.hayakawa-online.co.jp/shop/g/g0000610275/",

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

    curatorPick: true,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-04-01",
    isNew: false,

    hasAdminComment: true,
    adminCommentTitle: "管理人メモ",
    adminComment: `【管理人メモ】

映画版のヒットで『ドラゴン・タトゥーの女』を知った人は多いと思う。映像作品としての完成度も高いが、原作には映画だけでは拾いきれない面白さがかなりある。

原作の魅力は、事件の背景、人物の心理、社会の暗部が細かく積み上げられていくところにある。リスベット・サランデルというキャラクターの異物感、傷、怒り、そして圧倒的な存在感も、活字で読むことでより深く伝わってくる。サスペンスとしての引きはもちろん強いが、それだけでなく、北欧社会の影や暴力性をスタイリッシュかつ重厚に読ませる作品でもある。

映画ではテンポよく整理されていた部分も、原作ではよりエグく、より複雑で、心理描写も緻密。映画版が好きな人ほど、原作を読むとこの作品世界の厚みが増すはず。映像化原作としても、北欧ミステリーの入口としても、かなりおすすめしたい一冊。`,

    relatedBooks: ["その女アレックス"],
    links: [],
  },
  {
    id: "alex",
    primarySection: "受賞作",
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
    coverJa: "",
    coverOriginal: "assets/covers/alex-original.jpg",
    coverAlt: "『その女アレックス』書影",
    coverJaUrl: "https://m.media-amazon.com/images/I/91lnBRpAXXL._SY522_.jpg",
    coverOriginalUrl: "",
    purchaseUrl: "https://books.bunshun.jp/ud/book/num/9784167901967",

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

    curatorPick: false,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-03-20",
    isNew: false,

    hasAdminComment: false,
    adminCommentTitle: "",
    adminComment: "",

    relatedBooks: ["ハウスメイド", "羊たちの沈黙"],
    links: [],
  },
  {
    id: "silence-of-the-lambs",
    primarySection: "名作・定番",
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
    coverJa: "",
    coverOriginal: "assets/covers/silence-of-the-lambs-original.jpg",
    coverAlt: "『羊たちの沈黙』書影",
    coverJaUrl: "https://www.shinchosha.co.jp/images_v2/book/cover/216708/216708_l.jpg",
    coverOriginalUrl: "",
    purchaseUrl: "https://www.shinchosha.co.jp/book/216708/",

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

  /* ---- 管理人おすすめ（追加） ---- */
  {
    id: "stone-circle",
    titleJa: "ストーンサークルの殺人",
    titleOriginal: "",
    author: "",
    country: "イギリス",

    publisherJa: "早川書房",
    translator: "",
    publicationDateJa: "",
    formatJa: "",
    translationStatus: "translated",

    coverJa: "",
    coverJaUrl: "https://www.hayakawa-online.co.jp/img/goods/L/613012.jpg",
    coverOriginal: "",
    coverOriginalUrl: "",
    coverAlt: "『ストーンサークルの殺人』書影",
    purchaseUrl: "https://www.hayakawa-online.co.jp/shop/g/g0000613012/",

    genre: ["犯罪小説", "ミステリー", "サスペンス"],
    mood: ["不穏", "ページターナー", "英国ミステリー"],
    badges: ["管理人おすすめ", "日本語版あり", "受賞作"],
    awards: ["英国推理作家協会賞 ゴールド・ダガー賞"],
    japanRecognition: [],
    readerReaction: "",

    adaptation: "",
    section: ["管理人おすすめ", "サスペンス・犯罪小説", "受賞作"],
    primarySection: "管理人おすすめ",

    summary: "英国推理作家協会賞ゴールド・ダガー賞を受賞した、英国ミステリーらしい不穏さと謎解きの面白さを楽しめる一冊。",
    recommendedFor: "海外ミステリーのシリーズものや、じっくり読ませる犯罪小説が好きな人に。",

    curatorPick: true,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-06-17",
    isNew: true,

    hasAdminComment: true,
    adminCommentTitle: "管理人メモ",
    adminComment: `【管理人メモ】

主人公のワシントン・ポーをはじめ、登場人物たちの凹凸のあるキャラクターがとにかく魅力的。完璧なヒーローではなく、それぞれにクセや不器用さ、偏りがある。その人物像が事件の捜査と絡み合い、単なる謎解き以上に「この人たちをもっと見ていたい」と思わせてくれる。

事件そのものの謎もかなり強い。猟奇性や不穏さで引っ張るだけではなく、なぜそうなったのか、次に何が明かされるのかというサスペンスの推進力が抜群にある。1センテンスが比較的短く、文末ごとに小さなクリフハンガーが仕込まれているようなリズムがあり、文章そのものにもスピード感がある。

英国ミステリーらしい暗さと、ページターナーとしての読みやすさのバランスがかなり良い。重たい事件を扱いながらも、とにかく読む手が止まらない。ワシントン・ポーのシリーズは、キャラクター、謎、テンポの三拍子が揃っていて、個人的にはシリーズすべてが最高と言いたくなるくらい好きな作品。`,

    relatedBooks: ["殺人者の顔", "ミレニアム1 ドラゴン・タトゥーの女", "その女アレックス"],
    links: [],
  },
  {
    id: "faceless-killers",
    titleJa: "殺人者の顔",
    titleOriginal: "",
    author: "ヘニング・マンケル",
    country: "スウェーデン",

    publisherJa: "東京創元社",
    translator: "",
    publicationDateJa: "",
    formatJa: "",
    translationStatus: "translated",

    coverJa: "",
    coverJaUrl: "https://www.tsogen.co.jp/img/cover_image_l/20902.jpg",
    coverOriginal: "",
    coverOriginalUrl: "",
    coverAlt: "『殺人者の顔』書影",
    purchaseUrl: "https://www.tsogen.co.jp/np/isbn/9784488209025",

    genre: ["犯罪小説", "ミステリー", "北欧ミステリー"],
    mood: ["重厚", "硬派", "北欧ノワール"],
    badges: ["管理人おすすめ", "日本語版あり", "受賞作", "映像化原作", "名作"],
    awards: ["CWAゴールドダガー受賞シリーズ", "スウェーデン推理小説アカデミー最優秀賞"],
    japanRecognition: [],
    readerReaction: "",

    adaptation: "『刑事ヴァランダー』『新米刑事ヴァランダー』など、ヴァランダー刑事シリーズとして映像化。",
    section: ["管理人おすすめ", "サスペンス・犯罪小説", "受賞作", "映像化原作", "名作"],
    primarySection: "管理人おすすめ",

    summary: "北欧ミステリーの代表的シリーズの入口として読みたい、重厚な犯罪小説。ヴァランダー刑事シリーズとして映像化もされている。",
    recommendedFor: "北欧ミステリー、警察小説、硬派な犯罪小説が好きな人に。",

    curatorPick: true,
    weeklyPick: false,
    weeklyIssue: "",
    addedDate: "2026-06-17",
    isNew: true,

    hasAdminComment: true,
    adminCommentTitle: "管理人メモ",
    adminComment: `【登場人物リスト】

クルト・ヴァランダー：
本作の主人公。スウェーデン南部の町イースタで働く刑事。事件を追う警察官であると同時に、離婚、家族関係、孤独、老いへの不安を抱えたひとりの人間として描かれる。

リードベリ：
ヴァランダーの同僚刑事。経験豊かな捜査官として、ヴァランダーを支える存在。

リンダ：
ヴァランダーの娘。父娘関係のぎこちなさや、ヴァランダー自身の家庭面での葛藤を映し出す存在。

モナ：
ヴァランダーの別れた妻。ヴァランダーの私生活の不安定さを象徴する人物。

ビョルク：
警察署長。組織のなかで事件に対応する立場として登場する。

マーティンソン：
ヴァランダーの同僚刑事。捜査チームの一員。

スヴェードベリ：
ヴァランダーの同僚刑事。捜査チームの一員。

ニーベリ：
鑑識担当。現場捜査を支える人物。

【管理人メモ】

『殺人者の顔』は、まさに「これぞ北欧ミステリ」という入口の一冊。派手なトリックやスピード感で押し切るタイプではなく、寒々とした土地の空気、社会の不安、移民問題、地方都市の閉塞感、警察組織の疲弊が、事件の捜査とじわじわ重なっていく。犯罪小説でありながら、社会小説としての読み応えが強い。

主人公のヴァランダーも、単に有能な刑事として描かれるわけではない。離婚後の孤独、娘との距離、老いた父との関係、自分自身の生活の荒れ方など、事件とは別のところでも常に揺れている。その弱さや不器用さがあるから、捜査の重さがただの謎解きではなく、ひとりの人間が社会の暗部に向き合っていく物語として響いてくる。

北欧ミステリらしい重厚さは、事件そのものの残酷さだけではなく、「なぜこういう事件が起きる社会になってしまったのか」という問いにあると思う。ヴァランダー刑事シリーズは『刑事ヴァランダー』や『新米刑事ヴァランダー』など映像化作品にもつながっているが、原作の魅力はやはりこの暗さと厚み。静かで重いのに、読み進める手が止まらないタイプの犯罪小説。`,

    relatedBooks: ["ストーンサークルの殺人", "ミレニアム1 ドラゴン・タトゥーの女", "その女アレックス"],
    links: [],
  },

  /* ---- 今週の追加（2026-06-22） ---- */
  {
    id: "wasureta-towa-iwasenai",
    primarySection: "管理人おすすめ",
    titleJa: "忘れたとは言わせない",
    titleOriginal: "",
    author: "トーヴェ・アルステルダール",
    country: "スウェーデン",

    publisherJa: "KADOKAWA",
    translator: "染田屋茂",
    publicationDateJa: "2023年12月（角川文庫）",
    formatJa: "文庫",
    translationStatus: "translated",
    isbnJa: "9784041145593",

    coverJa: "",
    coverJaUrl: "https://cdn.kdkw.jp/cover_1000/322309/322309001227.webp",
    coverOriginal: "",
    coverOriginalUrl: "",
    coverAlt: "『忘れたとは言わせない』書影",
    purchaseUrl: "https://www.kadokawa.co.jp/product/322309001227/",

    genre: ["犯罪小説", "ミステリー", "サスペンス"],
    mood: ["北欧ミステリー", "警察小説", "重厚"],
    badges: ["管理人おすすめ", "日本語版あり", "受賞作"],
    awards: ["スウェーデン推理作家アカデミー最優秀長篇賞", "ガラスの鍵賞"],
    japanRecognition: [],
    readerReaction: "国内でも読まれる北欧ミステリー",

    adaptation: "",
    section: ["管理人おすすめ", "受賞作", "サスペンス・犯罪小説", "新着・注目の翻訳本"],

    summary: "14歳で凶悪事件を自白し施設で育った男が、23年後に釈放され帰郷した矢先、父親が死体で発見される。同郷の女性警察官が捜査を進めるうち、過去の別の事件が浮かび上がる、北欧の警察小説。",
    recommendedFor: "閉鎖的な地方を舞台にした北欧ミステリーや、骨太な警察小説が好きな人に。",

    curatorPick: true,
    weeklyPick: true,
    weeklyIssue: "2026-06-22",
    addedDate: "2026-06-22",
    isNew: true,

    hasAdminComment: true,
    adminCommentTitle: "管理人メモ",
    adminComment: `【管理人メモ】

スウェーデン推理作家アカデミー最優秀長篇賞とガラスの鍵賞を受賞しているだけあって、北欧ミステリーらしい不穏さと社会性はしっかりある。ただ、読後の印象としては、重厚すぎて読み進めるのに体力がいるタイプというより、かなりサクサク読める作品だった。

事件の背景には重さがあり、扱っているテーマも軽くはない。それでも、構成の見通しがよく、次に何が分かるのか、誰が何を隠しているのかを追っていく推進力がある。ページをめくる手が止まらないタイプの北欧ミステリーで、受賞作だからと身構えすぎずに読めるのがいい。

北欧ミステリーというと、社会の暗部、過去の傷、沈んだ空気感が魅力だが、本作はそこに読みやすさもある。重さとテンポのバランスがよく、ミステリーとしての引きも十分。北欧ものを読みたいけれど、あまりに重すぎる作品は少し構えてしまう、という人にもすすめやすい一冊。`,

    relatedBooks: ["殺人者の顔", "ミレニアム1 ドラゴン・タトゥーの女"],
    links: [],
  },
  {
    id: "mabataki-sura-yurusanai",
    primarySection: "新着・注目の翻訳本",
    titleJa: "瞬きすら許さない",
    titleOriginal: "In the Blink of an Eye",
    author: "ジョー・キャラハン",
    country: "イギリス",

    publisherJa: "東京創元社",
    translator: "吉野弘人",
    publicationDateJa: "2026年3月",
    formatJa: "文庫",
    translationStatus: "translated",
    isbnJa: "9784488259051",

    coverJa: "",
    coverJaUrl: "https://www.tsogen.co.jp/img/cover_image_l/25905.jpg",
    coverOriginal: "",
    coverOriginalUrl: "",
    coverAlt: "『瞬きすら許さない』書影",
    purchaseUrl: "https://www.tsogen.co.jp/np/isbn/9784488259051",

    genre: ["犯罪小説", "ミステリー", "サスペンス"],
    mood: ["英国ミステリー", "バディ", "ページターナー"],
    badges: ["日本語版あり", "受賞作", "話題の新刊"],
    awards: ["英国推理作家協会賞（CWA）最優秀新人賞", "シークストン・オールドペキュリア犯罪小説賞"],
    japanRecognition: [],
    readerReaction: "刊行前から注目を集めた話題作",

    adaptation: "",
    section: ["新着・注目の翻訳本", "受賞作", "サスペンス・犯罪小説"],

    summary: "百戦錬磨の警視正と、新たに導入されたAI捜査官がバディを組み、難事件に挑む。英国発の近未来クライム・ミステリー。",
    recommendedFor: "英国ミステリーやバディもの、新感覚のクライム・ミステリーを試したい人に。",

    curatorPick: false,
    weeklyPick: true,
    weeklyIssue: "2026-06-22",
    addedDate: "2026-06-22",
    isNew: true,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: ["その女アレックス", "ストーンサークルの殺人"],
    links: [],
  },

  {
    id: "taiwan-manyu",
    primarySection: "日本で読まれている海外小説",
    titleJa: "台湾漫遊鉄道のふたり",
    titleOriginal: "臺灣漫遊錄",
    author: "楊双子",
    country: "台湾",

    publisherJa: "中央公論新社",
    translator: "三浦裕子",
    publicationDateJa: "2023年4月",
    formatJa: "単行本",
    translationStatus: "translated",
    isbnJa: "9784120056529",

    coverJa: "",
    coverJaUrl: "https://www.chuko.co.jp/book/005652.jpg",
    coverOriginal: "",
    coverOriginalUrl: "",
    coverAlt: "『台湾漫遊鉄道のふたり』書影",
    purchaseUrl: "https://www.chuko.co.jp/tanko/2023/04/005652.html",

    genre: ["翻訳文学", "社会派文学"],
    mood: ["叙情的", "食と旅", "文芸"],
    badges: ["日本語版あり", "受賞作"],
    awards: ["国際ブッカー賞", "全米図書賞（翻訳部門）", "日本翻訳大賞"],
    japanRecognition: [],
    readerReaction: "国際的な受賞で世界的に注目",

    adaptation: "",
    section: ["日本で読まれている海外小説", "受賞作", "新着・注目の翻訳本"],

    summary: "1938年、日本統治下の台湾。縦貫鉄道で各地を巡る日本人作家と、通訳を務める台湾人女性。食と旅を通して、二人の間に静かで深い絆が育っていく。国際ブッカー賞・全米図書賞に輝いた話題作。",
    recommendedFor: "食や旅の描写が好きな人、静かに沁みる翻訳文学・受賞作を読みたい人に。",

    curatorPick: false,
    weeklyPick: true,
    weeklyIssue: "2026-06-22",
    addedDate: "2026-06-22",
    isNew: true,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: [],
    links: [],
  },
  {
    id: "sokoku-naki-monotachi-e",
    primarySection: "受賞作",
    titleJa: "祖国なき者たちへ",
    titleOriginal: "Stateless",
    author: "エリザベス・ウェイン",
    country: "イギリス",

    publisherJa: "東京創元社",
    translator: "吉澤康子",
    publicationDateJa: "2026年4月",
    formatJa: "文庫",
    translationStatus: "translated",
    isbnJa: "9784488252069",

    coverJa: "",
    coverJaUrl: "https://www.tsogen.co.jp/img/cover_image_l/25206.jpg",
    coverOriginal: "",
    coverOriginalUrl: "",
    coverAlt: "『祖国なき者たちへ』書影",
    purchaseUrl: "https://www.tsogen.co.jp/np/isbn/9784488252069",

    genre: ["ミステリー", "サスペンス"],
    mood: ["歴史ミステリ", "爽快", "空と冒険"],
    badges: ["日本語版あり", "受賞作", "話題の新刊"],
    awards: ["国際スリラー作家協会賞（YA部門）"],
    japanRecognition: [],
    readerReaction: "刊行時に話題",

    adaptation: "",
    section: ["受賞作", "新着・注目の翻訳本", "サスペンス・犯罪小説"],

    summary: "1937年、ヨーロッパの青少年エアレースのさなか、飛行機を使った不審な墜落死が起きる。唯一の女性パイロットが真相を追う、『コードネーム・ヴェリティ』の著者による爽快な歴史ミステリ。",
    recommendedFor: "歴史ミステリや、空と冒険を舞台にした謎解きが好きな人に。",

    curatorPick: false,
    weeklyPick: true,
    weeklyIssue: "2026-06-22",
    addedDate: "2026-06-22",
    isNew: true,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: ["瞬きすら許さない", "ストーンサークルの殺人"],
    links: [],
  },
  {
    id: "anna-o",
    primarySection: "映像化原作",
    titleJa: "眠れるアンナ・O",
    titleOriginal: "Anna O",
    author: "マシュー・ブレイク",
    country: "イギリス",

    publisherJa: "新潮社",
    translator: "池田真紀子",
    publicationDateJa: "2025年7月（新潮文庫）",
    formatJa: "文庫",
    translationStatus: "translated",
    isbnJa: "9784102410219",

    coverJa: "",
    coverJaUrl: "https://www.shinchosha.co.jp/images_v2/book/cover/241021/241021_l.jpg",
    coverOriginal: "",
    coverOriginalUrl: "",
    coverAlt: "『眠れるアンナ・O』書影",
    purchaseUrl: "https://www.shinchosha.co.jp/book/241021/",

    genre: ["心理スリラー", "サスペンス", "ミステリー"],
    mood: ["不穏", "どんでん返し", "イッキ読み"],
    badges: ["日本語版あり", "映像化原作", "話題の新刊"],
    awards: [],
    japanRecognition: ["翻訳ミステリーで話題"],
    readerReaction: "ドラマ化で再注目",

    adaptation: "ドラマ化",
    section: ["映像化原作", "新着・注目の翻訳本", "サスペンス・犯罪小説", "日本で読まれている海外小説"],

    summary: "友人殺害の容疑をかけられたまま4年間眠り続ける女性アンナ。眠りと犯罪の専門家が、彼女を目覚めさせる任務に挑む。ドラマ化も話題の英国発・心理スリラー。",
    recommendedFor: "『ハウスメイド』のようなイッキ読み系の心理スリラーが好きな人に。",

    curatorPick: false,
    weeklyPick: true,
    weeklyIssue: "2026-06-22",
    addedDate: "2026-06-22",
    isNew: true,

    hasAdminComment: false,
    adminCommentTitle: "管理人メモ",
    adminComment: "",

    relatedBooks: ["ハウスメイド", "その女アレックス"],
    links: [],
  },

  /* ---- 翻訳待ちウォッチ（日本語版がまだない想定の例） ---- */
  {
    id: "untranslated-watch-1",
    primarySection: "翻訳待ちウォッチ",
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

/* ［廃止］NDLサーチ書影APIは2026年3月31日で終了したため使用しません。
   参考までに関数だけ残しています（呼び出していません）。
   function ndlThumb(isbn) {
     return isbn ? `https://ndlsearch.ndl.go.jp/thumbnail/${encodeURIComponent(isbn)}.jpg` : "";
   }
*/

/* 書影の候補を優先度順に返す。
   各要素は「画像URL文字列」または「"gb:{isbn}"（Google Books API取得トークン）」。
   優先順位：
     1. coverJa         ローカル画像
     2. coverJaUrl      手入力の外部画像URL
     3. Google Books    isbnJa から取得（"gb:" トークン）
     4. coverOriginal
     5. coverOriginalUrl
     6. （尽きたら No Image）
   ※ NDLサーチ書影API（旧3番）はサービス終了のため除外。
   翻訳待ち等で coverJa/isbnJa が空なら、原書版が先頭に来る。 */
function coverCandidates(book) {
  const isbn = String(book.isbnJa || "").replace(/[-\s]/g, "");
  return [
    book.coverJa,
    book.coverJaUrl,
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

/* 描画後、各書影imgの先頭候補を読み込み開始する（URLでもgbトークンでも対応）。 */
function initCovers(scope) {
  const ctx = scope || document;
  $$(".cover__img[data-fallbacks]", ctx).forEach((img) => {
    if (img.getAttribute("data-cover-started")) return;
    img.setAttribute("data-cover-started", "1");
    coverFallback(img); // 先頭候補を読み込む（失敗時は onerror で次へ）
  });
}

/* HTML属性に安全に埋め込むためのエスケープ */
function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/* 書影HTML（画像未設定・読み込み失敗でもプレースホルダーが出る）
   linkUrl を渡すと書影クリックで商品ページ等へ遷移（別タブ）。 */
function coverHtml(book, sizeClass = "", linkUrl = "") {
  const cand = coverCandidates(book);
  const alt = book.coverAlt || (book.titleJa || book.titleOriginal || "") + " 書影";
  // 候補すべてを data-fallbacks に入れておき、描画後に initCovers() が
  // 先頭から順に読み込む。これにより coverJaUrl があれば必ずそれを読み込み、
  // 「候補がGoogle Booksトークンだけ」でも取得できる。
  // JSON はHTMLエスケープして二重引用符属性に安全に埋め込む（getAttribute時に復号される）。
  const fb = escapeHtml(JSON.stringify(cand));
  const img = cand.length
    ? `<img class="cover__img" alt="${escapeHtml(alt)}" loading="lazy" data-fallbacks="${fb}" onerror="coverFallback(this)">`
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
const state = { query: "", genre: "all", activeSection: "all", showAllTop: false };
const TOP_CATALOG_LIMIT = 12; // TOPカタログの初期表示件数

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
  const filtered = list.filter((b) => {
    if (state.genre !== "all" && !b.genre.includes(state.genre)) return false;
    if (state.query) {
      const hay = (b.titleJa + " " + b.titleOriginal + " " + b.author + " " + b.genre.join(" ") + " " + b.summary).toLowerCase();
      if (!hay.includes(state.query.toLowerCase())) return false;
    }
    return true;
  });
  // 追加日の新しい順に並べ替え（新しく追加した作品を各ジャンルの先頭＝PC左端／SP最上部に）
  return filtered.sort((a, b) => {
    const da = new Date(a.addedDate || 0).getTime();
    const db = new Date(b.addedDate || 0).getTime();
    return db - da;
  });
}

/* TOP初期表示用：その作品を1箇所だけ出すためのセクション。
   primarySection 未設定なら section[0] を使う。 */
function primaryOf(book) {
  return book.primarySection || (book.section && book.section[0]) || "";
}

function booksForSection(sec) {
  let base;
  if (sec.weekly) {
    // 「新着・注目の翻訳本」は weeklyPick:true を優先表示（無ければ section 所属でフォールバック）
    base = books.filter((b) => b.weeklyPick === true);
    if (base.length === 0) base = books.filter((b) => b.section.includes(sec.id));
  } else {
    base = books.filter((b) => b.section.includes(sec.id));
  }
  return applyFilters(base);
}

/* カテゴリの作品リスト（TOP・一覧で共通利用）。
   同じデータソース＋同じソート（applyFilters＝更新日の新しい順）を使うため、
   TOPと一覧ページで並び順が完全に一致する。
   ・管理人おすすめ … curatorPick:true
   ・新着・注目の翻訳本（weekly） … weeklyPick:true
   ・その他 … section 所属 */
function categoryList(sec) {
  if (!sec) return [];
  if (sec.id === "管理人おすすめ") return applyFilters(books.filter((b) => b.curatorPick === true));
  return booksForSection(sec);
}

const TOP_CATEGORY_LIMIT = 3; // TOP初期表示で各カテゴリに出す件数

function renderIndex() {
  const root = $("#sections");
  if (!root) return;
  root.innerHTML = "";

  const filtering = state.query !== "" || state.genre !== "all";

  // ---- 単一カテゴリ表示（ナビ／「すべて見る」）----
  if (state.activeSection !== "all") {
    let label, note = "", list, feature = false;
    if (state.activeSection === CURATOR_KEY) {
      label = "サイト管理人おすすめ";
      note = "サイトの方向性に合う、管理人が推したい作品。";
      list = applyFilters(books.filter((b) => b.curatorPick === true));
    } else {
      const sec = SECTIONS.find((s) => s.id === state.activeSection);
      if (!sec) { initCovers(root); return; }
      label = sec.label;
      note = (sec.weekly ? `${formatDot(siteLastUpdated)} 更新｜` : "") + sec.note;
      list = categoryList(sec);
      feature = sec.weekly;
    }
    if (list.length) {
      root.insertAdjacentHTML("beforeend", sectionBlock(label, note, list, feature));
    } else {
      root.innerHTML = `<p class="empty empty--big">条件に合う作品が見つかりませんでした。検索ワードや絞り込みを変えてみてください。</p>`;
    }
    initCovers(root);
    return;
  }

  // ---- TOP初期表示：カタログ型（ジャンル分けせず1つの一覧・重複なし）----
  // 全作品を更新日の新しい順に、各作品1回だけ表示。まず12件、「もっと見る」で全件。
  // カテゴリは棚ではなくカード上のタグ＋一覧ページへの導線として扱う。
  const catalog = applyFilters(books.filter((b) => b.translationStatus === "translated"));
  const limit = (filtering || state.showAllTop) ? Infinity : TOP_CATALOG_LIMIT;
  const list = catalog.slice(0, limit);
  const hasMore = catalog.length > list.length;

  const cards = list.map(cardHtml).join("") || `<p class="empty">条件に合う作品が見つかりませんでした。検索ワードや絞り込みを変えてみてください。</p>`;
  const moreBtn = hasMore
    ? `<div class="top-more"><button type="button" class="top-more__btn" id="top-more-btn">もっと見る（残り${catalog.length - list.length}件）</button></div>`
    : "";

  // カテゴリ一覧への導線
  const catItems = SECTIONS
    .filter((s) => !s.weekly)
    .map((s) => `<a class="cat-link" href="#sections" data-more="${escapeHtml(s.id === "管理人おすすめ" ? CURATOR_KEY : s.id)}">${escapeHtml(s.label.replace("から探す", ""))}</a>`)
    .join("");
  const catNav = `<nav class="cat-nav" aria-label="カテゴリから探す"><span class="cat-nav__label">カテゴリから探す：</span>${catItems}</nav>`;

  root.innerHTML = `
    <section class="section">
      <div class="section__head">
        <h2 class="section__title">新着・注目の翻訳本</h2>
        <p class="section__note">${formatDot(siteLastUpdated)} 更新｜刊行されたばかりの翻訳本や、いま注目したい海外小説。</p>
      </div>
      <div class="cards">${cards}</div>
      ${moreBtn}
      ${catNav}
    </section>`;

  const moreEl = $("#top-more-btn");
  if (moreEl) moreEl.addEventListener("click", () => { state.showAllTop = true; renderIndex(); });

  initCovers(root);
}

function sectionBlock(label, note, list, feature, moreTarget, moreLabel) {
  let cards = list.map(cardHtml).join("") || `<p class="empty">該当する作品はまだありません。</p>`;
  // moreTarget を渡すと、カード一覧の最後に「もっと見るカード」を追加
  if (moreTarget) {
    cards += `
      <a class="more-card" href="#sections" data-more="${escapeHtml(moreTarget)}">
        <span class="more-card__radar" aria-hidden="true"></span>
        <span class="more-card__title">${escapeHtml(moreLabel || label)}をもっと見る</span>
        <span class="more-card__sub">このカテゴリの作品をもっと探す</span>
        <span class="more-card__cta">すべて見る →</span>
      </a>`;
  }
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

  // 指定セクションへ切り替え（ナビ・「すべて見る →」共通）
  function activateSection(target) {
    state.activeSection = target;
    $$("[data-section]").forEach((n) =>
      n.classList.toggle("is-active", n.getAttribute("data-section") === target));
    renderIndex();
    const sectionsEl = $("#sections");
    const top = (sectionsEl ? sectionsEl.offsetTop : 0) - 80;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    const nav = $("#main-nav");
    if (nav) nav.classList.remove("is-open");
  }

  $$("[data-section]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      activateSection(a.getAttribute("data-section"));
    });
  });

  // 「すべて見る →」リンク（動的生成のためイベント委譲）
  const sectionsRoot = $("#sections");
  if (sectionsRoot) {
    sectionsRoot.addEventListener("click", (e) => {
      const link = e.target.closest("[data-more]");
      if (!link) return;
      e.preventDefault();
      activateSection(link.getAttribute("data-more"));
    });
  }

  const reset = $("#show-all");
  if (reset) {
    reset.addEventListener("click", (e) => {
      e.preventDefault();
      state.activeSection = "all"; state.query = ""; state.genre = "all"; state.showAllTop = false;
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

/* meta[name="description"] を更新（無ければ作成） */
function setMetaDescription(text) {
  let m = document.querySelector('meta[name="description"]');
  if (!m) {
    m = document.createElement("meta");
    m.setAttribute("name", "description");
    (document.head || document.getElementsByTagName("head")[0]).appendChild(m);
  }
  m.setAttribute("content", text);
}

/* 作品ごとの meta description を生成（80〜120字目安・事実のみ） */
function buildDescription(book, title) {
  const author = book.author ? `${book.author}による` : "";
  const award = (book.awards && book.awards.length) ? `${book.awards[0]}受賞作` : "作品";
  return `『${title}』の作品情報、登場人物リスト、管理人メモを紹介。${author}${award}を、日本語で読むための海外小説ガイド。`;
}

/* ===== SEO（canonical / OGP / Twitter / JSON-LD）===== */
const SITE_BASE = "https://raftuff.github.io/fiction-radar/";

/* OGP/Twitter用の画像URL（書影があればそれ、なければメインビジュアル） */
function ogImageFor(book) {
  const c = coverCandidates(book).find((x) => !String(x).startsWith("gb:")) || "";
  if (!c) return SITE_BASE + "assets/images/main-visual.png";
  if (/^https?:/i.test(c)) return c;
  return SITE_BASE + String(c).replace(/^\//, "");
}

function setAttrBySel(sel, attr, val) {
  const el = document.querySelector(sel);
  if (el) el.setAttribute(attr, val);
}

/* 詳細ページの canonical / OGP / Twitter / JSON-LD を作品に合わせて更新 */
function updateDetailSeo(book, title, desc) {
  const fullTitle = `${title}｜FICTION RADAR`;
  const url = SITE_BASE + "book.html?id=" + encodeURIComponent(book.id);
  const img = ogImageFor(book);
  setAttrBySel("#seo-canonical", "href", url);
  setAttrBySel("#seo-og-title", "content", fullTitle);
  setAttrBySel("#seo-og-desc", "content", desc);
  setAttrBySel("#seo-og-url", "content", url);
  setAttrBySel("#seo-og-image", "content", img);
  setAttrBySel("#seo-tw-title", "content", fullTitle);
  setAttrBySel("#seo-tw-desc", "content", desc);
  setAttrBySel("#seo-tw-image", "content", img);

  const data = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": title,
    "url": url,
    "image": img,
    "inLanguage": "ja",
    "description": desc,
  };
  if (book.author) data.author = { "@type": "Person", "name": book.author };
  if (book.publisherJa) data.publisher = { "@type": "Organization", "name": book.publisherJa };
  if (book.genre && book.genre.length) data.genre = book.genre;
  if (book.awards && book.awards.length) data.award = book.awards;

  let s = document.getElementById("ld-book");
  if (!s) {
    s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "ld-book";
    (document.head || document.getElementsByTagName("head")[0]).appendChild(s);
  }
  s.textContent = JSON.stringify(data);
}

function detailRow(label, value) {
  if (!value) return "";
  return `<div class="d-row"><dt>${label}</dt><dd>${value}</dd></div>`;
}

/* adminComment を構造化HTMLに変換する。
   - 「【○○】」の行は見出しとして <h2>○○</h2>（角括弧は表示しない）
   - 登場人物セクションでは「名前：」で始まるブロックを <h3>名前</h3>＋<p>説明</p> に
   - それ以外（管理人メモ等）は段落ごとに <p> に
   ※ adminComment の文章内容自体は変更しない（表示構造のみ整える）。 */
function renderAdminComment(book) {
  const raw = String(book.adminComment || "");
  const blocks = raw.split(/\n\s*\n/);          // 空行で段落・項目を分割
  const hasHeadings = /^\s*【.+?】\s*$/m.test(raw);
  let inner = "";
  let mode = "memo";

  if (!hasHeadings) {
    // 見出しが無い場合：adminCommentTitle を H2 にして本文を段落表示
    inner += `<h2 class="d-h2">${escapeHtml(book.adminCommentTitle || "管理人メモ")}</h2>`;
    blocks.forEach((blk) => {
      const t = blk.trim();
      if (t) inner += `<p class="admin-p">${escapeHtml(t).replace(/\n/g, "<br>")}</p>`;
    });
    return `<section class="d-section d-admin admin-note">${inner}</section>`;
  }

  blocks.forEach((blk) => {
    const block = blk.trim();
    if (!block) return;

    const head = block.match(/^【(.+?)】$/);
    if (head) {
      const title = head[1];
      mode = title.indexOf("登場人物") >= 0 ? "chars" : "memo";
      inner += `<h2 class="d-h2">${escapeHtml(title)}</h2>`;
      return;
    }

    if (mode === "chars") {
      const nl = block.indexOf("\n");
      const first = (nl >= 0 ? block.slice(0, nl) : block).trim();
      const rest = (nl >= 0 ? block.slice(nl + 1) : "").trim();
      if (/[：:]$/.test(first)) {                // 「名前：」を人物見出しとして検出
        const name = first.replace(/[：:]\s*$/, "").trim();
        const desc = escapeHtml(rest).replace(/\n/g, "<br>");
        inner += `<div class="character-item">` +
                 `<h3 class="character-name">${escapeHtml(name)}</h3>` +
                 (desc ? `<p>${desc}</p>` : "") +
                 `</div>`;
        return;
      }
    }
    inner += `<p class="admin-p">${escapeHtml(block).replace(/\n/g, "<br>")}</p>`;
  });

  return `<section class="d-section d-admin admin-note">${inner}</section>`;
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
  const desc = buildDescription(book, title);
  document.title = `${title}｜FICTION RADAR`;
  setMetaDescription(desc);
  updateDetailSeo(book, title, desc);

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

  // 管理人メモ（登場人物リスト＝H2＋人物名H3、管理人メモ＝H2＋本文に構造化）
  let adminBlock = "";
  if (book.hasAdminComment && book.adminComment) {
    adminBlock = renderAdminComment(book);
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
        ${productUrl(book) ? `<a class="d-cover-btn" href="${productUrl(book)}" target="_blank" rel="noopener">商品ページを見る</a>` : ""}
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
  initCovers(root);
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
