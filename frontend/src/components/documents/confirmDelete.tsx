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

import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { deleteDocument, deleteSubject } from '@/lib/actions/subject-actions';
import { Document } from "@/types";

export function ConfirmDelete({ document, fetchDocuments, children }:
        {
            document: Document,
            fetchDocuments: Function,
            children: React.ReactNode
        }) {
    const [deleteLoading, setDeleteLoading] = useState<Map<string, boolean>>(new Map()); //subject-id -> deleteLoading

    const handleDelete = async (document: Document) => {
        const document_id = document.id;
        if (!document_id) {
            toast.error("Document id not found");
            return;
        }
        setDeleteLoading(prev => {
            const newMap = new Map(prev);
            newMap.set(document_id, true);
            return newMap;
        })
        try {
            const res = await deleteDocument(document_id);
            if (!res?.data) {
                toast.error("Something went wrong");
                return;
            }
            if (!res.data.success) {
                toast.error(res.data.message);
                return;
            }
            await fetchDocuments();
            toast.success(`Subject ${document.doc_name} deleted successfully`);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setDeleteLoading(prev => {
                const newMap = new Map(prev);
                newMap.set(document_id, false);
                return newMap;
            });
        }
    }

    if (deleteLoading.get(document.id!)) return <Spinner />
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete {document.doc_name}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        Docuemnt.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(document)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
