import React from 'react'

const AiSessonHeader = ({ header, desc }: { header: string, desc: string }) => {
    return (
        <header>
            <h1 className="text-3xl font-bold text-gray-900">
                {header}
            </h1>
            <p className="text-gray-600 mt-1">
                {desc}
            </p>
        </header>
    )
}

export default AiSessonHeader;