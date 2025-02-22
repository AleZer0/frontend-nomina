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
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Employee | null>(null);
    const [prestamos, setPrestamos] = useState<LoanType[]>([]);
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<LoanType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPrestamos();
        fetchEmpleados();
    }, []);

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

    const handleViewLoan = async (loan: LoanType) => {
        try {
            const data = await Prestamos.getLoans(1); // Obtener todos los préstamos y sus abonos
            const updatedLoan = data.prestamos.find((p: LoanType) => p.id_prestamo === loan.id_prestamo);

            if (updatedLoan) {
                setSelectedLoan(updatedLoan);

                // Buscar el empleado correspondiente al préstamo
                const employeeData = empleados.find(emp => emp.id_empleado === updatedLoan.id_empleado) || null;
                setEmpleadoSeleccionado(employeeData);
            }
        } catch (error) {
            console.error('Error al obtener datos del préstamo:', error);
        }
        setIsSubscriptionModalOpen(true);
    };

    const handleSubmitLoan = async (newLoan: { id_empleado: number; monto_total: number; saldo_pendiente: number }) => {
        try {
            await Prestamos.createLoan(newLoan);
            fetchPrestamos();
        } catch (error) {
            console.error('Error al crear préstamo:', error);
        }
    };

    const handleSubscriptionSubmit = async (id_prestamo: number, monto_abonado: number) => {
        try {
            await Prestamos.payLoan(id_prestamo, { monto_abonado });
            fetchPrestamos(); // Volver a cargar los préstamos actualizados
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
                {loading && <Loader />}
                <TableData
                    fields={[
                        'No. Empleado',
                        'Empleado',
                        'Fecha',
                        'Monto total',
                        'Saldo Pendiente',
                        'Último Abono',
                        'Acciones',
                    ]}
                    data={prestamos}
                    renderRow={item => (
                        <>
                            <div>{item.id_empleado}</div>
                            <div className='p-2'>{item.empleado}</div>
                            <div className='p-2'>
                                {item.created_at
                                    ? new Date(item.created_at).toLocaleDateString('es-MX')
                                    : 'Fecha no disponible'}
                            </div>
                            <div className='p-2'>{`$${(item.monto_total ?? 0).toFixed(2)}`}</div>
                            <div className='p-2'>{`$${(item.saldo_pendiente ?? 0).toFixed(2)}`}</div>
                            <div className='p-2'>{`$${(item.ultimo_abono ?? 0).toFixed(2)}`}</div>
                            <div className='flex justify-center gap-2 p-2'>
                                <Button
                                    design='cursor-pointer rounded-2xl bg-blue-500 border-blue-700 text-white hover:bg-blue-700'
                                    onClick={() => handleViewLoan(item)}>
                                    <span className='relative pt-1'>
                                        <TbPigMoney size={17} />
                                    </span>
                                    Ver Abonos
                                </Button>
                            </div>
                        </>
                    )}
                />
            </main>

            {/* Modales */}
            <CreateLoanModal
                isOpen={isLoanModalOpen}
                onClose={() => setIsLoanModalOpen(false)}
                onSubmit={handleSubmitLoan}
                empleados={empleados}
            />

            <CreateSubscriptionModal
                isOpen={isSubscriptionModalOpen}
                onClose={() => setIsSubscriptionModalOpen(false)}
                onSubmit={handleSubscriptionSubmit}
                id_prestamo={selectedLoan?.id_prestamo ?? 0}
                employee={empleadoSeleccionado}
            />
        </div>
    );
};

export default Loan;
