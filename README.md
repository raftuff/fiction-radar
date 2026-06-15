# FICTION RADAR

海外小説の話題作・名作ガイド ─ 日本語で読める「次の一冊」を探すWebマガジン。

海外の受賞作、映像化原作、注目の新刊から、サスペンス・犯罪小説・社会派文学・ディストピアを中心に、翻訳本を紹介する静的サイトです。GitHub Pages にそのまま置いて公開できます。

## ファイル構成

```
index.html        トップページ（一覧）
book.html         作品詳細ページ（?id=作品ID で全作品に対応）
style.css         デザイン
script.js         作品データ（books 配列）と一覧／詳細の描画ロジック
README.md         このファイル
assets/covers/    書影画像を入れるフォルダ
```

## 文字コードについて（重要）

このプロジェクトのファイル（`README.md`・`index.html`・`book.html`・`style.css`・`script.js`）は、すべて **UTF-8** で保存してください。日本語を含むため、Shift_JIS など他の文字コードで保存すると文字化けします。

- HTMLには `<meta charset="UTF-8">` を指定済みです。
- テキストエディタで編集・保存する際は、エンコーディングを「UTF-8（BOMなし）」に設定してください（VS Code は既定でUTF-8です）。
- GitHub 上で直接編集する場合はUTF-8で扱われるため問題ありません。

## ローカルで確認する

`index.html` をブラウザで開くだけで動きます（ビルド・依存パッケージ不要）。作品カードをクリックすると `book.html?id=作品ID` に遷移し、詳細ページが表示されます。

## 公開方法（GitHub Pages）

1. リポジトリを GitHub に push（またはブラウザからファイルをアップロード）。
2. **Settings → Pages** を開く。
3. **Build and deployment → Source** を「Deploy from a branch」にする。
4. Branch を `main`、フォルダを `/ (root)` にして Save。
5. 数十秒〜数分で `https://<ユーザー名>.github.io/<リポジトリ名>/` に公開されます。

## 作品詳細ページについて

作品カードをクリックすると `book.html?id=作品ID`（例：`book.html?id=prophet-song`）へ遷移します。`book.html` はURLパラメータの `id` を読み取り、`script.js` の `books` 配列から該当作品を探して表示します。個別のHTMLファイルを作品ごとに用意する必要はありません。

詳細ページに表示する項目：書影／日本語タイトル／原題／著者／国・地域／出版社／翻訳者／日本語版発売日／形態／ジャンル／読み味／受賞歴／映像化情報／紹介文／こんな人におすすめ／管理人メモ／関連作品／購入・参照リンク／一覧に戻る。

### 将来的な静的個別ページ化の方針

現時点では `book.html?id=作品ID` 形式で作品詳細を表示しています。将来的には、検索流入やSNS共有を強化するため、`/books/作品ID.html` のような静的個別ページ化を検討します。

## 書影（カバー画像）

書影画像は `assets/covers/` フォルダに入れます。ファイル名は `script.js` の各作品の `coverJa` / `coverOriginal` で指定したパスに合わせてください（例：`assets/covers/prophet-song-ja.jpg`）。

- 日本語版がある作品は、日本語版書影（`coverJa`）をメイン表示します。
- 原書版書影（`coverOriginal`）もデータ構造として保持できます。
- 日本語版書影がない場合は原書版書影を、どちらも無い／読み込めない場合は自動でプレースホルダー（No Image）を表示します。画像が未設定でもレイアウトは崩れません。

### 書影画像の著作権について

書影画像を使用する場合は、出版社公式サイト、書店アフィリエイト、または利用許諾のある画像を使用してください。無断転載には注意してください。

## データの追加・更新

作品データは `script.js` の `books` 配列に格納しています。1作品 = 1オブジェクトです。新しい本を足すときは配列に同じ形のオブジェクトを追加するだけで、一覧・詳細ともに自動で反映されます。

