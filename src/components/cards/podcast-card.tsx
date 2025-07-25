
'use client';

import Link from 'next/link';
import type { Podcast } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { YouTubeEmbed } from '../ui/youtube-embed';
import { useState, useEffect } from 'react';
import { getYouTubeViewCount } from '@/app/actions/youtubeActions';
import { Skeleton } from '../ui/skeleton';
import { Eye } from 'lucide-react';

interface PodcastCardProps {
  podcast: Podcast;
}

const SpotifyIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
        <title>Spotify</title>
        <path fill="currentColor" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.923 17.51c-.24.36-.68.48-.96.24-2.4-1.44-5.4-1.8-8.998-.96-.48.12-.84-.12-.96-.6s.12-.84.6-.96c3.958-.96 7.32-.48 9.96 1.2.36.24.48.68.24.96zm1.44-2.88c-.36.48-.96.6-1.44.24-2.76-1.68-6.96-2.16-10.44-1.2-.6.12-1.08-.24-1.2-.84s.24-1.08.84-1.2c4.08-1.08 8.64-.48 11.88 1.44.48.24.6.84.24 1.32zm.24-3.24c-3.24-1.92-8.52-2.04-12.24-1.08-.72.12-1.44-.36-1.56-1.08s.36-1.44 1.08-1.56c4.32-1.08 10.2.12 13.92 2.16.6.36.84 1.08.48 1.68s-1.08.84-1.68.48z"/>
    </svg>
);

const YouTubeIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
        <title>YouTube</title>
        <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
);


export function PodcastCard({ podcast }: PodcastCardProps) {
  const [youtubeViewCount, setYoutubeViewCount] = useState<number | null>(null);
  const [isLoadingViews, setIsLoadingViews] = useState(false);

  useEffect(() => {
    if (podcast.youtubeVideoId) {
      const fetchViewCount = async () => {
        setIsLoadingViews(true);
        const views = await getYouTubeViewCount(podcast.youtubeVideoId!);
        setYoutubeViewCount(views);
        setIsLoadingViews(false);
      };
      fetchViewCount();
    }
  }, [podcast.youtubeVideoId]);

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-headline">{podcast.title}</CardTitle>
        <div className="flex justify-between items-center">
            <CardDescription>{`Episode #${podcast.episodeNumber}`}</CardDescription>
             <div className="flex items-center text-sm text-muted-foreground">
                {isLoadingViews ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  youtubeViewCount !== null && (
                    <>
                      <Eye className="mr-1.5 h-4 w-4" />
                      {youtubeViewCount.toLocaleString()} views
                    </>
                  )
                )}
              </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {podcast.youtubeVideoId && (
            <YouTubeEmbed videoId={podcast.youtubeVideoId} title={podcast.title} />
        )}
        <p className="text-sm text-muted-foreground">{podcast.description}</p>
      </CardContent>
      <CardFooter className="flex-row gap-3 pt-4 justify-end">
        {podcast.spotifyUrl && (
            <Link href={podcast.spotifyUrl} target="_blank" rel="noopener noreferrer" aria-label="Listen on Spotify" className="text-white hover:opacity-80 transition-opacity">
                <div className="h-10 w-10 rounded-full bg-[#1DB954] flex items-center justify-center">
                    <SpotifyIcon />
                </div>
            </Link>
        )}
        {podcast.youtubeVideoId && (
            <Link href={`https://www.youtube.com/watch?v=${podcast.youtubeVideoId}`} target="_blank" rel="noopener noreferrer" aria-label="Watch on YouTube" className="text-white hover:opacity-80 transition-opacity">
                 <div className="h-10 w-10 rounded-full bg-[#FF0000] flex items-center justify-center">
                    <YouTubeIcon />
                </div>
            </Link>
        )}
      </CardFooter>
    </Card>
  );
}
