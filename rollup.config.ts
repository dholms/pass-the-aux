import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
// import polyfills from 'rollup-plugin-node-polyfills'
import typescript from 'rollup-plugin-typescript2'

// Require understands JSON files.
const input = 'src/server/index.ts'

// For importing modules with `this` at the top level:
// https://github.com/WebReflection/hyperHTML/issues/304#issuecomment-443950244
const context = 'null'

// External dependencies tell Rollup "it's ok that you can't resolve these modules;
// don't try to bundle them but rather leave their import statements in place"
const external = []

const plugins = [
  // Allow json resolution
  json(),

  // Compile TypeScript files
  typescript({ useTsconfigDeclarationDir: true }),

  // // Let's transpile our own ES6 code into ES5
  babel({ exclude: 'node_modules/**' }),

  // Most packages in node_modules are legacy CommonJS, so let's convert them to ES
  commonjs(),

  // Polyfills for node builtins/globals
  // polyfills(),
]

// CommonJS (for Node) and ES module (for bundlers) build.
// (We could have three entries in the configuration array
// instead of two, but it's quicker to generate multiple
// builds from a single configuration where possible, using
// an array for the `output` option, where we can specify
// `file` and `format` for each target)
const configCjsAndEs = {
  input,
  output: {
    file: `build/index.js`,
    format: 'cjs',
  },
  plugins,
  external,
  context
}

export default configCjsAndEs



