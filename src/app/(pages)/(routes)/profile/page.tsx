"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user as User | undefined;
  ("Session data:", session);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 max-w-md mx-auto mt-24 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
      <p>
        <strong>ID:</strong> {user?.id}
      </p>
      <p>
        <strong>First Name:</strong> {user?.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user?.lastName}
      </p>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>

      <Button
        className="mt-6 bg-red-500 hover:bg-red-600 text-white"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Signout
      </Button>
    </div>
  );
};

export default ProfilePage;
