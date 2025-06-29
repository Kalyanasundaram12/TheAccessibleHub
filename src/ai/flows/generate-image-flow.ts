
'use server';
/**
 * @fileOverview A flow to generate images from text prompts using AI.
 *
 * - generateImage - A function that generates an image based on a text prompt.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate an image from.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The generated image as a data URI. Format: 'data:image/png;base64,<encoded_data>'."
    ),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    try {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use the specified model for image generation
        prompt: input.prompt,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both
        },
      });

      if (media && media.url) {
        return {imageDataUri: media.url};
      } else {
        // This specific error is thrown if the AI response is valid but doesn't contain an image URL.
        let specificErrorDetail = 'Image generation did not return a valid media URL.';
        if (!media) {
          specificErrorDetail = 'Image generation failed: AI response did not include media data.';
        } else if (!media.url) {
          specificErrorDetail = 'Image generation failed: AI media data did not include a URL.';
        }
        throw new Error(specificErrorDetail);
      }
    } catch (error) {
      console.error('Error in generateImageFlow:', error);
      // Re-throw the error to be caught by the caller.
      // If it's an Error instance, re-throw it as is to preserve stack. Otherwise, wrap it.
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Failed to generate image due to an unexpected non-Error type throwable.');
      }
    }
  }
);
