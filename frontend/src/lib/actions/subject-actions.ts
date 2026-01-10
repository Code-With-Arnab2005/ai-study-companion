import axios from "../axios";
import toast from "react-hot-toast";

export const insertSubject = async (data: any) => {
    const { subject_name } = data;

    try {
        const res = await axios.post("/add-subject", {
            subject_name,
        })

        return res;
    } catch (error: any) {
        toast.error(error.message);
        return;
    }
}

export const fetchAllSubjects = async () => {
    try {
        const res = await axios.get("/get-all-subject");
        return res;
    } catch (error: any) {
        toast(error.message);
    }
}

export const getSubjectById = async (subject_id: string) => {
    try {
        const res = await axios.post("/get-subject-by-id", {
            subject_id,
        })
        return res;
    } catch (error: any) {
        toast.error(error.message);
        return error;
    }
}

export const fetchDocumentsOfSubject = async (subject_id: string) => {
    const res = await axios.post("/fetch-documents-by-subject-id", {
        subject_id
    });
    return res;
}

export const addDocument = async (docName: string, filePath: string, doc_type: string, doc_size: number, subject_id: string) => {
    const res = await axios.post("/add-document", {
        doc_name: docName,
        doc_url: filePath,
        doc_type,
        doc_size,
        subject_id
    })
    return res;
}

export const getTagsBySubjectId = async (subject_id: string) => {
    const res = await axios.post("/get-tags-by-subject-id", {
        subject_id
    })
    return res;
}

export const deleteDocument = async (doc_id: string) => {
    try {
        const res = await axios.delete("/delete-document-by-id", {
            data: { doc_id }
        })
        return res;
    } catch (error: any) {
        toast.error(error.message);
    }
}