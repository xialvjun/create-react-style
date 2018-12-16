import { createStyle } from "./createStyle";
import { createInlineStyle } from "./createInlineStyle";
export * from "./createStyle";
export * from "./createInlineStyle";
export const Style = createInlineStyle(createStyle());
