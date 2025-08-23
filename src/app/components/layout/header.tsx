"use client";

import Link from "next/link";
import { useContext } from "react";

import { Button } from "@/components/ui/button";

import { SignoutButton } from "../signout-button";
import { ThemeButton } from "../theme/theme-button";
import { LayoutWrapperContext } from "./layout-wrapper";

export const Header = () => {
  const { isLoggedIn } = useContext(LayoutWrapperContext)!;

  return (
    <div className="flex items-center justify-between p-2 bg-blue-200 dark:bg-blue-900">
      <div className="flex-3 text-3xl font-bold">掲示板アプリ</div>
      <div className="flex flex-1 items-center justify-between">
        <ThemeButton />
        {isLoggedIn ? (
          <SignoutButton />
        ) : (
          <div className="space-x-2">
            <Button variant="secondary">
              <Link href="/signin">サインイン</Link>
            </Button>
            <Button>
              <Link href="/signup">サインアップ</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
