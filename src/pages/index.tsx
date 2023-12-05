import { api } from "@/utils/api";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { AuthShowcase } from "@/components/AuthShowCase";
import Link from "next/link";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const { data: session } = useSession();

  return (
    <>
      <main className=" flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            FS<span className="text-[hsl(280,100%,70%)]">Next</span>
          </h1>

          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            {!!session?.user && (
              <Image
                width={50}
                height={50}
                alt="user image"
                className="rounded-full"
                src={session?.user?.image ?? ""}
              />
            )}
            <AuthShowcase />
          </div>
          <Link href="/todos" className="bg-red text-lg text-white">
            go to todos page
          </Link>
        </div>
      </main>
    </>
  );
}
