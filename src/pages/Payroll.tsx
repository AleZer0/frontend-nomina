import Header from "../components/Header";

const Payroll: React.FC = () => {
    return <div className="flex-1"> {/* Permite que el contenido de la pagina ocupe todo el espacio disponible despues del sidebar */}
    <Header tittle={"Nominas"}>
    </Header>{/* El titulo del header se debe enviar de esta manera */}
    <main className="p-5"> {/* Definir un espacio o area para el contenido debajo del header */}
        <p>Contenido</p>
    </main>
</div>
};

export default Payroll;
