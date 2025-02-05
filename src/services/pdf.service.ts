import axiosInstance from '.';

const downloadPayrollPDF = async (folio: number) => {
    const data = {
        empleado: {
            nombre: 'Arsenio Escolar',
            fecha_incorporacion: '2018-06-23',
            puesto: 'Escritor',
            departamento: 'Noticias',
        },
        nomina: {
            folio: 1,
            periodo_pago: 'Agosto 2029',
            dias_trabajados: 26,
            ganancias: {
                base: 10000,
                incentivos: 1000,
                alquiler: 400,
                subsidio_comida: 200,
                total: 11600,
            },
            deducciones: {
                fondo_prevision: 1200,
                impuesto_profesional: 500,
                prestamo: 400,
                total: 2100,
            },
            salario_neto: 9500,
        },
    };
    try {
        const response = await axiosInstance.post('/pdf/nomina-pdf', data, {
            responseType: 'blob',
            withCredentials: true,
        });

        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const a = document.createElement('a');
        a.href = url;
        a.download = `nomina_${folio}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('❌ Error al descargar la nómina:', error);
    }
};

export { downloadPayrollPDF };
