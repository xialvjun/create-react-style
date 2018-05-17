// import { createMacro } from 'babel-plugin-macros'

// export default createMacro(macro);

// function macro({ references, state, babel: { types: t } }) {
//   console.log(arguments);
//   throw 'macro error';
// }
const { createMacro, MacroError } = require("babel-plugin-macros");
const fs = require("fs");
const path = require("path");
// `createMacro` is simply a function that ensures your macro is only
// called in the context of a babel transpilation and will throw an
// error with a helpful message if someone does not have babel-plugin-macros
// configured correctly
module.exports = createMacro(myMacro);


function myMacro({ references, state, babel }) {
  // state is the second argument you're passed to a visitor in a
  // normal babel plugin. `babel` is the `babel-plugin-macros` module.
  // do whatever you like to the AST paths you find in `references`
  // read more below...
  // fs.writeFileSync(path.join(__dirname, '../macrot.txt'), JSON.stringify({references, state, babel}), { encoding: 'utf-8' })
  console.log(12312421);
  console.log(12312421);
  console.log(12312421);
  console.log(references);
  console.log(12312421);
  console.log(12312421);
  console.log(12312421);
  throw new MacroError("asdfsdf");
  // const args = arguments;
  // setTimeout(() => {
  //   console.log(args);
  // }, 10000);

  // // throw 'macro error';
}


// const symbolRegex = /(\s*[;:{},]\s*)/g;

// // Counts occurences of substr inside str
// const countOccurences = (str, substr) => str.split(substr).length - 1;

// export const minify = code => {
//   code.split(symbolRegex).reduce((str, fragment, index) => {
//     // Even-indices are non-symbol fragments
//     if (index % 2 === 0) {
//       return str + fragment;
//     }

//     // Only manipulate symbols outside of strings
//     if (
//       countOccurences(str, "'") % 2 === 0 &&
//       countOccurences(str, '"') % 2 === 0
//     ) {
//       return str + fragment.trim();
//     }

//     return str + fragment;
//   }, "");
// };