```javascript
{
  id: "prophet-song",              // 一意のID（半角英数・ハイフン推奨。URLに使われる）
  titleJa: "預言者の歌",            // 日本語タイトル（主役表示）
  titleOriginal: "Prophet Song",   // 原題（サブ表示）
  author: "ポール・リンチ",
  country: "アイルランド",

  publisherJa: "早川書房",          // 出版社
  translator: "",                  // 翻訳者
  publicationDateJa: "",           // 日本語版発売日（例 "2025年2月"）
  formatJa: "単行本",              // 形態（単行本／文庫 など）
  translationStatus: "translated", // "translated"（日本語版あり）/ "untranslated"（翻訳待ち）

  coverJa: "assets/covers/prophet-song-ja.jpg",
  coverOriginal: "assets/covers/prophet-song-original.jpg",
  coverAlt: "『預言者の歌』書影",

  genre: ["社会派文学", "ディストピア"],
  mood: ["不穏", "重い", "社会派"],   // 読み味
  badges: ["日本語版あり", "受賞作"],  // カードに出すバッジ
  awards: ["ブッカー賞"],            // 海外評価
  japanRecognition: ["書評掲載多数"], // 日本評価
  readerReaction: "国内でも話題",      // 読者反応

  adaptation: "",                  // 映像化情報
  section: ["今週の注目翻訳小説", "受賞作", "社会派・ディストピア"], // 表示セクション（複数可）

  summary: "全体主義化するアイルランドで…",       // カードにも出る短い紹介文（ネタバレなし）
  recommendedFor: "『侍女の物語』が好きな人に。",  // こんな人におすすめ

  curatorPick: false,              // true で「管理人おすすめ」バッジ＆絞り込み対象
  weeklyPick: true,                // true で「今週の注目翻訳小説」に表示
  weeklyIssue: "2026-06-15",       // 対象の週（号）
  addedDate: "2026-06-15",         // 追加日。最終更新日から3週間以内は自動でNEW
  isNew: true,                     // 明示的にNEWを付けたいとき true

  hasAdminComment: true,           // true かつ adminComment があれば詳細ページに表示
  adminCommentTitle: "管理人メモ",
  adminComment: "ここに1000字程度の管理人コメント。", // 詳細ページのみ表示

  relatedBooks: ["侍女の物語", "1984年"], // 関連作品（titleJa で指定。一致すればリンク化）
  links: []                        // 購入・参照リンク（例 [{ label: "版元", url: "https://..." }]）
}
```

### ポイント

- **`section`** は複数指定でき、1冊を複数セクションに表示できます。利用できるセクションIDは `script.js` 冒頭の `SECTIONS` を参照。
- **「今週の注目翻訳小説」** は `weeklyPick: true` の作品を表示します（該当が無ければセクション所属でフォールバック）。
- **`badges`** に使える値とバッジ色は `script.js` 冒頭の `BADGE_CLASS` で定義。新しいバッジを足すときはここに色クラスを追加します。
- **NEW バッジ** は `addedDate` が最終更新日（`siteLastUpdated`）から `NEW_DAYS`（既定21日）以内なら自動で付きます。`isNew: true` でも付けられます。
- **管理人おすすめ** は `curatorPick: true`（または `badges` に `"管理人おすすめ"`）で表示され、ヘッダーナビの「管理人おすすめ」で絞り込めます。

## メインビジュアルの差し替え

`index.html` の `#main-visual` ブロックにCSS製のプレースホルダーを置いています。線画イラストを用意したら `.visual-placeholder` を `<img src="main-visual.svg" alt="">` に差し替えてください。

## 毎週更新ルール

FICTION RADARは、週1回の更新を想定しています。

### 更新頻度
- 原則、週1回更新
- 更新日は毎週月曜または週末
- 最終更新日をトップページに表示（`script.js` の `siteLastUpdated`）

### 毎週確認する情報
- 海外文学賞・ミステリー賞の受賞／候補情報
- 日本語版が刊行された翻訳小説
- 映像化された／映像化予定の海外小説
- 国内ランキングや読者反応
- 書店で気になった新刊
- 管理人おすすめ作品

### 更新作業
1. 新しく追加する本を選ぶ
2. 日本語タイトル・原題・著者・出版社・翻訳者を確認
3. 書影画像を `assets/covers/` に追加
4. `script.js` の `books` 配列に作品データを追加
5. 必要に応じて `weeklyPick` や `curatorPick` を true にする
6. `siteLastUpdated` を更新する
7. GitHubに反映する

## 注意

掲載作品の受賞歴・映像化・出版社・翻訳者などは、現時点ではサンプル情報です。**公開前に各作品の最新情報を必ず確認してください。** ロマンス中心の作品は対象外です。

---

© FICTION RADAR
