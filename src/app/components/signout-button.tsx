import Link from "next/link";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { LayoutWrapperContext } from "./layout/layout-wrapper";

export const SignoutButton = () => {
  const { setIsLoggedIn } = useContext(LayoutWrapperContext)!;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">サインアウト</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>サインアウトしますか</DialogTitle>
        </DialogHeader>
        <div>
          <Button
            onClick={() => {
              setIsLoggedIn(false);
              setOpen(false);
            }}
          >
            <Link href="/">サインアウト</Link>
          </Button>
          <DialogClose asChild>
            <Button variant="secondary">キャンセル</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
