import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";
import { LayoutWrapperContext } from "./layout/layout-wrapper";

export const SignoutButton = () => {
  const { setIsLoggedIn } = useContext(LayoutWrapperContext)!;

  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoggedIn(false);
      }}
    >
      <Link href="/">サインアウト</Link>
    </Button>
  );
};
