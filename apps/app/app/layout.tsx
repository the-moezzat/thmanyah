import { env } from '@/env';
import './styles.css';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { ReactNode } from 'react';
import { Providers } from './providers';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <Providers>
        <DesignSystemProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </DesignSystemProvider>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
