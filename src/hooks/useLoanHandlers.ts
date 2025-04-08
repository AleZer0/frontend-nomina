import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { LoanInterface } from '../types/entities';

export const useLoansHandlers = () => {
    const { setSelectedEntities, addLoan, updateLoan, statusLoan } = useGlobalContext();

    const [showSuccessCreate, setShowSuccessCreate] = useState(false);
    const [showSuccessEdit, setShowSuccessEdit] = useState(false);
    const [showSuccessDelete, setShowSuccessDelete] = useState(false);

    const handleCreateLoan = async (newLoan: Omit<LoanInterface, 'id_prestamo'>) => {
        await addLoan(newLoan);
        setShowSuccessCreate(true);
        setTimeout(() => setShowSuccessCreate(false), 3000);
    };

    const handleUpdateLoan = async (id_prestamo: number, monto_abonado: number) => {
        const newPay = await updateLoan(id_prestamo, monto_abonado);
        setSelectedEntities(prev => ({ ...prev, selectedLoan: newPay }));
        setShowSuccessEdit(true);
        setTimeout(() => setShowSuccessEdit(false), 3000);
    };

    const handleDeleteLoan = async (id_prestamo: number) => {
        await statusLoan(id_prestamo, 0);
        setSelectedEntities(prev => ({ ...prev, selectedLoan: null }));
        setShowSuccessDelete(true);
        setTimeout(() => setShowSuccessDelete(false), 3000);
    };

    return {
        handleCreateLoan,
        handleUpdateLoan,
        handleDeleteLoan,
        showSuccessCreate,
        showSuccessEdit,
        showSuccessDelete,
    };
};
