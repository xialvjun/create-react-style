import { Fragment, Component, ReactNode, ComponentClass } from "react";

import { createStyle } from "./createStyle";

export * from "./createStyle";

export const Style: ReturnType<typeof createStyle> = createStyle();
