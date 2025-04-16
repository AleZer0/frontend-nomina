export class StyleComponents {
    static formatFolio = (folio: number) => {
        return (
            <span className='inline-block rounded-full border border-gray-300 bg-gray-100 px-3 py-1 font-semibold text-gray-500'>
                {folio ? `NOM${folio.toString().padStart(4, '0')}` : 'Sin nómina'}
            </span>
        );
    };

    static formatMoney = (cantidad: number, tipo: 'normal' | 'total' = 'normal') => {
        const classes = {
            normal: !cantidad
                ? 'border-gray-300 bg-gray-100 text-gray-500'
                : cantidad < 0
                  ? 'border-red-400 bg-red-200 text-red-700'
                  : 'border-green-200 bg-green-50 text-green-700',
            total: cantidad < 0 ? 'border-red-700 bg-red-500 text-red-700' : 'border-sky-400 bg-sky-50 text-sky-500',
        };

        return (
            <span
                className={`inline-block rounded-full border px-3 py-1 font-semibold ${
                    tipo === 'total' ? classes.total : classes.normal
                }`}>
                ${cantidad.toFixed(2)}
            </span>
        );
    };

    static formatDate = (fecha: string | Date) => {
        const dateObj = typeof fecha === 'string' ? new Date(fecha) : fecha;

        if (isNaN(dateObj.getTime())) {
            return (
                <span className='inline-block rounded-full border border-gray-300 bg-gray-100 px-3 py-1 font-semibold text-gray-500'>
                    Fecha inválida
                </span>
            );
        }

        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();

        const formatted = `${day}/${month}/${year}`;

        return (
            <span className='inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-semibold text-amber-500'>
                {formatted}
            </span>
        );
    };
}

export default StyleComponents;
