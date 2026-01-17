"use client";
import PageWrapper from '@/components/PageWrapper';
import AddSubjectButton from '@/components/subject/AddSubjectButton';
import AddSubjectModal from '@/components/subject/AddSubjectModal';
import SubjectHeader from '@/components/subject/SubjectHeader';
import SubjectShowingGrid from '@/components/subject/SubjectShowingGrid';
import { fetchAllSubjects } from '@/lib/actions/subject-actions';
import { Subject } from '@/types';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
    const [subjectName, setSubjectName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSubjectName("");
    }

    const fetchSubjects = async () => {
        const res = await fetchAllSubjects();
        if (!res?.data) {
            toast.error("Something went wrong, please try again later");
        } else if (!res?.data.success) {
            toast.error(res.data.message);
        } else {
            const data = res?.data.data;
            setSubjects(data)
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSubjects();
    }, [])

    return (
        <PageWrapper>
            <div className="flex justify-between items-center mb-6">
                <SubjectHeader />

                <AddSubjectButton onClick={() => setIsModalOpen(true)} />
            </div>

            {/* Subjects Grid */}
            <SubjectShowingGrid subjects={subjects} loading={loading} fetchSubjects={fetchSubjects} />

            {/* Modal */}
            <AddSubjectModal
                fetchSubjects={fetchSubjects}
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