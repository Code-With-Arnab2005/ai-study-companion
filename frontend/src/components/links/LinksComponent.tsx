"use client";

import LinkHeader from './LinksHeader'
import { AddLinkButton } from './AddLinkButton'
import LinksGrid from './LinksGrid'
import { fetcher, options } from "@/lib/swr/helper";
import { Link } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import TimeRangeFilterDropdown from '../documents/TimeRangeFilterDropdown';

const LinksComponent = () => {
    const limit = 5;
    const [currPage, setCurrPage] = useState<number>(1);

    // filters
    const [filterTimeRange, setFilterTimeRange] = useState<string>("ALL");

    const { data, error, isLoading, mutate } = useSWR(
        `/api/links?page=${currPage}&limit=${limit}&timeRange=${filterTimeRange}`,
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
        <>
            <div className="flex justify-between items-center mb-6">
                <LinkHeader />
                <AddLinkButton mutate={mutate} />
            </div>
            <div>
                <div className="mb-4 flex gap-3">
                    {/* Time Range Filter Options */}
                    <TimeRangeFilterDropdown
                        setFilterTimeRange={setFilterTimeRange}
                        setCurrPage={setCurrPage}
                    />

                </div>
                <LinksGrid
                    currLinks={currLinks}
                    isLoading={isLoading}
                    mutate={mutate}
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                    limit={limit}
                    totalLinks={totalLinks}
                    totalPages={totalPages}
                />
            </div>
        </>
    )
}

export default LinksComponent
