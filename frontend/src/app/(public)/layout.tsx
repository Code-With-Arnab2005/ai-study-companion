import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import PublicNavbar from '@/components/PublicNavbar'
import { SidebarInset } from '@/components/ui/sidebar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-[100vh]'>
            <PublicNavbar />
            {children}
            {/* <Footer /> */}
        </div>
    )
}

export default layout;