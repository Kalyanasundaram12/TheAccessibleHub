import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AccessibilityToolbar } from '@/components/layout/accessibility-toolbar';
import { AccessibilityProvider } from '@/components/providers/accessibility-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'The Accessible AI Hub - Prompt your path',
  description: 'The Accessible AI Hub: Prompt your path to AI literacy. Explore events, resources, and join a community passionate about democratizing AI knowledge.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Fonts link for Inter is handled by next/font */}
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
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
