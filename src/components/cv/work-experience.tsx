
'use client';

import { useState } from 'react';
// Note: AI functionality disabled for GitHub Pages static export
// import type { PrioritizeProjectsOutput } from '@/ai/flows/prioritize-projects';
import type { WorkExperienceType } from '@/lib/cv-data';

import Section from './section';
import ExperienceCard from './experience-card';

type WorkExperienceProps = {
  experiences: WorkExperienceType[];
};

export default function WorkExperience({ experiences }: WorkExperienceProps) {
  // AI functionality disabled for static export
  // const [prioritizedProjects, setPrioritizedProjects] = useState<PrioritizeProjectsOutput>([]);

  // For static export, we'll highlight the first few experiences or use a simple algorithm
  const highlightedIndices = [0, 1]; // Highlight first two experiences

  return (
    <Section title="Work Experience">
      <div className="space-y-6">
        {experiences.map((exp, index) => {
          // Simple highlighting logic for static export
          const isHighlighted = highlightedIndices.includes(index);
          return (
            <ExperienceCard
              key={index}
              title={exp.role}
              subtitle={exp.company}
              period={exp.period}
              location={exp.location}
              details={exp.achievements}
              highlight={isHighlighted}
            />
          );
        })}
      </div>
    </Section>
  );
}
