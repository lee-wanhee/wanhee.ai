const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const katex = require("@vscode/markdown-it-katex").default;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // Markdown with build-time KaTeX ($ inline, $$ block) — renders math at build
  // and shields delimiters from markdown emphasis parsing.
  const md = markdownIt({ html: true, linkify: true, typographer: true }).use(katex);
  eleventyConfig.setLibrary("md", md);

  // static assets
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("CNAME");

  // newest-first posts
  eleventyConfig.addCollection("posts", (c) =>
    c.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  // book chapters in reading order
  eleventyConfig.addCollection("chapters", (c) =>
    c.getFilteredByGlob("src/book/chapters/*.md").sort((a, b) => a.data.order - b.data.order)
  );

  // current year for the footer copyright (evaluated at build time)
  eleventyConfig.addGlobalData("year", () => new Date().getFullYear());

  // "July 8, 2026"
  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  // ~N min read from rendered HTML
  eleventyConfig.addFilter("readingTime", (html) => {
    const words = String(html || "")
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
