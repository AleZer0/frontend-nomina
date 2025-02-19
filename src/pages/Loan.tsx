import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { MdAttachMoney } from 'react-icons/md';
import { TbPigMoney } from 'react-icons/tb';
import TableData from '../components/TableData';
import { LoanType } from '../types';
import { Prestamos } from '../services/prestamos.service';
import CreateLoanModal from '../components/modals/CreateNewLoan';
import CreateSubscriptionModal from '../components/modals/AddSubscription';
import { Employee } from './Employees';
import Empleado from '../services/employees.service';

const Loan: React.FC = () => {
    const [prestamos, setPrestamos] = useState<LoanType[]>([]);
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<{
        id_prestamo: number;
        id_empleado: number;
        empleado: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrestamos = async () => {
            setLoading(true);
            try {
                const data = await Prestamos.getLoans(1);
                setPrestamos(data.prestamos || []);
            } catch (error) {
                console.error('Error al obtener préstamos:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchEmpleados = async () => {
            setLoading(true);
            try {
                const data = await Empleado.getEmployees(1);
                setEmpleados(data.empleados || []);
            } catch (error) {
                console.error('Error al obtener empleados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrestamos();
        fetchEmpleados();
    }, []);

    const handleSubmit = async (newLoan: { id_empleado: number; monto_total: number; saldo_pendiente: number }) => {
        try {
            await Prestamos.createLoan(newLoan);

            // 🔹 Volvemos a cargar la lista completa desde el backend
            const data = await Prestamos.getLoans(1);
            setPrestamos(data.prestamos || []);
        } catch (error) {
            console.error('Error al crear préstamo:', error);
        }
    };

    const handleSubscriptionSubmit = async (id_prestamo: number, monto_abonado: number) => {
        try {
            await Prestamos.payLoan(id_prestamo, { monto_abonado });

            // 🔹 Volver a cargar los préstamos desde el servidor
            const data = await Prestamos.getLoans(1);
            setPrestamos(data.prestamos || []);
        } catch (error) {
            console.error('Error al registrar abono:', error);
        }
    };

    return (
        <div className='relative ml-64 min-h-screen flex-1 bg-gray-100'>
            <Header tittle='Listado de préstamos'>
                <Button
                    onClick={() => setIsLoanModalOpen(true)}
                    design='hover:shadow-xl hover:bg-green-500 bg-green-400 rounded-2xl cursor-pointer text-black'>
                    <span className='relative pt-1'>
                        <MdAttachMoney size={17} />
                    </span>
                    Nuevo Préstamo
                </Button>
            </Header>
            <main className='p-6'>
                <div className='rounded bg-white shadow-lg'></div>
                {loading && <Loader />}
                <TableData
                    fields={['Empleado', 'Fecha', 'Monto total', 'Saldo Pendiente', 'Último Abono', 'Acciones']}
                    data={prestamos}
                    renderRow={item => (
                        <>
                            <div className='p-2'>{item.empleado}</div> {/* ✅ Ahora usamos `empleado` correctamente */}
                            <div className='p-2'>
                                {item.created_at
                                    ? new Date(item.created_at).toLocaleDateString('es-MX')
                                    : 'Fecha no disponible'}
                            </div>
                            <div className='p-2'>{`$${(item.monto_total ?? 0).toFixed(2)}`}</div>
                            <div className='p-2'>{`$${(item.saldo_pendiente ?? 0).toFixed(2)}`}</div>
                            <div className='p-2'>{`$${(typeof item.abonos === 'number' ? item.abonos : 0).toFixed(2)}`}</div>
                            <div className='flex justify-center gap-2 p-2'>
                                <Button
                                    design='cursor-pointer rounded-2xl bg-blue-500 border-blue-700 text-white hover:bg-blue-700'
                                    onClick={() => {
                                        setSelectedLoan({
                                            id_prestamo: item.id_prestamo,
                                            id_empleado: item.id_empleado,
                                            empleado: item.empleado,
                                        });
                                        setIsSubscriptionModalOpen(true);
                                    }}>
                                    <span className='relative pt-1'>
                                        <TbPigMoney size={17} />
                                    </span>
                                    Abonar
                                </Button>
                            </div>
                        </>
                    )}
                />
            </main>
            <CreateLoanModal
                isOpen={isLoanModalOpen}
                onClose={() => setIsLoanModalOpen(false)}
                onSubmit={handleSubmit}
                empleados={empleados}
            />
            <CreateSubscriptionModal
                isOpen={isSubscriptionModalOpen}
                onClose={() => setIsSubscriptionModalOpen(false)}
                onSubmit={handleSubscriptionSubmit}
                id_prestamo={selectedLoan?.id_prestamo ?? 0}
            />
        </div>
    );
};

export default Loan;
