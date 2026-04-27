// ===== Plan repas — rendering & interactions =====

// Plan starts on Monday May 4 2026. Edit this if your start date changes.
const START_DATE = "2026-05-04";

// Days you'll be off-plan (e.g. travel). Format: "YYYY-MM-DD".
// They'll appear in the page but tagged "Hors plan".
const OFF_PLAN_DATES = ["2026-05-09", "2026-05-10"];

// ----- helpers -----
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function parseDate(iso) {
  // Force a fixed local-noon time to avoid TZ off-by-one.
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}
function isoOf(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}
function fmtFr(date) {
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
}

// ----- meal cell (with sauce-link enrichment) -----
function enrichItem(text) {
  // Make "sauce allégée" / "sauce dragon" clickable.
  const re = /(sauce all[ée]g[ée]e|sauce dragon)/gi;
  if (!re.test(text)) return document.createTextNode(text);
  const frag = document.createDocumentFragment();
  let last = 0;
  text.replace(re, (match, _g, idx) => {
    if (idx > last) frag.appendChild(document.createTextNode(text.slice(last, idx)));
    const btn = document.createElement("button");
    btn.className = "sauce-link";
    btn.textContent = match;
    btn.dataset.sauce = /dragon/i.test(match) ? "dragon" : "allegee";
    frag.appendChild(btn);
    last = idx + match.length;
    return match;
  });
  if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
  return frag;
}

// ----- render -----
function renderRules() {
  const grid = $("#rules-grid");
  grid.innerHTML = "";
  Object.values(RULES).forEach(r => {
    const el = document.createElement("div");
    el.className = "rule";
    el.innerHTML = `<h4></h4><p></p>`;
    el.querySelector("h4").textContent = r.title;
    el.querySelector("p").textContent = r.body;
    grid.appendChild(el);
  });

  function fillSauce(node, sauce, extraClass) {
    node.classList.add(extraClass);
    node.innerHTML = `<h3></h3><ul></ul>`;
    node.querySelector("h3").textContent = sauce.title;
    const ul = node.querySelector("ul");
    sauce.body.forEach(line => {
      const li = document.createElement("li");
      li.textContent = line;
      ul.appendChild(li);
    });
  }
  fillSauce($("#sauce-allegee"), SAUCES.allegee, "allegee");
  fillSauce($("#sauce-dragon"), SAUCES.dragon, "dragon");
}

let SHOP_VIEW = "1"; // current tab key: "1".."5" or "pantry"

function renderShopCategories(categories, scope) {
  const grid = $("#shopping-grid");
  grid.innerHTML = "";
  categories.forEach((cat, ci) => {
    const card = document.createElement("article");
    card.className = "shop-cat";
    const title = document.createElement("h4");
    title.textContent = cat.title;
    card.appendChild(title);
    const ul = document.createElement("ul");
    ul.className = "shop-list";
    cat.items.forEach((item, ii) => {
      const key = `shop:${scope}:${ci}:${ii}`;
      const checked = localStorage.getItem(key) === "1";
      const li = document.createElement("li");
      li.innerHTML = `
        <label class="shop-row${checked ? " is-checked" : ""}">
          <input type="checkbox" data-shopkey="${key}" ${checked ? "checked" : ""} />
          <span class="shop-tick"></span>
          <span class="shop-text"></span>
        </label>`;
      li.querySelector(".shop-text").textContent = item;
      ul.appendChild(li);
    });
    card.appendChild(ul);
    grid.appendChild(card);
  });
}

function setShopView(view) {
  SHOP_VIEW = view;
  $$("#shop-tabs button").forEach(b => b.classList.toggle("is-active", b.dataset.shopview === view));
  if (view === "pantry") renderShopCategories(SHOPPING.pantry, "pantry");
  else renderShopCategories(SHOPPING.weeks[view], `w${view}`);
}

function renderShopping() {
  const tabs = $("#shop-tabs");
  if (!tabs) return;
  tabs.innerHTML = "";
  for (let w = 1; w <= 5; w++) {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.shopview = String(w);
    b.textContent = `Semaine ${w}`;
    tabs.appendChild(b);
  }
  const pantry = document.createElement("button");
  pantry.type = "button";
  pantry.dataset.shopview = "pantry";
  pantry.textContent = "Garde-manger";
  pantry.classList.add("is-pantry");
  tabs.appendChild(pantry);

  tabs.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-shopview]");
    if (btn) setShopView(btn.dataset.shopview);
  });

  setShopView(String(pickInitialWeek()));
}

