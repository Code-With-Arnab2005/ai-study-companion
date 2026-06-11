import React from 'react';
import { Input } from '../ui/input';

interface Props {
    setCurrPage: any;
    setSearchFilter: any;
};

const SearchByLinkName = ({ setCurrPage, setSearchFilter }: Props) => {
    return (
        <div className='flex flex-col gap-2 items-start'>
            <div className='font-semibold text-foreground'>Search By Link Name</div>
            <Input
                onChange={(e) => {
                    setCurrPage(1)
                    setSearchFilter(e.target.value)
                }}
                className='w-[19vw] bg-card! text-card-foreground hover:bg-card-hover border-2'
                placeholder='Enter Link Name...'
            />
        </div>
    )
}

export default SearchByLinkName
