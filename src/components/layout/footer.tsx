
'use client';

import Link from 'next/link';
import { Linkedin, Instagram, Youtube, Eye, DownloadCloud } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCounts, incrementCount } from '@/app/actions/trackingActions';
import { Skeleton } from '../ui/skeleton';

export function Footer() {
  const [siteViews, setSiteViews] = useState<number | null>(null);
  const [totalDownloads, setTotalDownloads] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetCounts = async () => {
      setIsLoading(true);
      // We don't need to wait for this to complete to show the initial counts,
      // so we call it without await.
      incrementCount('siteViews'); 
      
      const counts = await getCounts();
      
      setSiteViews(counts.siteViews);
      setTotalDownloads(counts.totalDownloads);
      setIsLoading(false);
    };

    fetchAndSetCounts();
  }, []);

  return (
    <footer className="bg-card border-t border-border mt-12 py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="https://www.linkedin.com/company/the-accessible-ai-hub/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
            <Linkedin size={24} />
          </Link>
          <Link href="https://www.instagram.com/theaccessibleaihub?igsh=Mzl6N3praGk4NTVp&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
            <Instagram size={24} />
          </Link>
          <Link href="https://www.youtube.com/@AccessibleAIHub" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors">
            <Youtube size={24} />
          </Link>
        </div>
        <div className="text-sm mb-2 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-48" />
            </>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>Total Website Views: {siteViews?.toLocaleString() ?? 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <DownloadCloud size={16} />
                <span>Resource Downloads: {totalDownloads?.toLocaleString() ?? 0}</span>
              </div>
            </>
          )}
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} The Accessible AI Hub. All rights reserved.
        </p>
        <p className="text-xs mt-1 font-headline">
          Prompt your path to AI literacy.
        </p>
      </div>
    </footer>
  );
}
