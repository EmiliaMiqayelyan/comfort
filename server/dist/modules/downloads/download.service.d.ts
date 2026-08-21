import { DownloadFile } from '../../shared/database/models';
export declare class DownloadService {
    list(publicOnly: boolean): Promise<DownloadFile[]>;
    getById(id: string): Promise<DownloadFile>;
    create(data: Record<string, unknown>): Promise<DownloadFile>;
    update(id: string, data: Record<string, unknown>): Promise<DownloadFile>;
    delete(id: string): Promise<void>;
}
export declare const downloadService: DownloadService;
//# sourceMappingURL=download.service.d.ts.map