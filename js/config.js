"use strict";

window.BTECH_CONFIG = Object.freeze({
  appName: "BTECH-TV PRO MAX",
  subtitle: "Ultra BTECH-TV World Engine X",

  trialSeconds: 180,

  packageValidityDays: 30,

  currency: "USD",

  maxChannels: 16000,

  feedTimeout: 20000,

  maxFeedBytes: 25 * 1024 * 1024,

  iptvBase: "https://iptv-org.github.io/iptv",

  feeds: {
    country: (code) =>
      `https://iptv-org.github.io/iptv/countries/${encodeURIComponent(code)}.m3u`,

    category: (code) =>
      `https://iptv-org.github.io/iptv/categories/${encodeURIComponent(code)}.m3u`,

    language: (code) =>
      `https://iptv-org.github.io/iptv/languages/${encodeURIComponent(code)}.m3u`,

    ultra: () => "https://iptv-org.github.io/iptv/index.m3u",
  },

  allowedFeedHosts: ["iptv-org.github.io"],

  storage: {
    trial: "btech_tv_trial_v5",
    subscription: "btech_tv_subscription_v5",
    activePackage: "btech_active_package",
    favorites: "btech_tv_favorites",
    recents: "btech_tv_recents",
  },

  packages: [
    { id: "500", channels: 500, price: 5, name: "Starter" },
    { id: "1000", channels: 1000, price: 10, name: "Compact" },
    { id: "1500", channels: 1500, price: 15, name: "Standard" },
    { id: "2000", channels: 2000, price: 20, name: "Plus" },
    { id: "2500", channels: 2500, price: 25, name: "Advanced" },
    { id: "3000", channels: 3000, price: 30, name: "Premium" },
    { id: "3500", channels: 3500, price: 35, name: "BTECH-TV 3500" },
    { id: "4000", channels: 4000, price: 40, name: "Premium Plus" },
    { id: "4500", channels: 4500, price: 45, name: "BTECH-TV 4500" },
    { id: "5000", channels: 5000, price: 50, name: "BTECH-TV 5000" },
    { id: "5500", channels: 5500, price: 55, name: "Super BTECH-TV 5500" },
    { id: "6000", channels: 6000, price: 60, name: "Super Plus" },
    { id: "6500", channels: 6500, price: 65, name: "BTECH-TV 6500" },
    { id: "7000", channels: 7000, price: 70, name: "BTECH-TV 7000" },
    { id: "7500", channels: 7500, price: 75, name: "BTECH-TV 7500" },
    { id: "8000", channels: 8000, price: 80, name: "Ultra" },
    { id: "8500", channels: 8500, price: 85, name: "BTECH-TV 8500" },
    { id: "9000", channels: 9000, price: 90, name: "BTECH-TV 9000" },
    { id: "9500", channels: 9500, price: 95, name: "BTECH-TV 9500" },
    { id: "10000", channels: 10000, price: 100, name: "Ultra Plus" },
    { id: "10500", channels: 10500, price: 105, name: "BTECH-TV 10500" },
    { id: "11000", channels: 11000, price: 110, name: "BTECH-TV 11000" },
    { id: "11500", channels: 11500, price: 115, name: "BTECH-TV 11500" },
    { id: "12000", channels: 12000, price: 120, name: "Ultra Max" },
    { id: "12500", channels: 12500, price: 125, name: "BTECH-TV 12500" },
    { id: "13000", channels: 13000, price: 134.99, name: "BTECH-TV 13000" },
    { id: "13500", channels: 13500, price: 139.99, name: "BTECH-TV 13500" },
    { id: "14000", channels: 14000, price: 144.99, name: "Super Premium" },
    { id: "14500", channels: 14500, price: 149.99, name: "BTECH-TV 14500" },
    { id: "15000", channels: 15000, price: 154.99, name: "Super Premium Plus" },
    { id: "15500", channels: 15500, price: 159.99, name: "BTECH-TV 15500" },
    { id: "16000", channels: 16000, price: 164.99, name: "Ultimate Sports" },
  ],
});
