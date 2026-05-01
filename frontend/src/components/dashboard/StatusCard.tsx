"use client";
import StatCard from "@/components/subject/StatCard";
import { fetcher, options } from '@/lib/swr/helper';
import useSWR from 'swr';

const StatusCard = () => {
    const { data: generatedNotes, error: notesError, isLoading: notesLoading } = useSWR(
        "/api/ai/generated-notes-count",
        fetcher,
        options
    );
    const { data: totalNoOfDocs, error: docsError, isLoading: isTotalDocsLoading } = useSWR(
        "/api/documents/total-documents-count",
        fetcher,
        options
    )
    const { data: totalNoOfSubjects, error: subjectError, isLoading: isTotalSubjectLoading } = useSWR(
        "/api/subjects/total-subjects-count",
        fetcher,
        options
    )
    const { data: noOfPdfDocs, error: pdfError, isLoading: isTotalPdfLoading } = useSWR(
        "/api/documents/pdf-docs-count",
        fetcher,
        options
    )

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Subjects" value={totalNoOfSubjects} isLoading={isTotalSubjectLoading} />
            <StatCard title="Total Documents" value={totalNoOfDocs} isLoading={isTotalDocsLoading} />
            <StatCard title="PDF Notes" value={noOfPdfDocs} isLoading={isTotalPdfLoading} />
            <StatCard title="AI Sessions" value={generatedNotes} isLoading={notesLoading} />
        </div>
    )
}

export default StatusCard;
