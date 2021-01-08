export interface AboutPage {
    id: number | string;
    url: string;
    heading: string;
    title: string;
    intro: string;
    body: string | null;
    content: any[] | any | null;
    languages: string | undefined;
    order?: number | undefined;
}