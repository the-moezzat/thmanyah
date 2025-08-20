import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/design-system/components/ui/sidebar';
import { SearchIcon, ClockIcon, ListIcon, HeartIcon } from 'lucide-react';
import Logo from './logo';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-main-background/90 p-6">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="bg-main-background/90">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <SearchIcon className="h-4 w-4" />
                  <span>Search</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ClockIcon className="h-4 w-4" />
                  <span>Recent</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ListIcon className="h-4 w-4" />
                  <span>My Queue</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <HeartIcon className="h-4 w-4" />
                  <span>Favorite Podcasts</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
