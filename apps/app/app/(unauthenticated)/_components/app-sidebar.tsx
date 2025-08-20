'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/design-system/components/ui/sidebar';
import { ClockIcon, ListIcon, HeartIcon, HomeIcon } from 'lucide-react';
import Logo from './logo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const sidebarItems = [
  {
    id: 'home',
    label: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    id: 'recent',
    label: 'Recent',
    icon: ClockIcon,
    href: '/recent',
  },
  {
    id: 'queue',
    label: 'My Queue',
    icon: ListIcon,
    href: '/queue',
  },
  {
    id: 'favorites',
    label: 'Favorite Podcasts',
    icon: HeartIcon,
    href: '/favorites',
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="bg-main-background/90 p-6">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="bg-main-background/90">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <Icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className=" bg-main-background/90 p-4">
        <div className=" text-muted-foreground text-xs">
          <p>© 2024 Thmanyah</p>
          <p>Made with ❤️</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
