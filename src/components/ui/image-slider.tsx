
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface ImageSliderProps {
  imageUrls: string[];
  interval?: number;
}

export function ImageSlider({ imageUrls, interval = 5000 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, imageUrls.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === imageUrls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, imageUrls.length]);

  useEffect(() => {
    if (imageUrls.length > 1) {
      const autoPlay = setInterval(goToNext, interval);
      return () => clearInterval(autoPlay);
    }
  }, [goToNext, interval, imageUrls.length]);

  if (!imageUrls || imageUrls.length === 0) {
    return <div className="w-full h-full bg-muted flex items-center justify-center">No Images</div>;
  }

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <div
        className="flex transition-transform ease-in-out duration-500 h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imageUrls.map((url, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full relative">
            <Image
              src={url}
              alt={`Event image ${index + 1}`}
              fill
              className="object-cover"
              data-ai-hint="event photo"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {imageUrls.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="absolute top-1/2 -translate-y-1/2 left-2 rounded-full h-8 w-8 bg-black/30 text-white border-none opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="absolute top-1/2 -translate-y-1/2 right-2 rounded-full h-8 w-8 bg-black/30 text-white border-none opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {imageUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  'h-2 w-2 rounded-full bg-white/50 transition-all',
                  currentIndex === index ? 'w-4 bg-white' : 'hover:bg-white/75'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
