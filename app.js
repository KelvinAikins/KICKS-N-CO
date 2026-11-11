"use strict";
const CATS = {
  foot: ["Sneakers", "Slides", "Trainers", "Sportswear", "Others"],
  fit: ["Streetwear", "Casuals", "Official", "Comfies"]
};
const SIZES = { foot: [40, 41, 42, 43, 44, 45, 46], fit: ["S", "M", "L", "XL", "XXL"] };
const TILE = ["#FFD23F", "#8DBBFF", "#FF9DBA", "#6EE7A8", "#FFB46B"];
const ACCENT = {
  Sun: ["#FFD23F", "#1B1B2F"], Cobalt: ["#2D5BFF", "#FFFFFF"],
  Coral: ["#FF5C8A", "#1B1B2F"], Mint: ["#3DDC97", "#1B1B2F"]
};

const P = PRODUCTS.map((a, i) => ({ ...a, id: i }));
const pic = p => p.img ? `<img src="img/${p.img}" alt="${p.n}" loading="lazy">` : `<span>${p.e || ""}</span>`;

// Per-user state, saved in this browser
let S = { name: "", accent: "Sun", cart: [], wish: [], seen: {} };
try { Object.assign(S, JSON.parse(localStorage.getItem("kicksnco") || "{}")); } catch (e) {}
const save = () => { try { localStorage.setItem("kicksnco", JSON.stringify(S)); } catch (e) {} };
const $ = s => document.querySelector(s);
const bump = (c, n) => { S.seen[c] = (S.seen[c] || 0) + n; };
const V = { tab: "foot", cat: "All", q: "", sort: "", max: 800, saved: false, open: null, size: null };

function card(p) {
  const on = S.wish.includes(p.id);
  return `<article class="card" style="--c:${TILE[p.id % 5]}">
    <button class="heart ${on ? "on" : ""}" data-w="${p.id}" aria-pressed="${on}" aria-label="Save ${p.n}">&hearts;</button>
    <button class="pic" data-o="${p.id}" aria-label="View ${p.n}">${pic(p)}</button>
    <div class="info"><h3>${p.n}</h3><p>${p.c}</p><b>GHS ${p.p}</b></div></article>`;
}

function list() {
  let l = V.saved ? P.filter(p => S.wish.includes(p.id))
    : V.q ? P : P.filter(p => p.g === V.tab && (V.cat === "All" || p.c === V.cat));
  l = l.filter(p => p.p <= V.max && (p.n + " " + p.c).toLowerCase().includes(V.q));
  if (V.sort) l.sort((a, b) => (V.sort === "lo" ? a.p - b.p : b.p - a.p));
  return l;
}

function renderGrid() {
  const l = list();
  $("#grid").innerHTML = l.length ? l.map(card).join("")
    : `<p class="empty">${V.saved ? "Nothing saved yet. Tap the heart on any item." : "Nothing matches. Clear the search or raise the price limit."}</p>`;
  $("#count2").textContent = (V.saved ? "Saved: " : "") + l.length + (l.length === 1 ? " item" : " items");
  document.querySelectorAll(".tabs button").forEach(b => b.classList.toggle("on", !V.saved && b.dataset.t === V.tab));
  $("#chips").innerHTML = V.saved ? "" : ["All", ...CATS[V.tab]]
    .map(x => `<button data-cat="${x}" class="${x === V.cat ? "on" : ""}">${x}</button>`).join("");
  $("#wishN").textContent = S.wish.length;
}

function renderFor() {
  const top = Object.entries(S.seen).sort((a, b) => b[1] - a[1]).slice(0, 2).map(x => x[0]);
  const inBag = S.cart.map(c => c.id);
  const l = P.filter(p => top.includes(p.c) && !inBag.includes(p.id)).slice(0, 4);
  $("#foryou").hidden = !l.length;
  $("#fyGrid").innerHTML = l.map(card).join("");
}

function renderCart() {
  $("#cartN").textContent = S.cart.reduce((a, c) => a + c.q, 0);
  $("#items").innerHTML = S.cart.length ? S.cart.map((c, i) => {
    const p = P[c.id];
    return `<li><span class="mini" style="--c:${TILE[p.id % 5]}">${pic(p)}</span>
      <div><b>${p.n}</b><small>Size ${c.s}, GHS ${p.p}</small></div>
      <div class="qty"><button data-qi="${i}" data-d="-1" aria-label="Fewer">-</button><span>${c.q}</span>
      <button data-qi="${i}" data-d="1" aria-label="More">+</button></div></li>`;
  }).join("") : `<li class="empty">Your bag is empty. Pick something from the shop.</li>`;
  $("#total").textContent = "GHS " + total().toLocaleString();
  $("#checkout").disabled = !S.cart.length;
}
const total = () => S.cart.reduce((a, c) => a + c.q * P[c.id].p, 0);

