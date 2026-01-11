"use client";
import { useEffect, useState } from 'react';
import StatCard from "@/components/subject/StatCard";
import { fetchNumberOfPDFdocs, fetchTotalNumberOfDocuments, fetchTotalNumberOfSubjects } from '@/lib/actions/subject-actions';
import toast from 'react-hot-toast';

const StatusCard = () => {
    const [totalNoOfSubjects, setTotalNoOfSubjects] = useState<string>("");
    const [totalNoOfDocs, setTotalNoOfDocs] = useState<string>("");
    const [noOfPdfDocs, setNoOfPdfDocs] = useState<string>("");

    const [isTotalDocsLoading, setIsTotalDocsLoading] = useState(true);
    const [isTotalSubjectLoading, setIsTotalSubjectLoading] = useState(true);
    const [isTotalPdfLoading, setIsTotalPdfLoading] = useState(true);
    
    const getTotalSubjects = async () => {
        const res = await fetchTotalNumberOfSubjects();
        if(!res?.data){
            toast.error("Something went wrong");
            return;
        }
        if(!res.data.success){
            toast.error(res.data.message);
            return;
        }
        setTotalNoOfSubjects(res.data.count);
        setIsTotalSubjectLoading(false);
    }
    const getTotalDocuments = async () => {
        const res = await fetchTotalNumberOfDocuments();
        if(!res?.data){
            toast.error("Something went wrong");
            return;
        }
        if(!res.data.success){
            toast.error(res.data.message);
            return;
        }
        setTotalNoOfDocs(res.data.count);
        setIsTotalDocsLoading(false);
    }
    const getTotalPdfDocuments = async () => {
        const res = await fetchNumberOfPDFdocs();
        if(!res?.data){
            toast.error("Something went wrong");
            return;
        }
        if(!res.data.success){
            toast.error(res.data.message);
            return;
        }
        setNoOfPdfDocs(res.data.count);
        setIsTotalPdfLoading(false);
    }

    useEffect(() => {
        getTotalDocuments();
        getTotalSubjects();
        getTotalPdfDocuments();
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Subjects" value={totalNoOfSubjects} isLoading={isTotalSubjectLoading} />
            <StatCard title="Total Documents" value={totalNoOfDocs} isLoading={isTotalDocsLoading} />
            <StatCard title="PDF Notes" value={noOfPdfDocs} isLoading={isTotalPdfLoading} />
            <StatCard title="AI Sessions" value="12" isLoading={false}/>
        </div>
    )
}

export default StatusCard;
