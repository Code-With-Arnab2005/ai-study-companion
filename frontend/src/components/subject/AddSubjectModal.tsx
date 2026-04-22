"use client";
import { insertSubject } from "@/lib/actions/subject-actions";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

type Props = {
  fetchSubjects: any;
  setSubjectName: any;
  subjectName: any;
  isOpen: boolean;
  setIsModalOpen: any;
  onClose: () => void;
};

const AddSubjectModal = ({ fetchSubjects, setSubjectName, subjectName, isOpen, setIsModalOpen, onClose }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddSubject = async () => {
    setLoading(true);
    try {
      if (!subjectName || subjectName.length === 0) {
        toast.error("Subject name is requried");
        return;
      }

      const res = await insertSubject({ subject_name: subjectName });

      if (!res?.data) {
        toast.error("Something went wrong, please try again!");
        return;
      }

      if (!res?.data.success) {
        toast.error(res?.data?.message);
        return;
      }

      toast.success("Subject added successfully");

      setIsModalOpen(false);
      setSubjectName("");
      fetchSubjects();
    } catch (error: any) {
      toast.error(error.message ?? error ?? "Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Background Blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-500 flex items-center justify-center">
        <div className="bg-card text-card-foreground rounded-2xl shadow-xl w-full max-w-md p-6">
          <h3 className="text-xl font-semibold mb-4">
            Add New Subject
          </h3>

          <input
            type="text"
            placeholder="Enter subject name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-card-secondary-foreground hover:bg-card-hover"
            >
              Cancel
            </button>

            <Button
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-indigo-700 text-white hover:bg-indigo-800 hover:cursor-pointer"
              onClick={handleAddSubject}
            >
              {loading ? <Spinner /> : "Add Subject"}
              
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSubjectModal;