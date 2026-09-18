"use strict";

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (window.BTECH_UI?.buildMenus) {
      window.BTECH_UI.buildMenus();
    }

    if (
      Array.isArray(window.BTECH_CHANNEL_DATA) &&
      window.BTECH_CHANNEL_DATA.length &&
      typeof window.setChannels === "function"
    ) {
      window.setChannels(window.BTECH_CHANNEL_DATA);
    }

    if (typeof window.play === "function") {
      window.play(0);
    }

    const searchInput = document.getElementById("channelSearchInput");

    if (searchInput && typeof window.search === "function") {
      searchInput.addEventListener("input", (event) => {
        window.search(event.target.value);
      });
    }

    console.log("BTECH-TV WORLD PRO MAX started successfully.");
  } catch (error) {
    console.error("BTECH-TV startup error:", error);
  }
});
