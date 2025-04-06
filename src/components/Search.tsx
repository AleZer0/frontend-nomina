import React, { ReactNode } from 'react';

interface SearchProps {
    children: ReactNode;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Search: React.FC<SearchProps> = ({ children, handleSubmit }) => {
    return (
        <div className='mb-4 flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            <form className='flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow' onSubmit={handleSubmit}>
                {children}
            </form>
        </div>
    );
};

export default Search;
