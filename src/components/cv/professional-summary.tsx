
import Section from './section';

export default function ProfessionalSummary({ summary }: { summary: string }) {
  return (
    <Section title="Professional Summary">
      <p className="text-lg leading-relaxed">{summary}</p>
    </Section>
  );
}
