// Use Wrapper
const { wrapper } = require("./kit");

/**
 * Set Defaulter
 * @param argvs {json}
 * ======== ======== ========
 */
function defer(argvs) {
  // Environ
  if (argvs.mode === undefined) {
    argvs.mode = wrapper(e => e.npm_config_env || e.NODE_ENV || "development");
  }

  // Platform
  if (argvs.plat === undefined) {
    argvs.plat = wrapper(e => e.VUE_APP_PLATFORM || "browser");
  }

  // Return
  return argvs;
}

// Export
module.exports = defer;
