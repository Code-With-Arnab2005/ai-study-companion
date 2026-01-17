'use client';
import AiSessonHeader from '@/components/ai-sessions/AiSessionHeader';
import GenerateNotes from '@/components/ai-sessions/GenerateNotes';
import PageWrapper from '@/components/PageWrapper'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [topic, setTopic] = useState<string>("");
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');

    useEffect(() => {
        if(mode){
            if(mode==='docs') setTopic("Ask With Documents");
            else if(mode==='subject') setTopic("Ask with Subject");
            else if(mode==='ai-tutor') setTopic("Learn with AI tutor");
            else setTopic("Generate Notes with AI Agent");
        }
    }, [mode])

    return (
        <PageWrapper>
            <AiSessonHeader header={topic} desc="" />
            {mode==='generate-notes' ? <GenerateNotes /> : null}
        </PageWrapper>
    )
}

export default page;