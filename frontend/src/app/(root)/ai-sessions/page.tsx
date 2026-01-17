import AiCard from '@/components/ai-sessions/AiCard'
import AiSessonHeader from '@/components/ai-sessions/AiSessionHeader'
import PageWrapper from '@/components/PageWrapper'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <PageWrapper>
            <AiSessonHeader header="AI Sessions" desc="Create your own AI Sessions on subjects and documents" />


            {/* Action Cards  */}
            <section className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                {/* Study from PDF  */}
                <Link href={"/ai-sessions/new?mode=docs"}>
                    <AiCard header="Study from PDF" desc="Upload your notes or books and let AI explain and summarize them." />
                </Link>

                {/* Study by Subject  */}
                <Link href={"/ai-sessions/new?mode=subject"}>
                    <AiCard header="Study by Subject" desc="Choose a subject or topic and get structured explanations." />
                </Link>

                {/* AI Tutor  */}
                <Link href={"/ai-sessions/new?mode=ai-tutor"}>
                    <AiCard header="Ask AI Tutor" desc="Ask questions and clear doubts with an intelligent AI tutor." />
                </Link>

                {/* Generate Notes  */}
                <Link href={"/ai-sessions/new?mode=generate-notes"}>
                    <AiCard header="Generate Notes" desc="Instantly create clean, exam-ready notes using AI agents." />
                </Link>

            </section>


            {/* Bottom CTA */}
            <section className="mt-16 text-center">

                <button className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-3
                   text-base font-semibold text-white shadow-sm
                   hover:bg-indigo-700 transition">
                    Start a New AI Session
                </button>
                
            </section>
        </PageWrapper>



    )
}

export default page
