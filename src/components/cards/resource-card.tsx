
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Download, Tag, Layers, Sparkles, PlusCircle, TextQuote } from 'lucide-react';
import type { Resource } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, type FC } from 'react';
import { suggestResourceTags } from '@/ai/flows/suggest-resource-tags';
import { summarizeContent } from '@/ai/flows/summarize-content-flow';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { toast } = useToast();
  const [suggestedAiTags, setSuggestedAiTags] = useState<string[] | null>(null);
  const [isSuggestingAiTags, setIsSuggestingAiTags] = useState(false);
  const [userAddedAiTags, setUserAddedAiTags] = useState<string[]>([]);

  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSuggestAiTags = async () => {
    setIsSuggestingAiTags(true);
    setSuggestedAiTags(null);
    try {
      const result = await suggestResourceTags({ resourceDescription: resource.description });
      if (result && result.tags && result.tags.length > 0) {
        setSuggestedAiTags(result.tags);
      } else {
        setSuggestedAiTags([]);
         toast({ title: "AI Tag Suggestion", description: "No new tags were suggested by the AI for this resource." });
      }
    } catch (error) {
      console.error("Error suggesting AI tags for resource:", error);
      setSuggestedAiTags([]);
      toast({ variant: "destructive", title: "AI Suggestion Error", description: "Could not fetch AI tag suggestions for the resource." });
    } finally {
      setIsSuggestingAiTags(false);
    }
  };

  const handleAddAiTag = (tagToAdd: string) => {
    if (!resource.tags.includes(tagToAdd) && !userAddedAiTags.includes(tagToAdd)) {
      setUserAddedAiTags(prevTags => [...prevTags, tagToAdd]);
    }
  };

  const handleSummarizeContent = async () => {
    setIsSummarizing(true);
    setAiSummary(null);
    try {
      const result = await summarizeContent({ contentToSummarize: resource.description });
      if (result && result.summary) {
        setAiSummary(result.summary);
        toast({ title: "AI Summary Generated", description: "A summary has been generated for this resource." });
      } else {
        toast({ title: "AI Summary", description: "The AI could not generate a summary for this resource." });
      }
    } catch (error) {
      console.error("Error summarizing content for resource:", error);
      toast({ variant: "destructive", title: "AI Summary Error", description: "Could not generate AI summary for the resource." });
    } finally {
      setIsSummarizing(false);
    }
  };

  const allDisplayTags = Array.from(new Set([...resource.tags, ...userAddedAiTags]));

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_25px_hsl(var(--primary)/0.3)]">
      {resource.imageUrl && (
         <div className="relative w-full h-40">
          <Image
            src={resource.imageUrl}
            alt={resource.title}
            fill
            className="object-cover"
            data-ai-hint={resource.imageHint || "resource abstract"}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg font-headline">{resource.title}</CardTitle>
        <CardDescription className="flex items-center text-sm text-muted-foreground">
            <Layers className="mr-2 h-4 w-4" /> Category: {resource.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm mb-2">{resource.description}</p>
        {aiSummary && (
          <div className="mt-2 mb-3 p-3 bg-muted/50 rounded-md">
            <h4 className="text-xs font-semibold mb-1 text-muted-foreground flex items-center"><TextQuote className="mr-1.5 h-4 w-4 text-accent" /> AI Generated Summary:</h4>
            <p className="text-xs italic">{aiSummary}</p>
          </div>
        )}
         <Button asChild variant="outline" className="w-full">
            <Link href={resource.downloadUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" /> Download ({resource.type.toUpperCase()})
            </Link>
          </Button>
        
        <Separator />
        <div className="space-y-2">
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
                  const isAlreadyPresent = resource.tags.includes(tag);
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
             <p className="text-xs text-muted-foreground mt-2">AI did not suggest any new tags for this resource.</p>
           )}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        {allDisplayTags && allDisplayTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allDisplayTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="mr-1 h-3 w-3" /> {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
