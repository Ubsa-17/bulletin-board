"use client";

import { useContext } from "react";
import { LayoutWrapperContext } from "./layout-wrapper";
import { ThemeButton } from "../theme/theme-button";

export const Header = () => {
  const { isLoggedIn } = useContext(LayoutWrapperContext)!;

  return (
    <div>
      <ThemeButton />
      {String(isLoggedIn)}
    </div>
  );
};
