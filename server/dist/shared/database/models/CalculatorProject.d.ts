import { Model } from 'sequelize';
export interface CalculatorProjectAttributes {
    id: string;
    userEmail: string | null;
    inputJson: Record<string, unknown>;
    resultJson: Record<string, unknown>;
    createdAt?: Date;
}
export declare class CalculatorProject extends Model<CalculatorProjectAttributes> implements CalculatorProjectAttributes {
    id: string;
    userEmail: string | null;
    inputJson: Record<string, unknown>;
    resultJson: Record<string, unknown>;
    readonly createdAt: Date;
}
//# sourceMappingURL=CalculatorProject.d.ts.map