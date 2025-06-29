import { mockTestimonials } from '@/data/mock-data';
import { TestimonialCard } from '@/components/cards/testimonial-card';
import { Quote } from 'lucide-react';

export default function TestimonialsPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline mb-4 text-primary flex items-center justify-center gap-3">
          <Quote className="h-8 w-8" /> Testimonials
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Hear what our community members have to say about their experience with The Accessible AI Hub.
        </p>
      </section>

      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
}
