import { getUserAction } from "@/lib/actions/user";

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getUserAction(userId);

  return <div>{JSON.stringify(user)}</div>;
}
