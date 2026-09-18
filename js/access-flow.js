/* BTECH-TV WORLD PRO MAX — master access flow */
"use strict";

(function () {
  const CONFIG = window.BTECH_CONFIG || {};
  const ACTIVE_KEY = CONFIG.storage?.activePackage || "btech_active_package";
  const SUB_KEY = CONFIG.storage?.subscription || "btech_tv_subscription_v5";

  function getActive() {
    try {
      const raw = localStorage.getItem(ACTIVE_KEY);
      if (!raw) return null;
      const pkg = JSON.parse(raw);
      if (!pkg || Number(pkg.expiryDate) <= Date.now()) {
        localStorage.removeItem(ACTIVE_KEY);
        localStorage.removeItem(SUB_KEY);
        return null;
      }
      return pkg;
    } catch (_) {
      return null;
    }
  }

  function setStatus() {
    const status = document.getElementById("subscriptionStatus");
    const pkg = getActive();
    if (!status) return;

    if (pkg) {
      const days = Math.max(0, Math.ceil((Number(pkg.expiryDate) - Date.now()) / 86400000));
      status.textContent = `${Number(pkg.channels).toLocaleString()} CHANNELS • ${days} DAYS`;
    }
  }

  function stopMedia() {
    try {
      if (window.BTECH_STATE?.hls) {
        window.BTECH_STATE.hls.destroy();
        window.BTECH_STATE.hls = null;
      }
      const video = document.getElementById("video");
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    } catch (_) {}
  }

  function openSelector() {
    stopMedia();
    document.body.classList.add("btech-access-locked");
    const overlay = document.getElementById("packageSelectorOverlay");
    if (overlay) overlay.hidden = false;
    if (typeof window.openPackageSelector === "function") window.openPackageSelector();
  }

  function authorize() {
    const pkg = getActive();
    if (pkg) {
      document.body.classList.remove("btech-access-locked");
      setStatus();
      return true;
    }
    return false;
  }

  function enforce() {
    if (!authorize()) {
      const trialExpired = window.BTECH_TRIAL?.isExpired?.();
      if (trialExpired) openSelector();
    }
    setStatus();
  }

  window.BTECH_ACCESS_FLOW = Object.freeze({
    getActive,
    authorize,
    enforce,
    openSelector,
    setStatus
  });

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(enforce, 0);
    setInterval(enforce, 1000);
  });
})();
