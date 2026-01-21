import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '../ui/button';
import { useEffect, useState } from "react";
import { GeneratedNotes } from "@/types";
import SectionLoader from "../SectionLoader";
import { fetchAllNotes } from "@/lib/actions/ai-session-actions";
import toast from "react-hot-toast";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Sidebar = ({
    fetchNotes, notes, isFetchingNotes, setTopicName, setDepth, setLevel, setGeneratedNotes }: {
        fetchNotes: Function, notes: GeneratedNotes[], isFetchingNotes: boolean, setTopicName: Function, setDepth: Function, setLevel: Function, setGeneratedNotes: Function
    }) => {

        const handleClick = (note: GeneratedNotes) => {
            setTopicName(note.topic);
            setDepth(note.depth);
            setLevel(note.level);
            setGeneratedNotes(note.notes);
        }

    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <Drawer direction="right">
            <DrawerTrigger
                className={`hover:cursor-pointer min-w-[10vw] bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2.5 text-white font-semibold  transition`}
            >
                See All Generated Notes
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="border-b-2 border-b-gray-500">
                    <DrawerTitle>Your Generated Notes</DrawerTitle>
                    <div className="flex flex-row gap-4 items-center justify-between">
                        <DrawerDescription>select your note</DrawerDescription>
                        <p className="text-[14px] text-gray-500">Total Generated Notes: <span className="font-bold">{notes.length}</span></p>
                    </div>
                </DrawerHeader>
                {isFetchingNotes ? <SectionLoader /> : (
                    <DrawerClose asChild>
                        <ul className="overflow-y-auto">
                            {notes.map((note: GeneratedNotes) => (
                                <li
                                    key={note.id}
                                    className="group flex flex-col gap-1 rounded-lg border border-gray-300 p-4 mb-3
                hover:bg-gray-50 hover:border-gray-300 transition cursor-pointer"
                                    onClick={() => handleClick(note)}
                                >
                                    {/* Top row: Topic + Date */}
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                                            {note.topic || "Untitled Topic"}
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                            {note.created_at
                                                ? new Date(note.created_at).toLocaleDateString()
                                                : ""}
                                        </span>
                                    </div>

                                    {/* Meta info */}
                                    <div className="flex gap-2 text-xs text-gray-600">
                                        <span className="rounded-full bg-gray-100 px-2 py-0.5">
                                            Depth: {note.depth ?? "—"}
                                        </span>
                                        <span className="rounded-full bg-gray-100 px-2 py-0.5">
                                            Level: {note.level ?? "—"}
                                        </span>
                                    </div>

                                    {/* Notes preview */}
                                    <div className="text-sm text-gray-700 line-clamp-4">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {note.notes || "No content available"}
                                        </ReactMarkdown>
                                    </div>
                                </li>

                            ))}
                        </ul>
                    </DrawerClose>
                )}
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button className="w-full border-2 border-gray-400" variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Sidebar;
