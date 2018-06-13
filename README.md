# create-react-style

An easy way of css-in-js: render style tag in render-props.

## Install

`npm i @xialvjun/create-react-style` or `yarn add @xialvjun/create-react-style`

## Macro

```js
// .babelrc
{
  "plugins": ["macros"]
}

// component.js
import minify from '@xialvjun/create-react-style/macro';
// you can also `import css from '@xialvjun/create-react-style/macro';` or whatever, but you can not `const css = minify;`
const abc = minify`
  display: flex;
  .abc {
    background: red;
  }
`

// output/component.js
const abc = `display:flex;.abc{background:red;}`
```

## Example

https://codesandbox.io/s/5w8wqonrpk

```jsx
import * as React from "react";

import { Style, createStyle } from "@xialvjun/create-react-style";
// babel-plugin-macros
import minify from "@xialvjun/create-react-style/macro";

const SSR_STYLIS_CACHE = {};
const for_ssr = <Style.Provider init_stylis_cache={SSR_STYLIS_CACHE} />;
`(window as any).__SSR_STYLIS_CACHE = JSON.stringify(SSR_STYLIS_CACHE);`;
// in client
<Style.Provider
  init_stylis_cache={JSON.parse((window as any).__SSR_STYLIS_CACHE)}
/>;

const app = (
  <Style.Provider>
    <div>
      <p>global style 1: (it has no stylis features and deduplicate feature)</p>
      <style
        dangerouslySetInnerHTML={{
          __html: minify`
          .abc {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            height: 100vh;
          }`
        }}
      />
    </div>
    <div>
      <p>global style 2:</p>
      <Style.Consumer
        css={minify`
        :global(.abc) {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        :global(body) {
          height: 100vh;
        }
      `}
      >
        {_ => null}
      </Style.Consumer>
    </div>
    <div>
      <Style.Consumer
        css={minify`
          display: flex;
          background: yellow;
          .abc {
            color: blue;
          }
        `}
      >
        {className => (
          <div className={className}>
            <div className="abc">abcabc</div>
          </div>
        )}
      </Style.Consumer>
      <Style.Consumer
        css={minify`
          display: flex;
          background: yellow;
          .abc {
            color: blue;
          }
        `}
      >
        {className => (
          <div className={className}>
            <div className="abc">abcabc</div>
          </div>
        )}
      </Style.Consumer>
    </div>
  </Style.Provider>
);

app ===
  (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
    .yuqw6123ba {
      display: flex;
      background: yellow;
    }
    .yuqw6123ba .abc {
      color: blue;
    }`
        }}
      />
      <div className={"yuqw6123ba"}>
        <div className="abc">abcabc</div>
      </div>
      <div className={"yuqw6123ba"}>
        <div className="abc">abcabc</div>
      </div>
    </div>
  );

const AnotherStyle = createStyle();
const { Provider: AProvider, Consumer: AConsumer } = AnotherStyle;
```
