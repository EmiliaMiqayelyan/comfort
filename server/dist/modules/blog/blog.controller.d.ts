import { Request, Response } from 'express';
export declare class BlogController {
    list(_req: Request, res: Response): Promise<void>;
    getOne(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
export declare const blogController: BlogController;
//# sourceMappingURL=blog.controller.d.ts.map