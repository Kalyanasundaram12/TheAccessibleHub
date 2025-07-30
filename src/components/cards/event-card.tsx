
'use client';

import Link from 'next/link';
import { CalendarDays, Download, Youtube, Tag, Sparkles, PlusCircle, TextQuote, Eye } from 'lucide-react';
import type { Event, EventResource } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { YouTubeEmbed } from '@/components/ui/youtube-embed';
import { Separator } from '../ui/separator';
import { incrementDownloadCount } from '@/lib/tracking';
import { useState, useEffect } from 'react';
import { suggestEventTags } from '@/ai/flows/suggest-event-tags';
import { summarizeContent } from '@/ai/flows/summarize-content-flow';
import { useToast } from '@/hooks/use-toast';
import { getYouTubeViewCount } from '@/app/actions/youtubeActions';
import { Skeleton } from '../ui/skeleton';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export function EventCard({ event, featured = false }: EventCardProps) {
  const { toast } = useToast();

  const [suggestedAiTags, setSuggestedAiTags] = useState<string[] | null>(null);
  const [isSuggestingAiTags, setIsSuggestingAiTags] = useState(false);
  const [userAddedAiTags, setUserAddedAiTags] = useState<string[]>([]);
  
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  
  const [formattedEventDate, setFormattedEventDate] = useState<string | null>(null);
  const [isEventUpcoming, setIsEventUpcoming] = useState<boolean | null>(null);

  const [youtubeViewCount, setYoutubeViewCount] = useState<number | null>(null);
  const [isLoadingViews, setIsLoadingViews] = useState(false);

  useEffect(() => {
    // This effect runs only on the client after hydration
    const date = new Date(event.date);
    setFormattedEventDate(date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
    setIsEventUpcoming(date > new Date());

    if (event.youtubeVideoId && !featured) {
      const fetchViewCount = async () => {
        setIsLoadingViews(true);
        const views = await getYouTubeViewCount(event.youtubeVideoId!);
        setYoutubeViewCount(views);
        setIsLoadingViews(false);
      };
      fetchViewCount();
    }
  }, [event.date, event.youtubeVideoId, featured]);

  const handleResourceDownloadClick = (resource: EventResource) => {
    incrementDownloadCount();
  };

  const handleSuggestAiTags = async () => {
    setIsSuggestingAiTags(true);
    setSuggestedAiTags(null);
    try {
      const result = await suggestEventTags({ eventDescription: event.description + (event.longDescription ? ' ' + event.longDescription : '') });
      if (result && result.tags && result.tags.length > 0) {
        setSuggestedAiTags(result.tags);
      } else {
        setSuggestedAiTags([]);
        toast({ title: "AI Tag Suggestion", description: "No new tags were suggested by the AI for this event." });
      }
    } catch (error) {
      console.error("Error suggesting AI tags for event:", error);
      setSuggestedAiTags([]);
      toast({ variant: "destructive", title: "AI Suggestion Error", description: "Could not fetch AI tag suggestions for the event." });
    } finally {
      setIsSuggestingAiTags(false);
    }
  };

  const handleAddAiTag = (tagToAdd: string) => {
    if (!event.tags.includes(tagToAdd) && !userAddedAiTags.includes(tagToAdd)) {
      setUserAddedAiTags(prevTags => [...prevTags, tagToAdd]);
    }
  };

  const handleSummarizeContent = async () => {
    setIsSummarizing(true);
    setAiSummary(null);
    try {
      const contentToSummarize = event.longDescription || event.description;
      const result = await summarizeContent({ contentToSummarize });
      if (result && result.summary) {
        setAiSummary(result.summary);
        toast({ title: "AI Summary Generated", description: "A summary has been generated for this event." });
      } else {
        setAiSummary(''); // Ensure aiSummary is not null if API returns empty summary
        toast({ title: "AI Summary", description: "The AI could not generate a summary for this event." });
      }
    } catch (error) {
      console.error("Error summarizing content for event:", error);
      toast({ variant: "destructive", title: "AI Summary Error", description: "Could not generate AI summary for the event." });
    } finally {
      setIsSummarizing(false);
    }
  };
  
  const allDisplayTags = Array.from(new Set([...event.tags, ...userAddedAiTags]));
  const displayDescription = featured ? event.description : (event.description.length > 100 ? event.description.substring(0, 100) + "..." : event.description);

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)] hover:border-primary/50">
      {event.youtubeVideoId && (
        <div className="relative w-full aspect-video">
          <YouTubeEmbed videoId={event.youtubeVideoId} title={event.title} />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-headline">{event.title}</CardTitle>
        <CardDescription className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          {formattedEventDate ? formattedEventDate : 'Loading date...'}
          {isEventUpcoming === true && <Badge variant="outline" className="ml-2 bg-accent/20 text-accent-foreground">Upcoming</Badge>}
          {isEventUpcoming === false && <Badge variant="secondary" className="ml-2">Past</Badge>}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm">{displayDescription}</p>
        
        {(!featured && event.longDescription && event.description.length <= 100) && <p className="text-sm">{event.longDescription}</p>}

        {aiSummary && !featured && (
          <div className="mt-3 p-3 bg-muted/50 rounded-md">
            <h4 className="text-xs font-semibold mb-1 text-muted-foreground flex items-center"><TextQuote className="mr-1.5 h-4 w-4 text-accent" /> AI Generated Summary:</h4>
            <p className="text-xs italic">{aiSummary}</p>
          </div>
        )}
        
        {!featured && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center text-sm text-muted-foreground">
              {isLoadingViews ? (
                <Skeleton className="h-4 w-16" />
              ) : (
                youtubeViewCount !== null && (
                  <>
                    <Eye className="mr-1.5 h-4 w-4" />
                    {youtubeViewCount.toLocaleString()} views
                  </>
                )
              )}
            </div>
          </div>
        )}

        {event.resources && event.resources.length > 0 && !featured && (
          <div>
            <h3 className="text-md font-semibold mb-2 flex items-center"><Download className="mr-2 h-5 w-5"/> Resources</h3>
            <ul className="space-y-1">
              {event.resources.map((resource, index) => (
                <li key={index}>
                  <Button variant="link" asChild className="p-0 h-auto text-sm">
                    <Link 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => handleResourceDownloadClick(resource)}
                    >
                      {resource.name} ({resource.type.toUpperCase()})
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <Separator />
        <div className="space-y-2">
          {!featured && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSummarizeContent}
              disabled={isSummarizing}
              className="w-full"
            >
              <TextQuote className="mr-2 h-4 w-4" />
              {isSummarizing ? 'Generating Summary...' : 'Summarize with AI'}
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSuggestAiTags} 
            disabled={isSuggestingAiTags}
            className="w-full"
          >
            <Sparkles className="mr-2 h-4 w-4" /> 
            {isSuggestingAiTags ? 'Suggesting Tags...' : 'Suggest Tags with AI'}
          </Button>
          {suggestedAiTags && suggestedAiTags.length > 0 && (
            <div className="mt-3">
              <h4 className="text-xs font-semibold mb-1 text-muted-foreground">AI Suggested Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {suggestedAiTags.map((tag, index) => {
                  const isAlreadyPresent = event.tags.includes(tag);
                  const isAddedByUser = userAddedAiTags.includes(tag);
                  const canAdd = !isAlreadyPresent && !isAddedByUser;

                  return (
                    <div key={index} className="flex items-center gap-1 py-0.5">
                      <Badge variant="outline" className="text-xs bg-primary/10 border-primary/50">
                        {tag}
                      </Badge>
                      {canAdd && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-5 w-5 p-0"
                          onClick={() => handleAddAiTag(tag)}
                          aria-label={`Add tag ${tag}`}
                        >
                          <PlusCircle className="h-4 w-4 text-accent hover:text-accent/80" />
                        </Button>
                      )}
                      {isAddedByUser && !isAlreadyPresent && (
                         <Badge variant="default" className="text-xs ml-1 cursor-default">Added</Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
           {suggestedAiTags && suggestedAiTags.length === 0 && !isSuggestingAiTags && (
             <p className="text-xs text-muted-foreground mt-2">AI did not suggest any new tags for this event.</p>
           )}
        </div>

      </CardContent>
      <CardFooter className="flex-col items-start pt-4">
        {allDisplayTags && allDisplayTags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {allDisplayTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="mr-1 h-3 w-3" /> {tag}
              </Badge>
            ))}
          </div>
        )}
        {featured && (
           <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
             <Link href={`/works#${event.id}`}>View Work Details</Link>
           </Button>
        )}
         {!featured && <Separator className="my-2" />}
      </CardFooter>
    </Card>
  );
}

    