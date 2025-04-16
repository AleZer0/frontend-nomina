import { PayrollFormData } from '../schemas/payrollSchema';

type InputType = 'number' | 'text' | 'date';

export type TOption<Key extends keyof PayrollFormData = keyof PayrollFormData> = {
    key: Key;
    label: string;
    type: InputType;
};

export const General: TOption[] = [
    { key: 'faltas', label: 'Días no laborados', type: 'number' },
    { key: 'horas_extras', label: 'Horas extras laboradas', type: 'number' },
] as const;

export const Ganancias: TOption[] = [
    { key: 'vacaciones', label: 'Pago de vacaciones', type: 'number' },
    { key: 'aguinaldo', label: 'Pago de aguinaldo', type: 'number' },
    { key: 'finiquito', label: 'Pago de finiquito', type: 'number' },
    { key: 'pago_horas_extras', label: 'Pago de horas extras', type: 'number' },
    { key: 'maniobras', label: 'Pago de maniobras', type: 'number' },
    { key: 'otros', label: 'Pago de otros', type: 'number' },
] as const;

export const Deducciones: TOption[] = [
    { key: 'infonavit', label: 'Cobro de infonavit', type: 'number' },
    { key: 'pension_alimenticia', label: 'Cobro pensión alimenticia', type: 'number' },
] as const;
