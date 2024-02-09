import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getServerSession } from 'next-auth';

import AuthSessionProvider from '@/components/providers/AuthSessionProvider';
import { ModalProvider } from '@/components/providers/modal-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

import authOptions from './api/auth/[...nextauth]/authOptions';

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
  const session = await getServerSession(authOptions);
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <AuthSessionProvider session={session}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange
            storageKey='spotion-theme'
          >
            <ModalProvider />

            {children}
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
