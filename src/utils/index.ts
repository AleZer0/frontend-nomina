class Utils {
    static formatDateDDMMYYYY = (dateInput: string | Date): string => {
        // Convierte el parámetro en objeto Date
        const date = new Date(dateInput);

        // Extrae día, mes y año
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
                    acc[key] = isNaN(dateValue.getTime()) ? data[key] : dateValue.toISOString().split('T')[0];
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
}

export default Utils;
