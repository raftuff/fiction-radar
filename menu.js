/* =========================================================
   FICTION RADAR 共通：ヘッダーのハンバーガーメニュー（全ページで読み込む）
   - #menu-toggle で #main-nav を開閉。aria-expanded / aria-label を更新
   - メニュー内のリンク、Escape、メニュー外のクリック、PC幅への切り替えで閉じる
   ※ メニューの開閉処理はこのファイルだけに置く（各ページ・script.js に重複して書かない）
   ========================================================= */
(function () {
  function init() {
    var btn = document.getElementById("menu-toggle");
    var nav = document.getElementById("main-nav");
    if (!btn || !nav || btn.getAttribute("data-menu-ready")) return;
    btn.setAttribute("data-menu-ready", "1");
    btn.setAttribute("aria-controls", "main-nav");

    function isOpen() { return nav.classList.contains("is-open"); }
    function setOpen(open, focusBtn) {
      nav.classList.toggle("is-open", open);
      btn.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
      if (!open && focusBtn) btn.focus();
    }
    setOpen(false);

    btn.addEventListener("click", function () { setOpen(!isOpen()); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) setOpen(false, true);
    });
    document.addEventListener("click", function (e) {
      if (isOpen() && !nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });
    // メニューボタンが出ない幅（PC）に戻ったら閉じる
    var mq = window.matchMedia("(max-width: 860px)");
    var onChange = function () { if (!mq.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange); else mq.addListener(onChange);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
