import { User } from '../../shared/database/models';
import { LoginDto } from './auth.dto';
export declare class AuthService {
    login(dto: LoginDto): Promise<{
        token: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: "admin" | "manager" | "editor" | "translator" | "dealer";
            avatar: string | null;
        };
    }>;
    me(userId: string): Promise<User>;
}
export declare const authService: AuthService;
//# sourceMappingURL=auth.service.d.ts.map