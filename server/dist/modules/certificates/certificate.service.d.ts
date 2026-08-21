import { Certificate } from '../../shared/database/models';
export declare class CertificateService {
    list(): Promise<Certificate[]>;
    getById(id: string): Promise<Certificate>;
    create(data: Record<string, unknown>): Promise<Certificate>;
    update(id: string, data: Record<string, unknown>): Promise<Certificate>;
    delete(id: string): Promise<void>;
}
export declare const certificateService: CertificateService;
//# sourceMappingURL=certificate.service.d.ts.map