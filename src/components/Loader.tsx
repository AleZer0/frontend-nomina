import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader: React.FC = () => {
    return (
        <div className='flex min-h-screen items-center justify-center'>
            <ThreeDots height='80' width='80' color='#4A90E2' ariaLabel='loading' visible={true} />
        </div>
    );
};

export default Loader;
