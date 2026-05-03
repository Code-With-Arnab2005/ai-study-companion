"use client";
import PageWrapper from '@/components/PageWrapper';
import AddSubjectButton from '@/components/subject/AddSubjectButton';
import AddSubjectModal from '@/components/subject/AddSubjectModal';
import SubjectHeader from '@/components/subject/SubjectHeader';
import SubjectShowingGrid from '@/components/subject/SubjectShowingGrid';
import { fetchAllSubjects } from '@/lib/actions/subject-actions';
import { fetcher, options } from '@/lib/swr/helper';
import { Subject } from '@/types';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useSWR from 'swr';

const page = () => {
    const [subjectName, setSubjectName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSubjectName("");
    }

    const { data: subjects, error, isLoading: loading, mutate } = useSWR(
        "/api/subjects",
        fetcher,
        options
    )

    if(error){
        toast.error(error);
    }

    return (
        <PageWrapper>
            <div className="flex justify-between items-center mb-6">
                <SubjectHeader />

                <AddSubjectButton onClick={() => setIsModalOpen(true)} />
            </div>

            {/* Subjects Grid */}
            <SubjectShowingGrid subjects={subjects} loading={loading} mutate={mutate} />

            {/* Modal */}
            <AddSubjectModal
                mutate={mutate}
                setSubjectName={setSubjectName}
                subjectName={subjectName}
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onClose={() => handleModalClose()}
            />
        </PageWrapper>
    )
}

export default page;