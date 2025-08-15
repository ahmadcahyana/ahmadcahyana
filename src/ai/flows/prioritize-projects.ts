// prioritize-projects.ts
'use server';
/**
 * @fileOverview AI-powered project prioritization based on user location and technical interests.
 *
 * - prioritizeProjects - A function that prioritizes projects based on location and technical interests.
 * - PrioritizeProjectsInput - The input type for the prioritizeProjects function.
 * - PrioritizeProjectsOutput - The return type for the prioritizeProjects function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeProjectsInputSchema = z.object({
  projects: z.array(z.string()).describe('A list of project descriptions.'),
  userLocation: z.string().optional().describe('The user\u2019s location.'),
  userTechnicalInterests: z
    .string()
    .optional()
    .describe('The user\u2019s technical interests.'),
});
export type PrioritizeProjectsInput = z.infer<typeof PrioritizeProjectsInputSchema>;

const PrioritizeProjectsOutputSchema = z.array(
  z.object({
    project: z.string().describe('The project description.'),
    relevanceScore: z.number().describe('The relevance score for the project.'),
    reason: z.string().describe('The reason for the relevance score.'),
  })
);
export type PrioritizeProjectsOutput = z.infer<typeof PrioritizeProjectsOutputSchema>;

export async function prioritizeProjects(input: PrioritizeProjectsInput): Promise<PrioritizeProjectsOutput> {
  return prioritizeProjectsFlow(input);
}

const prioritizeProjectsPrompt = ai.definePrompt({
  name: 'prioritizeProjectsPrompt',
  input: {schema: PrioritizeProjectsInputSchema},
  output: {schema: PrioritizeProjectsOutputSchema},
  prompt: `You are an AI expert in prioritizing software engineering projects based on user context.

Given the following projects:
{{#each projects}}
- {{{this}}}
{{/each}}

And the following user context:
Location: {{userLocation}}
Technical Interests: {{userTechnicalInterests}}

Prioritize the projects based on their relevance to the user's location and technical interests.  The output should be a JSON array, where each element contains the project, a relevance score (0-100), and a short reason for the score.
`,
});

const prioritizeProjectsFlow = ai.defineFlow(
  {
    name: 'prioritizeProjectsFlow',
    inputSchema: PrioritizeProjectsInputSchema,
    outputSchema: PrioritizeProjectsOutputSchema,
  },
  async input => {
    const {output} = await prioritizeProjectsPrompt(input);
    return output!;
  }
);
