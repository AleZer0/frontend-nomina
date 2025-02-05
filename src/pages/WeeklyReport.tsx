import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Header from '../components/Header';

interface Nomina {
    folio: number;
    fecha: string;
    prestamos: number;
    infonavit: number;
    sueldo: number;
    id_empleado: number;
}

interface WeeklyReportData {
    semana: string;
    totalEmpleados: number;
    totalSueldos: number;
    totalPrestamos: number;
    totalInfonavit: number;
    totalNeto: number;
}

const WeeklyReport: React.FC = () => {
    const [reportes, setReportes] = useState<WeeklyReportData[]>([]);

    useEffect(() => {
        // Simulación de datos, aquí puedes hacer una petición a tu API
        const fakeData: Nomina[] = [
            { folio: 1, fecha: '2024-02-01', prestamos: 500, infonavit: 300, sueldo: 15000, id_empleado: 1 },
            { folio: 2, fecha: '2024-02-02', prestamos: 1000, infonavit: 500, sueldo: 17000, id_empleado: 2 },
            { folio: 3, fecha: '2024-02-08', prestamos: 200, infonavit: 100, sueldo: 14000, id_empleado: 3 },
            { folio: 4, fecha: '2024-02-10', prestamos: 800, infonavit: 400, sueldo: 18000, id_empleado: 4 },
        ];

        const groupByWeek = (nominas: Nomina[]) => {
            const weeks: Record<string, WeeklyReportData> = {};

            nominas.forEach((item) => {
                const date = new Date(item.fecha);
                const year = date.getFullYear();
                const weekNumber = getWeekNumber(date);
                const weekKey = `Semana ${weekNumber}, ${year}`;

                if (!weeks[weekKey]) {
                    weeks[weekKey] = {
                        semana: weekKey,
                        totalEmpleados: 0,
                        totalSueldos: 0,
                        totalPrestamos: 0,
                        totalInfonavit: 0,
                        totalNeto: 0,
                    };
                }

                weeks[weekKey].totalEmpleados += 1;
                weeks[weekKey].totalSueldos += item.sueldo;
                weeks[weekKey].totalPrestamos += item.prestamos;
                weeks[weekKey].totalInfonavit += item.infonavit;
                weeks[weekKey].totalNeto += item.sueldo - item.prestamos - item.infonavit;
            });

            return Object.values(weeks);
        };

        setReportes(groupByWeek(fakeData));
    }, []);

    // Función para obtener el número de semana del año
    const getWeekNumber = (date: Date) => {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    };

    // Función para generar PDF por reporte semanal
    const generatePDF = (reporte: WeeklyReportData) => {
        const doc = new jsPDF();
        doc.text('Reporte Semanal', 14, 10);

        autoTable(doc, {
            startY: 20,
            head: [['Semana', 'Empleados Pagados', 'Total Sueldos', 'Préstamos', 'Infonavit', 'Total Neto']],
            body: [[
                reporte.semana,
                reporte.totalEmpleados,
                `$${reporte.totalSueldos.toFixed(2)}`,
                `$${reporte.totalPrestamos.toFixed(2)}`,
                `$${reporte.totalInfonavit.toFixed(2)}`,
                `$${reporte.totalNeto.toFixed(2)}`,
            ]],
        });

        doc.save(`reporte_semanal_${reporte.semana.replace(/ /g, '_')}.pdf`);
    };

    return (
        <div className='min-h-screen flex-1 bg-gray-100'>
            <Header tittle='Reportes Semanales' />
            <main className='p-6'>
                <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
                    {/* Encabezado de la tabla */}
                    <div className='grid grid-cols-7 bg-gray-200 p-3 font-semibold text-gray-700 text-center'>
                        <div>Semana</div>
                        <div>Empleados Pagados</div>
                        <div>Total Sueldos</div>
                        <div>Préstamos</div>
                        <div>Infonavit</div>
                        <div>Total Neto</div>
                        <div>Acciones</div>
                    </div>

                    {/* Filas del reporte */}
                    <div className='divide-y divide-gray-300'>
                        {reportes.map((item, index) => (
                            <div key={index} className='grid grid-cols-7 items-center p-3 text-gray-800 odd:bg-gray-50 text-center'>
                                <div>{item.semana}</div>
                                <div>{item.totalEmpleados}</div>
                                <div>${item.totalSueldos.toFixed(2)}</div>
                                <div>${item.totalPrestamos.toFixed(2)}</div>
                                <div>${item.totalInfonavit.toFixed(2)}</div>
                                <div className='font-semibold text-green-600'>${item.totalNeto.toFixed(2)}</div>
                                <div>
                                    <button
                                        onClick={() => generatePDF(item)}
                                        className='px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
                                    >
                                        📄 Generar PDF
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WeeklyReport;
