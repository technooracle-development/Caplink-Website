/* ==========================================================================
   CapLink — site configuration
   --------------------------------------------------------------------------
   Change values here and every page picks them up automatically.
   Elements opt in with data attributes, e.g.
     <a data-config="CONTACT_EMAIL">…</a>        → text + mailto link
     <span data-config="PRIVACY_LAST_UPDATED">…</span>
     <a data-config-href="GOOGLE_PLAY_URL">…</a> → store link
   The HTML also contains the current values as a no-JavaScript fallback;
   see README.md ("Updating configuration") if you change them.
   ========================================================================== */
window.CAPLINK_CONFIG = Object.freeze({
  APP_NAME: "CapLink",
  TAGLINE: "Smart financial decisions",
  COMPANY_NAME: "TechnoOracle",
  CONTACT_EMAIL: "technooracleinfo@gmail.com",

  // Use "#" while a store listing is not live yet. Placeholder links are
  // handled gracefully (they show a "coming soon" note instead of navigating).
  GOOGLE_PLAY_URL: "#",
  IOS_URL: "#",

  PRIVACY_LAST_UPDATED: "October 2026",
  TERMS_LAST_UPDATED: "October 2026",
  DISCLAIMER_LAST_UPDATED: "October 2026",
  COPYRIGHT_YEAR: "2026"
});
