export interface UserInterface {
    id_usuario: number;
    nombre_usuario: string;
}

export interface EmployeeInterface {
    id_empleado: number;
    nombre: string;
    apellido: string;
    fecha_incorporacion?: string;
    departamento?: string;
    puesto: string;
    sueldo?: number;
    created_at?: string;
    updated_at?: string;
    estado?: number;
    nomina?: PayrollInterface[];
    prestamos?: LoanInterface[];
    ultima_nomina?: number;
}

export interface PaymentInterface {
    id_abono: number;
    id_prestamo: number;
    monto_abonado: number;
    fecha: string;
    created_at?: string;
}

export interface LoanInterface {
    id_prestamo: number;
    id_empleado: number;
    monto_total: number;
    saldo_pendiente: number;
    estado?: number;
    created_at?: string;
    updated_at?: string;
    abonos?: PaymentInterface[];
    empleado?: string;
    ultimo_abono?: number;
}

export interface PayrollInterface {
    folio: number;
    fecha: string | null;
    dias_trabajados: number;
    infonavit?: number;
    vacaciones?: number;
    aguinaldo?: number;
    finiquito?: number;
    sueldo: number;
    pension_alimenticia?: number;
    horas_extras?: number;
    pago_horas_extras?: number;
    maniobras?: number;
    otros?: number;
    id_empleado: number;
    created_at?: string;
    updated_at?: string;
    estado?: number;
    empleado?: EmployeeInterface;
    nominaAbonos?: PaymentPayrollInterface;
    prestamos?: number;
    ids_prestamos?: PrestamoAbono[];
}

export interface PaymentPayrollInterface {
    id_nomina: number;
    id_abono: number;
    monto: number;
    abono: PaymentInterface;
}

export interface PrestamoAbono {
    id_prestamo: number;
    monto_abonado: number;
}

export interface WeeklyReportData {
    semana: number;
    empleados_pagados: number;
    total_sueldos: number;
    total_vacaciones: number;
    total_aguinaldos: number;
    total_finiquitos: number;
    total_prestamos: number;
    total_infonavit: number;
    total_pension_alimenticia: number;
    total_pago_horas_extras: number;
    total_maniobras: number;
    total_otros: number;
    total_neto: number;
}

export interface ParamsInterface {
    estado: number;
    page: number;
    limit: number;
    order?: 'asc' | 'desc';
    sort_by?: string;
    q?: string;
    start_date?: string;
    end_date?: string;
    year?: number;
}

export interface MetaInterface {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    recordsPerPage?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}
