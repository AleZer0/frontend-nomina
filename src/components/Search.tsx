import React, { ReactNode } from 'react';

interface SearchProps {
    children: ReactNode;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Search: React.FC<SearchProps> = ({ children, handleSubmit }) => {
    return (
        <form
            className='mb-4 flex flex-col items-center gap-4 rounded-2xl bg-white px-4 py-3 shadow md:flex-row md:items-center md:justify-between'
            onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

export default Search;
