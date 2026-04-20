import React from 'react'

const AiSessonHeader = ({ header, desc }: { header: string, desc: string }) => {
    return (
        <header>
            <h1 className="text-3xl font-bold">
                {header}
            </h1>
            <p className="text-card-secondary-foreground mt-1">
                {desc}
            </p>
        </header>
    )
}

export default AiSessonHeader;