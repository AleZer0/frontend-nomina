import { FaFileCirclePlus } from 'react-icons/fa6';
import Button from '../Button';
import { useGlobalContext } from '../../context/GlobalContext';

type TPayrollHeader = { onAdd: () => void };

const PayrollHeader: React.FC<TPayrollHeader> = ({ onAdd }) => {
    const { isSidebarOpen } = useGlobalContext();

    return (
        <div className='flex w-full items-center justify-between px-4'>
            <h1
                className={`text-start text-3xl font-bold tracking-wider duration-900 ${isSidebarOpen ? 'ml-0' : '-ml-40'}`}>
                Listado de Nóminas
            </h1>
            <Button variant='add' size='md' icon={<FaFileCirclePlus size={17} />} onClick={onAdd}>
                Nueva nómina
            </Button>
        </div>
    );
};

export default PayrollHeader;
