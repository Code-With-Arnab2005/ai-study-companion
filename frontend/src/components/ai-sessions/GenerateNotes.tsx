"use client";
import { useState } from 'react'
import GeneratingNotesLoader from './GeneratingNotesLoader';
import { generateNotes, getLatestNote } from '@/lib/actions/ai-session-actions';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SectionLoader from '../SectionLoader';

const GenerateNotes = () => {
    const [topicName, setTopicName] = useState("");
    const [depth, setDepth] = useState("Short");
    const [level, setLevel] = useState("BEginner");
    const [generatedNotes, setGeneratedNotes] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isFetchingLatestNote, setIsFetchingLatestNote] = useState(false);

    const handleGenerateNotes = async () => {
        setIsGenerating(true);
        if (topicName.length === 0 || !depth || !level) {
            toast.error("All fields are required");
            setIsGenerating(false);
            return;
        }
        try {
            const res = await generateNotes({ topic: topicName, depth, level });
            if (!res?.data) {
                toast.error("Something went wrong");
            } else if (!res.data.success) {
                toast.error(res.data.message);
            } else {
                toast.success("Notes generated successfully");
                setGeneratedNotes(res.data.notes);
            }
        } catch (error: any) {
            const errorMessage = error.response.data.message
                                || "Something went wrong"
            toast.error(errorMessage);
        } finally {
            setIsGenerating(false);
        }
    }

    const getLastNote = async () => {
        setIsFetchingLatestNote(true);
        try {
            const res = await getLatestNote();
            if (!res?.data) {
                toast.error("Someting went wrong");
            } else if (!res.data.success) {
                toast.error(res.data.message);
            } else {
                toast.success("Last notes fetched successfully");
                const note = res.data.note;
                setTopicName(note.topic);
                setDepth(note.depth);
                setLevel(note.level);
                setGeneratedNotes(note.notes);
            }
        } catch (error: any) {
            const errorMessage = error.response.data.message
                                || "Something went wrong"
            toast.error(errorMessage)
        } finally {
            setIsFetchingLatestNote(false);
        }
    }

    return (
        <>
            <div>
                <button
                    disabled={isFetchingLatestNote}
                    onClick={getLastNote}
                    className={`hover:cursor-pointer fixed top-25 right-35 min-w-[15vw] bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2.5 text-white font-semibold  transition`}
                >
                    {isFetchingLatestNote ? <SectionLoader /> : "Get Last Note"}
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Input Form */}
                <section className="lg:col-span-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">

                    <h2 className="text-lg font-semibold text-slate-900 mb-6">
                        Specify the Details of your topic
                    </h2>

                    {/* Topic */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Topic Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Photosynthesis"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            value={topicName}
                            onChange={e => setTopicName(e.target.value)}
                        />
                    </div>

                    {/* Depth */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Depth
                        </label>
                        <select
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            value={depth}
                            onChange={e => setDepth(e.target.value)}
                        >
                            <option value="short">Short</option>
                            <option value="medium">Medium</option>
                            <option value="deep">Deep</option>
                        </select>
                    </div>

                    {/* Level */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-600 mb-2">
                            Level
                        </label>
                        <select
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            value={level}
                            onChange={e => setLevel(e.target.value)}
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={isGenerating}
                        className={`${isGenerating ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} w-full rounded-lg py-2.5 text-white font-semibold  transition`}
                        onClick={handleGenerateNotes}
                    >
                        Generate Notes
                    </button>

                </section>

                {/* Right: Output Section */}
                <section className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    {(generatedNotes.length === 0 && !isGenerating) ? <div className='text-gray-800 text-lg h-full flex items-center justify-center'>Please generate a note</div>
                        : isGenerating ?
                            (
                                <div className='h-full flex items-center justify-center'>
                                    <GeneratingNotesLoader />
                                </div>
                            )
                            : (
                                <div className="prose prose-indigo max-w-none max-h-[50vh] overflow-y-scroll">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {generatedNotes}
                                    </ReactMarkdown>
                                </div>
                            )}

                </section>

            </div>
        </>
    )
}

export default GenerateNotes
