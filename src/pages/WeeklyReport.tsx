import Header from '../components/Header';

const WeeklyReport: React.FC = () => {
    return (
        <div className='flex-1'>
            {' '}
            {/* Permite que el contenido de la pagina ocupe todo el espacio disponible despues del sidebar */}
            <Header tittle={'Reportes Semanales'}></Header>
            {/* El titulo del hea der se debe enviar de esta manera */}
            <main className='p-5'>
                {' '}
                {/* Definir un espacio o area para el contenido debajo del header */}
                Contenido
            </main>
        </div>
    );
};

export default WeeklyReport;
