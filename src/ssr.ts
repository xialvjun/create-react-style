import { Fragment, Component, ReactNode, ComponentClass } from "react";
import hash from "@emotion/hash";

import { createStyle as originCreateStyle } from "./createStyle";

export const createStyle: () => ComponentClass<{
  css: string;
  children: (className: string) => ReactNode;
}> = () => originCreateStyle(hash);
