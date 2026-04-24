"use client";
import { useSession } from "@/lib/utils/auth/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
   console.log("Home page rendered");
  const session = useSession();

   console.log("Session data:", session);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello {session?.data?.user?.name || "World"}!</h1>
      <Link className="my-2 w-fit bg-gray-500 text-white rounded " href="/register">Go to Register</Link>
    {!session?"":<> 
    <Image
      className="rounded-full"
       src={session?.data?.user?.image || "/default-avatar.png"}
        alt="User Avatar"
        width={100}
        height={100}
      />
    </>}  
      <p> your email: {session?.data?.user?.email}</p>
      <Link className=" bg-gray-500 text-white rounded " href="/signUp">Go to Sign In</Link>

    </>
  );
}
