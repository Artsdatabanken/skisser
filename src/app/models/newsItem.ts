import { FeaturedImage } from './featuredImage';

export interface NewsItem {
    url: string;
    title: string;
    date: Date;
    content: string;
    excerpt: string;
    //tags: string | string[] | null;
    imgUrl: string | null;
    featuredImage: FeaturedImage
  }