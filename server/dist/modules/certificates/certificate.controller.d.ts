import { Request, Response } from 'express';
export declare class CertificateController {
    list(_req: Request, res: Response): Promise<void>;
    getOne(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
export declare const certificateController: CertificateController;
//# sourceMappingURL=certificate.controller.d.ts.map