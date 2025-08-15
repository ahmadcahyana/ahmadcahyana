
import type { CvDataType } from '@/lib/cv-data';
import Section from './section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type VolunteeringProps = {
  volunteering: CvDataType['volunteering'];
}

export default function Volunteering({ volunteering }: VolunteeringProps) {
  return (
    <Section title="Volunteering">
      <Card>
        <CardHeader>
          <CardTitle>{volunteering.role}</CardTitle>
          <CardDescription>{volunteering.organization} | {volunteering.period}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{volunteering.description}</p>
        </CardContent>
      </Card>
    </Section>
  );
}
