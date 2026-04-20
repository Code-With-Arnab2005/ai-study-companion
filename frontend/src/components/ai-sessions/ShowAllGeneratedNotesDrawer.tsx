"use client";

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import ShowPaginatedGeneratedNotes from "./ShowPaginatedGeneratedNotes";
import { useState } from "react";

interface Props {
    setTopicName: any;
    setDepth: any;
    setLevel: any;
    setGeneratedNotes: any;
}

export function ShowAllGeneratedNotesDrawer({ setTopicName, setDepth, setLevel, setGeneratedNotes }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerTrigger asChild>
                <Button
                    className={`hover:cursor-pointer min-w-[10vw] rounded-lg px-4 py-2.5 font-semibold  transition`}
                >
                    Show All Notes
                </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-card px-2">
                <DrawerHeader>
                    <DrawerTitle className="text-xl">Your Generated Notes</DrawerTitle>
                    <DrawerDescription>Here are the notes you have generated so far</DrawerDescription>
                </DrawerHeader>
                <ShowPaginatedGeneratedNotes
                    setOpen={setOpen}
                    setTopicName={setTopicName}
                    setLevel={setLevel}
                    setDepth={setDepth}
                    setGeneratedNotes={setGeneratedNotes}
                />
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button className="w-full hover:cursor-pointer">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
