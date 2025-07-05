
'use server';

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';

const COUNTS_COLLECTION = 'tracking';
const COUNTS_DOCUMENT_ID = 'counts';

type CountType = 'siteViews' | 'totalDownloads';

// Helper function to get the counts document reference
const getCountsDocRef = () => doc(db, COUNTS_COLLECTION, COUNTS_DOCUMENT_ID);

// Helper function to initialize the document if it doesn't exist
const initializeCountsDocument = async () => {
    const docRef = getCountsDocRef();
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        await setDoc(docRef, { siteViews: 0, totalDownloads: 0 });
    }
};

// Increment a specific count
export async function incrementCount(countType: CountType): Promise<void> {
    try {
        const docRef = getCountsDocRef();
        // Ensure document exists before trying to increment
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            // Initialize with 1 since this is the first increment
            await setDoc(docRef, { 
                siteViews: countType === 'siteViews' ? 1 : 0,
                totalDownloads: countType === 'totalDownloads' ? 1 : 0,
            });
        } else {
            await setDoc(docRef, { [countType]: increment(1) }, { merge: true });
        }
    } catch (error) {
        console.error(`Error incrementing ${countType}:`, error);
        // For now, we'll log it and not re-throw, to avoid breaking the UI
    }
}

// Get all counts
export async function getCounts(): Promise<{ siteViews: number; totalDownloads: number }> {
    try {
        const docRef = getCountsDocRef();
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                siteViews: data.siteViews || 0,
                totalDownloads: data.totalDownloads || 0,
            };
        } else {
            // If the document doesn't exist, initialize it and return 0s
            await initializeCountsDocument();
            return { siteViews: 0, totalDownloads: 0 };
        }
    } catch (error) {
        console.error("Error getting counts:", error);
        // Return a default state on error
        return { siteViews: 0, totalDownloads: 0 };
    }
}
