"use strict";

(function () {
  function getActivePackage() {
    try {
      const saved = localStorage.getItem("btech_active_package");

      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
  }

  function getChannelLimit() {
    const activePackage = getActivePackage();

    if (!activePackage) {
      return 500;
    }

    return Number(activePackage.channels) || 500;
  }

  function canAccessChannel(index) {
    const limit = getChannelLimit();

    return index < limit;
  }

  function savePackage(pkg) {
    if (!pkg) {
      return;
    }

    const activationDate = Date.now();

    const expiryDate =
      activationDate + (pkg.duration || 30) * 24 * 60 * 60 * 1000;

    const packageData = {
      id: pkg.id,

      name: pkg.name,

      channels: pkg.channels,

      activationDate,

      expiryDate,
    };

    localStorage.setItem("btech_active_package", JSON.stringify(packageData));
  }

  function isPackageActive() {
    const pkg = getActivePackage();

    if (!pkg) {
      return false;
    }

    if (Date.now() > Number(pkg.expiryDate)) {
      localStorage.removeItem("btech_active_package");

      return false;
    }

    return true;
  }

  window.BTECH_PACKAGE_ACCESS = Object.freeze({
    getActivePackage,

    getChannelLimit,

    canAccessChannel,

    savePackage,

    isPackageActive,
  });
})();
