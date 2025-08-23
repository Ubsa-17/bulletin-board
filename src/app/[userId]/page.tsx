import { getUserAction } from "@/lib/actions/user";
import { LoginControl } from "./components/login-control";

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getUserAction(userId);

  return (
    <div>
      <div>{JSON.stringify(user)}</div>
      <div>
        <LoginControl />
      </div>
    </div>
  );
}
