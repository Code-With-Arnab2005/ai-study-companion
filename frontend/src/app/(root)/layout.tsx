import AuthProvider from '@/components/auth/AuthProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <AuthProvider>{children}</AuthProvider>
            <Footer />
        </div>
    )
}

export default layout;