"use strict";

/* BTECH-TV WORLD PRO MAX — Version 3 package selector/payment flow */
(function () {
  const CONFIG = window.BTECH_CONFIG || {};
  const STORAGE = CONFIG.storage || {};
  const ACTIVE_KEY = STORAGE.activePackage || "btech_active_package";
  const SUB_KEY = STORAGE.subscription || "btech_tv_subscription_v5";
  const TRIAL_KEY = STORAGE.trial || "btech_tv_trial_v5";
  let selectedPackage = null;
  let selectedPayment = "";
  let customerDraft = { name: "", email: "", phone: "" };

  const list = Array.isArray(CONFIG.packages) ? CONFIG.packages.map(p => ({
    ...p,
    id: String(p.id), channels: Number(p.channels), price: Number(p.price),
    currency: p.currency || CONFIG.currency || "USD",
    duration: Number(p.duration) || Number(CONFIG.packageValidityDays) || 30
  })) : [];

  const PACKAGE_SLUGS = Object.freeze({
    "500": "starter",
    "1000": "Compact",
    "1500": "Standard",
    "2000": "Plus",
    "2500": "Advanced",
    "3000": "premium",
    "3500": "btech-tv-3500",
    "4000": "premium-plus",
    "4500": "btech-tv-4500",
    "5000": "btech-tv-5000",
    "5500": "super-btech-tv-5500",
    "6000": "super-plus",
    "6500": "btech-tv-6500",
    "7000": "btech-tv-7000",
    "7500": "btech-tv-7500",
    "8000": "ultra",
    "8500": "btech-tv-8500",
    "9000": "btech-tv-9000",
    "9500": "btech-tv-9500",
    "10000": "ultra-plus",
    "10500": "btech-tv-10500",
    "11000": "btech-tv-11000",
    "11500": "btech-tv-11500",
    "12000": "ultra-max",
    "12500": "btech-tv-12500",
    "13000": "btech-tv-13000",
    "13500": "btech-tv-13500",
    "14000": "super-premium",
    "14500": "btech-tv-14500",
    "15000": "super-premium-plus",
    "15500": "btech-tv-15500",
    "16000": "ultimate-sports",
  });

  window.BTECH_PACKAGES = Object.freeze(list);

  const $ = id => document.getElementById(id);
  const fmt = n => Number(n).toLocaleString();
  const money = p => `${p.currency === "USD" ? "$" : p.currency + " "}${Number(p.price).toFixed(2)}`;
  const pageFor = p => `packages/${PACKAGE_SLUGS[String(p.id)] || `package-${p.channels}`}/index.html`;

  function getPackageById(id) { return list.find(p => p.id === String(id)) || null; }
  function getPackageList() { return list.slice(); }

  function populatePackages() {
    const select = $("packageSelect"); if (!select) return;
    select.innerHTML = '<option value="">Select Package</option>';
    list.forEach(p => {
      const o = document.createElement("option");
      o.value = p.id;
      o.textContent = `${fmt(p.channels)} Channels — ${money(p)} — ${p.duration} Days`;
      select.appendChild(o);
    });
  }

  function createPackageSelector() {
    const old = document.getElementById("btechDynamicPackageSelector");
    if (old) old.remove();
    const overlay = document.createElement("div");
    overlay.id = "btechDynamicPackageSelector";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    const options = list.map(p => `<option value="${String(p.id)}">${fmt(p.channels)} Channels — ${money(p)} — ${p.duration} Days</option>`).join("");
    const esc = v => String(v ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
    const frame = document.createElement("iframe");
    frame.title = "BTECH-TV package activation form";
    frame.style.cssText = "display:block;width:100%;height:620px;max-height:82vh;border:0;border-radius:12px;background:#0d1324;";
    const initial = {id:selectedPackage ? String(selectedPackage.id) : "",name:customerDraft.name,email:customerDraft.email,phone:customerDraft.phone};
    frame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}html,body{margin:0;background:#0d1324;color:#fff;font-family:Arial,sans-serif}body{padding:24px}.card{max-width:680px;margin:auto}.step{display:inline-block;padding:5px 9px;border-radius:999px;background:#152445;color:#00d4ff;font-size:10px;font-weight:900}.step+h2{color:#00d4ff;margin:8px 0}.sub{color:#8ea2d9;font-size:13px}.field{display:flex;flex-direction:column;gap:6px;margin:12px 0}.field label{font-size:11px;color:#8ea2d9;font-weight:800;text-transform:uppercase}.field input,.field select{width:100%;height:46px;padding:11px 12px;border-radius:9px;border:1px solid #38527e;background:#101a31;color:#fff;font-size:15px;outline:none;pointer-events:auto!important;user-select:text!important}.field input:focus,.field select:focus{border-color:#00d4ff;outline:2px solid rgba(0,212,255,.18)}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.summary{margin:14px 0;padding:14px;border:1px solid #1d2b4f;border-radius:10px;background:#101a31;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}.summary strong{color:#00d4ff}.msg{min-height:20px;color:#ff7b7b;font-size:12px}.actions{text-align:right;margin-top:16px}.actions button{height:46px;padding:0 18px;border:0;border-radius:9px;background:#00d4ff;color:#001018;font-weight:900}.actions button:disabled{opacity:.45}@media(max-width:600px){body{padding:18px}.grid{grid-template-columns:1fr}}</style></head><body><main class="card"><div class="step">STEP 1 OF 3 · PACKAGE</div><h2>Select your package</h2><p class="sub">Choose a package, then enter your details to continue to payment.</p><form id="activationForm"><div class="field"><label for="package">Selected Package</label><select id="package" required><option value="">Select Package</option>${options}</select></div><div id="summary" class="summary" hidden><strong id="packageName"></strong><span id="packageInfo"></span></div><div class="grid"><div class="field"><label for="name">Full Name</label><input id="name" type="text" autocomplete="name" placeholder="Enter full name" required></div><div class="field"><label for="email">Email</label><input id="email" type="email" autocomplete="email" placeholder="Enter email address" required></div></div><div class="field"><label for="phone">Phone</label><input id="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="Enter phone number" required></div><div id="msg" class="msg"></div><div class="actions"><button id="continue" type="submit" disabled>CONTINUE TO PAYMENT</button></div></form></main><script>const packages=JSON.parse('${JSON.stringify(list)}');const initial=${JSON.stringify(initial)};const pkg=document.getElementById('package'),name=document.getElementById('name'),email=document.getElementById('email'),phone=document.getElementById('phone'),btn=document.getElementById('continue'),summary=document.getElementById('summary'),pname=document.getElementById('packageName'),pinfo=document.getElementById('packageInfo'),msg=document.getElementById('msg');pkg.value=initial.id;name.value=initial.name||'';email.value=initial.email||'';phone.value=initial.phone||'';function current(){return packages.find(p=>String(p.id)===String(pkg.value))||null}function valid(){const p=current(),ph=(phone.value||'').replace(/[+()\s-]/g,'');return !!(p&&name.value.trim()&&/\S+@\S+\.\S+/.test(email.value.trim())&&ph.length>=7)}function render(){const p=current();summary.hidden=!p;if(p){pname.textContent=p.name+' — '+Number(p.channels).toLocaleString()+' Channels';pinfo.textContent='$'+Number(p.price).toFixed(2)+' · '+p.duration+' Days'}btn.disabled=!valid();msg.textContent=''}[pkg,name,email,phone].forEach(e=>{e.addEventListener('input',render);e.addEventListener('change',render)});document.getElementById('activationForm').addEventListener('submit',e=>{e.preventDefault();if(!valid()){msg.textContent='Select a package and complete your details.';return}const p=current();parent.postMessage({source:'BTECH_PACKAGE_FORM',type:'submit',packageId:String(p.id),name:name.value.trim(),email:email.value.trim(),phone:phone.value.trim()},'*')});render();<\/script></body></html>`;
    const card=document.createElement("div"); card.className="btech-flow-card"; card.appendChild(frame); overlay.appendChild(card); document.body.appendChild(overlay); return overlay;
  }

  function updateDetails(p) {
    const box = $("selectedPackageDetails"); if (!box) return;
    if (!p) { box.hidden = true; return; }
    $("selectedPackageName").textContent = `${fmt(p.channels)} Channels`;
    $("selectedPackageChannels").textContent = fmt(p.channels);
    $("selectedPackagePrice").textContent = money(p);
    $("selectedPackageValidity").textContent = `${p.duration} Days`;
    box.hidden = false;
  }

  function validCustomer() {
    const name = customerDraft.name?.trim(); const email = customerDraft.email?.trim(); const phone = customerDraft.phone?.trim();
    const validPhone = phone && phone.replace(/[+()\s-]/g, "").length >= 7;
    return !!(selectedPackage && name && /\S+@\S+\.\S+/.test(email || "") && validPhone);
  }

  function updateProceed() {
    const b = $("activatePackageBtn"); if (!b) return;
    b.disabled = !validCustomer();
    b.textContent = selectedPackage ? `Proceed to Payment — ${money(selectedPackage)}` : "Proceed to Payment";
  }

  function showMessage(text, type) {
    const el = $("activationMessage"); if (!el) return;
    el.textContent = text; el.dataset.type = type || "";
  }

  let selectorSiblingPointerState = [];

  function lockDashboardBehindOverlay(overlay) {
    selectorSiblingPointerState = [];
    Array.from(document.body.children).forEach(el => {
      if (el === overlay || el.contains(overlay)) return;
      selectorSiblingPointerState.push({ el, value: el.style.pointerEvents });
      el.style.pointerEvents = "none";
    });
  }

  function unlockDashboardBehindOverlay() {
    selectorSiblingPointerState.forEach(({ el, value }) => {
      el.style.pointerEvents = value;
    });
    selectorSiblingPointerState = [];
  }

  function openSelector() {
    const overlay = createPackageSelector();
    document.body.classList.add("package-selection-active"); document.body.style.overflow="hidden";
    const frame = overlay.querySelector("iframe");
    const receive = event => {
      if (event.source !== frame.contentWindow) return;
      const d=event.data||{}; if(d.source!=="BTECH_PACKAGE_FORM" || d.type!=="submit") return;
      const p=getPackageById(d.packageId); if(!p) return;
      selectedPackage=p; customerDraft={name:String(d.name||"").trim(),email:String(d.email||"").trim(),phone:String(d.phone||"").trim()};
      window.removeEventListener("message", receive); overlay._btechMessageHandler=null; openPayment();
    };
    window.addEventListener("message", receive); overlay._btechMessageHandler=receive;
  }

  function closeSelector() {
    const overlay = $("btechDynamicPackageSelector");
    if (overlay) {
      try { if (overlay.open && typeof overlay.close === "function") overlay.close(); } catch (_) {}
      if (overlay._btechMessageHandler) window.removeEventListener("message", overlay._btechMessageHandler);
      overlay.remove();
    }
    document.body.classList.remove("package-selection-active");
    document.body.style.overflow = "";
  }

  function openPayment() {
    if (!validCustomer()) { showMessage("Select a package and complete your details.", "error"); return; }
    // Remove Step 1 before showing Step 2 so the payment controls are
    // genuinely on top and no invisible Step 1 layer can capture clicks.
    closeSelector();
    const pay = $("paymentOverlay"); if (!pay) return;
    // Move payment modal to the end of body so no dashboard layer can cover it.
    document.body.appendChild(pay);
    pay.removeAttribute("inert");
    pay.style.setProperty("display", "flex", "important");
    pay.style.setProperty("pointer-events", "auto", "important");
    pay.style.setProperty("z-index", "2147483647", "important");
    $("paymentPackageName").textContent = `${fmt(selectedPackage.channels)} Channels`;
    $("paymentPackagePrice").textContent = money(selectedPackage);
    $("paymentCustomerName").textContent = customerDraft.name;
    selectedPayment = "";
    document.querySelectorAll("[data-payment-method]").forEach(b => b.classList.remove("selected"));
    $("confirmPaymentBtn").disabled = true;
    $("paymentMessage").textContent = "";
    pay.hidden = false;
    setTimeout(() => document.querySelector("[data-payment-method]")?.focus(), 0);
  }

  function closePayment() {
    const pay = $("paymentOverlay");
    if (pay) { pay.hidden = true; pay.style.removeProperty("display"); }
  }

  function saveActivation() {
    const now = Date.now();
    const data = {
      id: selectedPackage.id,
      name: `${fmt(selectedPackage.channels)} Channels`,
      channels: selectedPackage.channels,
      price: selectedPackage.price,
      currency: selectedPackage.currency,
      duration: selectedPackage.duration,
      customer: {
        name: customerDraft.name,
        email: customerDraft.email,
        phone: customerDraft.phone
      },
      paymentMethod: selectedPayment,
      paymentStatus: "SUCCESSFUL",
      activationDate: now,
      expiryDate: now + selectedPackage.duration * 86400000,
      activationType: "DEMO_PAYMENT"
    };
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(data));
    localStorage.setItem(SUB_KEY, JSON.stringify(data));
    localStorage.removeItem(TRIAL_KEY);
    return data;
  }

  function showReceipt(data) {
    closePayment(); closeSelector();
    const set = (id, value) => { const e=$(id); if(e)e.textContent=value; };
    set("receiptName", data.customer.name); set("receiptEmail", data.customer.email); set("receiptPhone", data.customer.phone);
    set("receiptPackage", data.name); set("receiptChannels", fmt(data.channels)); set("receiptPrice", `${data.currency === "USD" ? "$" : data.currency + " "}${Number(data.price).toFixed(2)}`);
    set("receiptValidity", `${data.duration} Days`); set("receiptPayment", data.paymentMethod); set("receiptPaymentStatus", data.paymentStatus);
    set("receiptActivationDate", new Date(data.activationDate).toLocaleString()); set("receiptExpiryDate", new Date(data.expiryDate).toLocaleString()); set("receiptType", data.activationType);
    const r=$("activationReceiptOverlay");
    if(r) {
      r.hidden=false;
      if (r.parentElement !== document.body) document.body.appendChild(r);
      r.style.setProperty("display", "grid", "important");
      r.style.setProperty("pointer-events", "auto", "important");
      r.style.setProperty("z-index", "2147483647", "important");
      const go = $("continueToDashboardBtn");
      if (go) {
        go.disabled = false;
        go.style.setProperty("pointer-events", "auto", "important");
        go.style.setProperty("cursor", "pointer", "important");
      }
    }
    document.body.classList.add("package-selection-active");
  }

  function continueToDashboard() {
    // Always recover the activated package from storage before routing.
    // This prevents Step 3 from failing if the in-memory selection was lost.
    if (!selectedPackage) {
      try {
        const raw = localStorage.getItem(ACTIVE_KEY) || localStorage.getItem(SUB_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          selectedPackage = getPackageById(saved?.id) || (saved?.channels ? getPackageById(String(saved.channels)) : null);
        }
      } catch (_) {}
    }
    if (!selectedPackage || !Number(selectedPackage.channels)) {
      const msg = $("paymentMessage");
      if (msg) { msg.textContent = "No activated package was found. Please complete payment again."; msg.dataset.type = "error"; }
      return;
    }

    // Save the selected package explicitly so the destination dashboard can
    // identify the active package even after a full-page navigation.
    try {
      localStorage.setItem("btech_active_package_id", String(selectedPackage.id));
      localStorage.setItem("btech_active_package_channels", String(selectedPackage.channels));
    } catch (_) {}

    const destination = pageFor(selectedPackage);
    window.location.assign(destination);
  }

  function selectPayment(button) {
    selectedPayment = button.dataset.paymentMethod || "";
    document.querySelectorAll("[data-payment-method]").forEach(b => b.classList.toggle("selected", b === button));
    const confirm=$("confirmPaymentBtn"); if(confirm) confirm.disabled=!selectedPayment;
  }

  function confirmPayment() {
    if (!selectedPayment || !validCustomer()) return;
    const btn=$("confirmPaymentBtn"); if(btn) { btn.disabled=true; btn.textContent="Processing…"; }
    setTimeout(() => {
      try { const data=saveActivation(); showReceipt(data); }
      catch(e) { console.error(e); if($("paymentMessage")) $("paymentMessage").textContent="Activation could not be saved."; if(btn){btn.disabled=false;btn.textContent="Confirm Payment";} }
    }, 500);
  }

  function initialize() {
    // Import a selection/customer record coming from packages.html.
    // This keeps the supplied standalone selector merged with the existing
    // payment + activation flow instead of losing the selected package.
    try {
      const raw = localStorage.getItem("btech_selected_package");
      if (raw) {
        const saved = JSON.parse(raw);
        const imported = getPackageById(saved?.id);
        if (imported) {
          selectedPackage = imported;

        }
      }
    } catch (_) {}

    document.querySelectorAll("[data-payment-method]").forEach(b => b.addEventListener("click", () => selectPayment(b)));
    $("confirmPaymentBtn")?.addEventListener("click", confirmPayment);
    $("continueToDashboardBtn")?.addEventListener("click", continueToDashboard);
    $("cancelPaymentBtn")?.addEventListener("click", function(){
      closePayment();
      openSelector();
    });
    updateProceed();

    // When packages.html sent the user here for checkout, open the existing
    // selector/payment flow automatically with the imported selection.
    if (new URLSearchParams(window.location.search).get("checkout") === "1" && selectedPackage) {
      setTimeout(() => openSelector(), 0);
    }
  }

  window.openPackageSelector=openSelector;
  window.getBtechPackageById=getPackageById;
  window.getBtechPackageList=getPackageList;
  window.BTECH_PACKAGE_FLOW=Object.freeze({openSelector, continueToDashboard});
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, {once:true}); else initialize();
})();
