
'use server';
/**
 * @fileOverview A flow to generate concise summaries for given content.
 *
 * - summarizeContent - A function that generates a summary for a piece of text.
 * - SummarizeContentInput - The input type for the summarizeContent function.
 * - SummarizeContentOutput - The return type for the summarizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContentInputSchema = z.object({
  contentToSummarize: z
    .string()
    .describe('The text content for which to generate a summary.'),
});
export type SummarizeContentInput = z.infer<typeof SummarizeContentInputSchema>;

const SummarizeContentOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise, 1-2 sentence summary of the provided content.'),
});
export type SummarizeContentOutput = z.infer<typeof SummarizeContentOutputSchema>;

export async function summarizeContent(input: SummarizeContentInput): Promise<SummarizeContentOutput> {
  return summarizeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeContentPrompt',
  input: {schema: SummarizeContentInputSchema},
  output: {schema: SummarizeContentOutputSchema},
  prompt: `You are an expert at creating concise and informative summaries.

  Given the following content, generate a 1-2 sentence summary that captures the main points.

  Content: {{{contentToSummarize}}}`,
});

const summarizeContentFlow = ai.defineFlow(
  {
    name: 'summarizeContentFlow',
    inputSchema: SummarizeContentInputSchema,
    outputSchema: SummarizeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      console.warn('AI did not produce valid output for summarizeContentFlow. Returning empty summary.');
      return { summary: "" };
    }
    return output;
  }
);
