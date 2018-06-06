const { createMacro, MacroError } = require("babel-plugin-macros");
const { minify: emotion_minify } = require("./lib/minify");

const minify = (() => {
  const cache = {};
  return (css, is_head, is_tail) => {
    const key = css + is_head + is_tail;
    if (cache[key]) {
      return cache[key];
    }
    let minified = emotion_minify(css);
    if (is_head) {
      minified = minified.replace(/^\s*/, "");
    } else if (!!css.match(/^\s+/)) {
      minified = minified.replace(/^\s*/, " ");
    }
    if (is_tail) {
      minified = minified.replace(/\s*$/, "");
    } else if (!!css.match(/\s+$/)) {
      minified = minified.replace(/\s*$/, " ");
    }
    cache[key] = minified;
    return minified;
  };
})();

const is_production = process.env.NODE_ENV === "production";

function macro({ references, state, babel }) {
  const t = babel.types;
  references.default.forEach(Identifier => {
    const TaggedTemplateExpression = Identifier.parentPath;
    const clone = TaggedTemplateExpression.node.quasi.__clone();
    if (is_production) {
      const length = clone.quasis.length;
      clone.quasis.forEach((it, idx) => {
        const minified = minify(it.value.raw, idx === 0, idx + 1 === length);
        it.value.raw = minified;
        it.value.cooked = minified;
      });
    }
    TaggedTemplateExpression.replaceWith(clone);
  });
}

module.exports = createMacro(macro);
