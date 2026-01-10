"use client";
import { addDocument } from '@/lib/actions/subject-actions';
import { createClient } from '@/lib/supabase/client';
import { useParams } from 'next/navigation';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Spinner } from '../ui/spinner';

const FileUploadCard = ({ fetchSubject, fetchDocuments }: { fetchSubject: any, fetchDocuments: any}) => {
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const { id: subject_id } = params;

    const [docName, setDocName] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const supabase = createClient();

    const handleUpload = async(e: any) => {
        setLoading(true);

        if(!docName || docName.length===0){
            toast.error("Please give a name");
            setLoading(false);
            return;
        }
        if(!file){
            toast.error("Please upload a file");
            setLoading(false);
            return;
        }

        const {data, error} = await supabase.auth.getUser();
        if(error){
            toast.error(error.message);
            setLoading(false);
            return;
        }
        if(!data.user){
            toast.error("user is unauthorized");
            setLoading(false);
            return;
        }

        //upload the file to supbase bucket
        const {data: uploadData, error: uploadError} = await supabase.storage.from('documents').upload(`${Date.now()}-${data.user.id}-${file.name}`, file);
        if(uploadError){
            toast.error(uploadError.message);
        } else {
            if(!subject_id){
                toast.error("Subject id not found");
                return;
            }
            const res = await addDocument(docName, uploadData.path, file.type, file.size, subject_id as string);
            if(!res.data){
                toast.error("Something went wrong");
            } else if(!res.data.success){
                toast.error(res.data.message);
            } else {
                toast.success("File uploaded successfully");
                setDocName("");
                setFile(null);
            }
        }

        setDocName("");
        setFile(null);
        setLoading(false);
        fetchSubject();
        fetchDocuments();
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-10 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Upload New File
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* File Name */}
                <input
                    type="text"
                    placeholder="Enter file name (e.g. Unit 1 Notes)"
                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                />

                {/* File Input */}
                <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />

                {/* Upload Button */}
                <button
                    onClick={(e) => handleUpload(e)}
                    className="bg-indigo-700 text-white rounded-lg px-4 py-2
                         hover:bg-indigo-800 transition font-medium"
                >
                    {loading ? <Spinner /> : "Upload"}
                </button>
            </div>
        </div>
    )
}

export default FileUploadCard
