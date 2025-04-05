class Utils {
    static formatDateDDMMYYYY = (dateInput: string | Date): string => {
        if (!dateInput) return 'Fecha no disponible';

        // Convierte el parámetro en un objeto Date
        const date = new Date(dateInput);

        // Ajuste de zona horaria para evitar desfase
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

        // Extrae día, mes y año después del ajuste
        const day = date.getDate(); // 1 - 31
        const month = date.getMonth() + 1; // 0 - 11 (por eso sumamos 1)
        const year = date.getFullYear(); // 2025, 2026, etc.

        // Asegura que día y mes tengan 2 dígitos
        const dayString = String(day).padStart(2, '0');
        const monthString = String(month).padStart(2, '0');

        // Retorna en formato DD/MM/YYYY
        return `${dayString}/${monthString}/${year}`;
    };

    static formatDates = (data: any): any => {
        if (Array.isArray(data)) {
            return data.map(item => Utils.formatDates(item)); // Si es un array, recorrerlo y formatear cada objeto.
        } else if (typeof data === 'object' && data !== null) {
            return Object.keys(data).reduce((acc, key) => {
                if (typeof data[key] === 'string' && data[key].includes('T')) {
                    const dateValue = new Date(data[key]);
                    if (!isNaN(dateValue.getTime())) {
                        // Ajuste de zona horaria para evitar desfase
                        dateValue.setMinutes(dateValue.getMinutes() + dateValue.getTimezoneOffset());
                        acc[key] = dateValue.toISOString().split('T')[0]; // Retorna YYYY-MM-DD corregido
                    } else {
                        acc[key] = data[key];
                    }
                } else if (Array.isArray(data[key]) || typeof data[key] === 'object') {
                    acc[key] = Utils.formatDates(data[key]); // Recursión para formatear fechas en objetos anidados.
                } else {
                    acc[key] = data[key];
                }
                return acc;
            }, {} as any);
        }
        return data;
    };

    /**
     * Ordena un array de objetos por un campo de tipo fecha.
     * @param array Array de objetos
     * @param campo Campo de fecha a ordenar (por ejemplo: 'fecha', 'created_at', etc.)
     * @param orden 'asc' (ascendente) o 'desc' (descendente)
     * @returns Array ordenado
     */
    static orderForDate = <T extends Record<string, any>>(
        array: T[],
        campo: keyof T,
        orden: 'asc' | 'desc' = 'asc'
    ): T[] => {
        return [...array].sort((a, b) => {
            const fechaA = new Date(a[campo] ?? '').getTime();
            const fechaB = new Date(b[campo] ?? '').getTime();

            if (isNaN(fechaA) || isNaN(fechaB)) return 0;

            return orden === 'asc' ? fechaA - fechaB : fechaB - fechaA;
        });
    };
}

export default Utils;
