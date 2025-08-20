import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import {
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

    <main className="container relative grid h-dvh flex-col items-center justify-center bg-main-background lg:max-w-none lg:px-0">
      {/* <SidebarTrigger /> */}
      {/* <div className="-z-50 absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_10%,#000000_40%,#010133_100%)]" /> */}

      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      {children}
    </main>
  </SidebarProvider>
);

export default AuthLayout;
