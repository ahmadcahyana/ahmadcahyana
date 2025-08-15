
import type { CvDataType } from '@/lib/cv-data';
import Section from './section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Wrench } from 'lucide-react';

type InformalEducationProps = {
  informalEducation: CvDataType['informalEducation'];
}

export default function InformalEducation({ informalEducation }: InformalEducationProps) {
  return (
    <Section title="Informal Education">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              Seminars
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {informalEducation.seminars.map(item => <li key={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Workshops
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {informalEducation.workshops.map(item => <li key={item}>{item}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
