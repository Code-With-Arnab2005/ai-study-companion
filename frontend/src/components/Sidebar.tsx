"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
    LayoutDashboard,
    BookOpen,
    User2,
    Settings,
    Notebook,
    LucideIcon,
    ArrowBigDown,
    ArrowBigUp,
    ArrowDown,
    ArrowUp,
    ChevronDown,
    ChevronRight
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
import Image from "next/image";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useState } from "react"

interface MenuItemsType {
    title: string,
    href: string,
    icon: LucideIcon
}
interface GroupmenuItemsType {
    group: string,
    items: MenuItemsType[]
}

export function AppSidebar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const menuItems: MenuItemsType[] = [
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
    const GroupMenuItems: GroupmenuItemsType[] = [
        {
            group: "Profile and Settings",
            items: [
                {
                    title: "Profile",
                    href: "/profile",
                    icon: User2
                },
                {
                    title: "Settings",
                    href: "#", // TODO
                    icon: Settings
                }
            ]
        },
        {
            group: "AI Sessions",
            items: [
                {
                    title: "Generate Note",
                    href: "/ai-sessions/new?mode=generate-notes",
                    icon: Notebook
                },
                // TODO
            ]
        }
    ]

    const [openGroups, setOpenGroups] = useState<string[]>([]);

    return (
        <Sidebar collapsible="offcanvas" className="border-r border-r-gray-300 bg-white">

            {/* 🔷 Header */}
            <SidebarHeader className="px-4 py-4.5 border-b border-b-gray-300">
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

                    {/* Non-collapsible Items */}
                    <SidebarMenu>
                        {menuItems.map((item: MenuItemsType) => {
                            const isActive = pathname === item.href;
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
                                            ${isActive
                                                ? "bg-blue-100 text-blue-700 shadow-sm pointer-events-none"
                                                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                            }`}
                                    >
                                        <Link href={item.href} className="flex items-center gap-2">
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>

                </SidebarGroup>


                {/* Collapsible Items */}
                {GroupMenuItems.map((group: GroupmenuItemsType) => {
                    const isOpen = openGroups.includes(group.group);
                    const handleOpenChange = (open: boolean) => {
                        setOpenGroups((prev: string[]) => (
                            open ? [...prev, group.group] : prev.filter(g => g !== group.group)
                        ))
                    }

                    return (
                        <Collapsible
                            onOpenChange={(open: boolean) => handleOpenChange(open)}
                            key={group.group}
                        >
                            <SidebarGroup className="border border-gray-400 rounded-xl px-2 py-1 bg-gray-50/40">

                                <CollapsibleTrigger className="w-full text-left">
                                    <SidebarHeader className="px-2 py-2">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs font-semibold text-gray-500 tracking-wide">
                                                {group.group}
                                            </p>

                                            <ChevronRight
                                                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-90 text-blue-500" : ""
                                                    }`}
                                            />
                                        </div>
                                    </SidebarHeader>
                                </CollapsibleTrigger>

                                <CollapsibleContent className="pb-1">
                                    <SidebarMenu>
                                        {group.items.map((item: MenuItemsType) => {
                                            const isActive =
                                                pathname === "/ai-sessions/new"
                                                    ? searchParams.get("mode") ===
                                                    item.href.split("mode=")[1]
                                                    : pathname === item.href;

                                            return (
                                                <SidebarMenuItem key={item.title}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        className={`rounded-lg px-3 py-2 text-sm transition-all duration-200
                                                            ${isActive
                                                                ? "bg-blue-100 text-blue-700 shadow-sm pointer-events-none"
                                                                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                                            }`}
                                                    >
                                                        <Link href={item.href} className="flex items-center gap-2">
                                                            <item.icon className="size-4" />
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        })}
                                    </SidebarMenu>
                                </CollapsibleContent>

                            </SidebarGroup>
                        </Collapsible>
                    )
                })}


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