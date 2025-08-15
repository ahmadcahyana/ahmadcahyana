
import { cvData } from '@/lib/cv-data';
import Section from './section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';

type TechnologySummaryProps = {
  technologies: Record<string, string[]>;
}

export default function TechnologySummary({ technologies }: TechnologySummaryProps) {
  const techIcons = cvData.techIcons;
  return (
    <Section title="Technology Summary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(technologies).map(([category, skills]) => {
          const Icon = techIcons[category] as LucideIcon | undefined;
          return (
            <Card key={category}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {Icon && <Icon className="h-5 w-5 text-primary" />}
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </Section>
  );
}
