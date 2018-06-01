import { Fragment, Component, ReactNode, ComponentClass } from "react";

import { createStyle } from "./createStyle";

export const Style: ReturnType<typeof createStyle> = createStyle();
export { createStyle };
