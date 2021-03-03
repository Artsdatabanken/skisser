export interface Article {
    id: number;
    url: string; // blir laget sammen med id
    title: string;
    subtitle?: string;
    excerpt?: string;
    ingress?: string;
    created: Date;
    published: Date;
    updated: Date;
    body: string;
    image?: null
  }