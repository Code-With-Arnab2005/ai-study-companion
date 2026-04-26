import React from 'react';
import { Subject } from '@/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props {
    setFilterDocType: (val: string) => void;
    setCurrPage: (val: number) => void;
}

const validDocTypes = [
    "pdf",
    "word-documents",
    "ppt",
    "image",
    "text-documents",
    "other"
]

const DocTypeFilterDropdown = ({ setFilterDocType, setCurrPage }: Props) => {
    return (
        <div className='flex flex-col gap-2 items-start'>
            <div className='font-semibold text-foreground'>Document Type</div>
            <Select
                defaultValue='ALL'
                onValueChange={val => {
                    setCurrPage(1)
                    setFilterDocType(val)
                }}>
                <SelectTrigger className='w-[17vw] bg-card! text-card-foreground hover:bg-card-hover border'>
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className='w-[17vw] border' side='bottom' position='popper'>
                    <SelectGroup>
                        <SelectItem value='ALL'>All</SelectItem>
                        {validDocTypes?.map((type: string) => (
                            <SelectItem value={type} key={type}>{type.toUpperCase()}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default DocTypeFilterDropdown
