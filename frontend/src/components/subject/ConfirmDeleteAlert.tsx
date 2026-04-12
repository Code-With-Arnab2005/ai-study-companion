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

export function ConfirmDeleteAlert({ subject, fetchSubjects }: { subject: Subject, fetchSubjects: Function }) {
    const [deleteLoading, setDeleteLoading] = useState<Map<string, boolean>>(new Map()); //subject-id -> deleteLoading
    
    const handleDelete = async (subject: Subject) => {
        const subject_id = subject.id;
        if (!subject_id) {
            toast.error("Subject id not found");
            return;
        }
        setDeleteLoading(prev => {
            const newMap = new Map(prev);
            newMap.set(subject_id, true);
            return newMap;
        })
        try {
            const res = await deleteSubject(subject_id);
            if (!res?.data) {
                toast.error("Something went wrong");
                return;
            }
            if (!res.data.success) {
                toast.error(res.data.message);
                return;
            }
            fetchSubjects();
            toast.success(`Subject ${subject.subject_name} deleted successfully`);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setDeleteLoading(prev => {
                const newMap = new Map(prev);
                newMap.set(subject_id, false);
                return newMap;
            });
        }
    }

    if (deleteLoading.get(subject.id!)) return <Spinner />
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className="hover:cursor-pointer text-xs px-3 py-1 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                    Delete
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        Subject.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(subject)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
