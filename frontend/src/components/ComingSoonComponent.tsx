import React from 'react';
import { Clock } from 'lucide-react';

const ComingSoonComponent = () => {

    return (
        <div className="group h-47 cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transform transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-md hover:cursor-pointer">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <Clock />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
                Coming Soon...
            </h3>
        </div>
    )
}

export default ComingSoonComponent;