import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'docs-src/js/main.js',
  output: {
    file: 'docs/js/main.bundled.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    resolve({
    }),
  ],
};
