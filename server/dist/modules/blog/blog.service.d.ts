import { BlogPost } from '../../shared/database/models';
export declare class BlogService {
    list(): Promise<BlogPost[]>;
    getBySlugOrId(slugOrId: string): Promise<BlogPost>;
    create(data: Record<string, unknown>): Promise<BlogPost>;
    update(id: string, data: Record<string, unknown>): Promise<BlogPost>;
    delete(id: string): Promise<void>;
}
export declare const blogService: BlogService;
//# sourceMappingURL=blog.service.d.ts.map