import { Model } from 'sequelize';
export interface CategoryAttributes {
    id: string;
    slug: string;
    name: Record<string, string>;
    description: Record<string, string> | null;
    image: string | null;
    parentId: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    id: string;
    slug: string;
    name: Record<string, string>;
    description: Record<string, string> | null;
    image: string | null;
    parentId: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    dataValues: CategoryAttributes & {
        product_count?: number;
    };
}
//# sourceMappingURL=Category.d.ts.map