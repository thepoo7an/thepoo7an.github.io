export type CategoryKey = 
  | 'all' 
  | 'typography' 
  | 'music_visuals' 
  | 'lyric_video' 
  | 'visual_editing';

export interface WorkItem {
  id: string;
  category: CategoryKey;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  videoSrc: string;
  fallbackVideoSrcs?: string[];
  primarySrc: string;
  fallbackSrcs: string[];
  viewsFa: string;
  viewsEn: string;
}

export interface ServiceItem {
  id: string;
  planParam: string;
  badgeFa: string;
  badgeEn: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  featuresFa: string[];
  featuresEn: string[];
  ctaFa: string;
  ctaEn: string;
  delayClass: string;
}

export interface PricingPlan {
  id: string;
  planParam: string;
  titleFa: string;
  titleEn: string;
  priceFa: string;
  priceEn: string;
  whoFa: string;
  whoEn: string;
  isPopular?: boolean;
  flagFa?: string;
  flagEn?: string;
  featuresFa: string[];
  featuresEn: string[];
  ctaFa: string;
  ctaEn: string;
  delayClass: string;
}

export interface FAQItem {
  id: string;
  qFa: string;
  qEn: string;
  aFa: string;
  aEn: string;
}

export interface ProcessStep {
  id: string;
  stepNum: string;
  tagFa: string;
  tagEn: string;
  titleFa: string;
  titleEn: string;
  descFa: string;
  descEn: string;
  highlightFa: string;
  highlightEn: string;
  iconType: 'upload' | 'check-circle' | 'film';
}

