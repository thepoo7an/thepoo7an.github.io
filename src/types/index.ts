export type CategoryKey = 
  | 'all' 
  | 'typography' 
  | 'music_visuals' 
  | 'lyric_video' 
  | 'visual_editing';

export interface PortfolioCategory {
  key: CategoryKey;
  labelFa: string;
  labelEn: string;
}

export interface PortfolioItem {
  id: string;
  reelId: string;
  instagramUrl?: string;
  number: string;
  title: string;
  description: string;
  primaryImage: string;
  category: CategoryKey;
  categoryLabel: string;
  views: string;
  viewsCount: number;
  tags: string[];
}

export interface ServiceItem {
  num: string;
  title: string;
  titleEn?: string;
  description: string;
  descEn?: string;
  iconType: 'type' | 'video' | 'sparkle' | 'instagram';
}

export interface SocialLink {
  id: string;
  title: string;
  titleEn?: string;
  handle: string;
  description: string;
  descEn?: string;
  url: string;
  type: 'instagram' | 'telegram' | 'email';
}
