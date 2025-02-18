import React from 'react';

interface CardProps {
    /** Título principal de la tarjeta */
    title: string;
    /** Subtítulo o descripción breve (opcional) */
    subtitle?: string;
    /** Contenido principal (opcional) */
    content?: string;
    /** Para renderizar contenido personalizado dentro de la tarjeta */
    children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, content, children }) => {
    return (
        <div className='max-w-sm rounded-lg border bg-white p-4 shadow-md'>
            {/* Título */}
            <h2 className='mb-2 text-xl font-bold'>{title}</h2>

            {/* Subtítulo (opcional) */}
            {subtitle && <h3 className='mb-2 text-sm text-gray-700'>{subtitle}</h3>}

            {/* Contenido principal (opcional) */}
            {content && <p className='mb-3 text-gray-800'>{content}</p>}

            {/* Children: para renderizar cualquier otro componente/elemento */}
            {children}
        </div>
    );
};

export default Card;
