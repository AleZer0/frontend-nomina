import { useState } from 'react';
import { TbUserSearch } from 'react-icons/tb';
import { MdOutlineManageSearch } from 'react-icons/md';
import { BsFillEraserFill } from 'react-icons/bs';

import { useGlobalContext } from '../../context/GlobalContext';
import Button from '../Button';
import Input from '../Input';
import Search from '../Search';

const EmployeeSearchBar: React.FC = () => {
    const { setParams } = useGlobalContext();
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setParams(prev => {
            return { ...prev, q: query };
        });
    };

    const handleClear = () => {
        setQuery('');
        setParams(prev => {
            const newParams = { ...prev };
            delete newParams.q;
            newParams.page = 1;
            return newParams;
        });
    };

    return (
        <Search handleSubmit={handleSubmit}>
            <Input
                variant='default'
                inputSize='md'
                placeholder='Buscar empleado...'
                value={query}
                onChange={e => setQuery(e.target.value)}
                leftIcon={<TbUserSearch size={20} />}
            />
            <Button
                variant='details'
                size='md'
                icon={<MdOutlineManageSearch size={20} />}
                type='submit'
                disabled={query === ''}>
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
        </Search>
    );
};

export default EmployeeSearchBar;
