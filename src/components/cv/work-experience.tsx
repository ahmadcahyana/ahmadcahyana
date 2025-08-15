
'use client';

import { useState, useTransition } from 'react';
import type { PrioritizeProjectsOutput } from '@/ai/flows/prioritize-projects';
import { getPrioritizedProjects } from '@/app/actions';
import type { WorkExperienceType } from '@/lib/cv-data';

import Section from './section';
import ExperienceCard from './experience-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type WorkExperienceProps = {
  experiences: WorkExperienceType[];
};

export default function WorkExperience({ experiences }: WorkExperienceProps) {
  const [prioritizedProjects, setPrioritizedProjects] = useState<PrioritizeProjectsOutput>([]);
  const [isPending, startTransition] = useTransition();
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState('');
  const { toast } = useToast();

  const allAchievements = experiences.flatMap(exp => exp.achievements);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(async () => {
      const { data, error } = await getPrioritizedProjects(allAchievements, location, interests);
      if (error) {
        toast({
          variant: "destructive",
          title: "AI Prioritization Failed",
          description: error,
        });
        setPrioritizedProjects([]);
      } else if (data) {
        setPrioritizedProjects(data);
         toast({
          title: "Projects Prioritized!",
          description: "Featured projects have been highlighted based on your input.",
        });
      }
    });
  };
  
  const topProjectDescriptions = prioritizedProjects
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3)
    .map(p => p.project);

  return (
    <Section title="Work Experience">
       <Card className="mb-8 bg-accent/20 border-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-6 w-6 text-primary" />
            AI-Powered Project Highlighting
          </CardTitle>
          <CardDescription>
            Tell me what you're looking for, and I'll use AI to highlight the most relevant projects. For example, try "San Francisco" and "Python backend for fintech".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="location">Your Location (or company location)</Label>
              <Input
                id="location"
                placeholder="e.g., San Francisco, remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Technical Interests</Label>
              <Input
                id="interests"
                placeholder="e.g., API development, Django, B2B"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full sm:col-span-2">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Prioritizing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Highlight Relevant Projects
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {prioritizedProjects.length > 0 && (
         <Alert className="mb-8 border-primary/50">
            <Sparkles className="h-4 w-4" />
            <AlertTitle className="font-headline">AI Analysis</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 space-y-1">
              {prioritizedProjects.slice(0, 3).map((p, i) => (
                <li key={i}><strong>{p.project}</strong> - {p.reason} (Score: {p.relevanceScore})</li>
              ))}
              </ul>
            </AlertDescription>
          </Alert>
      )}

      <div className="space-y-6">
        {experiences.map((exp, index) => {
          const isHighlighted = exp.achievements.some(ach => topProjectDescriptions.includes(ach));
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
