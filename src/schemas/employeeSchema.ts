import { z } from 'zod';

export const employeeSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio').max(100, 'El nombre es demasiado largo'),

    apellido: z.string().min(1, 'El apellido es obligatorio').max(100, 'El apellido es demasiado largo'),

    fecha_incorporacion: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Date.parse(val)), {
            message: 'Fecha no válida',
        }),

    departamento: z.string().max(100, 'El departamento es demasiado largo').optional(),

    puesto: z.string().min(1, 'El puesto es obligatorio').max(100, 'El puesto es demasiado largo'),

    dias_laborables: z
        .string()
        .optional()
        .refine(val => !val || !isNaN(Number(val)), {
            message: 'Los días laborables deben ser un número',
        })
        .refine(val => !val || Number(val) > 0, { message: 'Los días laborables deben ser mayores que cero' }),

    sueldo: z
        .string()
        .nonempty('El sueldo es obligatorio')
        .refine(val => !isNaN(Number(val)), {
            message: 'El sueldo debe ser un número mayor que cero',
        })
        .refine(val => Number(val) > 0, { message: 'El sueldo debe ser un número' }),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
