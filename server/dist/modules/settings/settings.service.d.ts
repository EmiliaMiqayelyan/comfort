export declare class SettingsService {
    getContact(): Promise<Record<string, unknown> | {
        phone: string;
        email: string;
        address: {
            en: string;
            ru: string;
            am: string;
        };
        workingHours: {
            en: string;
            ru: string;
            am: string;
        };
    }>;
    updateContact(value: Record<string, unknown>): Promise<Record<string, unknown>>;
}
export declare const settingsService: SettingsService;
//# sourceMappingURL=settings.service.d.ts.map