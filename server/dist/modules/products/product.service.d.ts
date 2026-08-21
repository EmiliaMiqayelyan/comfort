import { Product } from '../../shared/database/models';
export declare class ProductService {
    list(query: Record<string, string | undefined>): Promise<Product[]>;
    getBySlugOrId(slugOrId: string): Promise<Product>;
    create(data: Record<string, unknown>): Promise<Product>;
    update(id: string, data: Record<string, unknown>): Promise<Product>;
    delete(id: string): Promise<void>;
}
export declare const productService: ProductService;
//# sourceMappingURL=product.service.d.ts.map