
'use server';

/**
 * @fileOverview A flow to suggest relevant tags for events based on their description.
 *
 * - suggestEventTags - A function that suggests tags for an event.
 * - SuggestEventTagsInput - The input type for the suggestEventTags function.
 * - SuggestEventTagsOutput - The return type for the suggestEventTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEventTagsInputSchema = z.object({
  eventDescription: z
    .string()
    .describe('The description of the event for which to suggest tags.'),
});
export type SuggestEventTagsInput = z.infer<typeof SuggestEventTagsInputSchema>;

const SuggestEventTagsOutputSchema = z.object({
  tags: z
    .array(z.string())
    .describe('An array of relevant tags for the event, based on its description.'),
});
export type SuggestEventTagsOutput = z.infer<typeof SuggestEventTagsOutputSchema>;

export async function suggestEventTags(input: SuggestEventTagsInput): Promise<SuggestEventTagsOutput> {
  return suggestEventTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestEventTagsPrompt',
  input: {schema: SuggestEventTagsInputSchema},
  output: {schema: SuggestEventTagsOutputSchema},
  prompt: `You are an expert at suggesting relevant tags for events.

  Given the following event description, suggest up to 5 tags that would be most relevant to help users find this event.
  Return the tags as a JSON array of strings.

  Event Description: {{{eventDescription}}}`,
});

const suggestEventTagsFlow = ai.defineFlow(
  {
    name: 'suggestEventTagsFlow',
    inputSchema: SuggestEventTagsInputSchema,
    outputSchema: SuggestEventTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      console.warn('AI did not produce valid output for suggestEventTagsFlow. Returning empty tags.');
      return { tags: [] };
    }
    return output;
  }
);
