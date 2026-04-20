"use client";
import { useEffect, useState } from 'react';
import RecentDoc from '../subject/RecentDoc';
import { fetchRecentDocuments } from '@/lib/actions/subject-actions';
import toast from 'react-hot-toast';
import { Document } from '@/types';
import SectionLoader from '../SectionLoader';

const RecentDocuments = () => {
    const [recentDocs, setRecentDocs] = useState<Document[] | null>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getRecentDocs = async () => {
        try {
            const res = await fetchRecentDocuments();
            if (!res?.data) {
                toast.error("Something went wrong");
                return;
            }
            if (!res.data.success) {
                toast.error(res.data.message);
                return;
            }
            setRecentDocs(res.data.data);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const getDocType = (doc_type: string) => {
        let extension = doc_type;
        if (extension === 'application/pdf') return 'pdf';

        if (extension?.startsWith('image/')) return 'image';

        if (
            extension === 'application/msword' ||
            extension === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            return 'doc';
        }

        return 'other';
    }

    useEffect(() => {
        getRecentDocs();
    }, [])

    return (
        <div className="bg-card rounded-2xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
                Recent Notes / PDFs
            </h2>

            {isLoading ? <SectionLoader /> : (
                <div className="space-y-3">
                    {recentDocs?.map((doc: Document) => (
                        <div key={doc.id}>
                            <RecentDoc doc_type={getDocType(doc.doc_type as string)} name={doc.doc_name!} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RecentDocuments
