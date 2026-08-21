import { MediaAsset } from '../../shared/database/models';
export declare class MediaService {
    list(): Promise<MediaAsset[]>;
    createFromUpload(file: Express.Multer.File): Promise<MediaAsset>;
}
export declare const mediaService: MediaService;
//# sourceMappingURL=media.service.d.ts.map