import React, { useEffect, useState } from 'react';
import { Subject } from '@/types';
import { fetchAllSubjects } from '@/lib/actions/subject-actions';
import toast from 'react-hot-toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props {
    subjects: Subject[];
    setFilterSubjectId: (val: string) => void;
    setCurrPage: (val: number) => void;
}

const SubjectFilterDropdown = ({ subjects, setFilterSubjectId, setCurrPage }: Props) => {

    return (
        <div className='flex flex-col gap-2 items-start'>
            <div className='font-semibold text-foreground'>Subject</div>
            <Select
                defaultValue='ALL'
                onValueChange={val => {
                    setCurrPage(1)
                    setFilterSubjectId(val)
                }}>
                <SelectTrigger className='w-[20vw] bg-card! text-card-foreground hover:bg-card-hover border'>
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className='w-[20vw] border' side='bottom' position='popper'>
                    <SelectGroup>
                        <SelectItem value='ALL'>All</SelectItem>
                        {subjects?.map((sub: Subject) => (
                            <SelectItem value={sub.id!} key={sub.id}>{sub.subject_name}</SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default SubjectFilterDropdown;