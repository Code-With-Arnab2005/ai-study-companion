"use client";
import AddSubjectButton from '@/components/subject/AddSubjectButton';
import AddSubjectModal from '@/components/subject/AddSubjectModal';
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
        <main className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 mt-15">
            {/* Content */}
            <section className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Your Subjects
                    </h2>

                    <AddSubjectButton onClick={() => setIsModalOpen(true)} />
                </div>

                {/* Subjects Grid */}
                <SubjectShowingGrid subjects={subjects} loading={loading} fetchSubjects={fetchSubjects}/>

                {/* Modal */}
                <AddSubjectModal
                    fetchSubjects={fetchSubjects}
                    setSubjectName={setSubjectName}
                    subjectName={subjectName}
                    isOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    onClose={() => handleModalClose()}
                />
            </section>
        </main>
    )
}

export default page;