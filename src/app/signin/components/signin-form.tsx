"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { LayoutWrapperContext } from "@/app/components/layout/layout-wrapper";
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
import { UserType } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";

export const SigninForm = ({ users }: { users: UserType[] }) => {
  const { setIsLoggedIn } = useContext(LayoutWrapperContext)!;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const formSchema = z
    .object({
      username: z
        .string()
        .min(1, "ユーザー名を入力してください")
        .refine(
          (val) => users.some((user: UserType) => user.username === val),
          "そのユーザー名は存在しません"
        ),
      password: z.string().min(1, "パスワードを入力してください"),
    })
    .refine(
      (data) => {
        const user = users.find(
          (user: UserType) => user.username === data.username
        );
        return user?.password === data.password;
      },
      {
        message: "ユーザー名またはパスワードが正しくありません",
        path: ["password"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const user = users.find(
        (user: UserType) => user.username === values.username
      );
      setIsLoggedIn(true);
      router.push(`/${user?.id}`);
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>サインイン</CardTitle>
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
                <Button>{isPending ? "Loading..." : "サインイン"}</Button>
              </form>
            </Form>
            <Button variant="secondary">
              <Link href="/">キャンセル</Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="w-full flex flex-col items-center justify-center">
          <span>アカウントをお持ちではないですか?</span>
          <Button variant="link">
            <Link href="/signup">サインアップ</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
