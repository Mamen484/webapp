import { SearchArticleLinks } from './search-article-links';

export interface SearchArticlesEntry {
    id: number,
    locale?: string | null;
    subject: string;
    body: string;
    body_email: string;
    body_email_auto: boolean;
    body_chat: string;
    body_chat_auto: boolean;
    body_web_callback: string;
    body_web_callback_auto: boolean;
    body_twitter: string;
    body_twitter_auto: boolean;
    body_qna: string;
    body_qna_auto: boolean;
    body_phone: string;
    body_phone_auto: boolean;
    body_facebook: string;
    body_facebook_auto: boolean;
    rating: number;
    rating_count: number;
    rating_score: number;
    keywords: string;
    position: number;
    quickcode: string | null,
    publish_at: string;
    updated_at: string;
    created_at: string;
    in_support_center: boolean;
    internal_notes: string;
    public_url: string;
    _links: SearchArticleLinks
}
