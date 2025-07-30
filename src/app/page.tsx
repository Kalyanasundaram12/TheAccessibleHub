
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { mockEvents } from '@/data/mock-data';
import { EventCard } from '@/components/cards/event-card';
import { ArrowRight, Users, DownloadCloud, CalendarCheck } from 'lucide-react';

export default function HomePage() {
  const featuredEvents = mockEvents.filter(event => new Date(event.date) > new Date()).slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-card rounded-lg shadow-sm">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-primary">
            Welcome to The Accessible AI Hub
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-4 max-w-3xl mx-auto font-headline">
            Prompt your path
          </p>
          <p className="text-md text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore works, resources, and join a community passionate about democratizing AI knowledge.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/works">Explore Works</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative py-20 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,transparent_70%)]"></div>
        <div className="relative container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold font-headline mb-4 text-foreground">Our Community Impact</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">We are a growing community dedicated to making AI accessible to everyone.</p>
            <div className="flex justify-center">
                <div className="relative group w-full max-w-md">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative p-8 bg-card/80 backdrop-blur-md rounded-xl shadow-xl border border-border/20">
                      <div className="flex justify-center items-center mb-4">
                        <div className="p-3 bg-accent/20 rounded-full">
                          <Users className="h-12 w-12 text-accent drop-shadow-[0_0_8px_hsl(var(--accent))]"/>
                        </div>
                      </div>
                      <p 
                        className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground"
                        style={{textShadow: '0 2px 4px rgba(0,0,0,0.2)'}}
                      >
                        500+
                      </p>
                      <p className="text-xl text-foreground/80 mt-2 font-headline tracking-wide">
                        AAH Memberships
                      </p>
                    </div>
                </div>
            </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold font-headline mb-8 text-center">Featured Upcoming Works</h2>
        {featuredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} featured />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No upcoming works featured at the moment. Check back soon!</p>
        )}
        <div className="text-center mt-8">
          <Button variant="link" asChild className="text-primary hover:text-primary/80 group-hover:translate-x-0">
            <Link href="/works">
              View All Works <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

    