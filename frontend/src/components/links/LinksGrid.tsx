"use client";

import { fetcher, options } from "@/lib/swr/helper";
import { Link, Document, Subject } from "@/types";
import { Download, Eye, File, FileText, Image, MoreHorizontal, MoreVertical, Presentation, Text, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/client";
// import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import SectionLoader from "../SectionLoader";
// import { ConfirmDelete } from "./confirmDelete";

const LinksGrid = () => {
    const limit = 5;
    const [currPage, setCurrPage] = useState<number>(1);

    // filters
    const [filterTimeRange, setFilterTimeRange] = useState<string>("ALL");

    const { data, error, isLoading, mutate } = useSWR(
        `/api/links?page=${currPage}&limit=${limit}`,
        fetcher,
        options
    );

    if (error) {
        toast.error(error.message || "Something went wrong");
    }

    const currLinks: Link[] = data?.links || [];
    const totalLinks: number = data?.totalLinks || 0;
    const totalPages: number = data?.totalPages || 0;

    return (
        <div>
            <div className="mb-4 flex gap-3">
                {/* Time Range Filter Options */}
                {/* <TimeRangeFilterDropdown
          setFilterTimeRange={setFilterTimeRange}
          setCurrPage={setCurrPage}
        /> */}

            </div>

            <div className="bg-card border text-card-foreground rounded-2xl overflow-hidden min-h-[40vh]">
                {/* Table Header */}
                <div className="grid grid-cols-6 px-6 py-4 text-[12px] md:text-sm font-medium border-b">
                    <span className="col-span-2">Link Name</span>
                    <span>URL</span>
                    <span>Description</span>
                    <span>Created On</span>
                    <span className="text-right">Actions</span>
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
                                className="grid grid-cols-6 items-center px-6 py-4 hover:bg-card-hover transition"
                            >
                                {/* Link Name */}
                                <div className="col-span-2 flex items-center gap-3">
                                    <div>
                                        <p className="text-[8px] md:text-sm font-medium">
                                            {link.link_name?.slice(0, 30)} {(link.link_name?.length ?? 0) >= 30 && <span>...</span>}
                                        </p>
                                    </div>
                                </div>

                                {/* URL */}
                                <span className="text-[8px] md:text-sm">
                                    {link.url?.slice(0, 30)} {(link.url?.length ?? 0) >= 30 && <span>...</span>}
                                </span>

                                {/* Description */}
                                <span className="text-[8px] md:text-sm">
                                    {link.description}
                                </span>

                                {/* Created */}
                                {/* Desktop view */}
                                <span className="hidden md:block text-sm text-card-secondary-foreground">
                                    {/* {getCreatedTimeofDocument(doc.created_at as string)} */}
                                    {link.created_at}
                                </span>
                                {/* Mobile View */}
                                <span className="block md:hidden ml-2 text-[7px] text-card-secondary-foreground">
                                    {/* {getCreatedTimeofDocumentForMobile(doc.created_at as string)} */}
                                    {link.created_at}
                                </span>

                                {/* Actions */}
                                {/* Desktop View */}
                                <div className="hidden md:flex justify-end items-center gap-1">
                                    {/* <ConfirmDelete document={doc} fetchDocuments={mutate}> */}
                                    <button
                                        // onClick={() => handleDelteFile(doc)}
                                        className="cursor-pointer p-2 rounded-md hover:bg-red-50 text-red-500 transition">
                                        <Trash2 size={16} />
                                    </button>
                                    {/* </ConfirmDelete> */}

                                </div>
                                {/* Mobile View */}
                                <div className="md:hidden ml-10">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <MoreVertical className="border-2 rounded-sm flex items-center justify-center" width={15} height={15} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="min-w-0">
                                            <DropdownMenuGroup>

                                                {/* Open Preview */}
                                                <DropdownMenuLabel>
                                                    <button
                                                        // onClick={() => handleOpenPreview(doc)}
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
        </div>
    );
};

export default LinksGrid;