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
    ChevronRight,
    Brain
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
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
        { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { title: "Subjects", href: "/subjects", icon: BookOpen },
        { title: "AI Sessions", href: "/ai-sessions", icon: Brain },
        { title: "Documents", href: "/documents", icon: Notebook }
    ]

    const GroupMenuItems: GroupmenuItemsType[] = [
        {
            group: "Profile and Settings",
            items: [
                { title: "Profile", href: "/profile", icon: User2 },
                { title: "Settings", href: "/settings", icon: Settings }
            ]
        },
        {
            group: "AI Sessions",
            items: [
                {
                    title: "Generate Note",
                    href: "/ai-sessions/new?mode=generate-notes",
                    icon: Notebook
                }
            ]
        }
    ]

    const [openGroups, setOpenGroups] = useState<string[]>([]);

    return (
        <Sidebar className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">

            {/* 🔷 Header */}
            <SidebarHeader className="px-4 py-4.5 border-b border-sidebar-border">
                <Link href={"/"}>
                    <div className="flex items-center justify-center gap-3">
                        <Image
                            src="/logo1.png"
                            alt="logo"
                            width={30}
                            height={30}
                            className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold"
                        />
                        <span className="text-xl font-semibold">
                            AI Study Companion
                        </span>
                    </div>
                </Link>
            </SidebarHeader>

            {/* 🔷 Content */}
            <SidebarContent className="px-2 py-4">

                <SidebarGroup>
                    <SidebarMenu>
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
                                            ${isActive
                                                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm pointer-events-none"
                                                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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

                {/* Collapsible Groups */}
                {GroupMenuItems.map((group) => {
                    const isOpen = openGroups.includes(group.group);

                    const handleOpenChange = (open: boolean) => {
                        setOpenGroups(prev =>
                            open ? [...prev, group.group] : prev.filter(g => g !== group.group)
                        );
                    };

                    return (
                        <Collapsible
                            key={group.group}
                            onOpenChange={handleOpenChange}
                        >
                            <SidebarGroup className="border border-sidebar-group-border rounded-xl px-2 py-1 bg-sidebar-group-bg">

                                <CollapsibleTrigger className="w-full text-left">
                                    <SidebarHeader className="px-2 py-2">
                                        <div className="flex justify-between items-center">
                                            <p className="text-xs font-semibold text-sidebar-group-label tracking-wide">
                                                {group.group}
                                            </p>

                                            <ChevronRight
                                                className={`w-4 h-4 text-sidebar-icon transition-transform duration-300 
                                                ${isOpen ? "rotate-90 text-sidebar-icon-active" : ""}`}
                                            />
                                        </div>
                                    </SidebarHeader>
                                </CollapsibleTrigger>

                                <CollapsibleContent className="pb-1">
                                    <SidebarMenu>
                                        {group.items.map((item) => {
                                            const isActive =
                                                pathname === "/ai-sessions/new"
                                                    ? searchParams.get("mode") === item.href.split("mode=")[1]
                                                    : pathname === item.href;

                                            return (
                                                <SidebarMenuItem key={item.title}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        className={`rounded-lg px-3 py-2 text-sm transition-all duration-200
                                                            ${isActive
                                                                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm pointer-events-none"
                                                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
                    );
                })}

            </SidebarContent>

            {/* 🔷 Footer */}
            <SidebarFooter className="px-3 py-3 border-t border-sidebar-border">
                <p className="text-xs text-sidebar-foreground/70">
                    © {new Date().getFullYear()} Arnab
                </p>
            </SidebarFooter>

        </Sidebar>
    )
}