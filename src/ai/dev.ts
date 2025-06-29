import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-event-tags.ts';
import '@/ai/flows/suggest-resource-tags.ts';
import '@/ai/flows/summarize-content-flow.ts';
import '@/ai/flows/generate-image-flow.ts';
