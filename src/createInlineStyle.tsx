import * as React from "react";
import { StyleConsumerPropsType } from "./createStyle";

export function createInlineStyle(
  Consumer: (props: StyleConsumerPropsType) => JSX.Element
) {
  return new Proxy<any>(
    {},
    {
      get(target, p, receiver) {
        const Tag = p.toString();
        let ISC = target[p];
        if (ISC) {
          return ISC;
        }
        ISC = ({ style, className, ...props }) => (
          <Consumer css={style}>
            {cn => (
              <Tag
                {...props}
                className={className ? className + " " + cn : cn}
              />
            )}
          </Consumer>
        );
        target[p] = ISC;
        return ISC;
      }
    }
  );
}
