"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function DarkModeProvider ( { children, ...props } ) {
  return <NextThemesProvider { ...props }>{ children }</NextThemesProvider>;
}
