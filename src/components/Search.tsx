import React, { useState } from 'react';
import { MdOutlineManageSearch } from 'react-icons/md';
import { TbUserSearch } from 'react-icons/tb';

import Input from './Input';
import Button from './Button';
import { useGlobalContext } from '../context/GlobalContext';

const Search: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const { fetchSearchEmployees, setError } = useGlobalContext();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetchSearchEmployees(query);
        } catch (error: any) {
            setError('Error al buscar empleados');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <div className='mb-4 flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            <form className='flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow' onSubmit={handleSearch}>
                <Input
                    variant='outline'
                    inputSize='md'
                    placeholder='Buscar empleado...'
                    value={query}
                    onChange={handleChange}
                    leftIcon={<TbUserSearch size={20} />}
                />
                <Button variant='details' size='md' icon={<MdOutlineManageSearch size={15} />} type='submit'>
                    Buscar
                </Button>
            </form>
        </div>
    );
};

export default Search;
