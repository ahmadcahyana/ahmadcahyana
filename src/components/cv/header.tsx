
import type { CvDataType } from '@/lib/cv-data';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  name: string;
  contact: CvDataType['contact'];
}

export default function Header({ name, contact }: HeaderProps) {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto max-w-4xl p-4 flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-headline text-primary">{name}</h1>
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a href={`mailto:${contact.email}`} aria-label="Email">
              <Mail className="h-5 w-5" />
              <span className="hidden md:inline ml-2">{contact.email}</span>
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={`tel:${contact.phone.replace(/-/g, '')}`} aria-label="Phone">
              <Phone className="h-5 w-5" />
               <span className="hidden md:inline ml-2">{contact.phone}</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
