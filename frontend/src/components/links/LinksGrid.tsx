"use client";

import { Link } from "@/types";
import { Download, Eye, Link2, MoreVertical, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import NextLink from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import SectionLoader from "../SectionLoader";
import ConfirmLinkDelete from "./ConfirmLinkDelete";
import LinkDetailsModal from "./LinkDetailsModal";
import { link } from "fs";

interface Props {
    currLinks: Link[];
    isLoading: boolean;
    mutate: any;
    currPage: number;
    setCurrPage: React.Dispatch<React.SetStateAction<number>>;
    limit: number;
    totalLinks: number;
    totalPages: number;
};

const LinksGrid = ({ currLinks, isLoading, mutate, currPage, setCurrPage, limit, totalLinks, totalPages }: Props) => {
    const [openPreview, setOpenPreview] = useState<boolean>(false);
    const [selectedLink, setSelectedLink] = useState<Link | null>(null);

    const getFileIcon = () => {
        return <Link2 className="text-red-600" size={24} />;
    }
    const getCreatedTimeofDocument = (time: string) => {
        if (!time) return;

        const ist = new Date(time).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: true,
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

        return ist;
    }
    const getCreatedTimeofDocumentForMobile = (time: string) => {
        // 2026-04-25T16:23:26.143423+00:00
        if (!time) return;
        return time.slice(0, 10);
    }

    return (
        <div>
            <div className="bg-card border text-card-foreground rounded-2xl overflow-hidden min-h-[40vh]">
                {/* Table Header */}
                {/* <div className="grid grid-cols-[1.5fr_2fr_2fr_1fr_0.5fr] gap-4 px-6 py-4 text-[12px] md:text-sm font-medium border-b"> */}
                <div className="grid grid-cols-5 md:grid-cols-8 px-6 py-4 text-[12px] md:text-sm font-medium border-b">
                    <span className="col-span-2">Link Name</span>
                    <span className="col-span-2">URL</span>
                    <span className="hidden md:block col-span-2">Description</span>
                    <span className="hidden md:block">Created On</span>
                    <span className="text-right mr-3">Actions</span>
                </div>

                {/* Rows */}
                <div className="divide-y">
                    {isLoading && (
                        <div className="place-items-center mt-12 h-full">
                            <SectionLoader />
                        </div>
                    )}
                    {!isLoading && currLinks?.length === 0 && (
                        <p className="p-6 text-sm">
                            No Links found.
                        </p>
                    )}

                    {!isLoading && currLinks?.map((link: Link) => {
                        return (
                            <div
                                key={link.id}
                                className="grid grid-cols-8 px-6 py-4 text-[12px] md:text-sm font-medium border-b"
                            >
                                {/* Link Name */}
                                <div className="col-span-2 flex items-center gap-3">
                                    <div className="hidden md:block p-2 rounded-lg bg-indigo-50 text-indigo-600">
                                        {getFileIcon()}
                                    </div>
                                    <div>
                                        <p className="text-[8px] md:text-sm font-medium">
                                            {link.link_name?.slice(0, 30)} {(link.link_name?.length ?? 0) >= 30 && <span>...</span>}
                                        </p>
                                    </div>
                                </div>

                                {/* URL */}
                                <span className="col-span-2 text-[8px] md:text-sm text-blue-800 underline">
                                    <NextLink target="blank" href={String(link.url)}>
                                        {link.url?.slice(0, 30)} {(link.url?.length ?? 0) >= 30 && <span>...</span>}
                                    </NextLink>
                                </span>

                                {/* Description */}
                                <span className={`hidden md:block col-span-2 text-[8px] md:text-sm ${link.description?.length === 0 ? "text-gray-500" : ""}`}>
                                    {link.description?.length === 0 && "No Description Added"}
                                    {link.description?.slice(0, 30)} {(link.description?.length ?? 0) >= 30 && <span>...</span>}
                                </span>

                                {/* Created */}
                                {/* Desktop view */}
                                <span className="hidden md:block text-sm text-card-secondary-foreground">
                                    {getCreatedTimeofDocument(link.created_at as string)}
                                </span>
                                {/* Mobile View */}
                                {/* <span className="block md:hidden ml-2 text-[7px] text-card-secondary-foreground">
                                    {getCreatedTimeofDocumentForMobile(link.created_at as string)}
                                </span> */}

                                {/* Actions */}
                                {/* Desktop View */}
                                <div className="hidden md:flex justify-end items-center gap-1">

                                    {/* Open Preview */}
                                    <button
                                        onClick={() => {
                                            setOpenPreview(true)
                                            setSelectedLink(link)
                                        }}
                                        className="cursor-pointer p-2 rounded-md hover:bg-blue-50 text-blue-500 transition"
                                    >
                                        <Eye size={20} />
                                    </button>

                                    <ConfirmLinkDelete
                                        link_id={link.id}
                                        mutate={mutate}
                                    />

                                    


                                </div>
                                {/* Mobile View */}
                                <div className="md:hidden ml-25">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <MoreVertical className="border-2 rounded-sm flex items-center justify-center" width={15} height={15} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="min-w-0">
                                            <DropdownMenuGroup>

                                                {/* Open Preview */}
                                                <DropdownMenuLabel>
                                                    <button
                                                        onClick={() => {
                                                            setOpenPreview(true)
                                                            setSelectedLink(link)
                                                        }}
                                                        className="cursor-pointer p-2 rounded-md hover:bg-blue-50 text-blue-500 transition"
                                                    >
                                                        <Eye size={20} />
                                                    </button>
                                                </DropdownMenuLabel>

                                                {/* Download File */}
                                                <DropdownMenuItem>
                                                    <button
                                                        // onClick={() => handleDownloadFile(doc)}
                                                        className="cursor-pointer p-2 rounded-md hover:bg-green-50 text-green-500 transition"
                                                    >
                                                        <Download size={20} />
                                                    </button>
                                                </DropdownMenuItem>

                                                {/* Delete File */}
                                                <DropdownMenuItem>
                                                    <button
                                                        // onClick={() => handleDelteFile(doc)}
                                                        className="cursor-pointer p-2 rounded-md hover:bg-red-50 text-red-500 transition">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </DropdownMenuItem>

                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                            </div>
                        )
                    })}
                </div>

            </div>

            {/* Pagination Buttons */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center mt-2">
                <Button variant="outline" className="bg-card">
                    Showing {Math.min((currPage - 1) * limit + 1, totalLinks)} - {Math.min(currPage * limit, totalLinks)} of {totalLinks} documents
                </Button>

                <div className="flex jusitfy-center items-center gap-2 mt-2 md:mt-0">
                    <Button className="bg-card" onClick={() => setCurrPage(prev => Math.max(1, prev - 1))} variant="outline">
                        Prev
                    </Button>
                    <Button className="bg-card" onClick={() => setCurrPage(prev => Math.min(totalPages, prev + 1))} variant="outline">
                        Next
                    </Button>
                </div>
            </div>

            {/* Open Preview */}
            <LinkDetailsModal
                open={openPreview}
                onOpenChange={setOpenPreview}
                link={selectedLink}
            />
        </div>
    );
};

export default LinksGrid;