# FICTION RADAR

海外小説の話題作・名作ガイド。日本語で読める「次の一冊」を探すWebマガジンです。

- 公開URL：https://raftuff.github.io/fiction-radar/
- 文学賞の受賞作、映像化原作、注目の新刊を中心に、サスペンス・犯罪小説・ミステリ・社会派文学・ディストピア・SFなどの翻訳小説を紹介しています。

ビルド不要の静的サイトです（HTML / CSS / JavaScript のみ、依存パッケージなし）。GitHub Pages で `main` ブランチ直下を公開しています。

## ページ構成

| ページ | 内容 |
|---|---|
| `index.html` | TOP。特集・ガイドへの入口と、掲載作品の一覧（新しい順・「もっと見る」で追加表示） |
| `category.html?cat=キー` | カテゴリ別の一覧。キー：`new` / `awards` / `adaptations` / `suspense` / `dystopia` / `classics` / `popular` / `recommend` |
| `book.html?id=作品ID` | 作品詳細。全作品をこの1ファイルで表示 |
| `best-translated-fiction-2026.html` | 特集：2026年に読むべき海外小説10選 |
| `translated-fiction-2026.html` | 年間カタログ：2026年注目の海外小説・翻訳小説（月別・随時追加） |
| `neuromancer-guide.html` | 読みものガイド：『ニューロマンサー』完全読書ガイド |
| `neuromancer-apple-tv-drama.html` | Apple TV版『ニューロマンサー』ドラマ情報 |
| `about.html` / `contact.html` | サイトについて／お問い合わせ |

## ファイル構成

```
index.html, category.html, book.html   一覧・カテゴリ・作品詳細（script.js で描画）
*.html（上記以外）                     特集・ガイド記事（1記事1ファイル、ルート直下に置く）
script.js                              作品データ（books 配列）と描画ロジック
style.css                              共通デザイン（記事専用のCSSは各記事の <style> 内）
sitemap.xml / robots.txt               SEO
assets/images/                         ロゴ、メインビジュアル、特集ビジュアル
```

すべてのファイルは UTF-8（BOMなし）で保存してください。

## 作品データ

作品は `script.js` の `books` 配列で管理しています。1作品＝1オブジェクトで、追加すると一覧・カテゴリ・詳細ページに自動で反映されます。

主な項目：

| 項目 | 内容 |
|---|---|
| `id` | URL に使うID（半角英数とハイフン） |
| `titleJa` / `titleOriginal` | 日本語タイトル（メイン表示）／原題 |
| `author` / `translator` / `publisherJa` | 著者／訳者／出版社 |
| `coverJaUrl` / `purchaseUrl` | 書影画像のURL／書影クリックで開く商品ページ |
| `section` / `primarySection` | 所属カテゴリ（`SECTIONS` の id と一致させる） |
| `badges` | カードのバッジ（使える値は `BADGE_CLASS`） |
| `summary` / `recommendedFor` | 短い紹介文（ネタバレなし）／こんな人におすすめ |
| `addedDate` | 追加日。並び順と NEW 表示に使う |
| `relatedBooks` / `links` | 関連作品（`titleJa` で指定）／参照リンク |

`script.js` 冒頭の `siteLastUpdated` が、サイトの「最終更新」表示になります。

## 書影

- 書影は出版社公式サイトの画像URLを `coverJaUrl` に、商品ページを `purchaseUrl` に指定しています。
- 書店・通販サイト・第三者サイトの画像は使いません。公式の画像がない場合は「書影準備中」と表示します。

## 特集・ガイド記事

- 記事は1本ずつ HTML で作成し、GA4・canonical・OGP・JSON-LD を各記事に入れます。
- 特集ビジュアルは記事ごとに、TOPカード用のサムネイル（`feature-{記事名}-thumb.webp`）と、記事冒頭のヒーロー画像（`feature-{記事名}-hero.webp`）を用意します。
- 記事を追加・更新したら、`sitemap.xml` の該当URLの `lastmod` も更新します。

## ローカルで確認する

```bash
python3 -m http.server 8765
```

サイトのフォルダで実行し、`http://127.0.0.1:8765/` を開きます。外部の書影を確認するときは、ファイルを直接開かずにサーバー経由で表示してください。

## 掲載情報について

受賞歴・映像化・刊行情報などは、出版社・文学賞・映像作品の公式情報をもとに確認しています。情報は変わることがあるため、購入前には各出版社・書店の情報もあわせてご確認ください。

---

© FICTION RADAR
