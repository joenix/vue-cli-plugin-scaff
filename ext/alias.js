// Use Foreach
const { foreach } = require("./kit");

/**
 * Alias Map
 * @param target {object}
 * @param configure {json}
 * ======== ======== ========
 */
function alias(target, configure) {
  if (target.store) {
		// Registry
    target.store.set(`@registry`, `@/registry`);

		// Configure
    foreach(configure, (value, key) => {
      if (value === false) {
        return;
      }
      target.store.set(`@${key}`, value.context);
    });
  }
}

// Export
module.exports = alias;
