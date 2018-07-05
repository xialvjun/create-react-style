import * as React from "react";
import { createStyle } from "./createStyle";

export function createInlineStyle(
  Style: ReturnType<typeof createStyle>
): typeof Style & React.ReactDOM {
  return new Proxy<any>(Style, {
    get(target, p, receiver) {
      const Tag = p.toString();
      let ISC = target[p];
      if (ISC) {
        return ISC;
      }
      ISC = ({ css, style, "inline-css": inlineCss, className, ...props }) => (
        <Style.Consumer css={css || style || inlineCss}>
          {cn => (
            <Tag {...props} className={className ? className + " " + cn : cn} />
          )}
        </Style.Consumer>
      );
      target[p] = ISC;
      return ISC;
    }
  });
}
