"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addUserAction } from "@/lib/actions/user";
import { UserType } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";

export const SignupForm = ({ users }: { users: UserType[] }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const formSchema = z.object({
    username: z
      .string()
      .min(1, "ユーザー名を入力してください")
      .refine(
        (val) => users.every((user: UserType) => user.username !== val),
        "そのユーザー名はすでに使用されています"
      ),
    password: z.string().min(8, "8文字以上のパスワードを設定してください"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const newUser = await addUserAction(values.username, values.password);
      router.push(`/${newUser.id}`);
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>サインアップ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-2">
            <Form {...form}>
              <form
                className="flex flex-col items-center justify-center space-y-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ユーザー名</FormLabel>
                      <FormControl>
                        <Input placeholder="ユーザー名" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <Button>{isPending ? "Loading..." : "サインアップ"}</Button>
              </form>
            </Form>
            <Button variant="secondary">
              <Link href="/">キャンセル</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center">
          <span>アカウントをお持ちですか?</span>
          <Button variant="link">
            <Link href="/signin">サインイン</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
