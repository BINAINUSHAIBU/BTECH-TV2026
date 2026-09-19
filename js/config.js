"use strict";

window.BTECH_CONFIG = Object.freeze({
  appName: "BTECH-TV PRO MAX",
  subtitle: "Ultra BTECH-TV World Engine X",

  trialSeconds: 180,

  packageValidityDays: 30,

  currency: "USD",

  maxChannels: 100000,

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
    { id: "500", channels: 500, price: 5 },
    { id: "1000", channels: 1000, price: 10 },
    { id: "1500", channels: 1500, price: 15 },
    { id: "2000", channels: 2000, price: 20 },
    { id: "2500", channels: 2500, price: 25 },
    { id: "3000", channels: 3000, price: 30 },
    { id: "3500", channels: 3500, price: 35 },
    { id: "4000", channels: 4000, price: 40 },
    { id: "4500", channels: 4500, price: 45 },
    { id: "5000", channels: 5000, price: 50 },
    { id: "5500", channels: 5500, price: 55 },
    { id: "6000", channels: 6000, price: 60 },
    { id: "6500", channels: 6500, price: 65 },
    { id: "7000", channels: 7000, price: 70 },
    { id: "7500", channels: 7500, price: 75 },
    { id: "8000", channels: 8000, price: 80 },
    { id: "8500", channels: 8500, price: 85 },
    { id: "9000", channels: 9000, price: 90 },
    { id: "9500", channels: 9500, price: 95 },
    { id: "10000", channels: 10000, price: 100 },
    { id: "10500", channels: 10500, price: 105 },
    { id: "11000", channels: 11000, price: 110 },
    { id: "11500", channels: 11500, price: 115 },
    { id: "12000", channels: 12000, price: 120 },
    { id: "13000", channels: 13000, price: 134.99 },
    { id: "100000", channels: 100000, price: 999.99 },
  ],
});
