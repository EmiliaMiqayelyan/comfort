import { Model } from 'sequelize';
export interface MediaAssetAttributes {
    id: string;
    name: string;
    type: 'image' | 'video' | 'pdf' | 'glb' | 'usdz' | 'texture';
    url: string;
    folder: string | null;
    size: number | null;
    createdAt?: Date;
}
export declare class MediaAsset extends Model<MediaAssetAttributes> implements MediaAssetAttributes {
    id: string;
    name: string;
    type: 'image' | 'video' | 'pdf' | 'glb' | 'usdz' | 'texture';
    url: string;
    folder: string | null;
    size: number | null;
    readonly createdAt: Date;
}
//# sourceMappingURL=MediaAsset.d.ts.map