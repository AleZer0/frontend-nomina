import React from 'react';
import { CircleSpinner } from 'react-spinners-kit';

const Loader: React.FC = () => {
    return (
        <div className='flex min-h-screen items-center justify-center'>
            <CircleSpinner size={40} color='#4A90E2' loading={true} />
        </div>
    );
};

export default Loader;
