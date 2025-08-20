import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@repo/design-system/components/ui/sidebar';
import type { ReactNode } from 'react';
import { AppSidebar } from './_components/app-sidebar';

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <main className="h-dvh bg-main-background ">
        {/* <SidebarTrigger /> */}
        {/* <div className="-z-50 absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_10%,#000000_40%,#010133_100%)]" /> */}

        {/* <div className="absolute top-4 right-4">
        <ModeToggle />
      </div> */}

        {children}
      </main>
    </SidebarInset>
  </SidebarProvider>
);

export default AuthLayout;
