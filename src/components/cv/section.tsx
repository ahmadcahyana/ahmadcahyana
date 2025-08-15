
import type { ReactNode } from 'react';

type SectionProps = {
  title: string;
  children: ReactNode;
};

export default function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h2 className="text-3xl font-bold font-headline mb-6 border-b-2 border-primary pb-2">{title}</h2>
      {children}
    </section>
  );
}
