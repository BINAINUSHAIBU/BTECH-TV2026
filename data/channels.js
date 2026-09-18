/* =========================================================
   BTECH-TV WORLD PRO MAX
   data/channels.js
   ---------------------------------------------------------
   Unified channel data layer
   • One source of truth
   • No duplicate window.BTECH_CHANNEL_DATA
   • Streams are intentionally blank unless authorized
   • Compatible with country/category/language filters
   ========================================================= */

"use strict";

(function () {
  /* =======================================================
     CHANNEL DATA
     ======================================================= */

  const channels = [
    /* =========================
       NIGERIA
       ========================= */

    {
      id: "ng-news-001",
      name: "BTECH News Nigeria",
      country: "Nigeria",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "ng-sports-001",
      name: "BTECH Sports Nigeria",
      country: "Nigeria",
      category: "Sports",
      language: "English",
      logo: "logo.png",
      quality: "FHD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "ng-movies-001",
      name: "BTECH Movies Nigeria",
      country: "Nigeria",
      category: "Movies",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Offline",
      live: false,
      stream: "",
    },

    {
      id: "ng-music-001",
      name: "BTECH Music Nigeria",
      country: "Nigeria",
      category: "Music",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "ng-kids-001",
      name: "BTECH Kids Nigeria",
      country: "Nigeria",
      category: "Kids",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Offline",
      live: false,
      stream: "",
    },

    /* =========================
       USA
       ========================= */

    {
      id: "us-news-001",
      name: "BTECH News USA",
      country: "USA",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "us-sports-001",
      name: "BTECH Sports USA",
      country: "USA",
      category: "Sports",
      language: "English",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "us-movies-001",
      name: "BTECH Movies USA",
      country: "USA",
      category: "Movies",
      language: "English",
      logo: "logo.png",
      quality: "4K",
      premium: true,
      status: "Offline",
      live: false,
      stream: "",
    },

    {
      id: "us-music-001",
      name: "BTECH Music USA",
      country: "USA",
      category: "Music",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "us-documentary-001",
      name: "BTECH Documentary USA",
      country: "USA",
      category: "Documentary",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       UNITED KINGDOM
       ========================= */

    {
      id: "uk-news-001",
      name: "BTECH News UK",
      country: "UK",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "uk-sports-001",
      name: "BTECH Sports UK",
      country: "UK",
      category: "Sports",
      language: "English",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "uk-movies-001",
      name: "BTECH Movies UK",
      country: "UK",
      category: "Movies",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: true,
      status: "Offline",
      live: false,
      stream: "",
    },

    {
      id: "uk-business-001",
      name: "BTECH Business UK",
      country: "UK",
      category: "Business",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       INDIA
       ========================= */

    {
      id: "in-news-001",
      name: "BTECH News India",
      country: "India",
      category: "News",
      language: "Hindi",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "in-movies-001",
      name: "BTECH Movies India",
      country: "India",
      category: "Movies",
      language: "Hindi",
      logo: "logo.png",
      quality: "HD",
      premium: true,
      status: "Offline",
      live: false,
      stream: "",
    },

    {
      id: "in-music-001",
      name: "BTECH Music India",
      country: "India",
      category: "Music",
      language: "Hindi",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "in-sports-001",
      name: "BTECH Sports India",
      country: "India",
      category: "Sports",
      language: "Hindi",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       FRANCE
       ========================= */

    {
      id: "fr-news-001",
      name: "BTECH News France",
      country: "France",
      category: "News",
      language: "French",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "fr-movies-001",
      name: "BTECH Movies France",
      country: "France",
      category: "Movies",
      language: "French",
      logo: "logo.png",
      quality: "HD",
      premium: true,
      status: "Offline",
      live: false,
      stream: "",
    },

    {
      id: "fr-music-001",
      name: "BTECH Music France",
      country: "France",
      category: "Music",
      language: "French",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       GERMANY
       ========================= */

    {
      id: "de-news-001",
      name: "BTECH News Germany",
      country: "Germany",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "de-sports-001",
      name: "BTECH Sports Germany",
      country: "Germany",
      category: "Sports",
      language: "English",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "de-documentary-001",
      name: "BTECH Documentary Germany",
      country: "Germany",
      category: "Documentary",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Offline",
      live: false,
      stream: "",
    },

    /* =========================
       BRAZIL
       ========================= */

    {
      id: "br-news-001",
      name: "BTECH News Brazil",
      country: "Brazil",
      category: "News",
      language: "Portuguese",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "br-sports-001",
      name: "BTECH Sports Brazil",
      country: "Brazil",
      category: "Sports",
      language: "Portuguese",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "br-music-001",
      name: "BTECH Music Brazil",
      country: "Brazil",
      category: "Music",
      language: "Portuguese",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Offline",
      live: false,
      stream: "",
    },

    /* =========================
       SOUTH AFRICA
       ========================= */

    {
      id: "za-news-001",
      name: "BTECH News South Africa",
      country: "South Africa",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "za-sports-001",
      name: "BTECH Sports South Africa",
      country: "South Africa",
      category: "Sports",
      language: "English",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "za-movies-001",
      name: "BTECH Movies South Africa",
      country: "South Africa",
      category: "Movies",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: true,
      status: "Offline",
      live: false,
      stream: "",
    },

    /* =========================
       CANADA
       ========================= */

    {
      id: "ca-news-001",
      name: "BTECH News Canada",
      country: "Canada",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "ca-sports-001",
      name: "BTECH Sports Canada",
      country: "Canada",
      category: "Sports",
      language: "English",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       AUSTRALIA
       ========================= */

    {
      id: "au-news-001",
      name: "BTECH News Australia",
      country: "Australia",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "au-sports-001",
      name: "BTECH Sports Australia",
      country: "Australia",
      category: "Sports",
      language: "English",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       JAPAN
       ========================= */

    {
      id: "jp-news-001",
      name: "BTECH News Japan",
      country: "Japan",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "jp-movies-001",
      name: "BTECH Movies Japan",
      country: "Japan",
      category: "Movies",
      language: "English",
      logo: "logo.png",
      quality: "4K",
      premium: true,
      status: "Offline",
      live: false,
      stream: "",
    },

    /* =========================
       SOUTH KOREA
       ========================= */

    {
      id: "kr-news-001",
      name: "BTECH News South Korea",
      country: "South Korea",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "kr-music-001",
      name: "BTECH Music South Korea",
      country: "South Korea",
      category: "Music",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       CHINA
       ========================= */

    {
      id: "cn-news-001",
      name: "BTECH News China",
      country: "China",
      category: "News",
      language: "Chinese",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "cn-movies-001",
      name: "BTECH Movies China",
      country: "China",
      category: "Movies",
      language: "Chinese",
      logo: "logo.png",
      quality: "4K",
      premium: true,
      status: "Offline",
      live: false,
      stream: "",
    },

    /* =========================
       SPAIN
       ========================= */

    {
      id: "es-news-001",
      name: "BTECH News Spain",
      country: "Spain",
      category: "News",
      language: "Spanish",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "es-sports-001",
      name: "BTECH Sports Spain",
      country: "Spain",
      category: "Sports",
      language: "Spanish",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       ITALY
       ========================= */

    {
      id: "it-news-001",
      name: "BTECH News Italy",
      country: "Italy",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "it-sports-001",
      name: "BTECH Sports Italy",
      country: "Italy",
      category: "Sports",
      language: "English",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       TURKEY
       ========================= */

    {
      id: "tr-news-001",
      name: "BTECH News Turkey",
      country: "Turkey",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       MEXICO
       ========================= */

    {
      id: "mx-news-001",
      name: "BTECH News Mexico",
      country: "Mexico",
      category: "News",
      language: "Spanish",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "mx-movies-001",
      name: "BTECH Movies Mexico",
      country: "Mexico",
      category: "Movies",
      language: "Spanish",
      logo: "logo.png",
      quality: "HD",
      premium: true,
      status: "Offline",
      live: false,
      stream: "",
    },

    /* =========================
       UAE
       ========================= */

    {
      id: "ae-news-001",
      name: "BTECH News UAE",
      country: "UAE",
      category: "News",
      language: "Arabic",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "ae-business-001",
      name: "BTECH Business UAE",
      country: "UAE",
      category: "Business",
      language: "Arabic",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       SAUDI ARABIA
       ========================= */

    {
      id: "sa-news-001",
      name: "BTECH News Saudi Arabia",
      country: "Saudi Arabia",
      category: "News",
      language: "Arabic",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "sa-sports-001",
      name: "BTECH Sports Saudi Arabia",
      country: "Saudi Arabia",
      category: "Sports",
      language: "Arabic",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       EGYPT
       ========================= */

    {
      id: "eg-news-001",
      name: "BTECH News Egypt",
      country: "Egypt",
      category: "News",
      language: "Arabic",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       ARGENTINA
       ========================= */

    {
      id: "ar-news-001",
      name: "BTECH News Argentina",
      country: "Argentina",
      category: "News",
      language: "Spanish",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "ar-sports-001",
      name: "BTECH Sports Argentina",
      country: "Argentina",
      category: "Sports",
      language: "Spanish",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       PAKISTAN
       ========================= */

    {
      id: "pk-news-001",
      name: "BTECH News Pakistan",
      country: "Pakistan",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    {
      id: "pk-sports-001",
      name: "BTECH Sports Pakistan",
      country: "Pakistan",
      category: "Sports",
      language: "English",
      logo: "logo.png",
      quality: "FHD",
      premium: true,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       INDONESIA
       ========================= */

    {
      id: "id-news-001",
      name: "BTECH News Indonesia",
      country: "Indonesia",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       PHILIPPINES
       ========================= */

    {
      id: "ph-news-001",
      name: "BTECH News Philippines",
      country: "Philippines",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },

    /* =========================
       ALBANIA
       ========================= */

    {
      id: "al-news-001",
      name: "BTECH News Albania",
      country: "Albania",
      category: "News",
      language: "English",
      logo: "logo.png",
      quality: "HD",
      premium: false,
      status: "Online",
      live: true,
      stream: "",
    },
  ];

  /* =======================================================
     FREEZE CHANNEL OBJECTS
     ======================================================= */

  channels.forEach(function (channel) {
    Object.freeze(channel);
  });

  /* =======================================================
     PRIMARY GLOBAL DATA SOURCE
     ======================================================= */

  window.BTECH_CHANNEL_DATA = Object.freeze(channels);

  /* =======================================================
     COUNTRY DATA
     ======================================================= */

  window.BTECH_COUNTRIES = Object.freeze([
    ["ng", "Nigeria", "🇳🇬"],
    ["us", "USA", "🇺🇸"],
    ["uk", "UK", "🇬🇧"],
    ["in", "India", "🇮🇳"],
    ["fr", "France", "🇫🇷"],
    ["de", "Germany", "🇩🇪"],
    ["br", "Brazil", "🇧🇷"],
    ["za", "South Africa", "🇿🇦"],
    ["ca", "Canada", "🇨🇦"],
    ["au", "Australia", "🇦🇺"],
    ["jp", "Japan", "🇯🇵"],
    ["kr", "South Korea", "🇰🇷"],
    ["cn", "China", "🇨🇳"],
    ["es", "Spain", "🇪🇸"],
    ["it", "Italy", "🇮🇹"],
    ["tr", "Turkey", "🇹🇷"],
    ["mx", "Mexico", "🇲🇽"],
    ["ae", "UAE", "🇦🇪"],
    ["sa", "Saudi Arabia", "🇸🇦"],
    ["eg", "Egypt", "🇪🇬"],
    ["ar", "Argentina", "🇦🇷"],
    ["pk", "Pakistan", "🇵🇰"],
    ["id", "Indonesia", "🇮🇩"],
    ["ph", "Philippines", "🇵🇭"],
    ["al", "Albania", "🇦🇱"],
  ]);

  /* =======================================================
     CATEGORY DATA
     ======================================================= */

  window.BTECH_CATEGORIES = Object.freeze([
    ["news", "News", "📰"],
    ["sports", "Sports", "⚽"],
    ["movies", "Movies", "🎬"],
    ["music", "Music", "🎵"],
    ["kids", "Kids", "👶"],
    ["comedy", "Comedy", "😂"],
    ["documentary", "Documentary", "📚"],
    ["business", "Business", "💼"],
    ["science", "Science", "🔬"],
    ["travel", "Travel", "✈️"],
  ]);

  /* =======================================================
     LANGUAGE DATA
     ======================================================= */

  window.BTECH_LANGUAGES = Object.freeze([
    ["eng", "English", "🇬🇧"],
    ["spa", "Spanish", "🇪🇸"],
    ["ara", "Arabic", "🇸🇦"],
    ["fra", "French", "🇫🇷"],
    ["hin", "Hindi", "🇮🇳"],
    ["zho", "Chinese", "🇨🇳"],
    ["por", "Portuguese", "🇵🇹"],
  ]);

  /* =======================================================
     AUTOMATIC DATA METADATA
     ======================================================= */

  window.BTECH_CHANNEL_DATA_INFO = Object.freeze({
    total: channels.length,

    live: channels.filter(function (channel) {
      return channel.live === true;
    }).length,

    offline: channels.filter(function (channel) {
      return channel.live !== true;
    }).length,

    premium: channels.filter(function (channel) {
      return channel.premium === true;
    }).length,

    free: channels.filter(function (channel) {
      return channel.premium !== true;
    }).length,

    countries: [
      ...new Set(
        channels.map(function (channel) {
          return channel.country;
        }),
      ),
    ],

    categories: [
      ...new Set(
        channels.map(function (channel) {
          return channel.category;
        }),
      ),
    ],

    languages: [
      ...new Set(
        channels.map(function (channel) {
          return channel.language;
        }),
      ),
    ],
  });

  /* =======================================================
     OPTIONAL LOOKUP HELPERS
     ======================================================= */

  window.BTECH_CHANNEL_FIND = function (id) {
    return (
      channels.find(function (channel) {
        return String(channel.id) === String(id);
      }) || null
    );
  };

  window.BTECH_CHANNELS_BY_COUNTRY = function (country) {
    return channels.filter(function (channel) {
      return channel.country === country;
    });
  };

  window.BTECH_CHANNELS_BY_CATEGORY = function (category) {
    return channels.filter(function (channel) {
      return channel.category === category;
    });
  };

  window.BTECH_CHANNELS_BY_LANGUAGE = function (language) {
    return channels.filter(function (channel) {
      return channel.language === language;
    });
  };

  /* =======================================================
     DATA READY
     ======================================================= */

  console.info("[BTECH-TV] Channel data loaded:", channels.length, "channels");
})();