function renderMeal(label, meal, dateIso, slot) {
  const div = document.createElement("div");
  div.className = "meal";
  const isLibre = meal.type === "libre";
  const checkKey = `done:${dateIso}:${slot}`;
  const isDone = localStorage.getItem(checkKey) === "1";

  div.innerHTML = `
    <div class="meal-head">
      <label class="meal-check" title="Marquer comme fait">
        <input type="checkbox" ${isDone ? "checked" : ""} data-checkkey="${checkKey}" />
        <span class="meal-check-box" aria-hidden="true"></span>
      </label>
      <span class="meal-emoji">${TYPE_EMOJI[meal.type] || "🍽"}</span>
      <span class="meal-tag">${label}</span>
      ${isLibre ? "" : `<button class="meal-ideas" data-ideas="${meal.type}" aria-label="Voir des idées de plats">Idées</button>`}
    </div>
    ${((v) => v.image
      ? `<img class="meal-tile meal-photo" loading="lazy" alt="" src="${v.image}" />`
      : `<div class="meal-tile" style="background: ${v.gradient || "var(--cream-2)"}"><span class="meal-tile-emoji">${TYPE_EMOJI[meal.type] || "🍽"}</span></div>`
    )(TYPE_VISUAL[meal.type] || {})}
    <ul class="meal-items"></ul>
  `;
  if (isDone) div.classList.add("is-done");
  const ul = div.querySelector(".meal-items");
  meal.items.forEach(it => {
    const li = document.createElement("li");
    li.appendChild(enrichItem(it));
    ul.appendChild(li);
  });
  return div;
}

function renderDay(weekIdx, dayIdx, dayData, dateForDay) {
  const article = document.createElement("article");
  article.className = "day";
  const isLibre = dayData.midi.type === "libre" && dayData.soir.type === "libre";
  if (isLibre) article.classList.add("libre-day");

  const iso = isoOf(dateForDay);
  article.dataset.date = iso;
  if (isoOf(new Date()) === iso) article.classList.add("is-today");
  if (OFF_PLAN_DATES.includes(iso)) article.classList.add("is-offplan");

  const header = document.createElement("div");
  header.className = "day-header";
  header.innerHTML = `
    <h3 class="day-name">${DAYS[dayIdx]}</h3>
    <div class="day-date">${fmtFr(dateForDay)}</div>
  `;
  article.appendChild(header);
  article.appendChild(renderMeal("Midi", dayData.midi, iso, "midi"));
  article.appendChild(renderMeal("Soir", dayData.soir, iso, "soir"));
  return article;
}

function renderWeeks() {
  const root = $("#weeks");
  root.innerHTML = "";
  const start = parseDate(START_DATE);

  for (let w = 1; w <= 5; w++) {
    const sec = document.createElement("section");
    sec.className = "week";
    sec.id = `semaine-${w}`;
    sec.dataset.week = w;

    const weekStart = addDays(start, (w - 1) * 7);
    const weekEnd = addDays(weekStart, 6);

    const header = document.createElement("div");
    header.className = "week-header";
    header.innerHTML = `
      <h2>Semaine ${w}</h2>
      <span class="week-dates">${fmtFr(weekStart)} → ${fmtFr(weekEnd)}</span>
    `;
    sec.appendChild(header);

    const days = document.createElement("div");
    days.className = "days";
    MENU[w].forEach((dayData, i) => {
      const date = addDays(weekStart, i);
      days.appendChild(renderDay(w, i, dayData, date));
    });
    sec.appendChild(days);
    root.appendChild(sec);
  }
}

// ----- week tabs -----
function setActiveWeek(week, scroll = true) {
  $$(".weektab").forEach(b => b.classList.toggle("is-active", b.dataset.week === String(week)));
  const weeks = $("#weeks");
  weeks.classList.add("is-filtering");
  $$(".week", weeks).forEach(s => s.classList.toggle("is-shown", s.dataset.week === String(week)));
  if (scroll) window.scrollTo({ top: $("#weeks").offsetTop - 70, behavior: "smooth" });
}

