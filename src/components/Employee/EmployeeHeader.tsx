import { FaUserPlus } from 'react-icons/fa';
import Button from '../Button';
import { useGlobalContext } from '../../context/GlobalContext';

type TEmployeeHeader = { onAdd: () => void };

const EmployeeHeader: React.FC<TEmployeeHeader> = ({ onAdd }) => {
    const { isSidebarOpen } = useGlobalContext();

    return (
        <div className='flex w-full items-center justify-between px-4'>
            <h1
                className={`text-start text-3xl font-bold tracking-wider duration-900 ${isSidebarOpen ? 'ml-0' : '-ml-40'}`}>
                Listado de Empleados
            </h1>
            <Button variant='add' size='md' icon={<FaUserPlus size={17} />} onClick={onAdd}>
                Nuevo empleado
            </Button>
        </div>
    );
};

export default EmployeeHeader;
