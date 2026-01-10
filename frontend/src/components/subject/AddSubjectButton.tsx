"use client";
import { Button } from '../ui/button';

const AddSubjectButton = ({ onClick }: { onClick: any}) => {
    return (
        <Button
            onClick={onClick}
            className="hover:cursor-pointer px-4 py-2 rounded-lg bg-indigo-700 text-white text-sm font-medium hover:bg-indigo-800 transition"
            >
                + Add Subject
        </Button>
    )
}

export default AddSubjectButton;