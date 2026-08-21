import { Collection } from '../../shared/database/models';
export declare class CollectionService {
    list(): Promise<Collection[]>;
    getBySlugOrId(slugOrId: string): Promise<Collection>;
    create(data: Record<string, unknown>): Promise<Collection>;
    update(id: string, data: Record<string, unknown>): Promise<Collection>;
    delete(id: string): Promise<void>;
}
export declare const collectionService: CollectionService;
//# sourceMappingURL=collection.service.d.ts.map