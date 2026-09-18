"use strict";

(function () {
  const CONFIG = window.BTECH_CONFIG || {};

  const STORAGE_KEY = CONFIG.storage?.activePackage || "btech_active_package";

  function getActivePackage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return null;
      }

      const pkg = JSON.parse(saved);

      if (!pkg || typeof pkg !== "object") {
        return null;
      }

      return pkg;
    } catch (error) {
      console.warn("BTECH-TV: Unable to read active package.", error);

      return null;
    }
  }

  function isPackageActive() {
    const pkg = getActivePackage();

    if (!pkg) {
      return false;
    }

    const expiry = Number(pkg.expiryDate);

    if (!Number.isFinite(expiry) || expiry <= Date.now()) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {}

      return false;
    }

    return true;
  }

  function getChannelLimit() {
    if (!isPackageActive()) {
      return 500;
    }

    const pkg = getActivePackage();

    return Math.max(1, Number(pkg.channels) || 500);
  }

  function canAccessChannel(index) {
    if (!isPackageActive()) {
      return false;
    }

    const channelIndex = Number(index);

    if (!Number.isInteger(channelIndex) || channelIndex < 0) {
      return false;
    }

    return channelIndex < getChannelLimit();
  }

  function savePackage(pkg) {
    if (!pkg) {
      return false;
    }

    const now = Date.now();

    const duration = Math.max(
      1,
      Number(pkg.duration) || Number(CONFIG.packageValidityDays) || 30,
    );

    const channels = Math.max(1, Number(pkg.channels) || 500);

    const packageData = {
      id: String(pkg.id || ""),

      name: String(pkg.name || `${channels.toLocaleString()} Channels`),

      channels,

      price: Number(pkg.price) || 0,

      currency: pkg.currency || CONFIG.currency || "USD",

      duration,

      activationDate: now,

      expiryDate: now + duration * 24 * 60 * 60 * 1000,

      activationType: pkg.activationType || "DEMO",
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(packageData));

      return true;
    } catch (error) {
      console.error("BTECH-TV: Could not save package.", error);

      return false;
    }
  }

  function clearPackage() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}
  }

  function getRemainingTime() {
    const pkg = getActivePackage();

    if (!pkg) {
      return 0;
    }

    return Math.max(0, Number(pkg.expiryDate) - Date.now());
  }

  function getRemainingDays() {
    return Math.ceil(getRemainingTime() / (24 * 60 * 60 * 1000));
  }

  window.BTECH_PACKAGE_ACCESS = Object.freeze({
    getActivePackage,

    isPackageActive,

    getChannelLimit,

    canAccessChannel,

    savePackage,

    clearPackage,

    getRemainingTime,

    getRemainingDays,
  });
})();
