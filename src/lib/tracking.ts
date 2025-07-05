
'use client';

import { getCounts, incrementCount } from '@/app/actions/trackingActions';

/**
 * Increments the global site view counter in Firestore.
 */
export async function incrementSiteView(): Promise<void> {
  // Fire-and-forget; no need to wait for completion in the UI
  incrementCount('siteViews');
}

/**
 * Increments the global resource download counter in Firestore.
 */
export async function incrementDownloadCount(): Promise<void> {
    // Fire-and-forget; no need to wait for completion in the UI
    incrementCount('totalDownloads');
}

/**
 * Retrieves the current site view count from Firestore.
 * @returns The total number of site views.
 */
export async function getSiteViews(): Promise<number> {
    const counts = await getCounts();
    return counts.siteViews;
}

/**
 * Retrieves the total number of resource downloads from Firestore.
 * @returns The total number of resource downloads.
 */
export async function getTotalResourceDownloads(): Promise<number> {
    const counts = await getCounts();
    return counts.totalDownloads;
}
