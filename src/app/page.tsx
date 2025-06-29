"use client";

import { ROUTES } from "@/shared/constants/routes";
import { useUserStore } from "@/shared/stores/userStore";

import { getTokens } from "@/shared/utils/tokenStorage";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { fetchUser } = useUserStore();

  useEffect(() => {
    const tokens = getTokens();
    if (tokens) {
      fetchUser();
      router.push(ROUTES.MAIN);
    } else {
      router.push(ROUTES.ONBOARDING);
    }
  }, [fetchUser, router]);

  return <article></article>;
};

export default Page;
