
'use client';

import React, { useState, useMemo } from 'react';
import { mockResources } from '@/data/mock-data';
import { ResourceCard } from '@/components/cards/resource-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  const categories = useMemo(() => {
    const allCategories = new Set(mockResources.map(res => res.category));
    return ['all', ...Array.from(allCategories)];
  }, []);

  const tags = useMemo(() => {
    const allTags = new Set(mockResources.flatMap(res => res.tags));
    return ['all', ...Array.from(allTags)];
  }, []);

  const filteredResources = useMemo(() => {
    return mockResources.filter(resource => {
      const matchesSearchTerm = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || resource.tags.includes(selectedTag);
      return matchesSearchTerm && matchesCategory && matchesTag;
    });
  }, [searchTerm, selectedCategory, selectedTag]);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-headline mb-4 text-primary">Resource Library</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of guides, workshop notes, presentations, and more to deepen your AI knowledge.
        </p>
      </section>

      <section className="space-y-6 p-6 bg-card rounded-lg shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              aria-label="Search resources"
            />
          </div>
          <div>
            <label htmlFor="category-filter" className="block text-sm font-medium text-foreground mb-1">Filter by Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-filter" className="w-full" aria-label="Filter by category">
                 <Filter className="mr-2 h-4 w-4 opacity-50" />
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div>
            <label htmlFor="tag-filter" className="block text-sm font-medium text-foreground mb-1">Filter by Tag</label>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger id="tag-filter" className="w-full" aria-label="Filter by tag">
                 <Filter className="mr-2 h-4 w-4 opacity-50" />
                <SelectValue placeholder="Select tag" />
              </SelectTrigger>
              <SelectContent>
                {tags.map(tag => (
                  <SelectItem key={tag} value={tag}>
                    {tag === 'all' ? 'All Tags' : tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section>
        {filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg py-8">
            No resources found matching your criteria. Try adjusting your filters.
          </p>
        )}
      </section>
    </div>
  );
}
