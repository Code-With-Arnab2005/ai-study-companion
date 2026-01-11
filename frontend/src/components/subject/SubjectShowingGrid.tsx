"use client";
import { useEffect, useState } from 'react'
import { Subject } from '@/types';
import { getTagsBySubjectId } from '@/lib/actions/subject-actions';
import Loader from '../Loader';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { ArrowBigRight } from 'lucide-react';

const SubjectShowingGrid = ({ subjects, loading }: { subjects: Subject[], loading: boolean }) => {

    const [subjectToTags, setSubjectToTags] = useState<Map<string, string[]>>(new Map());

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
        if (subjects.length === 0) return;
        setSubjectTagsBySubjectId();
    }, [subjects])

    if (loading) return <Loader />

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-4 px-4
                overflow-y-auto max-h-[70vh]
                scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">

            {subjects?.length === 0 && (
                <p className="text-sm text-slate-500">
                    No subjects found. Start by adding one.
                </p>
            )}

            {subjects?.length > 0 && subjects.map((subject: Subject) => (
                    <div
                        key={subject.id}
                        className="group bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-indigo-300 h-[26vh] flex flex-col justify-between"
                    >

                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition">
                                    {subject.subject_name}
                                </h3>
                                <ArrowBigRight
                                    className="text-slate-400 group-hover:text-indigo-500 transition"
                                    size={18}
                                />
                            </div>
                            <Link href={`/subjects/${subject.id}`} >
                                <button
                                    className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                                >
                                    View
                                </button>
                            </Link>
                        </div>

                        {/* Meta Info */}
                        <div className="mt-3 space-y-1 text-sm text-slate-500">
                            <p>📄 {subject.no_of_documents ?? 0} Documents</p>
                            <p>
                                📅{" "}
                                {subject.created_at
                                    ? new Date(subject.created_at).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })
                                    : "—"}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-end gap-2 mt-4">

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {subject.id &&
                                    subjectToTags.get(subject.id)?.map((tag: string, index) => (
                                        <span
                                            key={index}
                                            className="rounded-md bg-slate-100 text-slate-600
                             px-2 py-0.5 text-[11px] font-medium
                             border border-slate-200
                             hover:bg-indigo-50 hover:text-indigo-600 transition"
                                        >
                                            🏷️ {tag}
                                        </span>
                                    ))}

                                {subject.id &&
                                    subjectToTags.get(subject.id)?.length === 0 && (
                                        <span className="text-xs text-slate-400">
                                            No documents yet
                                        </span>
                                    )}
                            </div>

                            {/* Delete */}
                            <button
                                className="text-xs px-3 py-1 rounded-full
                       bg-red-50 text-red-600
                       hover:bg-red-100 transition"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
            ))}
        </div>

    )
}

export default SubjectShowingGrid
