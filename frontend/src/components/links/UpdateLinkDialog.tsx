"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import toast from "react-hot-toast";
import SectionLoader from "../SectionLoader";
import { Pencil } from "lucide-react";
import { Link } from "@/types";

interface Props {
    link: Link;
    mutate: any;
};
const UpdateLinkDialog = ({ link, mutate }: Props) => {
    const [linkName, setLinkName] = useState<string>(link.link_name ?? "");
    const [url, setUrl] = useState<string>(link.url ?? "");
    const [description, setDescription] = useState<string>(link.description ?? "");

    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleAddLink = async () => {
        if (!linkName.trim() || !url.trim()) {
            toast.error("Link name and URL cannot be empty");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`/api/links/update-link?link_id=${link.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    link_name: linkName,
                    url,
                    description,
                })
            })

            const data = await res.json();

            if (!res.ok || !data.success) {
                toast.error(data.message || "Something went wrong");
                setLoading(false);
                return;
            }

            toast.success(data.message);
            mutate();
            setOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <button
                        onClick={() => setOpen(true)}
                        disabled={loading}
                        className="cursor-pointer p-2 rounded-md hover:bg-blue-50 text-blue-500 transition"
                    >
                        <Pencil size={16} />
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Add a new link</DialogTitle>
                        <DialogDescription>
                            Fill up the details to create a link
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label htmlFor="name-1">Link Name</Label>
                            <Input
                                value={linkName}
                                onChange={(e) => setLinkName(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="username-1">URL</Label>
                            <Input
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="username-1">Description (optional)</Label>
                            <Input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            disabled={loading}
                            onClick={handleAddLink}
                            type="submit"
                        >
                            {loading ? <SectionLoader /> : "Update"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default UpdateLinkDialog
