
import type { InternshipType } from '@/lib/cv-data';
import Section from './section';
import ExperienceCard from './experience-card';

type InternshipProps = {
  internship: InternshipType;
}

export default function Internship({ internship }: InternshipProps) {
  return (
    <Section title="Internship">
      <div className="space-y-6">
        <ExperienceCard
          title={internship.role}
          subtitle={internship.company}
          period={internship.period}
          location={internship.location}
          details={internship.details}
        />
      </div>
    </Section>
  );
}
