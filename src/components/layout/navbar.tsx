
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Info, Library, Mail, Quote, Menu, Mic, Briefcase } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import React, { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About Us', icon: Info },
  { href: '/works', label: 'Resources', icon: Briefcase },
  { href: '/resources', label: 'Works', icon: Library },
  { href: '/testimonials', label: 'Testimonials', icon: Quote },
  { href: '/podcasts', label: 'Podcasts', icon: Mic },
  { href: '/contact', label: 'Contact', icon: Mail },
];

const SiteLogoAndTitle = () => (
  <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 100 100"
      className="h-8 w-8"
    >
      <path 
        d="M45 15 C30 10, 15 20, 15 35 C15 50, 20 60, 25 70 C30 80, 40 85, 48 75 C55 68, 52 55, 48 45 C45 35, 50 25, 45 15 Z" 
        stroke="hsl(var(--foreground))" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      <circle cx="30" cy="30" r="3.5" fill="hsl(var(--foreground))" />
      <circle cx="25" cy="50" r="3.5" fill="hsl(var(--foreground))" />
      <circle cx="35" cy="65" r="3.5" fill="hsl(var(--foreground))" />
      <circle cx="40" cy="25" r="3.5" fill="hsl(var(--foreground))" />
      <circle cx="45" cy="50" r="3.5" fill="hsl(var(--foreground))" />
      <line x1="40" y1="25" x2="55" y2="35" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
      <line x1="45" y1="50" x2="58" y2="50" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
      <line x1="35" y1="65" x2="55" y2="60" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
      <circle cx="70" cy="50" r="18" stroke="hsl(var(--accent))" strokeWidth="4" fill="none" />
      <circle cx="70" cy="40" r="5" fill="hsl(var(--accent))" />
      <line x1="70" y1="46" x2="70" y2="60" stroke="hsl(var(--accent))" strokeWidth="5" strokeLinecap="round" />
      <line x1="60" y1="50" x2="80" y2="50" stroke="hsl(var(--accent))" strokeWidth="5" strokeLinecap="round" />
      <line x1="70" y1="60" x2="62" y2="70" stroke="hsl(var(--accent))" strokeWidth="5" strokeLinecap="round" />
      <line x1="70" y1="60" x2="78" y2="70" stroke="hsl(var(--accent))" strokeWidth="5" strokeLinecap="round" />
      <line x1="82" y1="28" x2="88" y2="22" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
      <circle cx="90" cy="20" r="3.5" fill="hsl(var(--foreground))" />
      <line x1="88" y1="50" x2="95" y2="50" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
      <circle cx="97" cy="50" r="3.5" fill="hsl(var(--foreground))" />
      <line x1="82" y1="72" x2="88" y2="78" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
      <circle cx="90" cy="80" r="3.5" fill="hsl(var(--foreground))" />
      <line x1="70" y1="68" x2="70" y2="78" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
      <circle cx="70" cy="81.5" r="3.5" fill="hsl(var(--foreground))" />
      <line x1="70" y1="32" x2="70" y2="22" stroke="hsl(var(--foreground))" strokeWidth="4" strokeLinecap="round" />
      <circle cx="70" cy="18.5" r="3.5" fill="hsl(var(--foreground))" />
    </svg>
    <span className="text-lg sm:text-xl font-bold font-headline">The Accessible AI Hub</span>
  </Link>
);

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-card shadow-md" : "bg-transparent"
    )}>
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <SiteLogoAndTitle />

        <ul className="hidden md:flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'flex items-center gap-1 px-1.5 py-1 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm md:text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  pathname === link.href
                    ? 'bg-primary/20 text-primary' 
                    : 'text-foreground/80 hover:text-accent-foreground'
                )}
              >
                <link.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="font-headline">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0 bg-card">
              <SheetHeader className="p-4 border-b text-left">
                <SheetTitle>
                  <SiteLogoAndTitle />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 p-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                        pathname === link.href
                          ? 'bg-primary/20 text-primary'
                          : 'text-foreground/80 hover:text-accent-foreground'
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="font-headline">{link.label}</span>
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

    