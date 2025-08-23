"use client";

import { LayoutWrapperContext } from "@/app/components/layout/layout-wrapper";
import { useContext, useEffect } from "react";

export const LoginControl = () => {
  const { setIsLoggedIn } = useContext(LayoutWrapperContext)!;
  useEffect(() => setIsLoggedIn(true), [setIsLoggedIn]);

  return <div></div>;
};
