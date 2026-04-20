"use client";
import { deleteDocument } from "@/lib/actions/subject-actions";
import { createClient } from "@/lib/supabase/client";
import { Document } from "@/types";
import { File, FileText, Image, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const FileCard = ({ document, fetchDocuments, fetchSubject }: { document: Document, fetchDocuments: any, fetchSubject: any }) => {
    const [open, setOpen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [createdTimeOfDocument, setCreatedAtTimeofDocuemnt] = useState("-");
    const supabase = createClient();

    const getFilesize = (bytes: number) => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
    }
    const getFileIcon = (type: string) => {
        switch (type) {
            case "pdf":
                return <FileText className="text-red-600" size={24} />;
            case "image":
                return <Image className="text-blue-600" size={24} />;
            case "doc":
                return <File className="text-indigo-600" size={24} />;
            default:
                return <File className="text-gray-500" size={24} />;
        }
    }
    const getFileType = () => {
        let extension = document.doc_type;
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
    const openPreview = async () => {
        const { data } = await supabase.storage
            .from('documents')
            .createSignedUrl(document.doc_url as string, 60 * 60); // 1 hour

        setPreviewUrl(data?.signedUrl ?? null);
        setOpen(true);
    }
    const getCreatedTimeofDocument = async (time: string) => {
        if (!time) return;

        const ist = new Date(time).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: true,
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

        setCreatedAtTimeofDocuemnt(ist);
    }
    const handleDelteFile = async () => {
        const doc_id = document.id;
        if(!doc_id){
            toast.error("document id not found");
            return;
        }
        const res = await deleteDocument(doc_id);
        if(!res?.data){
            toast.error("Something went wrong");
            return;
        }
        if(!res.data.success){
            toast.error(res.data.error);
            return;
        }
        toast.success(`Document ${document.doc_name} deleted successfully`);
        fetchDocuments();
        fetchSubject();
    }

    useEffect(() => {
        if(document){
            getCreatedTimeofDocument(document.created_at as string);
        }
    }, [document])

    const fileType = getFileType();

    return (
        <>
            {/* CARD */}
            <div
                className="bg-card text-card-foreground border hover:bg-card border-gray-200 rounded-xl p-5 shadow-sm transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md hover:cursor-pointer"
            >
                <div className="flex items-center gap-3 mb-2">
                    <h3 className="flex gap-2 items-center font-semibold">
                        {getFileIcon(fileType)}
                        {document.doc_name}
                    </h3>
                </div>

                <p className="text-sm text-card-secondary-foreground">
                    {fileType.toUpperCase()} • {getFilesize(document.doc_size as number)}
                </p>

                <p className="text-sm text-card-secondary-foreground mb-4">
                    Created At: {createdTimeOfDocument}
                </p>

                <div className="flex gap-4 text-sm">
                    <button
                        onClick={handleDelteFile}
                        className="bg-red-500 text-white font-bold px-2 py-1 rounded-lg hover:bg-red-600 hover:cursor-pointer">
                        Delete
                    </button>
                    <button
                        onClick={openPreview}
                        className="bg-green-500 text-white font-bold px-2 py-1 rounded-lg hover:bg-green-600 hover:cursor-pointer">
                        View
                    </button>
                </div>
            </div>

            {/* PREVIEW MODAL */}
            {open && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                    <div className="bg-card rounded-xl w-[90%] h-[90%] relative p-4 flex flex-col">

                        {/* CLOSE */}
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 text-card-foreground hover:text-slate-300"
                        >
                            <X />
                        </button>

                        {/* HEADER */}
                        <div className="mb-3">
                            <h2 className="font-semibold text-lg">
                                {document.doc_name}
                            </h2>
                            <p className="text-sm text-card-secondary-foreground">
                                {fileType.toUpperCase()} •{" "}
                                {getFilesize(document.doc_size as number)}
                            </p>
                            <p className="text-sm text-card-secondary-foreground">
                                Created At: {createdTimeOfDocument}
                            </p>
                        </div>

                        {/* PREVIEW */}
                        <div className="w-full h-full border rounded-lg overflow-hidden">
                            {fileType === "pdf" && (
                                <iframe
                                    src={previewUrl as string}
                                    className="w-full h-full"
                                />
                            )}

                            {fileType === "image" && (
                                <img
                                    src={previewUrl as string}
                                    alt={document.doc_name as string}
                                    className="w-full h-full object-contain"
                                />
                            )}

                            {fileType === "doc" && (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <p className="text-card-secondary-foreground mb-4">
                                        Preview not supported for DOC files
                                    </p>
                                    <a
                                        href={previewUrl as string}
                                        target="_blank"
                                        className="text-indigo-600 underline"
                                    >
                                        Download File
                                    </a>
                                </div>
                            )}

                            {fileType === "other" && (
                                <div className="flex items-center justify-center h-full text-card-secondary-foreground">
                                    Unsupported file type
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FileCard;
