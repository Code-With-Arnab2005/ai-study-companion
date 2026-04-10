"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    BookOpen,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

export function AppSidebar() {
    const pathname = usePathname()

    const menuItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Subjects",
            href: "/subjects",
            icon: BookOpen,
        },
        {
            title: "AI Sessions",
            href: "/ai-sessions",
            icon: BookOpen,
        },
    ]

    return (
        <Sidebar collapsible="offcanvas" className="border-r bg-white">

            {/* 🔷 Header */}
            <SidebarHeader className="px-4 py-4 border-b">
                <Link href={"/"}>
                    <div className="flex items-center justify-center gap-3">
                        <Image
                            src="/logo1.png"
                            alt="logo"
                            width={30}
                            height={30}
                            className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold"
                        />
                        <span className="text-xl font-semibold text-gray-900">
                            AI Study Companion
                        </span>
                    </div>
                </Link>
            </SidebarHeader>

            {/* 🔷 Content */}
            <SidebarContent className="px-2 py-4">

                <SidebarGroup>
                    <SidebarGroupLabel>
                        Navigation
                    </SidebarGroupLabel>

                    <SidebarMenu>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive}
                                        className="rounded-lg px-3 py-2"
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>

                </SidebarGroup>

            </SidebarContent>

            {/* 🔷 Footer */}
            <SidebarFooter className="px-3 py-3 border-t">
                <p className="text-xs text-gray-500">
                    © {new Date().getFullYear()} Arnab
                </p>
            </SidebarFooter>

        </Sidebar>
    )
}