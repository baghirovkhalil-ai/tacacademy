const WA = "994553083152", $ = s => document.querySelector(s) || document.createElement("div");
const G = [["Xarici dillər", ["İngilis dili","Rus dili","Alman dili","Fransız dili"]], ["Məktəb fənləri", ["Azərbaycan dili","Ədəbiyyat","Riyaziyyat","Fizika","Kimya","Biologiya","Tarix","Coğrafiya","İnformatika","Məntiq"]]];
const chosen = new Set(); let bolme = "Azərbaycan";
const wa = msg => window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
document.addEventListener("click", e => { const a = e.target.closest("[data-wa]"); if (a) { e.preventDefault(); wa(a.dataset.wa) } });
$("#chips").innerHTML = G.map(([g, l]) => `<div class="grp">${g}</div><div class="chips">${l.map(n => `<button type="button" data-n="${n}">${n}</button>`).join("")}</div>`).join("");
const upd = () => { const l = [...chosen]; $("#sel").textContent = l.length ? l.join(", ") : "Fənn və ya dil seç" };
$("#chips").onclick = e => { const b = e.target.closest("button"); if (!b) return; const n = b.dataset.n; chosen.has(n) ? chosen.delete(n) : chosen.add(n); b.classList.toggle("on"); upd() };
$("#bolme").onclick = e => { const b = e.target.closest("button"); if (!b) return; bolme = b.dataset.b; document.querySelectorAll("#bolme button").forEach(x => x.classList.toggle("on", x === b)) };
$("#send").onclick = e => { e.preventDefault(); const l = [...chosen], nm = $("#nm").value.trim(), y = $("#yas").value;
  wa(`Salam!${nm ? " Mən " + nm + "." : ""} Ödənişsiz nümunə dərsinə yazılmaq istəyirəm.\nBölmə: ${bolme}\nFormat: ${$("#fmt").value}${y ? "\nYaş qrupu: " + y : ""}${l.length ? "\nFənlər: " + l.join(", ") : ""}`) };
$("#burger").onclick = () => $("#nav").classList.toggle("open");
document.querySelectorAll("#links a").forEach(a => a.onclick = () => $("#nav").classList.remove("open"));
const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target) } }), { threshold: 0 }) : null;
document.querySelectorAll(".rv").forEach(el => io ? io.observe(el) : el.classList.add("in"));

// fənn kartlarını ayrıca səhifələrə bağla
const SLUG = s => s.toLowerCase().replace(/ə/g,"e").replace(/ı/g,"i").replace(/i̇/g,"i").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ç/g,"c").replace(/ş/g,"s").replace(/ğ/g,"g").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
document.querySelectorAll("#subs .su").forEach(d => { const n = d.querySelector("b"); if (!n) return; const a = document.createElement("a"); a.className = d.className; a.dataset.g = d.dataset.g || ""; a.href = "fenn-" + SLUG(n.textContent) + ".html"; a.innerHTML = d.innerHTML; d.replaceWith(a) });
// Fənlər səhifəsində süzgəc
const F2 = document.getElementById("flt2"); if (F2) F2.onclick = e => { const b = e.target.closest("button"); if (!b) return; F2.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); document.querySelectorAll("#subs2 .su").forEach(s => s.style.display = b.dataset.f === "all" || s.dataset.g === b.dataset.f ? "" : "none") };
// ?f=fenn-slug → kalkulyatorda həmin fənni seç
(() => { const f = new URLSearchParams(location.search).get("f"); if (!f) return; document.querySelectorAll("#chips button").forEach(b => { if (SLUG(b.dataset.n) === f) b.click() }) })();
