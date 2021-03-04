export interface Announcement {
    id: string;
    url: string;
    heading: string | null;
    title: string;
    updated: Date;
    published: Date;
    body: string;
    tags?: string | string[];
    icon?: string;
}

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
    imgUrl?: string;
    image?: any;
  }