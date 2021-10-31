// Use Share Utils
const {
  log,
  info,
  done,
  warn,
  error,
  clearConsole,
  exit
} = require("@vue/cli-shared-utils");

// Use Pretty World
const {
  inf,
  command,
  concert,
  preset,
  defer,
  merge,
  alias,
  rem,
  matching,
  kit,
  mock
} = require("./ext");

// Use Root
const { path, fs, root, main } = inf;

// Use Argvs
const { argvs } = command;

// Use Presence
const { resolve } = concert;

// Use Preset
const { rc, injection } = preset;

// Use Kit
const { assign, toStringify, tolerance } = kit;

// Argvs overwrite NODE_ENV must before at Vue
process.env.NODE_ENV = "production";

// Coverage
if (argvs.mode) {
  process.env.NODE_ENV = argvs.mode;
}

// Matching
matching(injection, {
  NODE_ENV: process.env.NODE_ENV
});

// Assigning Injection to `process` before aVue Life
assign(process, injection, "injection");

// Prevent Accident
merge(rc.extract);

// into Vue Cli Lifecycle
module.exports = (api, options, rootOptions) => {
  // Merge User Config 2 Project Options
  assign(api.service.projectOptions, rc);

  // Set Mock Server
  if (rc.mock === true) {
    options.devServer.before = mock;
  }

  // Set px2rem
  if (rc.px2rem) {
    // Tolerance - 1
    options.css.loaderOptions.postcss = tolerance(
      options.css.loaderOptions.postcss,
      undefined,
      {}
    );

    // Tolerance - 2
    options.css.loaderOptions.postcss.plugins = tolerance(
      options.css.loaderOptions.postcss.plugins,
      undefined,
      []
    );

    options.css.loaderOptions.postcss.plugins = [
      ...options.css.loaderOptions.postcss.plugins,
      rem({ rootValue: rc.px2rem })
    ];
  }

  // Set Tolerant Rant
  rc.rant = rc.rant || {};

  // Configure Webpack
  api.configureWebpack(webpackConfig => {
    // Set Entry in `@scaff/vue-cli-scaff`
    webpackConfig.entry.app = main;
  });

  // Chain Webpack
  api.chainWebpack(webpackConfig => {
    // Set Defer in Vue
    defer(argvs);

    // Set Context Alias
    alias(webpackConfig.resolve.alias, rc.extract);

    // Set Projects Path -- Demise # for Other Proj
    webpackConfig.resolve.alias.store.set(`#projects`, fs.existsSync(`${root}/projects`) ? `${root}/projects` : `${root}/node_modules/@scaff/vue-cli-scaff/src`);

    // Argvs + Injection + Rc
    let parameter = toStringify({
      ...argvs,
      ...injection,
      rc
    });

    // Injection
    webpackConfig.plugin("define").tap(
      // Definitions
      definitions => {
        // Extension in Vue Life
        assign(definitions[0]["process.env"], parameter);
        // Return
        return definitions;
      }
    );
  });
};