function hello() {
  const h = new Date().getHours();
  const g = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  $("#hello").textContent = S.name ? `${g}, ${S.name}.` : "Fresh pairs. Fresh fits.";
  $("#sub").textContent = !S.name
    ? "Footwear and menswear priced in GHS. Add your name and this page will remember you."
    : Object.keys(S.seen).length
      ? "Welcome back. We've lined up a few picks for you below the shop."
      : "Browse footwear and fits, save what you like and order on WhatsApp.";
  $("#nameIn").value = S.name;
}

function applyAccent() {
  const [a, f] = ACCENT[S.accent] || ACCENT.Sun, r = document.documentElement.style;
  r.setProperty("--accent", a); r.setProperty("--on", f);
  $("#swatches").innerHTML = Object.entries(ACCENT).map(([k, v]) =>
    `<button data-acc="${k}" style="background:${v[0]}" class="${k === S.accent ? "on" : ""}" aria-pressed="${k === S.accent}" aria-label="${k} colour"></button>`).join("");
}

function nextDrop() {
  const d = new Date(); d.setHours(18, 0, 0, 0);
  d.setDate(d.getDate() + ((5 - d.getDay() + 7) % 7));
  if (d <= new Date()) d.setDate(d.getDate() + 7);
  return d;
}
function tick() {
  let s = Math.max(0, Math.floor((nextDrop() - new Date()) / 1000));
  const d = Math.floor(s / 86400); s %= 86400;
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  $("#count").textContent = `${d}d ${h}h ${m}m ${s % 60}s`;
}

function wish(id) {
  const i = S.wish.indexOf(id);
  if (i < 0) { S.wish.push(id); bump(P[id].c, 2); } else S.wish.splice(i, 1);
  save(); renderGrid(); renderFor();
}

function openP(id) {
  const p = P[id]; V.open = p; V.size = null; bump(p.c, 1); save(); renderFor();
  $("#dBody").innerHTML = `<div class="dpic" style="--c:${TILE[p.id % 5]}">${pic(p)}</div>
    <div class="dinfo"><h2>${p.n}</h2><p>${p.c}</p><b>GHS ${p.p}</b>
    <p class="lab">Size</p><div class="sizes">${SIZES[p.g].map(s => `<button data-s="${s}">${s}</button>`).join("")}</div>
    <p id="dMsg" role="status"></p><button class="cta" id="addBtn">Add to bag</button></div>`;
  $("#dlg").showModal();
}

const cartOpen = on => document.body.classList.toggle("cart", on);

document.addEventListener("click", e => {
  const t = e.target.closest("button"), d = t ? t.dataset : {};
  if (e.target === $("#dlg")) $("#dlg").close();
  if (e.target === $("#veil")) cartOpen(false);
  if (!t) return;
  if (d.w !== undefined) wish(+d.w);
  else if (d.o !== undefined) openP(+d.o);
  else if (d.t) { V.tab = d.t; V.cat = "All"; V.saved = false; V.q = ""; $("#q").value = ""; renderGrid(); }
  else if (d.cat) { V.cat = d.cat; renderGrid(); }
  else if (d.acc) { S.accent = d.acc; save(); applyAccent(); }
  else if (d.s) {
    V.size = d.s; $("#dMsg").textContent = "";
    document.querySelectorAll(".sizes button").forEach(b => b.classList.toggle("on", b === t));
  } else if (d.qi !== undefined) {
    const c = S.cart[+d.qi]; c.q += +d.d;
    if (c.q < 1) S.cart.splice(+d.qi, 1);
    save(); renderCart(); renderFor();
  } else if (t.id === "addBtn") {
    if (!V.size) { $("#dMsg").textContent = "Pick a size first."; return; }
    const k = V.open.id + "-" + V.size, x = S.cart.find(c => c.k === k);
    x ? x.q++ : S.cart.push({ k, id: V.open.id, s: V.size, q: 1 });
    save(); renderCart(); renderFor(); $("#dlg").close(); cartOpen(true);
  } else if (t.id === "dClose") $("#dlg").close();
  else if (t.id === "cartBtn") cartOpen(true);
  else if (t.id === "cartClose") cartOpen(false);
  else if (t.id === "wishBtn") { V.saved = !V.saved; renderGrid(); }
  else if (t.id === "checkout") {
    const lines = S.cart.map(c => `- ${P[c.id].n}, size ${c.s}, x${c.q}`).join("\n");
    const msg = `Hi KICKS N CO, I'd like to order:\n${lines}\nTotal: GHS ${total()}` + (S.name ? `\nName: ${S.name}` : "");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }
});

$("#q").addEventListener("input", e => { V.q = e.target.value.toLowerCase().trim(); V.saved = false; renderGrid(); });
$("#sort").addEventListener("change", e => { V.sort = e.target.value; renderGrid(); });
$("#max").addEventListener("input", e => { V.max = +e.target.value; $("#maxO").textContent = V.max; renderGrid(); });
$("#nameForm").addEventListener("submit", e => {
  e.preventDefault(); S.name = $("#nameIn").value.trim().slice(0, 24); save(); hello();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") cartOpen(false); });

$("#wa").href = `https://wa.me/${WHATSAPP}`;
applyAccent(); hello(); renderGrid(); renderFor(); renderCart(); tick();
setInterval(tick, 1000);
