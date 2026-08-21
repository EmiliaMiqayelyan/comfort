import { Category } from '../../shared/database/models';
export declare class CategoryService {
    list(): Promise<Category[]>;
    getBySlugOrId(slugOrId: string): Promise<Category>;
    create(data: Record<string, unknown>): Promise<Category>;
    update(id: string, data: Record<string, unknown>): Promise<Category>;
    delete(id: string): Promise<void>;
}
export declare const categoryService: CategoryService;
//# sourceMappingURL=category.service.d.ts.map