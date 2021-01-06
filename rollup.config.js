import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'site/js/main.js',
  output: {
    file: '_site/js/main.bundled.js',
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
