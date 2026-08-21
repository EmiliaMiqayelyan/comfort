import { Model } from 'sequelize';
export interface ContactMessageAttributes {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    message: string;
    createdAt?: Date;
}
export declare class ContactMessage extends Model<ContactMessageAttributes> implements ContactMessageAttributes {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    message: string;
    readonly createdAt: Date;
}
//# sourceMappingURL=ContactMessage.d.ts.map