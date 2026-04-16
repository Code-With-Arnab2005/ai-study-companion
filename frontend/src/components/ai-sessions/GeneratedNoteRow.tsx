"use client";

import { AIGeneratedNotes } from "@/types";

interface Props {
  setOpen: any;
  note: AIGeneratedNotes;
  setTopicName: any;
  setDepth: any;
  setLevel: any;
  setGeneratedNotes: any;
}

const GeneratedNoteRow = ({ setOpen, note, setTopicName, setDepth, setLevel, setGeneratedNotes }: Props) => {
  return (
    <div
      onClick={() => {
        setTopicName(note.topic)
        setDepth(note.depth)
        setLevel(note.level)
        setGeneratedNotes(note.notes)
        setOpen(false)
      }}
      className="hover:cursor-pointer flex items-center justify-between border-2 rounded-lg px-4 py-3 mb-3 bg-white hover:shadow-sm transition">

      {/* LEFT SECTION */}
      <div className="flex flex-col gap-1 w-full">
        <h3 className="font-semibold text-base truncate">
          {note.topic || "Untitled Topic"}
        </h3>

        <div className="text-sm text-gray-500 flex gap-4 flex-wrap">
          <span>Level: {note.level || "N/A"}</span>
          <span>Depth: {note.depth || "N/A"}</span>
          <span>
            {note.created_at
              ? new Date(note.created_at).toLocaleDateString()
              : "No date"}
          </span>
        </div>

        {/* PREVIEW */}
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {note.notes || "No preview available"}
        </p>
      </div>

    </div>
  );
};

export default GeneratedNoteRow;