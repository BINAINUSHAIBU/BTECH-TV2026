"use strict";

(function () {
  const CONFIG = window.BTECH_CONFIG || {};
  const STORAGE = {
    activePackage: CONFIG.storage?.activePackage || "btech_active_package",
    subscription: CONFIG.storage?.subscription || "btech_tv_subscription_v5",
    premium: "btech_tv_premium",
    package: "btech_tv_package",
    channelLimit: "btech_tv_channel_limit",
    expires: "btech_tv_package_expires",
    trial: CONFIG.storage?.trial || "btech_tv_trial_v5",
  };

  function read(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function remove(key) {
    try { localStorage.removeItem(key); } catch (_) {}
  }

  function getActivePackage() {
    let raw = read(STORAGE.activePackage);
    if (!raw) raw = read(STORAGE.subscription);
    if (!raw) return null;
    try {
      const pkg = JSON.parse(raw);
      return pkg && typeof pkg === "object" ? pkg : null;
    } catch (_) { return null; }
  }

  function isPackageActive() {
    const pkg = getActivePackage();
    if (!pkg) return false;
    const expiry = Number(pkg.expiryDate || pkg.expiresAt);
    if (!Number.isFinite(expiry) || expiry <= Date.now()) {
      clearPackage();
      return false;
    }
    return true;
  }

  function getChannelLimit() {
    if (!isPackageActive()) return 500;
    const pkg = getActivePackage();
    return Math.max(1, Number(pkg.channels || pkg.channelLimit) || 500);
  }

  function canAccessChannel(index) {
    if (!isPackageActive()) return false;
    const i = Number(index);
    return Number.isInteger(i) && i >= 0 && i < getChannelLimit();
  }

  function savePackage(pkg) {
    if (!pkg) return false;
    const now = Date.now();
    const duration = Math.max(1, Number(pkg.duration || pkg.validityDays) || Number(CONFIG.packageValidityDays) || 30);
    const channels = Math.max(1, Number(pkg.channels || pkg.channelLimit) || 500);
    const expiryDate = now + duration * 86400000;

    const data = {
      id: String(pkg.id || channels),
      name: String(pkg.name || `${channels.toLocaleString()} Channels`),
      channels,
      channelLimit: channels,
      price: Number(pkg.price) || 0,
      currency: pkg.currency || CONFIG.currency || "USD",
      duration,
      validityDays: duration,
      customer: pkg.customer || null,
      activationDate: now,
      activatedAt: now,
      expiryDate,
      expiresAt: new Date(expiryDate).toISOString(),
      activationType: pkg.activationType || "DEMO",
      status: "active"
    };

    try {
      localStorage.setItem(STORAGE.activePackage, JSON.stringify(data));
      localStorage.setItem(STORAGE.subscription, JSON.stringify(data));
      localStorage.setItem(STORAGE.premium, "true");
      localStorage.setItem(STORAGE.package, data.id);
      localStorage.setItem(STORAGE.channelLimit, String(channels));
      localStorage.setItem(STORAGE.expires, String(expiryDate));
      remove(STORAGE.trial);
      sessionStorage.removeItem("btech_trial_redirected");
      return true;
    } catch (error) {
      console.error("BTECH-TV: Could not save package.", error);
      return false;
    }
  }

  function clearPackage() {
    Object.values(STORAGE).forEach(remove);
  }

  function getRemainingTime() {
    const pkg = getActivePackage();
    if (!pkg) return 0;
    return Math.max(0, Number(pkg.expiryDate || pkg.expiresAt || 0) - Date.now());
  }

  function getRemainingDays() {
    return Math.ceil(getRemainingTime() / 86400000);
  }

  window.BTECH_PACKAGE_ACCESS = Object.freeze({
    getActivePackage, isPackageActive, getChannelLimit, canAccessChannel,
    savePackage, clearPackage, getRemainingTime, getRemainingDays
  });
})();
