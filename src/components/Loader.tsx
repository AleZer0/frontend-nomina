import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader: React.FC = () => {
    return (
        <div className='flex h-40 items-center justify-center'>
            <ThreeDots height='60' width='60' color='#4A90E2' ariaLabel='loading' visible={true} />
        </div>
    );
};

export default Loader;
