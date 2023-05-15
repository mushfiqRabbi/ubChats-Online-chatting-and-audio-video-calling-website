"use client";

import { useRouter } from "next/navigation";
import useAuthContext from "@/context/authContext";
import { useEffect } from "react";

export default function Home(params) {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      router.push("/chats");
    } else {
      router.push("/signin");
    }
  });
}
