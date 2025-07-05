
'use client';

import Link from 'next/link';
import { Linkedin, Instagram, Youtube, Eye, DownloadCloud } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSiteViews, incrementSiteView, getTotalResourceDownloads } from '@/lib/tracking';

export function Footer() {
  const [siteViews, setSiteViews] = useState(0);
  const [totalDownloads, setTotalDownloads] = useState(0);

  useEffect(() => {
    const fetchAndSetCounts = async () => {
      // We don't need to wait for this to complete to show the initial counts,
      // so we call it without await.
      incrementSiteView(); 
      
      const views = await getSiteViews();
      const downloads = await getTotalResourceDownloads();
      
      setSiteViews(views);
      setTotalDownloads(downloads);
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
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>Total Website Views: {siteViews}</span>
          </div>
          <div className="flex items-center gap-1">
            <DownloadCloud size={16} />
            <span>Resource Downloads: {totalDownloads}</span>
          </div>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} The Accessible AI Hub. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Prompt your path to AI literacy.
        </p>
      </div>
    </footer>
  );
}
