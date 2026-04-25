"use client";

import { options } from "@/lib/swr/helper";
import { Document, Subject } from "@/types";
import { Download, Eye, File, FileText, Image, MoreHorizontal, MoreVertical, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { Button } from "../ui/button";
import SectionLoader from "../SectionLoader";
import { createClient } from "@/lib/supabase/client";
import { deleteDocument, fetchAllSubjects } from "@/lib/actions/subject-actions";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import SubjectFilterDropdown from "./SubjectFilterDropdown";

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
  const supabase = createClient();


  const [subjects, setSubjects] = useState<Subject[]>([]);
  const fetchSubjects = async () => {
    try {
      const res = await fetchAllSubjects();
      if (!res?.data.success) {
        toast.error(res?.data.message ?? "Error fetching subjects");
        return;
      }

      setSubjects(res.data.data);
    } catch (error: any) {
      toast.error(error.message ?? error ?? "Error fetching subjects");
    }
  }
  useEffect(() => {
    fetchSubjects();
  }, []);


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
  const handleOpenPreview = async (document: Document) => {
    const { data, error } = await supabase.storage
      .from("documents")
      .createSignedUrl(String(document.doc_url), 60 * 60) // 1 hour

    if (error) {
      toast.error(error.message ?? "Error loading preview, please try again later");
    }
    setOpenPreview(true);

    const prevDoc = document;
    prevDoc.doc_url = data?.signedUrl as string;
    setPreviewDocument(prevDoc);
  }
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
  const getCreatedTimeofDocumentForMobile = (time: string) => {
    // 2026-04-25T16:23:26.143423+00:00
    if (!time) return;
    return time.slice(0, 10);
  }
  const handleDelteFile = async (document: Document) => {
    const doc_id = document.id;
    if (!doc_id) {
      toast.error("document id not found");
      return;
    }
    const res = await deleteDocument(doc_id);
    if (!res?.data) {
      toast.error("Something went wrong");
      return;
    }
    if (!res.data.success) {
      toast.error(res.data.error);
      return;
    }
    toast.success(`Document ${document.doc_name} deleted successfully`);
    setCurrPage(prev => prev);
  }
  const getFileExtension = (mime: string) => {
    if (mime === "application/pdf") return "pdf";
    if (mime.startsWith("image/")) return mime.split("/")[1]; // jpeg, png
    if (
      mime === "application/msword"
    ) return "doc";
    if (
      mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) return "docx";

    return "bin"; // fallback
  };
  const handleDownloadFile = async (doc: Document) => {
    try {
      const ext = getFileExtension(String(doc.doc_type));
      const { data, error } = await supabase.storage
        .from("documents")
        .createSignedUrl(String(doc.doc_url), 60 * 5, {
          download: String(`${doc.doc_name}.${ext}`)
        }) // valid for 2 min

      if (error) {
        toast.error(error.message);
        return;
      }

      // create an invisible download link
      const link = document.createElement("a");
      link.href = data.signedUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Docuemnt downloaded successfully");
    } catch (error: any) {
      toast.error(error ?? error?.message ?? "Error Downloading Document");
    }
  }


  const [currPage, setCurrPage] = useState<number>(1);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [openPreview, setOpenPreview] = useState<boolean>(false);

  // filters
  const [filterSubjectId, setFilterSubjectId] = useState<string>("ALL");
  console.log(filterSubjectId)

  const { data, error, isLoading } = useSWR(
    `/api/documents?page=${currPage}&limit=${limit}&subject=${filterSubjectId}`,
    fetcher,
    options
  );

  if (error) {
    toast.error(error.message || "Something went wrong");
  }

  const currDocs: Document[] = data?.documents || [];
  const totalDocuments: number = data?.totalDocuments || 0;
  const totalPages: number = data?.totalPages || 0;

  return (
    <div>
      <div className="mb-4">
        {/* Subject Filter Option */}
        <SubjectFilterDropdown
          subjects={subjects}
          setFilterSubjectId={setFilterSubjectId}
          setCurrPage={setCurrPage}
        />

      </div>

      <div className="bg-card border text-card-foreground rounded-2xl overflow-hidden min-h-[40vh]">
        {/* Table Header */}
        <div className="grid grid-cols-6 px-6 py-4 text-[12px] md:text-sm font-medium border-b">
          <span className="col-span-2">Document</span>
          <span>Type</span>
          <span className="hidden md:block">Subject</span>
          <span className="ml-2 md:ml-0">Created On</span>
          <span className="md:mr-7 md:text-right ml-7 md:ml-0">Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y">
          {isLoading && (
            <div className="place-items-center mt-12 h-full">
              <SectionLoader />
            </div>
          )}
          {!isLoading && currDocs?.length === 0 && (
            <p className="p-6 text-sm">
              No documents found.
            </p>
          )}

          {!isLoading && currDocs?.map((doc: Document) => {
            const docType = getFileType(doc);
            return (
              <div
                key={doc.id}
                className="grid grid-cols-6 items-center px-6 py-4 hover:bg-card-hover transition"
              >
                {/* Document Name */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="hidden md:block p-2 rounded-lg bg-indigo-50 text-indigo-600">
                    {getFileIcon(docType as string)}
                  </div>

                  <div>
                    <p className="text-[8px] md:text-sm font-medium">
                      {doc.doc_name}
                    </p>
                    <p className="text-[6px] md:text-xs text-card-secondary-foreground">
                      {getFilesize(doc.doc_size as number)}
                    </p>
                  </div>
                </div>

                {/* Type */}
                <span className="text-[8px] md:text-sm">
                  {docType}
                </span>

                {/* Subject */}
                <span className="hidden md:block text-sm text-blue-600 underline">
                  <Link href={`/subjects/${doc.subject_id}`}>
                    {doc.subject_name ?? "other"}
                  </Link>
                </span>

                {/* Created */}
                {/* Desktop view */}
                <span className="hidden md:block text-sm text-card-secondary-foreground">
                  {getCreatedTimeofDocument(doc.created_at as string)}
                </span>
                {/* Mobile View */}
                <span className="block md:hidden ml-2 text-[7px] text-card-secondary-foreground">
                  {getCreatedTimeofDocumentForMobile(doc.created_at as string)}
                </span>

                {/* Actions */}
                {/* Desktop View */}
                <div className="hidden md:flex justify-end items-center gap-1">
                  <button
                    onClick={() => handleOpenPreview(doc)}
                    className="cursor-pointer p-2 rounded-md hover:bg-blue-50 text-blue-500 transition"
                  >
                    <Eye size={20} />
                  </button>

                  <button
                    onClick={() => handleDownloadFile(doc)}
                    className="cursor-pointer p-2 rounded-md hover:bg-green-50 text-green-500 transition"
                  >
                    <Download size={20} />
                  </button>

                  <button
                    onClick={() => handleDelteFile(doc)}
                    className="cursor-pointer p-2 rounded-md hover:bg-red-50 text-red-500 transition">
                    <Trash2 size={16} />
                  </button>
                </div>
                {/* Mobile View */}
                <div className="md:hidden ml-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreVertical className="border-2 rounded-sm flex items-center justify-center" width={15} height={15} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-0">
                      <DropdownMenuGroup>

                        {/* Open Preview */}
                        <DropdownMenuLabel>
                          <button
                            onClick={() => handleOpenPreview(doc)}
                            className="cursor-pointer p-2 rounded-md hover:bg-blue-50 text-blue-500 transition"
                          >
                            <Eye size={20} />
                          </button>
                        </DropdownMenuLabel>

                        {/* Download File */}
                        <DropdownMenuItem>
                          <button
                            onClick={() => handleDownloadFile(doc)}
                            className="cursor-pointer p-2 rounded-md hover:bg-green-50 text-green-500 transition"
                          >
                            <Download size={20} />
                          </button>
                        </DropdownMenuItem>

                        {/* Delete File */}
                        <DropdownMenuItem>
                          <button
                            onClick={() => handleDelteFile(doc)}
                            className="cursor-pointer p-2 rounded-md hover:bg-red-50 text-red-500 transition">
                            <Trash2 size={16} />
                          </button>
                        </DropdownMenuItem>

                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

              </div>
            )
          })}
        </div>

      </div>

      {/* Pagination Buttons */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center mt-2">
        <Button variant="outline">
          Showing {Math.min((currPage - 1) * limit + 1, totalDocuments)} - {Math.min(currPage * limit, totalDocuments)} of {totalDocuments} documents
        </Button>

        <div className="flex jusitfy-center items-center gap-2 mt-2 md:mt-0">
          <Button onClick={() => setCurrPage(prev => Math.max(1, prev - 1))} variant="outline">
            Prev
          </Button>
          <Button onClick={() => setCurrPage(prev => Math.min(totalPages, prev + 1))} variant="outline">
            Next
          </Button>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {openPreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-card rounded-xl w-[90%] h-[90%] relative p-4 flex flex-col">

            {/* CLOSE */}
            <button
              onClick={() => setOpenPreview(false)}
              className="absolute top-3 right-3 text-gray-500 hover:bg-card-hover"
            >
              <X />
            </button>

            {/* HEADER */}
            <div className="mb-3">
              <h2 className="font-semibold text-lg">
                {previewDocument?.doc_name}
              </h2>
              <p className="text-sm text-card-secondary-foreground">
                {getFileType(previewDocument!).toUpperCase()} •{" "}
                {getFilesize((previewDocument?.doc_size || 0) as number)}
              </p>
              <p className="text-sm text-card-secondary-foreground">
                Created At: {getCreatedTimeofDocument(previewDocument?.created_at as string)}
              </p>
            </div>

            {/* PREVIEW */}
            <div className="w-full h-full border rounded-lg overflow-hidden">
              {getFileType(previewDocument!) === "pdf" && (
                <iframe
                  src={previewDocument?.doc_url as string}
                  className="w-full h-full"
                />
              )}

              {getFileType(previewDocument!) === "image" && (
                <img
                  src={previewDocument?.doc_url as string}
                  alt={previewDocument?.doc_name as string}
                  className="w-full h-full object-contain"
                />
              )}

              {getFileType(previewDocument!) === "doc" && (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-gray-600 mb-4">
                    Preview not supported for DOC files
                  </p>
                  <a
                    href={previewDocument?.doc_url as string}
                    target="_blank"
                    className="text-indigo-600 underline"
                  >
                    Download File
                  </a>
                </div>
              )}

              {getFileType(previewDocument!) === "other" && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Unsupported file type
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsGrid;