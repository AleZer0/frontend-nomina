import React from 'react';
import xromlogo from '../assets/xromlogo.png';

type WaterMarkProps = {
    children?: React.ReactNode; // children es opcional
};

const WaterMark: React.FC<WaterMarkProps> = ({ children }) => {
    return (
        <div className='pointer-events-nones'>
            {/* Contenido principal (ejemplo) */}
            <img
                src={xromlogo}
                alt='Logo'
                className='pointer-events-nones relative top-0 left-340 m-4 mr-1 h-10 w-50 opacity-25'
            />

            {/* Marca de agua en superposición */}
            {/* <div className='pointer-events-none absolute right-0 bottom-0 m-4 text-[2rem] text-green-600 opacity-30'>
                XROM SYSTEMS
            </div> */}

            {/* Si necesitas mostrar children debajo o encima */}
            {children && <div>{children}</div>}
        </div>
    );
};

export default WaterMark;
