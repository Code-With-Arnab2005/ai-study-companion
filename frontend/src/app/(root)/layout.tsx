import AuthProvider from '@/components/auth/AuthProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { AppSidebar } from '@/components/Sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React, { Suspense } from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex w-full">
            <AuthProvider>
                <div className="flex w-full">
                    <SidebarProvider>
                        <div className="flex w-full">
                            <Suspense fallback={null}>
                                <AppSidebar />
                            </Suspense>

                            <div className="flex-1 min-w-0 flex flex-col">
                                <Navbar />
                                <SidebarInset className="flex-1">
                                    {children}
                                </SidebarInset>
                                <Footer />
                            </div>

                        </div>
                    </SidebarProvider>
                </div>
            </AuthProvider>
        </div>
    )
}

export default layout;