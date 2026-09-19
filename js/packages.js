"use strict";

(function () {
  const CONFIG = window.BTECH_CONFIG || {};
  const PACKAGE_STORAGE = CONFIG.storage?.activePackage || "btech_active_package";
  let selectedPackage = null;

  const getPackageList = () => Array.isArray(CONFIG.packages) ? CONFIG.packages : [];
  const formatNumber = value => Number(value).toLocaleString();
  const getPackageById = id => getPackageList().find(p => String(p.id) === String(id)) || null;

  function populatePackages() {
    const select = document.getElementById("packageSelect");
    if (!select) return;
    select.innerHTML = '<option value="">Select Package</option>';
    getPackageList().forEach(pkg => {
      const option = document.createElement("option");
      option.value = String(pkg.id);
      option.textContent = `${formatNumber(pkg.channels)} Channels — $${Number(pkg.price).toFixed(2)}`;
      select.appendChild(option);
    });
  }

  function updatePackageDetails(pkg) {
    const details = document.getElementById("selectedPackageDetails");
    if (!details) return;
    if (!pkg) { details.hidden = true; return; }
    const set = (id, text) => { const el=document.getElementById(id); if(el) el.textContent=text; };
    set("selectedPackageName", `${formatNumber(pkg.channels)} Channels`);
    set("selectedPackageChannels", formatNumber(pkg.channels));
    set("selectedPackagePrice", `$${Number(pkg.price).toFixed(2)}`);
    set("selectedPackageValidity", `${CONFIG.packageValidityDays || 30} Days`);
    details.hidden = false;
  }

  function updateActivationButton() {
    const button = document.getElementById("activatePackageBtn");
    if (!button) return;
    const name = document.getElementById("activationName")?.value.trim();
    const email = document.getElementById("activationEmail")?.value.trim();
    const phone = document.getElementById("activationPhone")?.value.trim();
    button.disabled = !selectedPackage || !name || !email || !phone;
  }

  function handlePackageChange(event) {
    selectedPackage = getPackageById(event.target.value);
    updatePackageDetails(selectedPackage);
    updateActivationButton();
  }

  function showActivationReceipt(data) {
    const overlay = document.getElementById("activationReceiptOverlay");
    if (!overlay) return false;
    const set = (id, value) => { const el=document.getElementById(id); if(el) el.textContent=value; };
    set("receiptName", data.customer.name);
    set("receiptEmail", data.customer.email);
    set("receiptPhone", data.customer.phone);
    set("receiptPackage", data.name);
    set("receiptChannels", formatNumber(data.channels));
    set("receiptPrice", `$${Number(data.price).toFixed(2)}`);
    set("receiptValidity", `${data.duration} Days`);
    set("receiptActivationDate", new Date(data.activationDate).toLocaleString());
    set("receiptExpiryDate", new Date(data.expiryDate).toLocaleString());
    set("receiptType", data.activationType);
    overlay.hidden = false;
    return true;
  }

  function redirectToPackageDashboard(pkg) {
    const url = `packages/index-${encodeURIComponent(pkg.channels)}.html`;
    window.location.assign(url);
  }

  function activateSelectedPackage() {
    const message = document.getElementById("activationMessage");
    const name = document.getElementById("activationName")?.value.trim();
    const email = document.getElementById("activationEmail")?.value.trim();
    const phone = document.getElementById("activationPhone")?.value.trim();

    if (!selectedPackage) { if(message) message.textContent="Please select a package."; return; }
    if (!name || !email || !phone) { if(message) message.textContent="Please complete your activation details."; return; }

    const duration = Number(CONFIG.packageValidityDays) || 30;
    const activationDate = Date.now();
    const expiryDate = activationDate + duration * 86400000;

    const packageData = {
      id: String(selectedPackage.id),
      name: `${formatNumber(selectedPackage.channels)} Channels`,
      channels: Number(selectedPackage.channels),
      channelLimit: Number(selectedPackage.channels),
      price: Number(selectedPackage.price),
      currency: selectedPackage.currency || CONFIG.currency || "USD",
      duration,
      validityDays: duration,
      customer: { name, email, phone },
      activationDate,
      activatedAt: activationDate,
      expiryDate,
      expiresAt: new Date(expiryDate).toISOString(),
      activationType: "DEMO",
      status: "active"
    };

    try {
      if (!window.BTECH_PACKAGE_ACCESS ||
          typeof window.BTECH_PACKAGE_ACCESS.savePackage !== "function" ||
          !window.BTECH_PACKAGE_ACCESS.savePackage(packageData)) {
        throw new Error("Package could not be saved.");
      }
    } catch (error) {
      console.error(error);
      if(message) message.textContent="Activation could not be saved.";
      return;
    }

    if(message) message.textContent = `Activated: ${formatNumber(selectedPackage.channels)} Channels`;

    const overlay = document.getElementById("packageSelectorOverlay");
    if (overlay) overlay.hidden = true;
    document.body.classList.remove("package-selection-active");

    // The selected package dashboard is the package-specific index-N.html page.
    setTimeout(() => redirectToPackageDashboard(packageData), 150);
  }

  function openPackageSelector() {
    const overlay = document.getElementById("packageSelectorOverlay");
    if (!overlay) return;
    overlay.hidden = false;
    document.body.classList.add("package-selection-active");
    populatePackages();
    document.getElementById("packageSelect")?.focus();
  }

  function initialize() {
    populatePackages();
    document.getElementById("packageSelect")?.addEventListener("change", handlePackageChange);
    document.getElementById("activatePackageBtn")?.addEventListener("click", activateSelectedPackage);
    ["activationName","activationEmail","activationPhone"].forEach(id =>
      document.getElementById(id)?.addEventListener("input", updateActivationButton)
    );
    document.getElementById("continueToDashboardBtn")?.addEventListener("click", () => {
      const pkg = window.BTECH_PACKAGE_ACCESS?.getActivePackage();
      if (pkg) redirectToPackageDashboard(pkg);
    });
    updateActivationButton();
  }

  window.openPackageSelector = openPackageSelector;
  window.getBtechPackageById = getPackageById;
  window.getBtechPackageList = getPackageList;

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, {once:true});
  else initialize();
})();
