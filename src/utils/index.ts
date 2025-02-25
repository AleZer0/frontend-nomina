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
}

export default Utils;
