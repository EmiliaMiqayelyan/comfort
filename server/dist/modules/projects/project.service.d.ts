import { Project } from '../../shared/database/models';
export declare class ProjectService {
    list(): Promise<Project[]>;
    getBySlugOrId(slugOrId: string): Promise<Project>;
    create(data: Record<string, unknown>): Promise<Project>;
    update(id: string, data: Record<string, unknown>): Promise<Project>;
    delete(id: string): Promise<void>;
}
export declare const projectService: ProjectService;
//# sourceMappingURL=project.service.d.ts.map