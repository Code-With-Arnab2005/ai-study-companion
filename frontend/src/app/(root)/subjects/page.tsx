"use client";
import AddSubjectButton from '@/components/subject/AddSubjectButton';
import AddSubjectModal from '@/components/subject/AddSubjectModal';
import SubjectShowingGrid from '@/components/subject/SubjectShowingGrid';
import React, { useState } from 'react'

const page = () => {
    const [subjectName, setSubjectName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSubjectName("");
    }
    
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
                <SubjectShowingGrid />

                {/* Modal */}
                <AddSubjectModal
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