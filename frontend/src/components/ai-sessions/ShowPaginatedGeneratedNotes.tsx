import { options } from '@/lib/swr/helper';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import useSWR from 'swr';
import { Button } from '../ui/button';
import { AIGeneratedNotes } from '@/types';
import SectionLoader from '../SectionLoader';
import GeneratedNoteRow from './GeneratedNoteRow';

const fetcher = async (url: string) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res || !data.success) {
            toast.error(data.message ?? "Something went wrong");
            return;
        }
        console.log("fetcher: ", data)
        return data.data;
    } catch (error: any) {
        toast.error(error ?? error.message ?? "Something went wrong");
    }
}

interface Props {
    setOpen: any;
    setTopicName: any;
    setDepth: any;
    setLevel: any;
    setGeneratedNotes: any;
}

const ShowPaginatedGeneratedNotes = ({ setOpen, setTopicName, setDepth, setLevel, setGeneratedNotes }: Props) => {
    const limit = 5;
    const [currPage, setCurrPage] = useState<number>(1);

    const { data, error, isLoading } = useSWR(
        `/api/ai/generated-notes?page=${currPage}&limit=${limit}`,
        fetcher,
        options
    )

    if (error) {
        toast.error(error.message ?? "Error fetching Notes");
    }

    const currNotes: AIGeneratedNotes[] = data?.notes || [];
    const totalPages: number = data?.totalPages || 0;
    const totalNotes: number = data?.totalNotes || 0;
    const from = (currPage - 1) * limit + 1;
    const to = Math.min(from + limit - 1, totalNotes);

    return (
        <>
            <div className='h-full mt-3 mb-5 overflow-y-scroll'>
                {isLoading ? <SectionLoader /> : (
                    currNotes.map((note: AIGeneratedNotes) => (
                        <GeneratedNoteRow
                            key={note.id}
                            setOpen={setOpen}
                            note={note}
                            setTopicName={setTopicName}
                            setLevel={setLevel}
                            setDepth={setDepth}
                            setGeneratedNotes={setGeneratedNotes}
                        />
                    ))
                )}
            </div>
            <div className='flex justify-between items-center'>
                <Button className='border-2' variant="outline" onClick={() => setCurrPage(prev => Math.max(prev - 1, 1))}>
                    Prev
                </Button>
                <Button className='border-2' variant="outline" >Showing {from}-{to} of {totalNotes} Notes</Button>
                <Button className='border-2' variant="outline" onClick={() => setCurrPage(prev => Math.min(prev + 1, totalPages))}>
                    Next
                </Button>
            </div>
        </>
    )
}

export default ShowPaginatedGeneratedNotes
