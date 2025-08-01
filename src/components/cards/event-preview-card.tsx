
'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import type { OfflineEvent } from '@/types';
import { ImageSlider } from '../ui/image-slider';

interface EventPreviewCardProps {
  event: OfflineEvent;
}

export function EventPreviewCard({ event }: EventPreviewCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="relative w-full h-48">
            <ImageSlider imageUrls={event.imageUrls} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-lg font-bold text-white font-headline">{event.name}</h3>
              <div className="flex items-center text-xs text-white/90 gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
        <div className="grid md:grid-cols-2">
          <div className="h-80 md:h-[500px]">
            <ImageSlider imageUrls={event.imageUrls} />
          </div>
          <div className="p-6 flex flex-col">
            <DialogTitle asChild>
              <h2 className="text-2xl text-primary font-bold mb-4">{event.name}</h2>
            </DialogTitle>
            <div className="space-y-4 flex-grow">
              <div className="flex items-center text-muted-foreground gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              <p className="text-foreground/80">{event.description}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
