import { Model } from 'sequelize';
export interface SiteSettingAttributes {
    settingKey: string;
    settingValue: Record<string, unknown>;
}
export declare class SiteSetting extends Model<SiteSettingAttributes> implements SiteSettingAttributes {
    settingKey: string;
    settingValue: Record<string, unknown>;
}
//# sourceMappingURL=SiteSetting.d.ts.map