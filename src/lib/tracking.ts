
'use client';

const SITE_VIEWS_KEY = 'aiAccessHubSiteViews';
const DOWNLOAD_COUNTS_KEY = 'aiAccessHubResourceDownloads';

// Helper to safely get download counts from localStorage
function getStoredDownloadCounts(): Record<string, number> {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = localStorage.getItem(DOWNLOAD_COUNTS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure it's an object and values are numbers
        if (typeof parsed === 'object' && parsed !== null) {
          Object.keys(parsed).forEach(key => {
            if (typeof parsed[key] !== 'number' || Number.isNaN(parsed[key])) {
              // console.warn(`Sanitizing non-numeric download count for ${key}. Value: ${parsed[key]}`);
              parsed[key] = 0; 
            }
          });
          return parsed;
        }
        // console.warn(`Stored download counts ("${DOWNLOAD_COUNTS_KEY}") is not a valid object. Value: ${stored}`);
        return {}; // Not a valid object
      } catch (e) {
        // console.error(`Error parsing download counts from localStorage ("${DOWNLOAD_COUNTS_KEY}"). Value: ${stored}. Error:`, e);
        // If parsing fails, return an empty object or reset
        // setStoredDownloadCounts({}); // Optionally reset if corrupted
        return {};
      }
    }
    return {}; // No stored data for this key
  }
  return {}; // No localStorage
}

// Helper to safely set download counts to localStorage
function setStoredDownloadCounts(counts: Record<string, number>): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(DOWNLOAD_COUNTS_KEY, JSON.stringify(counts));
    } catch (e) {
      console.error("Error storing download counts to localStorage", e);
    }
  }
}

/**
 * Tracks a download for a resource item using localStorage.
 * Logs the updated count to the console.
 * @param itemId - A unique identifier for the item being downloaded.
 * @param itemType - The type of the item (e.g., 'ppt', 'pdf').
 */
export function trackDownload(itemId: string, itemType: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    const downloadCounts = getStoredDownloadCounts();
    downloadCounts[itemId] = (downloadCounts[itemId] || 0) + 1;
    setStoredDownloadCounts(downloadCounts);
    // console.log(`Download tracked for ${itemId} (Type: ${itemType}). New count: ${downloadCounts[itemId]}. Total site downloads: ${getTotalResourceDownloads()}`);
  } else {
    // console.warn('localStorage not available, download not tracked persistently.');
  }
}

/**
 * Increments the site view counter in localStorage.
 */
export function incrementSiteView(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedViews = localStorage.getItem(SITE_VIEWS_KEY);
    let currentViews = 0; // Default to 0 if nothing stored or invalid

    // console.log(`incrementSiteView: Attempting to read from localStorage[${SITE_VIEWS_KEY}]. Value: "${storedViews}"`);

    if (storedViews) {
      const parsedViews = parseInt(storedViews, 10);
      if (!Number.isNaN(parsedViews)) { // Check if parsing was successful
        currentViews = parsedViews;
      } else {
        // console.warn(`incrementSiteView: Stored site views ("${storedViews}") is NaN. Resetting to 0 before increment.`);
      }
    }
    
    currentViews++;
    localStorage.setItem(SITE_VIEWS_KEY, currentViews.toString());
    // console.log(`incrementSiteView: Site view incremented. localStorage[${SITE_VIEWS_KEY}] is now: "${currentViews}"`);
  } else {
    // console.warn('incrementSiteView: localStorage not available, site view not incremented persistently.');
  }
}

/**
 * Retrieves the current site view count from localStorage.
 * @returns The total number of site views.
 */
export function getSiteViews(): number {
  if (typeof window !== 'undefined' && window.localStorage) {
    const views = localStorage.getItem(SITE_VIEWS_KEY);
    // console.log(`getSiteViews: Attempting to read from localStorage[${SITE_VIEWS_KEY}]. Value: "${views}"`);
    if (views) {
      const parsedViews = parseInt(views, 10);
      if (!Number.isNaN(parsedViews)) { // Check if parsing was successful
        return parsedViews;
      } else {
        // console.warn(`getSiteViews: Parsed "${views}" to NaN. Returning 0.`);
        return 0; // Return 0 if stored value is NaN
      }
    }
    return 0; // Return 0 if no value stored for key
  }
  return 0; // Return 0 if no localStorage
}

/**
 * Calculates the total number of resource downloads across all items from localStorage.
 * @returns The total number of resource downloads.
 */
export function getTotalResourceDownloads(): number {
  if (typeof window !== 'undefined' && window.localStorage) {
    const downloadCounts = getStoredDownloadCounts();
    let totalDownloads = 0;
    for (const itemId in downloadCounts) {
      if (Object.prototype.hasOwnProperty.call(downloadCounts, itemId)) {
        totalDownloads += (downloadCounts[itemId] || 0); // Ensure NaN is handled if somehow present
      }
    }
    return totalDownloads;
  }
  return 0;
}
