"use client";

import { options } from "@/lib/swr/helper";
import { Document } from "@/types";
import { File, FileText, Image, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { Button } from "../ui/button";
import SectionLoader from "../SectionLoader";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!data.success) {
    toast.error(data.message ?? "Something went wrong");
    return null;
  }
  return data.data;
}

const DocumentsGrid = () => {
  const limit = 5;

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
  const getFileType = (document: Document) => {
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
  // const openPreview = async () => {
  //   const { data } = await supabase.storage
  //     .from('documents')
  //     .createSignedUrl(document.doc_url as string, 60 * 60); // 1 hour

  //   setPreviewUrl(data?.signedUrl ?? null);
  //   setOpen(true);
  // }
  const getCreatedTimeofDocument = (time: string) => {
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

    return ist;
  }
  // const handleDelteFile = async () => {
  //   const doc_id = document.id;
  //   if (!doc_id) {
  //     toast.error("document id not found");
  //     return;
  //   }
  //   const res = await deleteDocument(doc_id);
  //   if (!res?.data) {
  //     toast.error("Something went wrong");
  //     return;
  //   }
  //   if (!res.data.success) {
  //     toast.error(res.data.error);
  //     return;
  //   }
  //   toast.success(`Document ${document.doc_name} deleted successfully`);
  //   fetchDocuments();
  //   fetchSubject();
  // }


  const [currPage, setCurrPage] = useState<number>(1);

  const { data, error, isLoading } = useSWR(`/api/documents?page=${currPage}&limit=${limit}`, fetcher, options);

  if(error){
    toast.error(error.message || "Something went wrong");
  }

  const currDocs: Document[] = data?.documents || [];
  const totalDocuments: number = data?.totalDocuments || 0;
  const totalPages: number = data?.totalPages || 0;

  return (
    <div>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-6 px-6 py-4 bg-slate-50 text-sm font-medium text-slate-600 border-b">
          <span className="col-span-2">Document</span>
          <span>Type</span>
          <span>Subject</span>
          <span>Created</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y">
          {isLoading && <SectionLoader />}
          {!isLoading && currDocs?.length === 0 && (
            <p className="p-6 text-sm text-slate-500">
              No documents found.
            </p>
          )}

          {!isLoading && currDocs?.map((doc: Document) => {
            const docType = getFileType(doc);
            return (
              <div
                key={doc.id}
                className="grid grid-cols-6 items-center px-6 py-4 hover:bg-slate-50 transition"
              >
                {/* Document Name */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    {getFileIcon(docType as string)}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {doc.doc_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {getFilesize(doc.doc_size as number)}
                    </p>
                  </div>
                </div>

                {/* Type */}
                <span className="text-sm text-slate-600">
                  {docType}
                </span>

                {/* Subject */}
                <span className="text-sm text-slate-600">
                  {doc.subject_name ?? "any"}
                </span>

                {/* Created */}
                <span className="text-sm text-slate-500">
                  {getCreatedTimeofDocument(doc.created_at as string)}
                </span>

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <button className="text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition">
                    Open
                  </button>

                  <button className="p-2 rounded-md hover:bg-red-50 text-red-500 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

      </div>

      {/* Pagination Buttons */}
      <div className="w-full flex justify-between items-center mt-2">
        <Button variant="outline">
          Showing {Math.min((currPage - 1) * limit + 1, totalDocuments)} - {Math.min(currPage * limit, totalDocuments)} of {totalDocuments} documents
        </Button>

        <div className="flex jusitfy-center items-center gap-2">
          <Button onClick={() => setCurrPage(prev => Math.max(1, prev - 1))} variant="outline">
            Prev
          </Button>
          <Button onClick={() => setCurrPage(prev => Math.min(totalPages, prev + 1))} variant="outline">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsGrid;