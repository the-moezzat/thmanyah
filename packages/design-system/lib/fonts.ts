import { cn } from '@repo/design-system/lib/utils';
import { IBM_Plex_Sans_Arabic } from 'next/font/google'

const ibmPlex = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '600'],
  subsets: ['arabic', 'latin']
})

export const fonts = cn(
  ibmPlex.className,
  'touch-manipulation font-sans antialiased'
);
