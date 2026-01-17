import React from 'react';
import { FileText, Book, Brain, NotebookText } from 'lucide-react';

const AiCard = ({ header, desc }: { header: string, desc: string }) => {

    return (
        <div className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md hover:cursor-pointer">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                {header.includes("Subject") ? <Book />
                    : header.includes("Pdf") ? <FileText />
                        : header.includes("Tutor") ? <Brain />
                            : <NotebookText />
                }
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
                {header}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
                {desc}
            </p>
        </div>
    )
}

export default AiCard;