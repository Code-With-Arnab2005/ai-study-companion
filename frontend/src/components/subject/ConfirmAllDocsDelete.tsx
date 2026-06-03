"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { Subject } from "@/types";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { deleteSubject } from '@/lib/actions/subject-actions';
import SectionLoader from "../SectionLoader";

interface Props {
    fetchSubject: any;
    fetchDocuments: any;
    subject_id: string | null;
    document_length: number;
};


const ConfirmAllDocsDelete = ({ fetchSubject, fetchDocuments, subject_id, document_length }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        if (!subject_id || subject_id.length === 0) {
            toast.error("Subject Id not found");
        }
        
        setLoading(true);
        try {
            const res = await fetch(`/api/subjects/delete-all-documents-by-subject-id?subject_id=${subject_id}`, {
                method: "DELETE"
            })
            const data = await res.json();
            
            if(!res.ok || !data.success){
                toast.error(data.message || "Something went wrong, please try again later");
                setLoading(false);
                return;
            }
            
            fetchSubject();
            fetchDocuments();
            toast.success(data.message);
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong")
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={loading || document_length === 0}
                    className='min-w-[10vw] hover:cursor-pointer from-destructive via-destructive/60 to-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 bg-transparent bg-gradient-to-r [background-size:200%_auto] text-white hover:bg-transparent hover:bg-[99%_center]'
                >
                    {loading ? <SectionLoader /> : "Delete All Documents"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card">
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm to delete all documents of this subject?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        Subject.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete()}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmAllDocsDelete
