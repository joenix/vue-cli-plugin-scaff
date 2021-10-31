// Use Check Presence
const { presence } = require("./concert");

// Get RC
const rc = presence(`/vuescaffrc.js`);

// Get Injection
const injection = presence(`/injection.json`);

// Export
module.exports = { rc, injection };
