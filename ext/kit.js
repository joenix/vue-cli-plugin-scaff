/**
 * Foreach
 * @param source {json}
 * @param callback {function}
 * ======== ======== ========
 */
function foreach(source, callback = () => {}) {
  // No Source
  if (source === undefined) {
    return console.error("please enter param.");
  }
  // No Call
  if (callback.constructor !== Function) {
    return console.error("callback must function.");
  }
  // Array
  if (source.constructor === Array) {
    return source.map((value, index) => callback(value, index));
  }
  // Any (Json)
  return Object.keys(source).map(key => callback(source[key], key));
}

/**
 * Assigning
 * @param origin {object}
 * @param target {object}
 * ======== ======== ========
 */

function assign(origin, target, reserve) {
  // Reserve
  if (reserve) {
    origin[reserve] = target;
  }
  // Merge
  else {
    Object.assign(origin, target);
  }

  // Return
  return origin;
}

/**
 * Trim
 * @param value {string}
 * ======== ======== ========
 */
function trim(value) {
  return value.replace(/^\s+|\s+$/g, "");
}

/**
 * Check
 * @param value {any}
 * @param mode {any}
 * ======== ======== ========
 */
function check(value, mode = Object) {
  return value && value.constructor === mode;
}

/**
 * Deep
 * @param source {json}
 * @param callback {function}
 * ======== ======== ========
 */
function deep(source, callback) {
  // Check
  if (check(source)) {
    // Recursion
    foreach(source, value => deep(value, callback));
    // Factory
    source = callback(source);
  }
}

/**
 * To Stringify
 * @param conf {json}
 * ======== ======== ========
 */
function toStringify(conf = {}) {
  // Machining
  deep(conf, json =>
    // Foreach
    foreach(json, (item, index) => {
      // No Support Type
      if (![String, Number].includes(item.constructor)) {
        return;
      }
      // Already Has
      if (/^['"](.*)['"]$/.test(item)) {
        return;
      }
      // Add Quote
      json[index] = `"${item}"`;
    })
  );

  // Return
  return conf;
}

/**
 * Wrapper
 * @param fn {function}
 * ======== ======== ========
 */
function wrapper(fn) {
  return `"${fn(process.env)}"`;
}

/**
 * Tolerance
 * @param target {any}
 * @param condition {type}
 * ======== ======== ========
 */
function tolerance(origin, condition, target) {
  if (condition === undefined) {
    return (origin = target), origin;
  }

  if (typeof origin !== condition) {
    return (origin = target), origin;
  }
}

// Export
module.exports = {
  foreach,
  assign,
  trim,
  check,
  deep,
  toStringify,
  wrapper,
  tolerance
};
