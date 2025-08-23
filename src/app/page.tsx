import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="h-screen flex flex-col items-center justify-center">
        <Link href="/signup">サインアップ</Link>
        <Link href="/signin">サインイン</Link>
      </div>
    </div>
  );
}
