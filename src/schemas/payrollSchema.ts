import { z } from 'zod';

export const payrollSchema = z.object({
    fecha: z
        .string()
        .nonempty('La fecha es obligatoria.')
        .refine(val => !val || !isNaN(Date.parse(val)), {
            message: 'Fecha no válida',
        }),

    dias_trabajados: z
        .string()
        .nonempty('Los días laborados son obligatorios')
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'Los días laborados deben ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'Los días laborables deben ser mayores que cero' }),

    faltas: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'Los días no laborados deben ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'Los días no laborables deben ser mayores que cero' }),

    infonavit: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'El cobro por infonavit debe ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'El cobro por infonavit debe ser mayor que cero' }),

    vacaciones: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'El pago de vacaciones debe ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'El pago de vacaciones debe ser mayor que cero' }),

    aguinaldo: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'El pago aguinaldo debe ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'El pago de aguinaldo debe ser mayore que cero' }),

    finiquito: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'El pago de finiquito debe ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'El pago de finiquito debe ser mayor que cero' }),
    sueldo: z
        .string()
        .nonempty('El sueldo es obligatorio')
        .refine(val => !isNaN(Number(val)), {
            message: 'El sueldo debe ser un número mayor que cero',
        })
        .refine(val => Number(val) > 0, { message: 'El sueldo debe ser un número' }),

    pension_alimenticia: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'El cobro de pension alimenticia debe ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'El cobro de pension alimenticia debe ser mayor que cero' }),

    horas_extras: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'Los cantidad de horas extras deben ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'La cantidad de horas extras deben ser mayores que cero' }),

    pago_horas_extras: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'El pago de pago horas extras debe ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'El pago de pago horas extras debe ser mayor que cero' }),

    maniobras: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'El pago de pago maniobras debe ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'El pago de pago maniobras debe ser mayor que cero' }),

    otros: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'El pago de pago otros debe ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'El pago de pago otros debe ser mayor que cero' }),

    id_empleado: z
        .string()
        .nonempty('El empleado es obligatorio')
        .refine(val => !isNaN(Number(val)), {
            message: 'El valor debe ser un número válido',
        })
        .refine(val => Number(val) > 0, {
            message: 'Debes seleccionar un empleado válido',
        }),
});

export type PayrollFormData = z.infer<typeof payrollSchema>;
