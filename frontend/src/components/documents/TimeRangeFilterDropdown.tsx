import React from 'react';
import { Subject } from '@/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props {
    setFilterTimeRange: (val: string) => void;
    setCurrPage: (val: number) => void;
}

const validTimeRanges = [
    "today",
    "last 3 days",
    "last 7 days",
    "last 1 month",
    "last 3 months",
    "last 1 year"
]

const TimeRangeFilterDropdown = ({ setFilterTimeRange, setCurrPage }: Props) => {
    return (
        <div className='flex flex-col gap-2 items-start'>
            <div className='font-semibold text-foreground'>Time Range</div>
            <Select
                defaultValue='ALL'
                onValueChange={val => {
                    setCurrPage(1)
                    setFilterTimeRange(val)
                }}>
                <SelectTrigger className='w-[17vw] bg-card! text-card-foreground hover:bg-card-hover border'>
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className='w-[17vw] border' side='bottom' position='popper'>
                    <SelectGroup>
                        <SelectItem value='ALL'>All</SelectItem>
                        {validTimeRanges?.map((date: string) => (
                            <SelectItem value={date} key={date}>{date.toUpperCase()}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default TimeRangeFilterDropdown
