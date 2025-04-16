type FieldType = 'string' | 'number' | 'date' | 'boolean' | 'null' | 'unknown';

export class FormUtilsTyped {
    /**
     * Convierte todos los campos a string y retorna el resultado junto con el mapa de tipos originales
     */
    static formatToFormStringsWithTypes<T extends Record<string, any>>(
        input: T
    ): {
        values: Record<keyof T, string>;
        fieldTypes: Record<keyof T, FieldType>;
    } {
        const values: Record<string, string> = {};
        const fieldTypes: Record<string, FieldType> = {};

        for (const key in input) {
            const value = input[key];

            let type: FieldType = 'unknown';
            if (typeof value === 'number') type = 'number';
            else if (typeof value === 'string') type = 'string';
            else if (Object.prototype.toString.call(value) === '[object Date]') type = 'date';
            else if (typeof value === 'boolean') type = 'boolean';
            else if (value === null) type = 'null';

            values[key] = value === null || value === undefined ? '' : String(value);
            fieldTypes[key] = type;
        }

        return {
            values: values as Record<keyof T, string>,
            fieldTypes: fieldTypes as Record<keyof T, FieldType>,
        };
    }

    /**
     * Convierte de vuelta desde strings al tipo original según el mapa de tipos generado antes
     */
    static formatFromFormStringsWithTypes<T extends Record<string, any>>(
        input: Record<keyof T, string>,
        fieldTypes: Record<keyof T, FieldType>
    ): T {
        const result: Record<string, any> = {};

        for (const key in input) {
            const value = input[key];
            const type = fieldTypes[key];

            if (value === '' || value === null || value === undefined) {
                result[key] = undefined;
                continue;
            }

            switch (type) {
                case 'number':
                    result[key] = Number(value);
                    break;
                case 'date':
                    result[key] = new Date(value);
                    break;
                case 'boolean':
                    result[key] = value === 'true';
                    break;
                case 'null':
                    result[key] = null;
                    break;
                default:
                    result[key] = value;
                    break;
            }
        }

        return result as T;
    }
}
