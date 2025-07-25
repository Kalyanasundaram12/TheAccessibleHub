
import { mockPodcasts } from '@/data/mock-data';
import { PodcastCard } from '@/components/cards/podcast-card';
import { Mic } from 'lucide-react';

export default function PodcastsPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline mb-4 text-primary flex items-center justify-center gap-3">
          <Mic className="h-8 w-8" /> Podcasts
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Listen to our latest discussions on AI, ethics, and technology on your favorite platform.
        </p>
      </section>

      <section>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>
    </div>
  );
}
