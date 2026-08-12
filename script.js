(() => {
  const DRAFT_KEY = "thankYouNoteDraft_v2";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const els = {
    welcome: document.getElementById("stepWelcome"),
    customize: document.getElementById("stepCustomize"),
    letterScene: document.getElementById("letterScene"),
    share: document.getElementById("stepShare"),
    idea: document.getElementById("ideaInput"),
    recipient: document.getElementById("recipientInput"),
    sender: document.getElementById("senderInput"),
    date: document.getElementById("dateInput"),
    showDate: document.getElementById("showDateCheck"),
    tone: document.getElementById("toneSelect"),
    length: document.getElementById("lengthSelect"),
    paragraphSelect: document.getElementById("paragraphSelect"),
    occasion: document.getElementById("occasionSelect"),
    greetingStyle: document.getElementById("greetingStyleSelect"),
    closingStyle: document.getElementById("closingStyleSelect"),
    letterStyle: document.getElementById("letterStyleSelect"),
    greeting: document.getElementById("greetingInput"),
    paragraphFields: document.getElementById("paragraphFields"),
    closing: document.getElementById("closingInput"),
    signature: document.getElementById("signatureInput"),
    envelope: document.getElementById("envelope"),
    letter: document.getElementById("letter"),
    letterBody: document.getElementById("letterBody"),
    letterDate: document.getElementById("letterDate"),
    letterHead: document.getElementById("letterHead"),
    envelopeTo: document.getElementById("envelopeTo"),
    letterFoot: document.querySelector(".letter-foot"),
    shareStatus: document.getElementById("shareStatus"),
    customizeStatus: document.getElementById("customizeStatus"),
    canvas: document.getElementById("dust"),
    loadDraftWelcome: document.getElementById("btnLoadDraftWelcome"),
  };

  const UI_LANG_KEY = "thankYouUiLang";
  const NOTE_LANG_KEY = "thankYouNoteLang";

  let currentTheme = "warm";
  let currentLetterStyle = "script";
  let noteData = null;
  let opening = false;
  let paragraphCount = 2;
  let noteLanguage = localStorage.getItem(NOTE_LANG_KEY) || "en";

  function t(key, vars) {
    return window.AppI18n ? window.AppI18n.str(key, vars) : key;
  }

  function fillLangSelects() {
    const langs = window.AppI18n.LANGS;
    const selects = [
      document.getElementById("uiLangSelect"),
      document.getElementById("noteLangSelect"),
      document.getElementById("noteLangSelectInline"),
    ].filter(Boolean);

    selects.forEach((sel) => {
      const current = sel.value;
      sel.innerHTML = Object.entries(langs)
        .map(
          ([code, meta]) =>
            `<option value="${code}">${meta.native} (${meta.label})</option>`
        )
        .join("");
      if (current && langs[current]) sel.value = current;
    });
  }

  function setNoteLanguage(lang, { syncGenerate = false } = {}) {
    noteLanguage = window.AppI18n.LANGS[lang] ? lang : "en";
    localStorage.setItem(NOTE_LANG_KEY, noteLanguage);
    ["noteLangSelect", "noteLangSelectInline"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.value = noteLanguage;
    });
    const rtl = window.ThankYouGenerator.isRtl(noteLanguage);
    document.body.setAttribute("data-note-dir", rtl ? "rtl" : "ltr");
    document.body.setAttribute("data-note-lang", noteLanguage);
    if (syncGenerate) generateDraft();
  }

  function setUiLanguage(lang) {
    const code = window.AppI18n.LANGS[lang] ? lang : "en";
    localStorage.setItem(UI_LANG_KEY, code);
    window.AppI18n.apply(code);
    renderParagraphFields(getParagraphCount(), readParagraphValues());
    refreshDraftButtons();
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function setStatus(el, msg) {
    if (el) el.textContent = msg || "";
  }

  function showStep(step) {
    const map = {
      welcome: els.welcome,
      customize: els.customize,
      preview: els.letterScene,
      share: els.share,
    };
    Object.entries(map).forEach(([key, el]) => {
      if (!el) return;
      const on = key === step;
      el.hidden = !on;
      if (key === "preview") el.setAttribute("aria-hidden", on ? "false" : "true");
    });
  }

  function setTheme(theme) {
    currentTheme = theme || "warm";
    document.body.setAttribute("data-theme", currentTheme);
    document.querySelectorAll("[data-theme-pick]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-theme-pick") === currentTheme);
    });
  }

  function setLetterStyle(style) {
    currentLetterStyle = style === "serif" ? "serif" : "script";
    document.body.setAttribute("data-letter-style", currentLetterStyle);
    if (els.letterStyle) els.letterStyle.value = currentLetterStyle;
  }

  function getParagraphCount() {
    return Math.min(4, Math.max(1, Number(els.paragraphSelect.value) || 2));
  }

  function readParagraphValues() {
    return Array.from(els.paragraphFields.querySelectorAll("textarea")).map((t) =>
      (t.value || "").trim()
    );
  }

  function renderParagraphFields(count, values = []) {
    paragraphCount = count;
    els.paragraphSelect.value = String(count);
    const html = [];
    for (let i = 0; i < count; i += 1) {
      const val = values[i] || "";
      html.push(`
        <div class="field">
          <label class="field-label" for="body${i + 1}Input">${t("paragraphN", { n: i + 1 })}</label>
          <textarea id="body${i + 1}Input" rows="${i === 0 ? 3 : 2}" dir="auto">${escapeAttr(val)}</textarea>
        </div>
      `);
    }
    els.paragraphFields.innerHTML = html.join("");
  }

  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function collectNote() {
    const paragraphs = readParagraphValues().filter(Boolean);
    return {
      theme: currentTheme,
      letterStyle: currentLetterStyle,
      language: noteLanguage,
      tone: els.tone.value,
      length: els.length.value,
      paragraphCount: getParagraphCount(),
      occasion: els.occasion.value,
      greetingStyle: els.greetingStyle.value,
      closingStyle: els.closingStyle.value,
      date: (els.date.value || "").trim() || "September 2026",
      showDate: !!els.showDate.checked,
      recipient: (els.recipient.value || "").trim(),
      sender: (els.sender.value || "").trim(),
      idea: (els.idea.value || "").trim(),
      greeting: (els.greeting.value || "").trim(),
      paragraphs,
      body1: paragraphs[0] || "",
      body2: paragraphs[1] || "",
      body3: paragraphs[2] || "",
      body4: paragraphs[3] || "",
      closing: (els.closing.value || "").trim(),
      signature: (els.signature.value || "").trim(),
    };
  }

  function applyDraftToForm(draft) {
    if (!draft) return;
    if (draft.idea != null) els.idea.value = draft.idea;
    if (draft.recipient != null) els.recipient.value = draft.recipient;
    if (draft.sender != null) els.sender.value = draft.sender;
    if (draft.date != null) els.date.value = draft.date;
    if (draft.showDate != null) els.showDate.checked = !!draft.showDate;
    if (draft.tone) els.tone.value = draft.tone;
    if (draft.length) els.length.value = draft.length;
    if (draft.occasion) els.occasion.value = draft.occasion;
    if (draft.greetingStyle) els.greetingStyle.value = draft.greetingStyle;
    if (draft.closingStyle) els.closingStyle.value = draft.closingStyle;
    if (draft.theme) setTheme(draft.theme);
    if (draft.letterStyle) setLetterStyle(draft.letterStyle);
    if (draft.language) setNoteLanguage(draft.language);

    let paras = draft.paragraphs;
    if (!paras || !paras.length) {
      paras = [draft.body1, draft.body2, draft.body3, draft.body4].filter(
        (p) => p != null && String(p).trim() !== ""
      );
    }
    const count = draft.paragraphCount || paras.length || 2;
    renderParagraphFields(count, paras);
    els.greeting.value = draft.greeting || "";
    els.closing.value = draft.closing || "";
    els.signature.value = draft.signature || "";
  }

  function generateDraft() {
    const count = getParagraphCount();
    const draft = window.ThankYouGenerator.generate({
      idea: els.idea.value,
      recipient: els.recipient.value,
      sender: els.sender.value,
      tone: els.tone.value,
      length: els.length.value,
      paragraphs: count,
      occasion: els.occasion.value,
      greetingStyle: els.greetingStyle.value,
      closingStyle: els.closingStyle.value,
      language: noteLanguage,
    });
    els.greeting.value = draft.greeting || "";
    els.closing.value = draft.closing || "";
    els.signature.value = draft.signature || "";
    renderParagraphFields(count, draft.paragraphs || []);

    const occ = draft.detectedOccasion || els.occasion.value;
    const occLabel =
      {
        birthday: t("occBirthday"),
        congratulations: t("occCongrats"),
        getwell: t("occGetwell"),
        apology: t("occApology"),
        goodluck: t("occGoodluck"),
        farewell: t("occFarewell"),
        welcome: t("occWelcome"),
        newyear: t("occNewyear"),
        student: t("occStudent"),
        friend: t("occFriend"),
        colleague: t("occColleague"),
        family: t("occFamily"),
        gift: t("occGift"),
        help: t("occHelp"),
        general: t("occGeneral"),
      }[occ] || occ;

    if (els.occasion.value === "auto" || (draft.detectedOccasion && draft.detectedOccasion !== "general")) {
      setStatus(els.customizeStatus, t("statusDetected", { occasion: occLabel }));
    } else {
      setStatus(els.customizeStatus, t("statusGenerated"));
    }
  }

  function noteParagraphs(data) {
    if (data.paragraphs && data.paragraphs.length) return data.paragraphs.filter(Boolean);
    return [data.body1, data.body2, data.body3, data.body4].filter(Boolean);
  }

  function plainText(data) {
    const lines = [];
    if (data.showDate !== false && data.date) lines.push(data.date, "");
    if (data.greeting) lines.push(data.greeting, "");
    noteParagraphs(data).forEach((p) => {
      lines.push(p, "");
    });
    if (data.closing) lines.push(data.closing);
    if (data.signature) lines.push(data.signature);
    return lines.join("\n").trim() + "\n";
  }

  function fillLetter(data) {
    noteData = data;
    setTheme(data.theme);
    if (data.letterStyle) setLetterStyle(data.letterStyle);
    if (data.language) setNoteLanguage(data.language);
    const rtl = window.ThankYouGenerator.isRtl(data.language || noteLanguage);
    els.letter.setAttribute("dir", rtl ? "rtl" : "ltr");
    els.letter.classList.toggle("is-rtl", rtl);

    if (data.showDate === false) {
      els.letterHead.hidden = true;
    } else {
      els.letterHead.hidden = false;
      els.letterDate.textContent = data.date;
    }
    els.envelopeTo.textContent = data.recipient
      ? t("forName", { name: data.recipient })
      : t("forYou");

    const parts = [];
    if (data.greeting) parts.push({ text: data.greeting, className: "greeting" });
    noteParagraphs(data).forEach((text) => parts.push({ text }));
    if (data.closing) parts.push({ text: data.closing, className: "closing" });
    if (data.signature) parts.push({ text: data.signature, className: "signature" });

    els.letterBody.innerHTML = parts
      .map((p) => `<p class="${p.className || ""} is-waiting">${escapeHtml(p.text)}</p>`)
      .join("");
  }

  async function revealParagraphs() {
    const paragraphs = Array.from(els.letterBody.querySelectorAll("p"));
    els.letterFoot.classList.remove("is-ready");
    paragraphs.forEach((p) => {
      p.classList.remove("is-visible");
      p.classList.add("is-waiting");
    });
    for (const p of paragraphs) {
      p.classList.remove("is-waiting");
      p.classList.add("is-visible");
      await wait(reduceMotion ? 40 : 420);
    }
    els.letterFoot.classList.add("is-ready");
  }

  function resetEnvelope() {
    els.envelope.classList.remove("is-opening", "is-gone");
    els.letter.classList.remove("is-revealed");
    els.letterFoot.classList.remove("is-ready");
  }

  async function playPreview(data) {
    if (opening) return;
    opening = true;
    fillLetter(data);
    resetEnvelope();
    showStep("preview");
    await wait(reduceMotion ? 50 : 400);
    els.envelope.classList.add("is-opening");
    await wait(reduceMotion ? 80 : 900);
    els.letter.classList.add("is-revealed");
    await wait(reduceMotion ? 50 : 500);
    els.envelope.classList.add("is-gone");
    await revealParagraphs();
    opening = false;
  }

  function encodeNote(data) {
    const bytes = new TextEncoder().encode(JSON.stringify(data));
    let binary = "";
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function decodeNote(hash) {
    try {
      const raw = hash.replace(/^#?n=/, "");
      if (!raw) return null;
      const b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
      const pad = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
      const binary = atob(pad);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    } catch {
      return null;
    }
  }

  function shareUrl(data) {
    return `${location.origin}${location.pathname}#n=${encodeNote(data)}`;
  }

  function ensureNote() {
    if (!noteData) noteData = collectNote();
    return noteData;
  }

  function saveDraft() {
    const data = collectNote();
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    noteData = data;
    refreshDraftButtons();
    return data;
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function refreshDraftButtons() {
    const has = !!localStorage.getItem(DRAFT_KEY);
    if (els.loadDraftWelcome) els.loadDraftWelcome.hidden = !has;
    const loadShare = document.getElementById("btnLoadDraftShare");
    if (loadShare) loadShare.hidden = !has;
  }

  async function copyShareLink() {
    const data = ensureNote();
    const url = shareUrl(data);
    try {
      await navigator.clipboard.writeText(url);
      setStatus(els.shareStatus, t("statusLinkCopied"));
    } catch {
      setStatus(els.shareStatus, url);
    }
  }

  async function copyPlainText() {
    const text = plainText(ensureNote());
    try {
      await navigator.clipboard.writeText(text);
      setStatus(els.shareStatus, t("statusTextCopied"));
    } catch {
      setStatus(els.shareStatus, t("statusShareUnavailable"));
    }
  }

  function downloadTxt() {
    const data = ensureNote();
    const blob = new Blob([plainText(data)], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "thank-you-note.txt";
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus(els.shareStatus, t("statusTxtDownloaded"));
  }

  function printNote() {
    const data = ensureNote();
    const w = window.open("", "_blank");
    if (!w) {
      setStatus(els.shareStatus, "Pop-up blocked. Allow pop-ups to print.");
      return;
    }
    const body = noteParagraphs(data)
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
    w.document.write(`<!DOCTYPE html><html dir="${window.ThankYouGenerator.isRtl(data.language) ? "rtl" : "ltr"}"><head><title>Thank you note</title>
      <style>
        body{font-family:${window.ThankYouGenerator.isRtl(data.language) ? '"Vazirmatn","Noto Naskh Arabic",' : ""}Georgia,serif;max-width:36rem;margin:2rem auto;padding:1rem;line-height:1.7;color:#1c2430;text-align:${window.ThankYouGenerator.isRtl(data.language) ? "right" : "left"}}
        .date{color:#555;font-size:.95rem;margin-bottom:1.25rem}
        .greeting,.signature{font-style:italic}
        .closing{margin-top:1.5rem}
      </style></head><body>
      ${data.showDate !== false && data.date ? `<p class="date">${escapeHtml(data.date)}</p>` : ""}
      ${data.greeting ? `<p class="greeting">${escapeHtml(data.greeting)}</p>` : ""}
      ${body}
      ${data.closing ? `<p class="closing">${escapeHtml(data.closing)}</p>` : ""}
      ${data.signature ? `<p class="signature">${escapeHtml(data.signature)}</p>` : ""}
      </body></html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
    setStatus(els.shareStatus, t("statusPrint"));
  }

  function emailNote() {
    const data = ensureNote();
    const subject = encodeURIComponent(
      data.recipient ? `A thank you note for ${data.recipient}` : "A thank you note"
    );
    const body = encodeURIComponent(plainText(data) + "\n" + shareUrl(data));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setStatus(els.shareStatus, t("statusEmail"));
  }

  function whatsAppNote() {
    const data = ensureNote();
    const text = encodeURIComponent(plainText(data) + "\n" + shareUrl(data));
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    setStatus(els.shareStatus, t("statusWhatsapp"));
  }

  async function nativeShare() {
    const data = ensureNote();
    const url = shareUrl(data);
    if (!navigator.share) {
      setStatus(els.shareStatus, t("statusShareUnavailable"));
      return;
    }
    try {
      await navigator.share({
        title: "A thank you note",
        text: plainText(data),
        url,
      });
      setStatus(els.shareStatus, t("statusShared"));
    } catch {
      setStatus(els.shareStatus, t("statusShareCancel"));
    }
  }

  async function downloadHtml() {
    const data = ensureNote();
    const [styles, themes] = await Promise.all([
      fetch("styles.css").then((r) => r.text()),
      fetch("themes.css").then((r) => r.text()),
    ]);
    const payload = JSON.stringify(data);
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>A thank you note</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Caveat:wght@500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@400;500;600&display=swap" rel="stylesheet" />
<style>${styles}
${themes}
.letter-foot .btn { display: none !important; }
</style>
</head>
<body data-theme="${escapeHtml(data.theme || "warm")}" data-letter-style="${escapeHtml(data.letterStyle || "script")}" data-note-lang="${escapeHtml(data.language || "en")}">
<div class="atmosphere" aria-hidden="true">
  <div class="glow glow-a"></div>
  <div class="glow glow-b"></div>
  <div class="curtain"></div>
  <canvas id="dust" class="dust"></canvas>
</div>
<main class="stage">
  <section class="panel" id="openPanel">
    <h1 class="brand">Just a simple note</h1>
    <p class="lede">Open when you’re ready.</p>
    <div class="cta-row">
      <button type="button" class="btn primary" id="openLetter">Open the letter</button>
    </div>
  </section>
  <section class="letter-scene" id="letterScene" hidden aria-hidden="true">
    <div class="envelope" id="envelope">
      <div class="envelope-back"></div>
      <div class="envelope-flap"></div>
      <div class="envelope-front">
        <span class="seal" aria-hidden="true"></span>
        <p class="to-line" id="envelopeTo">For you</p>
      </div>
    </div>
    <article class="letter" id="letter" dir="${data.language === "fa" || data.language === "ar" ? "rtl" : "ltr"}">
      <header class="letter-head" id="letterHead"><p class="date" id="letterDate"></p></header>
      <div class="letter-body" id="letterBody"></div>
      <footer class="letter-foot">
        <button type="button" class="again-btn" id="readAgain">Read it once more</button>
      </footer>
    </article>
  </section>
</main>
<script>
const NOTE = ${payload};
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function wait(ms){return new Promise(r=>setTimeout(r,ms));}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function paras(){
  if (NOTE.paragraphs && NOTE.paragraphs.length) return NOTE.paragraphs.filter(Boolean);
  return [NOTE.body1,NOTE.body2,NOTE.body3,NOTE.body4].filter(Boolean);
}
function fill(){
  const head=document.getElementById("letterHead");
  const letterDate=document.getElementById("letterDate");
  const envelopeTo=document.getElementById("envelopeTo");
  if (NOTE.showDate === false) head.hidden = true;
  else { head.hidden=false; letterDate.textContent = NOTE.date || ""; }
  envelopeTo.textContent = NOTE.recipient ? ("For " + NOTE.recipient) : "For you";
  const parts=[];
  if (NOTE.greeting) parts.push({t:NOTE.greeting,c:"greeting"});
  paras().forEach(t=>parts.push({t}));
  if (NOTE.closing) parts.push({t:NOTE.closing,c:"closing"});
  if (NOTE.signature) parts.push({t:NOTE.signature,c:"signature"});
  document.getElementById("letterBody").innerHTML = parts.map(p=>'<p class="'+(p.c||'')+' is-waiting">'+esc(p.t)+'</p>').join("");
}
async function reveal(){
  const letterBody=document.getElementById("letterBody");
  const letterFoot=document.querySelector(".letter-foot");
  const ps=Array.from(letterBody.querySelectorAll("p"));
  letterFoot.classList.remove("is-ready");
  ps.forEach(p=>{p.classList.remove("is-visible");p.classList.add("is-waiting");});
  for (const p of ps){p.classList.remove("is-waiting");p.classList.add("is-visible");await wait(reduceMotion?40:420);}
  letterFoot.classList.add("is-ready");
}
async function openLetter(){
  fill();
  document.getElementById("openPanel").hidden=true;
  const letterScene=document.getElementById("letterScene");
  const envelope=document.getElementById("envelope");
  const letter=document.getElementById("letter");
  letterScene.hidden=false;
  letterScene.setAttribute("aria-hidden","false");
  await wait(reduceMotion?50:400);
  envelope.classList.add("is-opening");
  await wait(reduceMotion?80:900);
  letter.classList.add("is-revealed");
  await wait(reduceMotion?50:500);
  envelope.classList.add("is-gone");
  await reveal();
}
document.getElementById("openLetter").addEventListener("click", openLetter);
document.getElementById("readAgain").addEventListener("click", reveal);
(function dust(){
  const canvas=document.getElementById("dust");
  if(!canvas||reduceMotion) return;
  const ctx=canvas.getContext("2d");
  let w,h,parts=[];
  function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight;}
  function spawn(n){for(let i=0;i<n;i++)parts.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.6+0.4,vx:(Math.random()-0.5)*0.15,vy:-0.08-Math.random()*0.18,a:Math.random()*0.45+0.15});}
  function frame(){ctx.clearRect(0,0,w,h);for(const p of parts){p.x+=p.vx;p.y+=p.vy;if(p.y<-10){p.y=h+10;p.x=Math.random()*w;}ctx.beginPath();ctx.fillStyle="rgba(255,236,210,"+p.a+")";ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();}requestAnimationFrame(frame);}
  resize();spawn(Math.min(70,Math.floor((w*h)/18000)));frame();addEventListener("resize",resize);
})();
</script>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "thank-you-note.html";
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus(els.shareStatus, t("statusHtmlDownloaded"));
  }

  function initDust() {
    const canvas = els.canvas;
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    const particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    function spawn(count) {
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.4,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.08 - Math.random() * 0.18,
          a: Math.random() * 0.45 + 0.15,
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, width, height);
      const dust = getComputedStyle(document.body).getPropertyValue("--dust").trim() || "255, 236, 210";
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${dust}, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }

    resize();
    spawn(Math.min(70, Math.floor((width * height) / 18000)));
    frame();
    window.addEventListener("resize", resize);
  }

  function startOver() {
    els.idea.value = "";
    els.recipient.value = "";
    els.sender.value = "";
    els.date.value = "September 2026";
    els.showDate.checked = true;
    els.tone.value = "warm";
    els.length.value = "medium";
    els.occasion.value = "auto";
    els.greetingStyle.value = "dear";
    els.closingStyle.value = "auto";
    els.greeting.value = "";
    els.closing.value = "";
    els.signature.value = "";
    renderParagraphFields(2, []);
    setTheme("warm");
    setLetterStyle("script");
    noteData = null;
    setStatus(els.shareStatus, "");
    setStatus(els.customizeStatus, "");
    showStep("welcome");
  }

  /* Events */

  document.getElementById("btnToCustomize").addEventListener("click", () => {
    showStep("customize");
    renderParagraphFields(getParagraphCount(), readParagraphValues());
    generateDraft();
  });

  document.getElementById("btnBackWelcome").addEventListener("click", () => showStep("welcome"));

  document.getElementById("btnGenerate").addEventListener("click", generateDraft);

  document.getElementById("btnClearBody").addEventListener("click", () => {
    renderParagraphFields(getParagraphCount(), Array(getParagraphCount()).fill(""));
    setStatus(els.customizeStatus, t("statusCleared"));
  });

  els.paragraphSelect.addEventListener("change", () => {
    const next = getParagraphCount();
    const current = readParagraphValues();
    renderParagraphFields(next, current);
  });

  document.querySelectorAll("[data-theme-pick]").forEach((btn) => {
    btn.addEventListener("click", () => setTheme(btn.getAttribute("data-theme-pick")));
  });

  if (els.letterStyle) {
    els.letterStyle.addEventListener("change", () => setLetterStyle(els.letterStyle.value));
  }

  document.getElementById("btnPreview").addEventListener("click", () => {
    let data = collectNote();
    if (!data.greeting && !noteParagraphs(data).length) {
      generateDraft();
      data = collectNote();
    }
    playPreview(data);
  });

  document.getElementById("btnSaveDraft").addEventListener("click", () => {
    saveDraft();
    setStatus(els.customizeStatus, t("statusDraftSaved"));
  });

  document.getElementById("readAgain").addEventListener("click", () => revealParagraphs());

  document.getElementById("btnToShare").addEventListener("click", () => {
    noteData = collectNote();
    showStep("share");
    setStatus(els.shareStatus, "");
    refreshDraftButtons();
  });

  document.getElementById("btnPreviewEdit").addEventListener("click", () => showStep("customize"));

  document.getElementById("btnDownload").addEventListener("click", () => {
    downloadHtml().catch(() => {
      setStatus(
        els.shareStatus,
        "Could not build the HTML file. Use the live website (not a raw file open) and try again."
      );
    });
  });
  document.getElementById("btnDownloadTxt").addEventListener("click", downloadTxt);
  document.getElementById("btnPrint").addEventListener("click", printNote);
  document.getElementById("btnCopyLink").addEventListener("click", copyShareLink);
  document.getElementById("btnCopyText").addEventListener("click", copyPlainText);
  document.getElementById("btnNativeShare").addEventListener("click", nativeShare);
  document.getElementById("btnEmail").addEventListener("click", emailNote);
  document.getElementById("btnWhatsApp").addEventListener("click", whatsAppNote);

  document.getElementById("btnSaveDraftShare").addEventListener("click", () => {
    saveDraft();
    setStatus(els.shareStatus, t("statusDraftSaved"));
  });

  function handleLoadDraft() {
    const draft = loadDraft();
    if (!draft) {
      setStatus(els.shareStatus, t("statusNoDraft"));
      return;
    }
    applyDraftToForm(draft);
    noteData = draft;
    showStep("customize");
    setStatus(els.customizeStatus, t("statusDraftLoaded"));
  }

  document.getElementById("btnLoadDraftShare").addEventListener("click", handleLoadDraft);
  if (els.loadDraftWelcome) {
    els.loadDraftWelcome.addEventListener("click", handleLoadDraft);
  }

  document.getElementById("btnEditAgain").addEventListener("click", () => showStep("customize"));
  document.getElementById("btnStartOver").addEventListener("click", startOver);

  /* Boot */
  fillLangSelects();
  const savedUi = localStorage.getItem(UI_LANG_KEY) || "en";
  setUiLanguage(savedUi);
  setNoteLanguage(noteLanguage);
  document.getElementById("uiLangSelect").value = savedUi;

  document.getElementById("uiLangSelect").addEventListener("change", (e) => {
    setUiLanguage(e.target.value);
  });
  document.getElementById("noteLangSelect").addEventListener("change", (e) => {
    setNoteLanguage(e.target.value, { syncGenerate: true });
  });
  document.getElementById("noteLangSelectInline").addEventListener("change", (e) => {
    setNoteLanguage(e.target.value, { syncGenerate: true });
  });

  initDust();
  setTheme("warm");
  setLetterStyle("script");
  renderParagraphFields(2, []);
  refreshDraftButtons();

  const shared = decodeNote(location.hash);
  if (shared && (shared.greeting || noteParagraphs(shared).length)) {
    applyDraftToForm(shared);
    playPreview(shared);
  }
})();
