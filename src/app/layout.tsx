
'use client';

import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AccessibilityToolbar } from '@/components/layout/accessibility-toolbar';
import { AccessibilityProvider } from '@/components/providers/accessibility-provider';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
});

// Since we're using a client-side hook (usePathname), we can't export metadata directly.
// This is a common pattern for dynamic layouts in Next.js App Router.
// export const metadata: Metadata = {
//   title: 'The Accessible AI Hub - Prompt your path',
//   description: 'The Accessible AI Hub: Prompt your path to AI literacy. Explore events, resources, and join a community passionate about democratizing AI knowledge.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en" className={cn(inter.variable, sourceCodePro.variable)}>
      <head>
        <title>The Accessible AI Hub - Prompt your path</title>
        <meta name="description" content="The Accessible AI Hub: Prompt your path to AI literacy. Explore events, resources, and join a community passionate about democratizing AI knowledge." />
      </head>
      <body className={cn(
        "font-body antialiased flex flex-col min-h-screen",
        "isolate" // This is important for the background effect
      )}>
        <AccessibilityProvider>
          <Navbar />
          <AccessibilityToolbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
