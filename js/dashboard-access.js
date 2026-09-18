/* BTECH-TV WORLD PRO MAX — activated package dashboard guard */
(function () {
  "use strict";
  var path = location.pathname || "";
  var m = path.match(/\/index-(\d+)\.html(?:$|[?#])/i);
  if (!m) return;
  var current = Number(m[1]);
  var ACTIVE_KEY = "btech_active_package";
  var SUB_KEY = "btech_tv_subscription_v5";
  var LEGACY_SUB_KEY = "btech_tv_subscription";

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (_) { return null; }
  }
  function getActive() {
    return read(ACTIVE_KEY) || read(SUB_KEY) || read(LEGACY_SUB_KEY);
  }
  function clear() {
    [ACTIVE_KEY, SUB_KEY, LEGACY_SUB_KEY, "btech_tv_premium", "btech_tv_package", "btech_tv_channel_limit"].forEach(function (k) {
      try { localStorage.removeItem(k); } catch (_) {}
    });
  }
  function goTrial(expired) {
    location.replace("../index2_trial.html" + (expired ? "?subscription=expired" : ""));
  }
  function guard() {
    var pkg = getActive();
    if (!pkg) { goTrial(false); return; }
    var channels = Number(pkg.channels || pkg.channelLimit || 0);
    var expiry = Number(pkg.expiryDate || pkg.expiresAt || 0);
    if (!channels || !expiry || expiry <= Date.now()) {
      clear();
      goTrial(true);
      return;
    }
    if (channels !== current) {
      location.replace("index-" + channels + ".html");
      return;
    }
    document.documentElement.setAttribute("data-btech-package-active", "true");
    document.documentElement.setAttribute("data-btech-channel-limit", String(channels));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", guard, { once: true });
  else guard();
})();
