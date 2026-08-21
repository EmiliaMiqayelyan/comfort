import { Model } from 'sequelize';
export interface CertificateAttributes {
    id: string;
    title: Record<string, string>;
    issuer: string | null;
    year: number | null;
    fileUrl: string | null;
    image: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Certificate extends Model<CertificateAttributes> implements CertificateAttributes {
    id: string;
    title: Record<string, string>;
    issuer: string | null;
    year: number | null;
    fileUrl: string | null;
    image: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=Certificate.d.ts.map