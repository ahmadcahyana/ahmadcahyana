
'use server';

import { prioritizeProjects, type PrioritizeProjectsInput, type PrioritizeProjectsOutput } from '@/ai/flows/prioritize-projects';

export async function getPrioritizedProjects(
  projects: string[], 
  userLocation: string, 
  userTechnicalInterests: string
): Promise<{ data: PrioritizeProjectsOutput | null, error: string | null }> {
  const input: PrioritizeProjectsInput = {
    projects,
    userLocation: userLocation || "Not specified",
    userTechnicalInterests: userTechnicalInterests || "Not specified",
  };

  if (projects.length === 0) {
    return { data: [], error: 'No projects to prioritize.' };
  }

  try {
    const prioritized = await prioritizeProjects(input);
    if (!prioritized || prioritized.length === 0) {
      return { data: null, error: 'AI could not prioritize projects. The model may have returned an empty response.' };
    }
    return { data: prioritized, error: null };
  } catch (error) {
    console.error('Error in prioritizeProjects flow:', error);
    return { data: null, error: 'An unexpected error occurred while prioritizing projects.' };
  }
}
