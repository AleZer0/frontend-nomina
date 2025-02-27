import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { MdAttachMoney } from 'react-icons/md';
import TableData from '../components/TableData';
import { Employee, LoanType } from '../types';
import { Prestamos } from '../services/prestamos.service';
import CreateLoanModal from '../modals/CreateNewLoan';
import Empleado from '../services/employees.service';
import ViewLoan from '../modals/ViewLoan';
import { CgDetailsMore } from 'react-icons/cg';
import Payloan from '../modals/Payloan';

const Loan: React.FC = () => {
    const [prestamos, setPrestamos] = useState<LoanType[]>([]);
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
    const [isViewLoanModalOpen, setIsViewLoanModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<LoanType | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);

    useEffect(() => {
        fetchPrestamos();
        fetchEmpleados();
    }, []);

    const closeCreateLoanModal = () => setIsSubscriptionModalOpen(false);
    const openLoanPay = () => setIsSubscriptionModalOpen(true);

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
            fetchPrestamos();
        } catch (error) {
            console.error('Error al registrar abono:', error);
        }
    };

    return (
        <div className='relative ml-64 min-h-screen flex-1 bg-gray-100'>
            {/* <Header tittle='Listado de préstamos'>
                <Button
                    onClick={() => setIsLoanModalOpen(true)}
                    design='hover:shadow-xl hover:bg-green-500 bg-green-400 rounded-2xl cursor-pointer text-black'>
                    <span className='relative pt-1'>
                        <MdAttachMoney size={17} />
                    </span>
                    Nuevo Préstamo
                </Button>
            </Header> */}
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
                                    onClick={() => {
                                        setSelectedLoan(item);
                                        setIsViewLoanModalOpen(true);
                                    }}>
                                    <span className='relative pt-1'>
                                        <CgDetailsMore size={17} />
                                    </span>
                                    Detalles
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
            {/* Modal para agregar un abono */}
            <Payloan
                isOpen={isSubscriptionModalOpen}
                onClose={closeCreateLoanModal}
                onSubmit={handleSubscriptionSubmit}
                selectLoan={selectedLoan}
            />
            {/* ViewLoan ahora se abre correctamente */}
            <ViewLoan
                isOpen={isViewLoanModalOpen}
                onClose={() => setIsViewLoanModalOpen(false)}
                loan={selectedLoan}
                openLoanPay={openLoanPay}
            />
        </div>
    );
};

export default Loan;
