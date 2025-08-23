import { getAllUsersAction } from "@/lib/actions/user";
import { SignupForm } from "./components/signup-form";

export default async function SignupPage() {
  const users = await getAllUsersAction();

  return <SignupForm users={users} />;
}
