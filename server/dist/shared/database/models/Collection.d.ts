import { Model } from 'sequelize';
export interface CollectionAttributes {
    id: string;
    slug: string;
    name: Record<string, string>;
    description: Record<string, string> | null;
    image: string | null;
    style: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Collection extends Model<CollectionAttributes> implements CollectionAttributes {
    id: string;
    slug: string;
    name: Record<string, string>;
    description: Record<string, string> | null;
    image: string | null;
    style: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    dataValues: CollectionAttributes & {
        product_count?: number;
    };
}
//# sourceMappingURL=Collection.d.ts.map