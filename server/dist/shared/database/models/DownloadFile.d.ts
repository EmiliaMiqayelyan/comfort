import { Model } from 'sequelize';
export interface DownloadFileAttributes {
    id: string;
    filename: string;
    title: Record<string, string>;
    category: string | null;
    url: string;
    fileSize: string | null;
    downloadable: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class DownloadFile extends Model<DownloadFileAttributes> implements DownloadFileAttributes {
    id: string;
    filename: string;
    title: Record<string, string>;
    category: string | null;
    url: string;
    fileSize: string | null;
    downloadable: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=DownloadFile.d.ts.map