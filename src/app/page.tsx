
import { cvData } from '@/lib/cv-data';
import Header from '@/components/cv/header';
import ProfessionalSummary from '@/components/cv/professional-summary';
import TechnologySummary from '@/components/cv/technology-summary';
import WorkExperience from '@/components/cv/work-experience';
import Education from '@/components/cv/education';
import Internship from '@/components/cv/internship';
import InformalEducation from '@/components/cv/informal-education';
import Volunteering from '@/components/cv/volunteering';
import Footer from '@/components/cv/footer';
import { Toaster } from "@/components/ui/toaster";

export default function PortfolioPage() {
  return (
    <div className="bg-background font-body text-foreground min-h-screen">
      <Header name={cvData.name} contact={cvData.contact} />
      <main className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8 space-y-16">
        <ProfessionalSummary summary={cvData.summary} />
        <TechnologySummary technologies={cvData.technologies} />
        <WorkExperience experiences={cvData.workExperience} />
        <Education education={cvData.education} />
        <Internship internship={cvData.internship} />
        <InformalEducation informalEducation={cvData.informalEducation} />
        <Volunteering volunteering={cvData.volunteering} />
      </main>
      <Footer name={cvData.name} />
      <Toaster />
    </div>
  );
}
