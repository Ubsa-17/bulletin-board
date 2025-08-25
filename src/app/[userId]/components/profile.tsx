"use client";

import { useContext, useEffect } from "react";

import { LayoutWrapperContext } from "@/app/components/layout/layout-wrapper";
import { UserType } from "@/types/type";
import { PasswordForm } from "./password-form";

export const Profile = ({ user }: { user: UserType }) => {
  const { setIsLoggedIn } = useContext(LayoutWrapperContext)!;

  useEffect(() => {
    setIsLoggedIn(true);
  });

  return (
    <div>
      <h1>
        <PasswordForm user={user} />
        <span>{user?.username}</span>
      </h1>
    </div>
  );
};
