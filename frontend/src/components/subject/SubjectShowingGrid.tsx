"use client";
import React, { useEffect, useState } from 'react'
import { Subject } from '@/types';
import { fetchAllSubjects, getTagsBySubjectId } from '@/lib/actions/subject-actions';
import Loader from '../Loader';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowBigRight } from 'lucide-react';

const SubjectShowingGrid = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [subjectToTags, setSubjectToTags] = useState<Map<string, string[]>>(new Map());

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

    const setSubjectTagsBySubjectId = async () => {
        if (!subjects) {
            toast.error("subjects not found");
            return;
        }

        const newMap = new Map<string, string[]>();

        await Promise.all(
            subjects.map(async (subject: Subject) => {
                const res = await getTagsBySubjectId(subject.id as string);
                if (!res.data) {
                    toast.error("Something went wrong");
                    return;
                }

                if (!res.data.success) {
                    toast.error(res.data.message);
                    return;
                }

                //set the tags according to subject id into the
                const unique_tags = Array.from(
                    new Set<string>(res.data.tags)
                )
                newMap.set(subject.id!, unique_tags);
            })
        )

        setSubjectToTags(newMap);
    }

    useEffect(() => {
        fetchSubjects();
    }, [])

    useEffect(() => {
        if (subjects.length === 0) return;
        setSubjectTagsBySubjectId();
    }, [subjects])

    if (loading) return <Loader />

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-4">
            {subjects?.length === 0 && (
                <p>No Subjects, Please add your subject</p>
            )}
            {subjects?.length > 0 && subjects.map((subject: Subject) => (
                <Link href={`/subjects/${subject.id}`} key={subject.id}>
                    <div
                        className="bg-white border border-gray-200 rounded-xl p-6 transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md hover:cursor-pointer h-[25vh]"
                    >
                        {/* SUBJECT NAME */}
                        <div className='flex flex-row justify-between'>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {subject.subject_name}
                            </h3>
                            <ArrowBigRight fill='black'/>
                        </div>

                        {/* META INFO */}
                        <div className="mt-3 space-y-1 text-sm text-gray-500">
                            <p>
                                📄 {subject.no_of_documents ?? 0} Documents
                            </p>

                            <p>
                                📅 Created on{" "}
                                {subject.created_at
                                    ? new Date(subject.created_at).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "—"}
                            </p>
                        </div>

                        {/* TAGS / TYPE INFO */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {subject.id && subjectToTags.get(subject.id)?.map((tag: string, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1 rounded-md bg-slate-100 text-slate-600 px-2 py-0.5 text-[11px] font-medium border border-slate-200 hover:bg-slate-200 transition"
                                >
                                    <span>🏷️{tag}</span>
                                </span>
                            ))}
                            {subject.id && subjectToTags.get(subject.id)?.length === 0 && <p className='text-sm text-gray-400'>No documents added yet</p>}
                        </div>
                    </div>

                </Link>
            ))}
        </div>
    )
}

export default SubjectShowingGrid
