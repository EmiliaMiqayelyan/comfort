import { ContactMessage } from '../../shared/database/models';
export declare class ContactService {
    list(): Promise<ContactMessage[]>;
    create(data: Record<string, unknown>): Promise<ContactMessage>;
}
export declare const contactService: ContactService;
//# sourceMappingURL=contact.service.d.ts.map