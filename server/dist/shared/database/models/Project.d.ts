import { Model } from 'sequelize';
export interface ProjectAttributes {
    id: string;
    slug: string;
    title: Record<string, string>;
    description: Record<string, string> | null;
    location: Record<string, string> | null;
    year: number | null;
    images: string[];
    beforeImage: string | null;
    afterImage: string | null;
    videoUrl: string | null;
    productIds: string[];
    category: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    id: string;
    slug: string;
    title: Record<string, string>;
    description: Record<string, string> | null;
    location: Record<string, string> | null;
    year: number | null;
    images: string[];
    beforeImage: string | null;
    afterImage: string | null;
    videoUrl: string | null;
    productIds: string[];
    category: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=Project.d.ts.map