import { useGlobalContext } from '../../context/GlobalContext';

const WeeklyReportHeader: React.FC = () => {
    const { isSidebarOpen } = useGlobalContext();

    return (
        <div className='flex w-full items-center justify-between px-4'>
            <h1
                className={`text-start text-3xl font-bold tracking-wider duration-900 ${isSidebarOpen ? 'ml-0' : '-ml-40'}`}>
                Listado de Reportes Semanales
            </h1>
        </div>
    );
};

export default WeeklyReportHeader;
