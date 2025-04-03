import React, { useMemo } from 'react';
import { MdOutlineManageSearch } from 'react-icons/md';
import { TbUserSearch } from 'react-icons/tb';
import { BsFillEraserFill } from 'react-icons/bs';

import Input from './Input';
import Button from './Button';

interface SearchProps {
    query: string;
    onChangeQuery: (value: string) => void;
    onSearch: () => void;
    onClear: () => void;
}

const Search: React.FC<SearchProps> = ({ query, onChangeQuery, onSearch, onClear }) => {
    const isSearchDisabled = useMemo(() => query.trim().length === 0, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSearchDisabled) onSearch();
    };

    const handleClear = () => {
        onChangeQuery('');
        onClear();
    };

    return (
        <div className='mb-4 flex-col gap-2 md:flex-row md:items-center md:justify-between'>
            <form className='flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow' onSubmit={handleSearch}>
                <Input
                    variant='default'
                    inputSize='md'
                    placeholder='Buscar empleado...'
                    value={query}
                    onChange={e => onChangeQuery(e.target.value)}
                    leftIcon={<TbUserSearch size={20} />}
                />
                <Button
                    variant='details'
                    size='md'
                    icon={<MdOutlineManageSearch size={20} />}
                    type='submit'
                    disabled={isSearchDisabled}>
                    Buscar
                </Button>
                <Button
                    variant='details'
                    size='md'
                    icon={<BsFillEraserFill size={15} />}
                    onClick={handleClear}
                    type='button'>
                    Limpiar
                </Button>
            </form>
        </div>
    );
};

export default Search;
