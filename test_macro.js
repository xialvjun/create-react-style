import React from "react";
import css from "./macro";

import { createStyle } from "./lib";

const Style = createStyle();
const abc = 123;
const app = (
  <div>
    <Style
      css={css`
        display: flex;
        background: yellow;
        // 这是备注。。。模板字符串的变量两边的空格不会被消除，从而尊重类似代码 '.some_class \${some_variable} .abc {XXX}'，虽然不知道这里的应用场景
        width: ${abc} px;
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
    .vpswsq9slc {
      display: flex;
      background: yellow;
      width: 123px;
    }
    .vpswsq9slc .abc {
      color: blue;
    }`
        }}
      />
      <div className={"vpswsq9slc"}>
        <div className="abc">abcabc</div>
      </div>
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
