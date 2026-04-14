export type User = {
    id: string;
    fullname: string;
    email: string;
    course: string;
    role: string;
    is_active: boolean;
    avatar_url: string;
    created_at: string;
}

export type SignupError = {
    fullname?: string,
    email?: string,
    course?: string,
    password?: string,
}

export type LoginError = {
    email?: string,
    password?: string,
}

export type forgotPasswordError = {
    email?: string,
}

export type updatePasswordError = {
    password?: string,
    confirmPassword?: string,
}

export type Subject = {
    id: string | null,
    subject_name: string | null,
    no_of_documents: number | null,
    user_id: string | null,
    created_at: string | null
}

export type Document = {
    id: string | null,
    doc_name: string | null,
    doc_url: string | null,
    doc_type: string | null,
    doc_size: number | null,
    subject_id: string | null,
    user_id: string | null,
    created_at: string | null,
    subject_name: string | null
}