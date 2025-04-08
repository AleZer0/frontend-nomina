import { useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { PayrollInterface } from '../types/entities';

export const usePayrollsHandlers = () => {
    const { setSelectedEntities, addPayroll, updatePayroll, statusPayroll } = useGlobalContext();

    const [showSuccessCreate, setShowSuccessCreate] = useState(false);
    const [showSuccessEdit, setShowSuccessEdit] = useState(false);
    const [showSuccessDelete, setShowSuccessDelete] = useState(false);

    const handleCreatePayroll = async (newPayroll: Omit<PayrollInterface, 'folio'>) => {
        await addPayroll(newPayroll);
        setShowSuccessCreate(true);
        setTimeout(() => setShowSuccessCreate(false), 3000);
    };

    const handleUpdatePayroll = async (folio: number, updatedPayroll: Partial<PayrollInterface>) => {
        const newPay = await updatePayroll(folio, updatedPayroll);
        setSelectedEntities(prev => ({ ...prev, selectedPayroll: newPay }));
        setShowSuccessEdit(true);
        setTimeout(() => setShowSuccessEdit(false), 3000);
    };

    const handleDeletePayroll = async (folio: number) => {
        await statusPayroll(folio, 0);
        setSelectedEntities(prev => ({ ...prev, selectedPayroll: null }));
        setShowSuccessDelete(true);
        setTimeout(() => setShowSuccessDelete(false), 3000);
    };

    return {
        handleCreatePayroll,
        handleUpdatePayroll,
        handleDeletePayroll,
        showSuccessCreate,
        showSuccessEdit,
        showSuccessDelete,
    };
};
