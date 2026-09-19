"use strict";

(function () {
  const CONFIG = window.BTECH_CONFIG;

  if (!CONFIG) {
    console.error("BTECH-TV: BTECH_CONFIG unavailable.");
    return;
  }

  const STORAGE_KEY = CONFIG.storage?.trial || "btech_tv_trial_v5";

  let timer = null;
  let endTime = 0;
  let expired = false;

  function getTimerElement() {
    return (
      document.getElementById("trialTimer") ||
      document.getElementById("dashboardTrialTimer")
    );
  }

  function formatTime(seconds) {
    seconds = Math.max(0, Math.floor(seconds));

    const minutes = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return (
      String(minutes).padStart(2, "0") + ":" + String(secs).padStart(2, "0")
    );
  }

  function updateDisplay(seconds) {
    const element = getTimerElement();

    if (!element) {
      return;
    }

    const counter = element.querySelector("strong");

    const formatted = formatTime(seconds);

    if (counter) {
      counter.textContent = formatted;
    } else {
      element.textContent = "FREE TRIAL " + formatted;
    }
  }

  function saveTimer() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          endTime,
          expired,
        }),
      );
    } catch (_) {}
  }

  function loadTimer() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return false;
      }

      const data = JSON.parse(saved);

      if (!data || !Number.isFinite(Number(data.endTime))) {
        return false;
      }

      endTime = Number(data.endTime);

      expired = Boolean(data.expired);

      return true;
    } catch (_) {
      return false;
    }
  }

  function createTimer() {
    const seconds = Math.max(0, Number(CONFIG.trialSeconds) || 0);

    endTime = Date.now() + seconds * 1000;

    expired = false;

    saveTimer();
  }

  function showPackageSelector() {
    document.body.classList.add("package-selection-active");

    // New checkout replaces the old package selector overlay.
    if (typeof window.openPackageCheckout === "function") {
      window.openPackageCheckout();
      return;
    }

    if (typeof window.openPackageSelector === "function") {
      window.openPackageSelector();
    }
  }

  function expireTrial() {
    if (expired) {
      return;
    }

    expired = true;

    updateDisplay(0);

    saveTimer();

    if (timer !== null) {
      clearInterval(timer);

      timer = null;
    }

    showPackageSelector();

    console.log("BTECH-TV: Free trial expired.");
  }

  function tick() {
    if (expired) {
      updateDisplay(0);

      return;
    }

    const remaining = Math.ceil((endTime - Date.now()) / 1000);

    if (remaining <= 0) {
      expireTrial();

      return;
    }

    updateDisplay(remaining);
  }

  function startTimer() {
    if (window.BTECH_PACKAGE_ACCESS &&
        typeof window.BTECH_PACKAGE_ACCESS.isPackageActive === "function" &&
        window.BTECH_PACKAGE_ACCESS.isPackageActive()) {
      updateDisplay(0);
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
      return;
    }
    if (timer !== null) {
      clearInterval(timer);
    }

    const trialSeconds = Number(CONFIG.trialSeconds) || 0;

    if (trialSeconds <= 0) {
      updateDisplay(0);

      expireTrial();

      return;
    }

    const restored = loadTimer();

    if (!restored) {
      createTimer();
    }

    if (expired) {
      updateDisplay(0);

      showPackageSelector();

      return;
    }

    tick();

    timer = setInterval(tick, 250);
  }

  function resetTimer() {
    if (timer !== null) {
      clearInterval(timer);

      timer = null;
    }

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (_) {}

    endTime = 0;

    expired = false;

    startTimer();
  }

  window.BTECH_TRIAL = {
    start: startTimer,

    stop: function () {
      if (timer !== null) {
        clearInterval(timer);

        timer = null;
      }
    },

    reset: resetTimer,

    getRemaining: function () {
      if (expired) {
        return 0;
      }

      return Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    },

    isExpired: function () {
      return expired;
    },
  };

  function initialize() {
    startTimer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
