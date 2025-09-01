"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <Image
      src={theme === "dark" ? "/logo-dark.svg" : "/logo.svg"}
      alt="logo"
      width={100}
      height={100}
    />
  );
};
