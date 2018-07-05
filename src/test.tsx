import * as React from "react";

import { Style, createStyle, createInlineStyle } from "./index";
// babel-plugin-macros
import minify from "../macro";
// minify is just a babel macro to minify the css template string. You can use or not use it.
// import `minify`, `mini`, `macro` or `whatever` from "../macro" as long as it is import default.

const ff7 = [
  { name: "tifa", attack: 965, hp: 2985 },
  { name: "cloud", attack: 893, hp: 3763 },
  { name: "alice", attack: 676, hp: 3125 }
];

const app = (
  <div>
    <Style.Provider>
      {ff7.map(p => (
        <Style.Consumer
          key={p.name}
          css={minify`
          display: flex;
          align-items: center;
          & > h4 {
            margin: 0 10px;
            flex: auto;
          }
          `}
        >
          {cn => (
            <div className={cn}>
              <h2>{p.name}</h2>
              <h4>{p.hp}</h4>
              <p>{p.attack}</p>
            </div>
          )}
        </Style.Consumer>
      ))}
    </Style.Provider>
  </div>
);

const app_will_render_to = (
  <div>
    <style
      dangerouslySetInnerHTML={{
        __html: minify`
        .yuqw6123ba {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }
        .yuqw6123ba > h4 {
          margin: 0 10px;
          -webkit-flex: auto;
          -ms-flex: auto;
          flex: auto;
        }`
      }}
    />
    {ff7.map(p => (
      <div key={p.name} className="yuqw6123ba">
        <h2>{p.name}</h2>
        <h4>{p.hp}</h4>
        <p>{p.attack}</p>
      </div>
    ))}
  </div>
);

// global style:
// global style method 1: it has no stylis features and deduplicate feature
const global_style_1 = (
  <style
    dangerouslySetInnerHTML={{
      __html: minify`
      .abc {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .abc .def {
        background: #999;
      }
      body {
        height: 100vh;
      }`
    }}
  />
);

// global style method 2:
const global_style_2 = (
  <Style.Consumer
    css={minify`
    :global(.abc) {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      // this method has stylis feature
      .def {
        background: #999;
      }
    }
    :global(body) {
      height: 100vh;
    }`}
  >
    {_ => null}
  </Style.Consumer>
);

// Server Side Rendering
const SSR_STYLIS_CACHE = {};
const in_server = (
  <Style.Provider init_stylis_cache={SSR_STYLIS_CACHE}>XXX</Style.Provider>
);
const SSR_STYLIS_CACHE_JSON = JSON.stringify(SSR_STYLIS_CACHE);
const html = `window.SSR_STYLIS_CACHE_JSON = '${SSR_STYLIS_CACHE_JSON}';`;
const in_client = (
  <Style.Provider init_stylis_cache={JSON.parse(SSR_STYLIS_CACHE_JSON)}>
    XXX
  </Style.Provider>
);

// Other Platform
// You can offer custom render_style Component. In that Component, you can do side effect to change your platform StyleSheet
const other_platform = (
  <Style.Provider
    render_style={__html => <style dangerouslySetInnerHTML={{ __html }} />}
  >
    XXX
  </Style.Provider>
);

// it's not global, so you can split into two style Provider, even though I havn't see the usage.
const AnotherStyle = createStyle();
const { Provider: AProvider, Consumer: AConsumer } = AnotherStyle;

// inline style
const ISC = createInlineStyle(createStyle());
// both the 3 prop names are ok: css, style, inline-css. And the priority is as this.
const inline_style = (
  <ISC.div inline-css="display:grid">
    <ISC.div inline-css="grid-column:1/2;grid-row:1/3">
      <ISC.div inline-css="display:grid">
        <ISC.div inline-css="grid-column:1/2;grid-row:1/3">1</ISC.div>
        <ISC.div inline-css="grid-column:2/3;grid-row:1/2">2</ISC.div>
        <ISC.span inline-css="grid-column:2/3;grid-row:2/3">3</ISC.span>
        <ISC.p inline-css="grid-column:1/3;grid-row:2/3">4</ISC.p>
      </ISC.div>
    </ISC.div>
    <ISC.div inline-css="grid-column:2/3;grid-row:1/2">5</ISC.div>
    <ISC.div inline-css="grid-column:2/3;grid-row:2/3">6</ISC.div>
    <ISC.div inline-css="grid-column:1/3;grid-row:2/3">7</ISC.div>
  </ISC.div>
);
