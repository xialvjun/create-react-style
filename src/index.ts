import { Fragment, Component, ReactNode, ComponentClass } from "react";

import { createStyle } from "./createStyle";

export * from "./createStyle";

export * from "./createInlineStyle";

export const Style: ReturnType<typeof createStyle> = createStyle();
