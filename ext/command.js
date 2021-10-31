// Use Foreach
const { foreach } = require("./kit");

// Set Regulation
let exp = regulation("--");

/**
 * Test RegExp
 * ======== ======== ========
 */
function test(value) {
  return new RegExp(exp).test(value);
}

/**
 * Setup RegExp
 * ======== ======== ========
 */
function regulation(exp) {
  // return `^${exp.replace(/\S/g, $0 => `${$0}?`)}`;
  return `^${exp}`;
}

/**
 * Parameter Processing
 * ======== ======== ========
 */
function processing(argv) {
  return argv.replace(new RegExp(exp), "");
}

/**
 * Parameter Tear
 * ======== ======== ========
 */
function tear(argv) {
  // Set Key => Value
  let key, value;

  // Is Key-Value
  if (/\=/.test(argv)) {
    let temp = argv.split("=");
    (key = processing(temp[0])), (value = temp[1]);
  }
  // Is Value
  else {
    (key = argv), (value = true);
  }

  // Return Json
  return {
    [key]: value
  };
}

/**
 * Factory Argvs
 * ======== ======== ========
 */
function factory(argvs) {
  // Set Result
  let result = {};
  // Loops
  foreach(argvs, argv => {
    // Only Match Mod
    if (test(argv)) {
      Object.assign(result, tear(argv));
    }
  });
  // Return
  return result;
}

/**
 * Get Command From Argv
 * ======== ======== ========
 */
function getCommandFromArgv() {
  // Get Argvs
  let argvs = process.argv.slice(2);
  // Return
  return factory(argvs);
}

/**
 * Get Command From Line
 * ======== ======== ========
 */
function getCommandFromLine() {
  // Get Argv
  let argvs = JSON.parse(process.env.npm_config_argv).original;
  // Return
  return factory(argvs);
}

/**
 * Get Command From Script
 * ======== ======== ========
 */
function getCommandFromScript() {
  // Get Argv
  let argvs = (
    process.env.npm_package_scripts_serve || process.env.npm_lifecycle_script
  ).split(" ");
  // Return
  return factory(argvs);
}

/**
 * Get Command
 * ======== ======== ========
 */
function getArgv(mod) {
  // Set Exp
  exp = regulation(mod);

  // Touch Argv
  if (process.argv) {
    return getCommandFromArgv();
  }

  // Another
  return {
    ...getCommandFromScript(),
    ...getCommandFromLine()
  };
}

// Export
module.exports = {
  getArgv,
  argvs: getArgv("--")
};
