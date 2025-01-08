"use client";
import React, { FC } from "react";
import { ThemeProvider } from "@emotion/react";

import {lightTheme, darkTheme} from "./styles/theme"
import { useRecoilState } from "recoil";
import { themeAtom } from "./atoms/global";
interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper: FC<ThemeProviderWrapperProps> = ({ children }) => {
  const [theme, setTheme] = useRecoilState(themeAtom)

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
