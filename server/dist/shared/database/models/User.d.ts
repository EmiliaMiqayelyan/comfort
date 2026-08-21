import { Model } from 'sequelize';
export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'admin' | 'manager' | 'editor' | 'translator' | 'dealer';
    avatar: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class User extends Model<UserAttributes> implements UserAttributes {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: 'admin' | 'manager' | 'editor' | 'translator' | 'dealer';
    avatar: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
//# sourceMappingURL=User.d.ts.map