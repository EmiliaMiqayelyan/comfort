import { Model } from 'sequelize';
export interface BlogPostAttributes {
    id: string;
    slug: string;
    title: Record<string, string>;
    excerpt: Record<string, string> | null;
    content: Record<string, string> | null;
    coverImage: string | null;
    category: string | null;
    tags: string[];
    author: Record<string, unknown> | null;
    publishedAt: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class BlogPost extends Model<BlogPostAttributes> implements BlogPostAttributes {
    id: string;
    slug: string;
    title: Record<string, string>;
    excerpt: Record<string, string> | null;
    content: Record<string, string> | null;
    coverImage: string | null;
    category: string | null;
    tags: string[];
    author: Record<string, unknown> | null;
    publishedAt: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=BlogPost.d.ts.map