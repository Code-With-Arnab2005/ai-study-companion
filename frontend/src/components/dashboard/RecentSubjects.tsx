"use client";
import { useEffect, useState } from 'react';
import RecentSubjectCard from "@/components/subject/RecentSubjectCard";
import { fetchRecentSubjects } from '@/lib/actions/subject-actions';
import toast from 'react-hot-toast';
import { Subject } from '@/types';
import SectionLoader from '../SectionLoader';
import Link from 'next/link';

const RecentSubjects = () => {
    const [recentSubjects, setRecentSubjects] = useState<Subject[] | null>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getRecentSubjects = async () => {
        try {
            const res = await fetchRecentSubjects();
            if (!res?.data) {
                toast.error("Something went wrong");
                return;
            }
            if (!res.data.success) {
                toast.error(res.data.message);
                return;
            }
            setRecentSubjects(res.data.data);
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getRecentSubjects();
    }, [])

    return (
        <div className="min-h-[50vh] lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recently Created Subjects
            </h2>

            {isLoading ? <SectionLoader />
                : (recentSubjects?.length === 0) ? (
                    <Link href={"/subjects"}>
                        <span className='ml-5 underline hover:text-blue-700 text-gray-800'>No Subjects Yet, Please create a new Subject</span>
                    </Link>
                )
                    : (
                        <div className="space-y-4">
                            {recentSubjects?.map((subject: Subject) => (
                                <div key={subject.id}>
                                    <Link href={`/subjects/${subject.id}`}>
                                        <RecentSubjectCard name={subject.subject_name!} docs={subject.no_of_documents!} />
                                    </Link>
                                </div>

                            ))}
                        </div>
                    )}
        </div>
    )
}

export default RecentSubjects
