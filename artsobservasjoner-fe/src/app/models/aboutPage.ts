export interface AboutPage {
    id: number | string;
    url: string;
    heading: string;
    title: string;
    intro?: string | null | undefined;
    body: string | null;
    content?: AboutPage[] | null;
    languages: string | undefined;
    order?: number | undefined;
    expanded?: boolean;
}