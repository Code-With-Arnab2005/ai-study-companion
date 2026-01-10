import AuthProvider from '@/components/auth/AuthProvider';
import Navbar from '@/components/Navbar';
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <AuthProvider>{children}</AuthProvider>
        </div>
    )
}

export default layout;