import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { AuthSessionProvider } from '@/components/providers/auth-session-provider';
import { ModalProvider } from '@/components/providers/modal-provider';
import PlayerProvider from '@/components/providers/player-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spotion',
  description: 'The minimalistic music app',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg',
      },
    ],
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <AuthSessionProvider>
          <PlayerProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='dark'
              enableSystem
              disableTransitionOnChange
              storageKey='spotion-theme'
            >
              <ModalProvider />
              <TooltipProvider skipDelayDuration={300}>
                {children}
              </TooltipProvider>
            </ThemeProvider>
          </PlayerProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
