
'use server';

import type { Event } from '@/types';

// This is a server-side function that fetches the YouTube view count.
// It uses the YouTube Data API and requires an API key.
export async function getYouTubeViewCount(videoId: string): Promise<number | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.error('YOUTUBE_API_KEY is not set in environment variables.');
    return null;
  }

  const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } }); // Revalidate every hour
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching YouTube data:', errorData.error.message);
      return null;
    }

    const data = await response.json();
    const viewCount = data.items?.[0]?.statistics?.viewCount;

    if (viewCount) {
      return parseInt(viewCount, 10);
    } else {
      console.warn(`View count not found in API response for video ID: ${videoId}`);
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch YouTube view count:', error);
    return null;
  }
}
