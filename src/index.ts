import { Fragment, Component, ReactNode, ComponentClass } from "react";

import { createStyle } from "./createStyle";
import { createInlineStyle } from "./createInlineStyle";

export * from "./createStyle";

export * from "./createInlineStyle";

export const Style: ReturnType<typeof createStyle> = createStyle();
export const InlineStyle = createInlineStyle(Style.Consumer);
