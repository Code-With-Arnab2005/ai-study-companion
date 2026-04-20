"use client";
import Loader from "@/components/Loader";
import PageWrapper from "@/components/PageWrapper";
import FileCard from "@/components/subject/FileCard";
import FileUploadCard from "@/components/subject/FileUploadCard";
import { Button } from "@/components/ui/button";
import { fetchDocumentsOfSubject, getSubjectById } from "@/lib/actions/subject-actions";
import { Document, Subject } from "@/types";
import { ArrowBigLeft, LucideFlagTriangleRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SubjectPage = () => {
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [createdAtTimeofSubject, setCreatedAtTimeofSubject] = useState("");

  const params = useParams();
  const { id: subject_id } = params;

  const getCreatedTimeofSubject = async (time: string) => {
    if (!time) return;

    // Ensure UTC
    const utcTime = time.endsWith("Z") ? time : `${time}Z`;

    const ist = new Date(utcTime).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    setCreatedAtTimeofSubject(ist);
  }

  const fetchSubject = async () => {
    const res = await getSubjectById(subject_id as string);
    if (!res.data) {
      toast.error("Something went wrong, please try again later");
    } else if (!res.data.success) {
      toast.error(res.data.message);
    } else {
      setSubject(res.data.subject_data[0]);
      getCreatedTimeofSubject(res.data.subject_data[0].created_at);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchSubject();
    fetchDocuments();
  }, [])

  const fetchDocuments = async () => {
    if (!subject_id) {
      toast.error("Subject id not found");
      return;
    }
    const res = await fetchDocumentsOfSubject(subject_id as string);
    if (!res.data) {
      toast.error("Something went wrong");
    } else if (!res.data.success) {
      toast.error(res.data.message);
    } else {
      setDocuments(res.data.documents);
    }
    setLoading(false);
  }

  if (loading) return <Loader />

  return (
    <PageWrapper>
      <main className="">
        <section className="max-w-6xl mx-auto px-6 py-10">

          <Link href={"/subjects"}>
          <div className="w-full">
            <Button
              className="mb-5 bg-indigo-700 text-white rounded-lg px-10 py-3 hover:bg-indigo-800 transition font-medium hover:cursor-pointer">
              <ArrowBigLeft fill="white"/>All Subjects
            </Button>
          </div>
          </Link>

          {/* Subject Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex flex-col justify-center items-left">
              <h1 className="text-3xl font-bold">
                {subject?.subject_name}
              </h1>
              <p>Created At: {createdAtTimeofSubject}</p>
            </div>
            <h2 className="font-bold">Total Documents: {subject?.no_of_documents}</h2>
          </div>

          {/* Upload Card */}
          <FileUploadCard fetchSubject={fetchSubject} fetchDocuments={fetchDocuments} />

          {/* Uploaded Files Section */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Uploaded Files
            </h2>

            {/* Files Grid */}
            <div className="border-2 border-gray-300 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[35vh] overflow-y-scroll">
              {documents.map((document: Document) => (
                <div key={document.id}>
                  <FileCard document={document} fetchDocuments={fetchDocuments} fetchSubject={fetchSubject} />
                </div>
              ))}

              {documents?.length === 0 && (
                <p className="col-span-full">
                  No files uploaded yet. Upload your first PDF or notes 🚀
                </p>
              )}
            </div>
          </div>

        </section>
      </main>
    </PageWrapper>
  );
};

export default SubjectPage;