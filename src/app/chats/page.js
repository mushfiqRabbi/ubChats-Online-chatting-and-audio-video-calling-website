"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthContext from "@/context/authContext";

export default function Chats() {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  });

  return <div>Hello from Chats</div>;
}
