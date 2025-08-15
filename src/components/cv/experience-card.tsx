
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

type ExperienceCardProps = {
    title: string;
    subtitle: string;
    period?: string;
    location?: string;
    details: string[];
    highlight?: boolean;
}

export default function ExperienceCard({ title, subtitle, period, location, details, highlight = false }: ExperienceCardProps) {
    return (
        <Card className={cn("transition-all duration-300 w-full", highlight ? "border-primary ring-2 ring-primary/50 shadow-lg" : "")}>
            <CardHeader>
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <CardTitle className="text-xl font-headline">{title}</CardTitle>
                        <CardDescription className="text-base font-medium text-foreground/80">{subtitle}</CardDescription>
                        {period && location &&
                          <CardDescription className="text-sm mt-1">{period} | {location}</CardDescription>
                        }
                    </div>
                    {highlight && <Badge variant="default" className="bg-primary/90 flex-shrink-0">Featured by AI</Badge>}
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-3">
                    {details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
