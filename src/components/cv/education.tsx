
import type { EducationType } from '@/lib/cv-data';
import Section from './section';
import ExperienceCard from './experience-card';

type EducationProps = {
  education: EducationType;
}

export default function Education({ education }: EducationProps) {
  const educationDetails = [
    `<strong>${education.gpa}</strong>`,
    education.project.description,
    `<strong>Course Highlights:</strong> ${education.courses.join(', ')}`
  ];
  
  return (
    <Section title="Education">
       <div className="space-y-6">
        <ExperienceCard
            title={education.degree}
            subtitle={education.institution}
            period={education.graduation}
            details={educationDetails}
          />
      </div>
    </Section>
  );
}
