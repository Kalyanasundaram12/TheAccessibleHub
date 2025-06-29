import Image from 'next/image';
import type { Testimonial } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col bg-card/80 hover:shadow-xl transition-shadow duration-300">
      <CardContent className="pt-6 flex-grow flex flex-col">
        <Quote className="w-8 h-8 text-accent mb-4" />
        <p className="text-muted-foreground italic flex-grow">&quot;{testimonial.testimonial}&quot;</p>
      </CardContent>
      <CardHeader className="flex-row items-center gap-4 pt-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.imageHint || "portrait person"} />
          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-card-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </CardHeader>
    </Card>
  );
}
