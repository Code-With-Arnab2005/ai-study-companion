"use client";

import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
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
import SectionLoader from '../SectionLoader';

interface Props {
    link_id: string | null;
    mutate: any;
};

const ConfirmLinkDelete = ({ link_id, mutate }: Props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        if (!link_id) {
            toast.error("Link id not found");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/links/delete-link-by-id?link_id=${link_id}`, {
                method: "DELETE",
            })

            const data = await res.json();

            if (!res.ok || !data.success) {
                toast.error(data.message || "Something went wrong, please try again later");
                setLoading(false);
                return;
            }

            mutate();
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setOpen(false);
            setLoading(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <button
                    onClick={() => setOpen(true)}
                    disabled={loading}
                    className="cursor-pointer p-2 rounded-md hover:bg-red-50 text-red-500 transition">
                    <Trash2 size={16} />
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        Link.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={loading} onClick={() => handleDelete()}>
                        {loading ? <SectionLoader /> : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmLinkDelete
