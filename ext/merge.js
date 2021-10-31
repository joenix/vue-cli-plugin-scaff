// Preset
const preset = {
  util: {
    context: `@/utils`,
    suffix: /.js$/
  },
  route: {
    context: `@/pages`,
    suffix: /\S+\/route.js$/
  },
  store: {
    context: `@/pages`,
    suffix: /\S+\/store.js$/
  },
  component: {
    context: `@/components`,
    suffix: /.vue$/
  },
  filter: {
    context: `@/filters`,
    suffix: /.js$/
  },
  directive: {
    context: `@/directives`,
    suffix: /.js$/
  },
  style: {
    context: `@/sheet`,
    suffix: /variables.scss$/
  },
  i18n: {
    context: `@/i18n`,
    suffix: /.js$/
  }
};

// Use Foreach
const { foreach } = require("./kit");

/**
 * Merge
 * @param origin {json}
 * ======== ======== ========
 */
function merge(origin) {
  // Foreach
  foreach(preset, (item, key) => {
    // Compare
    if (origin[key] === undefined) {
      // Set Item
      return (origin[key] = item);
    }
    // Context
    if (origin[key].context === undefined) {
      // Set Property
      origin[key].context = item.context;
    }
    // Suffix
    if (origin[key].suffix === undefined) {
      // Set Property
      origin[key].suffix = item.suffix;
    }
  });
  // Return
  return origin;
}

// Export
module.exports = merge;
