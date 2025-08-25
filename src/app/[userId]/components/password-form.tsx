import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { EditIcon } from "./icon/edit-icon";
import { useRouter } from "next/navigation";
import { UserType } from "@/types/type";

export const PasswordForm = ({ user }: { user: UserType }) => {
  const router = useRouter();

  const formSchema = z.object({
    password: z
      .string()
      .refine((val) => val === user.password, "パスワードが違います"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = () => {
    router.push(`/${user.id}/edit`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center justify-center space-y-2">
        <DialogHeader>
          <DialogTitle>パスワードの確認</DialogTitle>
          <DialogDescription>パスワードを入力してください</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <Form {...form}>
            <form className="flex flex-col items-center justify-center space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>パスワード</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="パスワード"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">送信</Button>
            </form>
          </Form>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">キャンセル</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
