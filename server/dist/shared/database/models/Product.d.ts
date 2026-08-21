import { Model } from 'sequelize';
export interface ProductAttributes {
    id: string;
    slug: string;
    sku: string;
    name: Record<string, string>;
    description: Record<string, string> | null;
    categoryId: string;
    collectionId: string | null;
    images: string[];
    modelUrl: string | null;
    videoUrl: string | null;
    height: number;
    width: number;
    depth: number;
    length: number;
    material: string | null;
    finish: string | null;
    colors: unknown[];
    textures: unknown[];
    specs: unknown[];
    downloads: unknown[];
    price: number;
    featured: boolean;
    availability: 'in_stock' | 'limited' | 'preorder';
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Product extends Model<ProductAttributes> implements ProductAttributes {
    id: string;
    slug: string;
    sku: string;
    name: Record<string, string>;
    description: Record<string, string> | null;
    categoryId: string;
    collectionId: string | null;
    images: string[];
    modelUrl: string | null;
    videoUrl: string | null;
    height: number;
    width: number;
    depth: number;
    length: number;
    material: string | null;
    finish: string | null;
    colors: unknown[];
    textures: unknown[];
    specs: unknown[];
    downloads: unknown[];
    price: number;
    featured: boolean;
    availability: 'in_stock' | 'limited' | 'preorder';
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=Product.d.ts.map