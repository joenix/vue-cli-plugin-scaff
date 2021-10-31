// Path
const path = require("path");

// Fs
const fs = require("fs");

// Root
const root = process.cwd();

// Main
const main = `${root}/node_modules/@scaff/vue-cli-scaff/src/entry.js`;

// Export
module.exports = { path, fs, root, main };
