const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {

  eleventyConfig.setLibrary('md', markdownIt({html: true, breaks: true, linkify: true}));
  eleventyConfig.addFilter('removeExtension', function (url) {
    const extension = path.extname(url);
    return url.substring(0, url.length - extension.length);
  });
  eleventyConfig.addPassthroughCopy({
    'node_modules/playground-elements/typescript-worker.js':
      './js/typescript-worker.js',
  });
  eleventyConfig.addPassthroughCopy({
    'node_modules/playground-elements/service-worker.js': './js/service-worker.js',
  });

  return {
    dir: {input: 'docs-src', output: 'docs'},
    htmlTemplateEngine: 'njk',
  };
};