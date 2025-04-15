import { useState } from 'react';
import { TbUserSearch } from 'react-icons/tb';
import { MdOutlineManageSearch } from 'react-icons/md';
import { BsFillEraserFill } from 'react-icons/bs';

import { useGlobalContext } from '../../context/GlobalContext';
import Button from '../Button';
import Input from '../Input-v1';
import Search from '../Search';

const PayrollSearchBar: React.FC = () => {
    const { setParams } = useGlobalContext();
    const [query, setQuery] = useState({ empleado: '', start_date: '', end_date: '' });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setParams(prev => ({
            ...prev,
            q: query.empleado || undefined,
            start_date: query.start_date || undefined,
            end_date: query.end_date || undefined,
            page: 1,
        }));
    };

    const handleClear = () => {
        setQuery({ empleado: '', start_date: '', end_date: '' });
        setParams(prev => {
            const newParams = { ...prev };
            delete newParams.q;
            delete newParams.start_date;
            delete newParams.end_date;
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
                value={query.empleado}
                onChange={e => setQuery(prev => ({ ...prev, empleado: e.target.value }))}
                leftIcon={<TbUserSearch size={20} />}
            />
            <Input
                variant='default'
                inputSize='md'
                type='date'
                placeholder='Fecha inicio'
                value={query.start_date}
                onChange={e => setQuery(prev => ({ ...prev, start_date: e.target.value }))}
            />
            <Input
                variant='default'
                inputSize='md'
                type='date'
                placeholder='Fecha fin'
                value={query.end_date}
                onChange={e => setQuery(prev => ({ ...prev, end_date: e.target.value }))}
            />
            <Button
                variant='details'
                size='md'
                icon={<MdOutlineManageSearch size={20} />}
                type='submit'
                disabled={!query.empleado && !query.start_date && !query.end_date}>
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

export default PayrollSearchBar;
