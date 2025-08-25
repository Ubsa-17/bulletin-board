import { getUserAction } from "@/lib/actions/user";

export default async function EditPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const user = await getUserAction(userId);

  return (
    <div>
      <div>{user?.username}</div>
      <div>{user?.password}</div>
    </div>
  );
}
