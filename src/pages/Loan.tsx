import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { MdAttachMoney } from 'react-icons/md';
import TableData from '../components/TableData';
import { LoanType } from '../types';
import { Prestamos } from '../services/prestamos.service';
import CreateLoanModal from '../components/modals/CreateNewLoan';
import { Employee } from './Employees';
import Empleado from '../services/employees.service';

const Loan: React.FC = () => {
    const [prestamos, setPrestamos] = useState<LoanType[]>([]);
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAbono, setModalAbono] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrestamos = async () => {
            setLoading(true);
            try {
                const data = await Prestamos.getLoans(1);
                setPrestamos(data.prestamos || []);
            } catch (error) {
                console.error('Error al obtener prestamos:', error);
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
                console.error('Error al obtener prestamos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrestamos();
        fetchEmpleados();
    }, []);

    const handleSubmit = async (newLoan: { id_empleado: number; monto_total: number; saldo_pendiente: number }) => {
        try {
            const response = await Prestamos.createLoan(newLoan); // 🔹 Esperar la respuesta
            setPrestamos(prevPrestamos => [...prevPrestamos, response.prestamo]); // Agregar el nuevo préstamo a la lista
        } catch (error) {
            console.error('Error al crear préstamo:', error);
        }
    };

    return (
        <div className='relative ml-64 min-h-screen flex-1 bg-gray-100'>
            <Header tittle='Listado de prestamos'>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    design='hover:shadow-xl hover:bg-green-500 bg-green-400 rounded-2xl cursor-pointer text-black'>
                    <span className='relative pt-1'>
                        <MdAttachMoney size={17} />
                    </span>
                    Nuevo Prestamo
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
                            <div className='p-2'>{item.empleado}</div>
                            <div className='p-2'>
                                {item.created_at
                                    ? new Date(item.created_at).toLocaleDateString('es-MX')
                                    : 'Fecha no disponible'}
                            </div>

                            <div className='p-2'>{`$${(item.monto_total ?? 0).toFixed(2)}`}</div>
                            <div className='p-2'>{`$${(item.saldo_pendiente ?? 0).toFixed(2)}`}</div>
                            <div className='p-2'>{`$${(typeof item.abonos === 'number' ? item.abonos : 0).toFixed(2)}`}</div>
                            <div className='flex justify-center gap-2 p-2'>
                                {/* <Button onClick={() => previewPayrollPDF(item.folio)}>
                                    <span className='relative pt-0.5'>
                                        <FaFilePdf size={17} />
                                    </span>
                                    Generar PDF
                                </Button> */}
                            </div>
                        </>
                    )}
                />
            </main>
            <CreateLoanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                empleados={empleados}
            />
        </div>
    );
};

export default Loan;
