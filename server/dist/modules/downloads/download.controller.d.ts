import { Request, Response } from 'express';
export declare class DownloadController {
    list(req: Request, res: Response): Promise<void>;
    getOne(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
export declare const downloadController: DownloadController;
//# sourceMappingURL=download.controller.d.ts.map