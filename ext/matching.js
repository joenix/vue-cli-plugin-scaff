// Use Kit
const { deep, foreach, trim } = require("./kit");

/**
 * Matching Template
 * @param template {json}
 * @param matcher {json}
 * ======== ======== ========
 */
function matching(template, matcher) {
  // Grammer
  const grammer = /\{\{(.*)\}\}/g;

  // Deep
  deep(template, peak => {
    // Foreach
    foreach(peak, (value, key) => {
      // Check
      if (!grammer.test(value)) {
        return;
      }
      // Replace
      value = value.replace(grammer, ($0, $1) => {
        // Get Trim Holder
        const holder = trim($1);
        // Instead
        return matcher[holder] === undefined ? $1 : `'${matcher[holder]}'`;
      });

      // Assignment
      try {
        peak[key] = eval(value);
      } catch (e) {
        console.error(e);
      }
    });
  });
}

// Export
module.exports = matching;
