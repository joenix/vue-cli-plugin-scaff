// Use Inf
const { path, fs, root } = require("./inf");

/**
 * Path Resolve
 * @param dir {string}
 * ======== ======== ========
 */
function resolve(dir) {
  return path.join(__dirname, dir);
}

/**
 * Check Presence
 * @param path {string}
 * ======== ======== ========
 */
function presence(path, must) {
  return fs.existsSync(`${root}${path}`)
    ? require(`${root}${path}`)
    : must === true
    ? null
    : {};
}

// Export
module.exports = { resolve, presence };
