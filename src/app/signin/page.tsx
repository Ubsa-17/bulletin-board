import { getAllUsersAction } from "@/lib/actions/user";
import { SigninForm } from "./components/signin-form";

export default async function SigninPage() {
  const users = await getAllUsersAction();

  return <SigninForm users={users} />;
}
