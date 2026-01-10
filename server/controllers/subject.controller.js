import { getUserFromToken } from "../lib/getUserFromToken.js";
import { supabase } from "../lib/supabase/supabaseClient.js";

const insertSubject = async (req, res) => {
    try {
        const { subject_name } = req.body;
        if (!subject_name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(500).json({ success: false, message: "User is unauthorized" });
        }

        const { error } = await supabase
            .from('subjects')
            .insert([
                {
                    subject_name,
                    user_id: user.id
                }
            ])

        if (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Subject Added successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getAllSubjects = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(500).json({ success: false, message: "User is unauthorized" });
        }

        const { data, error } = await supabase
            .from('subjects')
            .select('*')
            .eq('user_id', user.id)

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Subjects fethced successfully", data });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getSubjectById = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(500).json({ success: false, message: "User is unauthorized" });
        }

        const { subject_id } = req.body;
        if (!subject_id) {
            return res.status(400).json({ success: false, message: "Subject id not found" });
        }

        const { data, error } = await supabase
            .from('subjects')
            .select('*')
            .eq("id", subject_id);

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Subject fetched successfully", subject_data: data });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const addDocument = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(500).json({ success: false, message: "User is unauthorized" });
        }

        const { doc_name, doc_url, doc_type, doc_size = 0, subject_id } = req.body;
        if (!doc_name || !doc_url || !doc_type || !subject_id) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const { error } = await supabase
            .from('documents')
            .insert([
                {
                    doc_name,
                    doc_url,
                    doc_type,
                    doc_size,
                    subject_id,
                    user_id: user.id
                }
            ])

        if (error) {
            console.log(error.message);
            return res.status(500).json({ success: false, message: error.message });
        }

        await supabase.rpc("increment_subject_docs", {
            subject_uuid: subject_id,
        });

        return res.status(200).json({ success: true, message: "Document added successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const fetchDocumentsBySubjectId = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(500).json({ success: false, message: "User is unauthorized" });
        }

        const { subject_id } = req.body;
        if (!subject_id) {
            return res.status(400).json({ success: false, message: "subject id not found" });
        }

        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .eq('subject_id', subject_id);

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Document fetched successfully", documents: data });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getTagsBySubjectId = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { subject_id } = req.body;
        if (!subject_id) {
            return res.status(400).json({ success: false, message: "subject id not found" });
        }

        const { data, error } = await supabase
            .from('documents')
            .select('doc_type')
            .eq('subject_id', subject_id);

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        const tags = [];
        data.map((tag) => {
            const tag_type = tag.doc_type;
            let specific_tag_type = tag_type.split('/')[1];
            if (specific_tag_type.includes('document')) specific_tag_type = 'doc';

            else if (specific_tag_type.includes('jpeg') || specific_tag_type.includes('jpg') || specific_tag_type.includes('png')) specific_tag_type = 'image';

            else if (specific_tag_type.includes('plain')) specific_tag_type = 'note';

            tags.push(specific_tag_type);
        })

        return res.status(200).json({ success: true, message: "document tags fetched succesfully", tags: tags });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const deleteDocument = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { doc_id } = req.body;
        if (!doc_id) {
            return res.status(400).json({ success: false, message: "Document id not found" });
        }


        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .eq('id', doc_id)
            .single();

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        const { doc_url, subject_id } = data;

        //delete the file from supabase bucket
        await supabase
            .storage
            .from('documents')
            .remove([doc_url])

        //now delete the document from supabase table
        const { error: newError } = await supabase
            .from('documents')
            .delete()
            .eq('id', doc_id);

        if (newError) {
            return res.status(500).json({ success: false, message: newError.message });
        }

        await supabase.rpc("decrement_subject_docs", {
            subject_uuid: subject_id,
        });

        return res.status(200).json({ success: true, message: "Document deleted successfully" });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getNumberOfDocuments = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { count, error } = await supabase
            .from('documents')
            .select('*', {
                count: 'exact',
                head: true
            })

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Document count fetched successfully", count });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getNumberOfSubjects = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { count, error } = await supabase
            .from('subjects')
            .select('*', {
                count: 'exact',
                head: true
            })

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Subject count fetched successfully", count });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getNumberOfPdfNotes = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { count, error } = await supabase
            .from('documents')
            .select('*', {
                count: 'exact',
                head: true
            })
            .eq('doc_type', 'application/pdf');

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        return res.status(200).json({ success: true, message: "Pdf count fetched successfully", count });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getRecentCreatedSubjects = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { data, error } = await supabase
            .from('subjects')
            .select('*')
            .order('created_at', { ascending: true })
            .limit(3);

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
        return res.status(200).json({ success: true, message: "Latest documents fetched successfully", data });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getRecentCreatedDocuments = async (req, res) => {
    try {
        const user = await getUserFromToken(req);
        if (!user) {
            return res.status(400).json({ success: false, message: "User is unauthorized" });
        }

        const { data, error } = await supabase
            .from('documents')
            .select('*')
            .order('created_at', { ascending: true })
            .limit(5);

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
        return res.status(200).json({ success: true, message: "Latest documents fetched successfully", data });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {
    insertSubject,
    getAllSubjects,
    addDocument,
    getSubjectById,
    fetchDocumentsBySubjectId,
    getTagsBySubjectId,
    deleteDocument,
    getNumberOfDocuments,
    getNumberOfSubjects,
    getNumberOfPdfNotes,
    getRecentCreatedSubjects,
    getRecentCreatedDocuments
}