"use client";

import { IconDotsVertical } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useClerk, useUser } from "@clerk/nextjs";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const { openUserProfile } = useClerk();
  const { user: clerkUser } = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          onClick={() => openUserProfile()}
        >
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage
              src={clerkUser?.imageUrl || ""}
              alt={clerkUser?.fullName || ""}
            />
            <AvatarFallback className="rounded-lg">
              {clerkUser?.fullName?.charAt(0) || "CN"}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">
              {clerkUser?.fullName || "User"}
            </span>
            <span className="text-muted-foreground truncate text-xs">
              {clerkUser?.emailAddresses[0].emailAddress || "user@example.com"}
            </span>
          </div>
          <IconDotsVertical className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
