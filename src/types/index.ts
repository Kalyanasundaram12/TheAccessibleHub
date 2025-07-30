
export interface EventResource {
  name: string;
  url: string;
  type: 'ppt' | 'pdf' | 'notes' | 'link' | 'blog';
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string or human-readable
  description: string;
  longDescription?: string;
  youtubeVideoId?: string;
  youtubeViewCount?: number;
  resources?: EventResource[];
  tags: string[];
  imageUrl?: string;
  imageHint?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  downloadUrl: string;
  type: 'ppt' | 'guide' | 'notes' | 'video' | 'article';
  tags: string[];
  imageUrl?: string;
  imageHint?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
  imageHint?: string;
  linkedinUrl?: string;
}

export interface Testimonial {
  id:string;
  name: string;
  role: string;
  testimonial: string;
  imageUrl: string;
  imageHint?: string;
}

export interface Podcast {
    id: string;
    title: string;
    episodeNumber: number;
    description: string;
    youtubeVideoId: string;
    spotifyUrl: string;
}

export interface OfflineEvent {
  id: string;
  name: string;
  location: string;
  date: string; // ISO 8601 format
  description: string;
  imageUrls: string[];
}
