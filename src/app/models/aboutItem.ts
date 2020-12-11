export interface AboutItem {
    url: string;
    slug: string;
    order: number;
    title: string;
    date: Date;
    content?: string | null;
    excerpt: string;
}