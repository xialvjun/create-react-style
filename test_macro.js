import React from "react";
import css from './macro';

import { createStyle } from "./src";

const Style = createStyle();

const app = (
  <div>
    <Style
      css={css`
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
    </Style>
    <Style
      css={css`
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
    </Style>
  </div>
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

// var a = 123;

// function abc() {

// }

// var ss = css`
// display: flex;
// .abc {
//   background: red;
// }
// `;

// console.log(ss);

