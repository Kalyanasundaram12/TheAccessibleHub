
import { mockEvents } from '@/data/mock-data';
import { EventCard } from '@/components/cards/event-card';
import { Separator } from '@/components/ui/separator';

export default function WorksPage() {
  const upcomingEvents = mockEvents
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastEvents = mockEvents
    .filter(event => new Date(event.date) <= new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline mb-4 text-primary">Resources</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join our workshops, talks, and panel discussions. All works are designed to be accessible and informative.
        </p>
      </section>

      {upcomingEvents.length > 0 && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold font-headline mb-6">Upcoming Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} id={event.id} className="scroll-mt-20">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>
      )}

      {upcomingEvents.length > 0 && pastEvents.length > 0 && <Separator className="my-12" />}

      {pastEvents.length > 0 && (
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold font-headline mb-6">Past Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
               <div key={event.id} id={event.id} className="scroll-mt-20">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>
      )}

      {upcomingEvents.length === 0 && pastEvents.length === 0 && (
        <p className="text-center text-muted-foreground text-lg py-8">
          No works scheduled at the moment. Please check back soon!
        </p>
      )}
    </div>
  );
}

    