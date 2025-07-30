
'use client';

import React from 'react';
import { mockOfflineEvents } from '@/data/mock-data';
import { EventPreviewCard } from '@/components/cards/event-preview-card';

export default function ResourcesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline mb-4 text-primary">Our High Impacts Events</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Highlights from our in-person workshops, meetups, and conferences. Click on any event to see more.
        </p>
      </section>

      <section>
        {mockOfflineEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockOfflineEvents.map((event) => (
              <EventPreviewCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg py-8">
            No offline events to display at the moment. Please check back soon!
          </p>
        )}
      </section>
    </div>
  );
}
