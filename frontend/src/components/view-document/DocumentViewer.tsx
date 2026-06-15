"use client";

import { Download, Eye, File, FileText, Image, MoreHorizontal, MoreVertical, Presentation, Text, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Document } from "@/types";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher, options } from "@/lib/swr/helper";
import Loader from "../Loader";


export default function DocumentViewer() {
  const [previewSignedUrl, setPreviewSignedUrl] = useState<string | null>(null);
  const supabase = createClient();

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: doc, error, isLoading, mutate } = useSWR(
    `/api/documents/get-document-by-id?id=${id}`,
    fetcher,
    options
  )

  useEffect(() => {
    if (doc) setSignedUrl();
  }, [doc])

  if (error) {
    console.log("error: ", error);
    toast.error(typeof error?.message === "string"
      ? error.message
      : "Something went wrong");
  }

  const setSignedUrl = async () => {
    try {
      const res = await fetch(`/api/documents/create-signed-url?id=${doc.id}`);
      const data = await res.json();

      if(!res.ok || !data.success){
        toast.error(data.message ?? "Something went wrong");
        return;
      }

      setPreviewSignedUrl(data?.data as string);
    } catch (error: any) {
      console.log("error: ", error);
      toast.error(typeof error?.message === "string"
        ? error.message
        : "Something went wrong");
    }
  }
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
      case "text":
        return <Text className="text-black" size={24} />;
      case "ppt":
        return <Presentation className="text-orange-500" size={24} />
      default:
        return <File className="text-gray-500" size={24} />;
    }
  }
  const getFileType = () => {
    let extension = doc?.doc_type;
    if (extension === 'application/pdf') return 'pdf';

    if (extension?.startsWith('image/')) return 'image';

    if (
      extension === 'application/msword' ||
      extension === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return 'doc';
    }

    if (extension?.includes("text")) return "text";

    if (extension?.includes("powerpoint") || extension?.includes("presentation")) return "ppt";

    return 'other';
  }
  // const handleOpenPreview = async (document: Document) => {
  //   const { data, error } = await supabase.storage
  //     .from("documents")
  //     .createSignedUrl(String(document.doc_url), 60 * 60) // 1 hour

  //   if (error) {
  //     toast.error(error.message ?? "Error loading preview, please try again later");
  //   }
  //   setOpenPreview(true);

  //   // const prevDoc = document;
  //   // prevDoc.doc_url = data?.signedUrl as string;
  //   setPreviewDocument(document);
  //   setPreviewSignedUrl(String(data?.signedUrl));
  // }
  // const handlePreviewClose = async () => {
  //   setOpenPreview(false);
  //   setPreviewDocument(null);
  //   setPreviewSignedUrl(null);
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
  const getCreatedTimeofDocumentForMobile = (time: string) => {
    // 2026-04-25T16:23:26.143423+00:00
    if (!time) return;
    return time.slice(0, 10);
  }
  // const handleDelteFile = async (document: Document) => {
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
  //   setCurrPage(prev => prev);
  // }
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
      toast.error(error?.message ?? "Error Downloading Document");
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className="h-[100vh]">
      {/* PREVIEW MODAL */}
      <div style={{ height: "100vh" }} className="border-2 bg-card rounded-xl w-full h-[100vh] mt-10 bg-red p-4 flex flex-col">
        {/* HEADER */}
        <div className="mb-3 border-2">
          <h2 className="font-semibold text-lg">
            {doc?.doc_name}
          </h2>
          <p className="text-sm text-card-secondary-foreground">
            {getFileType().toUpperCase()} •{" "}
            {getFilesize((doc?.doc_size || 0) as number)}
          </p>
          <p className="text-sm text-card-secondary-foreground">
            Created At: {getCreatedTimeofDocument(doc?.created_at as string)}
          </p>
        </div>

        {/* PREVIEW */}
        <div className="w-full h-full border-2 rounded-lg overflow-hidden">
          {getFileType() === "pdf" && (
            <iframe
              src={previewSignedUrl as string}
              className="w-full h-full"
            />
          )}

          {getFileType() === "image" && (
            <img
              src={previewSignedUrl as string}
              alt={doc?.doc_name as string}
              className="w-full h-full object-contain"
            />
          )}

          {(
            getFileType() === "doc"
            || getFileType() === "ppt"
          ) && (
              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${previewSignedUrl}`}
                className="w-full h-full"
              />
            )}

          {getFileType() === "text" && (
            <iframe
              // src={`https://docs.google.com/gview?url=${previewSignedUrl}&embedded=true`}
              src={previewSignedUrl as string}
              className="w-full h-full"
            />
          )}

          {getFileType() === "other" && (
            <div className="flex items-center justify-center h-full text-gray-500">
              Unsupported file type
            </div>
          )}
        </div>
      </div>
    </div>
  );
}