function setupWeekNav() {
  $$(".weektab[data-week]").forEach(btn => {
    btn.addEventListener("click", () => setActiveWeek(btn.dataset.week));
  });
  $$(".weektab-rules").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const el = target ? document.getElementById(target) : null;
      if (!el) return;
      if (el.tagName === "DETAILS") el.open = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ----- modal -----
function openSauceModal(kind) {
  const sauce = SAUCES[kind];
  if (!sauce) return;
  $("#modal-title").textContent = sauce.title;
  const ul = $("#modal-body");
  ul.innerHTML = "";
  sauce.body.forEach(line => {
    const li = document.createElement("li");
    li.textContent = line;
    ul.appendChild(li);
  });
  $("#modal").hidden = false;
}

function openIdeasModal(type) {
  const ex = MEAL_EXAMPLES[type];
  if (!ex) return;
  $("#modal-title").textContent = ex.title;
  const ul = $("#modal-body");
  ul.innerHTML = "";
  ex.dishes.forEach(d => {
    const li = document.createElement("li");
    li.className = "dish";
    const name = document.createElement("strong");
    name.textContent = d.name;
    const note = document.createElement("div");
    note.className = "dish-note";
    note.textContent = d.note;
    li.appendChild(name);
    li.appendChild(note);
    ul.appendChild(li);
  });
  $("#modal").hidden = false;
}

function closeModal() { $("#modal").hidden = true; }

function setupModal() {
  document.addEventListener("click", (e) => {
    const sauceLink = e.target.closest(".sauce-link");
    if (sauceLink) { e.preventDefault(); openSauceModal(sauceLink.dataset.sauce); return; }
    const ideasBtn = e.target.closest(".meal-ideas");
    if (ideasBtn) { e.preventDefault(); openIdeasModal(ideasBtn.dataset.ideas); return; }
    if (e.target.matches("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ----- checkboxes -----
function setupChecks() {
  document.addEventListener("change", (e) => {
    const meal = e.target.closest("input[type=checkbox][data-checkkey]");
    if (meal) {
      const key = meal.dataset.checkkey;
      if (meal.checked) localStorage.setItem(key, "1");
      else localStorage.removeItem(key);
      meal.closest(".meal").classList.toggle("is-done", meal.checked);
      return;
    }
    const shop = e.target.closest("input[type=checkbox][data-shopkey]");
    if (shop) {
      const key = shop.dataset.shopkey;
      if (shop.checked) localStorage.setItem(key, "1");
      else localStorage.removeItem(key);
      shop.closest(".shop-row").classList.toggle("is-checked", shop.checked);
    }
  });

  const reset = $("#shopping-reset");
  if (reset) reset.addEventListener("click", () => {
    const scope = SHOP_VIEW === "pantry" ? "pantry" : `w${SHOP_VIEW}`;
    const prefix = `shop:${scope}:`;
    Object.keys(localStorage)
      .filter(k => k.startsWith(prefix))
      .forEach(k => localStorage.removeItem(k));
    $$("#shopping-grid input[type=checkbox]").forEach(cb => {
      cb.checked = false;
      cb.closest(".shop-row").classList.remove("is-checked");
    });
  });
}

// ----- dark mode -----
const THEME_KEY = "theme";
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = $("#theme-toggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}
function setupTheme() {
  // Default to light. Only switch to dark if the user explicitly chose it before.
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved === "dark" ? "dark" : "light");
  $("#theme-toggle").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
}

// ----- "today" auto-jump -----
function pickInitialWeek() {
  const today = new Date();
  const start = parseDate(START_DATE);
  const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 1;            // before plan starts
  const week = Math.floor(diffDays / 7) + 1;
  if (week > 5) return 5;                // after plan ends
  return week;
}

// ----- boot -----
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  renderRules();
  renderShopping();
  renderWeeks();
  setupWeekNav();
  setupModal();
  setupChecks();
  setActiveWeek(pickInitialWeek(), false);
  // After filter applied, scroll today's card into view if present.
  const todayCard = document.querySelector(".day.is-today");
  if (todayCard) {
    setTimeout(() => todayCard.scrollIntoView({ behavior: "smooth", block: "center" }), 200);
  }
});
