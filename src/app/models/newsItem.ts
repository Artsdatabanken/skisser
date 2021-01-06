import { FeaturedImage } from './featuredImage';

export interface NewsItem {
  id: string;
  url: string;
  heading: string | null;
  title: string;
  created: Date;
  updated: Date;
  published: Date;
  body: string;
  intro: string;
  imgUrl: string | null;
  image: FeaturedImage | null;
}