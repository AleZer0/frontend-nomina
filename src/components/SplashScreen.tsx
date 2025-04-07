import { Oval } from 'react-loader-spinner';

const SplashScreen = () => {
    return (
        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-white'>
            <div className='animate-pulse text-3xl font-bold text-gray-800'>
                <Oval
                    height={100}
                    width={100}
                    color='#00c2e0'
                    strokeWidth={4}
                    secondaryColor='#4f39f6'
                    ariaLabel='loading'
                />
            </div>
        </div>
    );
};

export default SplashScreen;
