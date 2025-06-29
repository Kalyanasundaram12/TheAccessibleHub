
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { mockEvents } from '@/data/mock-data';
import { EventCard } from '@/components/cards/event-card';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const featuredEvents = mockEvents.filter(event => new Date(event.date) > new Date()).slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-card rounded-lg shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-primary">
            Welcome to The Accessible AI Hub
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-4 max-w-3xl mx-auto">
            Prompt your path
          </p>
          <p className="text-md text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore events, resources, and join a community passionate about democratizing AI knowledge.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/events">Explore Events</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-bold font-headline mb-8 text-center">Featured Upcoming Events</h2>
        {featuredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} featured />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No upcoming events featured at the moment. Check back soon!</p>
        )}
        <div className="text-center mt-8">
          <Button variant="link" asChild className="text-primary hover:text-primary/80">
            <Link href="/events">
              View All Events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
