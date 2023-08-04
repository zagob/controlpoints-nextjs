import { Dashboard } from "@/components/Dashboard";
import { SignIn } from "@/components/signIn";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();
  // const session = true;

  console.log(session);
  return (
    <main className="bg-zinc-900 h-screen text-zinc-100 p-4">
      {session ? <Dashboard /> : <SignIn />}
    </main>
  );
}
