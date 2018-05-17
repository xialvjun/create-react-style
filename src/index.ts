import { Fragment, Component, ReactNode, ComponentClass } from "react";

import { createStyle as originCreateStyle } from "./createStyle";

export const createStyle: () => ComponentClass<{
  css: string;
  children: (className: string) => ReactNode;
}> = () =>
  originCreateStyle(css =>
    Math.random()
      .toString(32)
      .slice(2)
  );
