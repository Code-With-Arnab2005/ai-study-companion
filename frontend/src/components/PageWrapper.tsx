import React from 'react'

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen bg-linear-to-br from-slate-100 via-indigo-100 to-purple-100 mt-15">
            <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">
                {children}
            </section>
        </main>
    )
}

export default PageWrapper;
